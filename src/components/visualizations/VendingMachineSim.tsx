import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Coins, Package, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type State = 'IDLE' | 'HAS_COIN' | 'DISPENSING' | 'OUT_OF_STOCK';

export const VendingMachineSim: React.FC = () => {
  const [state, setState] = useState<State>('IDLE');
  const [balance, setBalance] = useState(0);
  const [inventory, setInventory] = useState(5);
  const [message, setMessage] = useState('Welcome! Insert coin to start.');
  const [dispensing, setDispensing] = useState(false);

  const insertCoin = () => {
    if (state === 'IDLE') {
      setState('HAS_COIN');
      setBalance(prev => prev + 1);
      setMessage('Coin accepted. Select product.');
    } else if (state === 'HAS_COIN') {
      setBalance(prev => prev + 1);
      setMessage('Additional coin accepted.');
    } else if (state === 'OUT_OF_STOCK') {
      setMessage('Machine is empty. Refund issued.');
    }
  };

  const selectProduct = () => {
    if (state === 'HAS_COIN') {
      if (inventory > 0) {
        setState('DISPENSING');
        setDispensing(true);
        setMessage('Dispensing product...');
        
        setTimeout(() => {
          setInventory(prev => prev - 1);
          setBalance(0);
          setDispensing(false);
          
          if (inventory - 1 === 0) {
            setState('OUT_OF_STOCK');
            setMessage('Product dispensed. Machine is now empty.');
          } else {
            setState('IDLE');
            setMessage('Product dispensed. Thank you!');
          }
        }, 2000);
      } else {
        setState('OUT_OF_STOCK');
        setMessage('Out of stock. Refunding...');
        setBalance(0);
      }
    } else if (state === 'IDLE') {
      setMessage('Please insert coin first.');
    }
  };

  const reset = () => {
    setState('IDLE');
    setBalance(0);
    setInventory(5);
    setMessage('Machine reset. Welcome!');
  };

  const getStateColor = (s: State) => {
    switch (s) {
      case 'IDLE': return 'text-blue-400 border-blue-500/20 bg-blue-500/5';
      case 'HAS_COIN': return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
      case 'DISPENSING': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      case 'OUT_OF_STOCK': return 'text-red-400 border-red-500/20 bg-red-500/5';
    }
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-500" />
            Vending Machine Simulator
          </h3>
          <p className="text-sm text-zinc-500">Visualize the State Design Pattern</p>
        </div>
        <Badge variant="outline" className={getStateColor(state)}>
          Current State: {state}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Machine UI */}
        <div className="relative flex flex-col items-center">
          <div className="w-64 h-96 bg-zinc-800 rounded-3xl border-4 border-zinc-700 shadow-2xl relative overflow-hidden flex flex-col">
            {/* Display */}
            <div className="m-4 p-3 bg-zinc-950 rounded border border-zinc-800 h-20 flex items-center justify-center text-center">
              <p className={`text-xs font-mono ${state === 'OUT_OF_STOCK' ? 'text-red-500' : 'text-emerald-500'}`}>
                {message}
              </p>
            </div>

            {/* Inventory View */}
            <div className="flex-1 px-6 grid grid-cols-2 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="relative h-12 flex items-center justify-center">
                  {i < inventory ? (
                    <motion.div
                      layoutId={`item-${i}`}
                      className="text-blue-400"
                    >
                      <Coffee className="w-8 h-8" />
                    </motion.div>
                  ) : (
                    <div className="w-8 h-8 rounded-full border border-dashed border-zinc-700" />
                  )}
                </div>
              ))}
            </div>

            {/* Dispensing Area */}
            <div className="h-24 bg-zinc-900 border-t-4 border-zinc-700 flex items-center justify-center relative">
              <AnimatePresence>
                {dispensing && (
                  <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="text-blue-400"
                  >
                    <Coffee className="w-10 h-10" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute bottom-2 w-20 h-1 bg-zinc-800 rounded-full" />
            </div>
          </div>

          {/* Coin Slot Decoration */}
          <div className="absolute top-24 -right-4 w-8 h-12 bg-zinc-700 rounded-l-lg border-y border-l border-zinc-600 flex items-center justify-center">
            <div className="w-1 h-6 bg-zinc-950 rounded-full" />
          </div>
        </div>

        {/* User Controls */}
        <div className="space-y-6">
          <div className="p-6 bg-zinc-950 rounded-xl border border-zinc-800 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">User Actions</span>
              <div className="flex items-center gap-2 text-amber-500">
                <Coins className="w-4 h-4" />
                <span className="text-lg font-mono font-bold">${balance}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Button 
                onClick={insertCoin}
                disabled={state === 'DISPENSING' || state === 'OUT_OF_STOCK'}
                className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 h-12 gap-2"
              >
                <Coins className="w-4 h-4 text-amber-500" />
                Insert Coin ($1)
              </Button>
              <Button 
                onClick={selectProduct}
                disabled={state !== 'HAS_COIN'}
                className="bg-blue-600 hover:bg-blue-700 text-white h-12 gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Select Coffee
              </Button>
              <Button 
                onClick={reset}
                variant="ghost"
                className="text-zinc-500 hover:text-zinc-300 gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Machine
              </Button>
            </div>
          </div>

          <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">State Transitions</h4>
            <div className="space-y-3">
              {[
                { from: 'IDLE', to: 'HAS_COIN', trigger: 'Insert Coin' },
                { from: 'HAS_COIN', to: 'DISPENSING', trigger: 'Select Product' },
                { from: 'DISPENSING', to: 'IDLE', trigger: 'Finish' },
                { from: '*', to: 'OUT_OF_STOCK', trigger: 'Inventory = 0' },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="text-zinc-500">{t.from}</span>
                  <div className="flex-1 h-px bg-zinc-800 relative">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-zinc-950 px-1 text-blue-500">{t.trigger}</div>
                  </div>
                  <span className="text-zinc-500">{t.to}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
        <p className="text-xs text-zinc-400 leading-relaxed">
          <strong className="text-blue-400">State Pattern:</strong> This simulation demonstrates how an object's behavior changes when its internal state changes. 
          Instead of massive <code className="text-blue-300">if-else</code> blocks, each state (Idle, HasCoin, Dispensing) is encapsulated in its own class, making the system modular and easy to extend.
        </p>
      </div>
    </div>
  );
};
