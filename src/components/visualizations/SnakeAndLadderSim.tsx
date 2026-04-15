import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dice5, Trophy, User, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SnakeAndLadderSim: React.FC = () => {
  const [playerPos, setPlayerPos] = useState(1);
  const [diceValue, setDiceValue] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const snakes: Record<number, number> = { 17: 7, 54: 34, 62: 19, 98: 79 };
  const ladders: Record<number, number> = { 3: 38, 24: 33, 42: 93, 72: 84 };

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    
    const val = Math.floor(Math.random() * 6) + 1;
    setDiceValue(val);

    setTimeout(() => {
      let nextPos = playerPos + val;
      let logMsg = `Rolled a ${val}. Moved to ${nextPos}.`;

      if (nextPos > 100) {
        nextPos = playerPos;
        logMsg = `Rolled a ${val}. Need exactly ${100 - playerPos} to win. Stayed at ${playerPos}.`;
      } else if (snakes[nextPos]) {
        const oldPos = nextPos;
        nextPos = snakes[nextPos];
        logMsg = `Rolled a ${val}. Hit a SNAKE at ${oldPos}! Slipped to ${nextPos}.`;
      } else if (ladders[nextPos]) {
        const oldPos = nextPos;
        nextPos = ladders[nextPos];
        logMsg = `Rolled a ${val}. Hit a LADDER at ${oldPos}! Climbed to ${nextPos}.`;
      }

      setPlayerPos(nextPos);
      setLogs(prev => [logMsg, ...prev].slice(0, 5));
      setIsRolling(false);
    }, 600);
  };

  const reset = () => {
    setPlayerPos(1);
    setDiceValue(0);
    setLogs([]);
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Dice5 className="w-5 h-5 text-amber-500" />
            Snake & Ladder Simulator
          </h3>
          <p className="text-sm text-zinc-500">Visualize game logic and state transitions</p>
        </div>
        {playerPos === 100 && (
          <div className="flex items-center gap-2 text-emerald-500 font-bold animate-bounce">
            <Trophy className="w-5 h-5" />
            YOU WON!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Board */}
        <div className="aspect-square bg-zinc-950 rounded-lg border border-zinc-800 p-2 grid grid-cols-10 grid-rows-10 gap-1">
          {Array.from({ length: 100 }).map((_, i) => {
            const row = Math.floor(i / 10);
            const col = i % 10;
            // Snake-like numbering
            const num = row % 2 === 0 
              ? (9 - row) * 10 + (10 - col) 
              : (9 - row) * 10 + (col + 1);
            
            const isSnake = snakes[num];
            const isLadder = ladders[num];
            const hasPlayer = playerPos === num;

            return (
              <div 
                key={num} 
                className={`relative flex items-center justify-center rounded-sm text-[8px] font-mono transition-colors ${
                  hasPlayer ? 'bg-blue-600 text-white z-10' : 'bg-zinc-900 text-zinc-700'
                } ${isSnake ? 'border border-red-900/50' : ''} ${isLadder ? 'border border-emerald-900/50' : ''}`}
              >
                {num}
                {isSnake && <ArrowDownRight className="absolute w-3 h-3 text-red-500/30" />}
                {isLadder && <ArrowUpRight className="absolute w-3 h-3 text-emerald-500/30" />}
                {hasPlayer && (
                  <motion.div 
                    layoutId="player"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <User className="w-4 h-4 text-white fill-white" />
                  </motion.div>
                )}
              </div>
            );
          }).reverse()}
        </div>

        {/* Controls & Logs */}
        <div className="flex flex-col gap-6">
          <div className="p-6 bg-zinc-950 rounded-xl border border-zinc-800 flex flex-col items-center justify-center gap-6">
            <motion.div 
              animate={isRolling ? { rotate: 360, scale: [1, 1.2, 1] } : {}}
              transition={{ repeat: isRolling ? Infinity : 0, duration: 0.3 }}
              className="w-20 h-20 bg-zinc-900 rounded-2xl border-2 border-zinc-800 flex items-center justify-center shadow-xl"
            >
              {diceValue === 0 ? (
                <Dice5 className="w-10 h-10 text-zinc-700" />
              ) : (
                <span className="text-4xl font-bold text-white">{diceValue}</span>
              )}
            </motion.div>
            
            <div className="flex gap-2 w-full">
              <Button 
                onClick={rollDice} 
                disabled={isRolling || playerPos === 100}
                className="flex-1 bg-blue-600 hover:bg-blue-700 h-12"
              >
                Roll Dice
              </Button>
              <Button 
                onClick={reset} 
                variant="outline"
                className="border-zinc-800 text-zinc-500 h-12"
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="flex-1 p-4 bg-zinc-950 rounded-lg border border-zinc-800">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Game Logs</h4>
            <div className="space-y-2">
              {logs.map((log, i) => (
                <div key={i} className={`text-xs p-2 rounded ${
                  log.includes('SNAKE') ? 'bg-red-500/10 text-red-400' :
                  log.includes('LADDER') ? 'bg-emerald-500/10 text-emerald-400' :
                  'text-zinc-400'
                }`}>
                  {log}
                </div>
              ))}
              {logs.length === 0 && <div className="text-zinc-700 text-xs italic">Roll the dice to start...</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-amber-500/5 rounded-lg border border-amber-500/10">
        <p className="text-xs text-zinc-400 leading-relaxed">
          <strong className="text-amber-400">LLD Design:</strong> This simulation models the core logic of Snake & Ladder. In an interview, focus on the <span className="text-amber-300">Strategy Pattern</span> for different movement rules, the <span className="text-amber-300">Singleton</span> for the board, and how to handle multiple players using a <span className="text-amber-300">Circular Queue</span>.
        </p>
      </div>
    </div>
  );
};
