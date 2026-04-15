import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, RefreshCcw, AlertTriangle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const DeadlockSim: React.FC = () => {
  const [resourceA, setResourceA] = useState<{ owner: string | null }>({ owner: null });
  const [resourceB, setResourceB] = useState<{ owner: string | null }>({ owner: null });
  const [thread1Status, setThread1Status] = useState<'IDLE' | 'WAIT_A' | 'HOLD_A_WAIT_B' | 'SUCCESS'>('IDLE');
  const [thread2Status, setThread2Status] = useState<'IDLE' | 'WAIT_B' | 'HOLD_B_WAIT_A' | 'SUCCESS'>('IDLE');
  const [isDeadlocked, setIsDeadlocked] = useState(false);

  useEffect(() => {
    if (thread1Status === 'HOLD_A_WAIT_B' && thread2Status === 'HOLD_B_WAIT_A') {
      setIsDeadlocked(true);
    } else {
      setIsDeadlocked(false);
    }
  }, [thread1Status, thread2Status]);

  const startThread1 = async () => {
    setThread1Status('WAIT_A');
    await new Promise(r => setTimeout(r, 1000));
    
    if (resourceA.owner === null) {
      setResourceA({ owner: 'Thread 1' });
      setThread1Status('HOLD_A_WAIT_B');
      
      await new Promise(r => setTimeout(r, 2000));
      
      if (resourceB.owner === null) {
        setResourceB({ owner: 'Thread 1' });
        setThread1Status('SUCCESS');
      }
    }
  };

  const startThread2 = async () => {
    setThread2Status('WAIT_B');
    await new Promise(r => setTimeout(r, 1000));
    
    if (resourceB.owner === null) {
      setResourceB({ owner: 'Thread 2' });
      setThread2Status('HOLD_B_WAIT_A');
      
      await new Promise(r => setTimeout(r, 2000));
      
      if (resourceA.owner === null) {
        setResourceA({ owner: 'Thread 2' });
        setThread2Status('SUCCESS');
      }
    }
  };

  const reset = () => {
    setResourceA({ owner: null });
    setResourceB({ owner: null });
    setThread1Status('IDLE');
    setThread2Status('IDLE');
    setIsDeadlocked(false);
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-red-500" />
            Deadlock Simulator
          </h3>
          <p className="text-sm text-zinc-500">Visualize Circular Wait and Resource Contention</p>
        </div>
        <AnimatePresence>
          {isDeadlocked && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-xs font-bold animate-pulse"
            >
              <AlertTriangle className="w-4 h-4" />
              DEADLOCK DETECTED
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Thread 1 */}
        <div className="space-y-4 flex flex-col items-center">
          <div className={`w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
            thread1Status === 'SUCCESS' ? 'bg-emerald-500/10 border-emerald-500' :
            thread1Status === 'IDLE' ? 'bg-zinc-950 border-zinc-800' : 'bg-blue-500/10 border-blue-500'
          }`}>
            <User className={`w-8 h-8 ${thread1Status === 'IDLE' ? 'text-zinc-700' : 'text-blue-500'}`} />
            <span className="text-[10px] font-bold text-zinc-500">Thread 1</span>
          </div>
          <Badge variant="outline" className="text-[8px] uppercase">{thread1Status}</Badge>
          <Button 
            onClick={startThread1} 
            disabled={thread1Status !== 'IDLE'}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Start Thread 1
          </Button>
        </div>

        {/* Resources */}
        <div className="space-y-12 flex flex-col items-center">
          <div className="relative">
            <div className={`w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center gap-1 transition-all ${
              resourceA.owner ? 'bg-amber-500/10 border-amber-500' : 'bg-zinc-950 border-zinc-800'
            }`}>
              {resourceA.owner ? <Lock className="w-5 h-5 text-amber-500" /> : <Unlock className="w-5 h-5 text-zinc-700" />}
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Res A</span>
            </div>
            {resourceA.owner && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] text-amber-500 font-bold whitespace-nowrap"
              >
                LOCKED BY {resourceA.owner.toUpperCase()}
              </motion.div>
            )}
          </div>

          <div className="relative">
            <div className={`w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center gap-1 transition-all ${
              resourceB.owner ? 'bg-amber-500/10 border-amber-500' : 'bg-zinc-950 border-zinc-800'
            }`}>
              {resourceB.owner ? <Lock className="w-5 h-5 text-amber-500" /> : <Unlock className="w-5 h-5 text-zinc-700" />}
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Res B</span>
            </div>
            {resourceB.owner && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] text-amber-500 font-bold whitespace-nowrap"
              >
                LOCKED BY {resourceB.owner.toUpperCase()}
              </motion.div>
            )}
          </div>
        </div>

        {/* Thread 2 */}
        <div className="space-y-4 flex flex-col items-center">
          <div className={`w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
            thread2Status === 'SUCCESS' ? 'bg-emerald-500/10 border-emerald-500' :
            thread2Status === 'IDLE' ? 'bg-zinc-950 border-zinc-800' : 'bg-purple-500/10 border-purple-500'
          }`}>
            <User className={`w-8 h-8 ${thread2Status === 'IDLE' ? 'text-zinc-700' : 'text-purple-500'}`} />
            <span className="text-[10px] font-bold text-zinc-500">Thread 2</span>
          </div>
          <Badge variant="outline" className="text-[8px] uppercase">{thread2Status}</Badge>
          <Button 
            onClick={startThread2} 
            disabled={thread2Status !== 'IDLE'}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Start Thread 2
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={reset} variant="ghost" className="text-zinc-500 gap-2">
          <RefreshCcw className="w-4 h-4" />
          Reset Simulation
        </Button>
      </div>

      <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/10">
        <p className="text-xs text-zinc-400 leading-relaxed">
          <strong className="text-red-400">Deadlock:</strong> This happens when two or more threads are blocked forever, each waiting for the other. 
          In this simulation, <span className="text-blue-400">Thread 1</span> holds <span className="text-amber-400">Res A</span> and waits for <span className="text-amber-400">Res B</span>, while <span className="text-purple-400">Thread 2</span> holds <span className="text-amber-400">Res B</span> and waits for <span className="text-amber-400">Res A</span>. 
          This creates a <span className="text-red-400">Circular Wait</span>, one of the four Coffman conditions for deadlock.
        </p>
      </div>
    </div>
  );
};
