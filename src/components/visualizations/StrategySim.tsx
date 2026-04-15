import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Train, Car, Navigation, Clock, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Strategy = 'FLIGHT' | 'TRAIN' | 'CAR';

interface RouteInfo {
  time: string;
  cost: string;
  reliability: string;
  icon: React.ReactNode;
}

export const StrategySim: React.FC = () => {
  const [strategy, setStrategy] = useState<Strategy>('CAR');

  const strategies: Record<Strategy, RouteInfo> = {
    FLIGHT: {
      time: '2h 30m',
      cost: '$450',
      reliability: 'High',
      icon: <Plane className="w-6 h-6 text-blue-500" />
    },
    TRAIN: {
      time: '6h 45m',
      cost: '$120',
      reliability: 'Medium',
      icon: <Train className="w-6 h-6 text-emerald-500" />
    },
    CAR: {
      time: '12h 00m',
      cost: '$80',
      reliability: 'Variable',
      icon: <Car className="w-6 h-6 text-amber-500" />
    }
  };

  const current = strategies[strategy];

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Navigation className="w-5 h-5 text-blue-500" />
            Strategy Pattern Simulator
          </h3>
          <p className="text-sm text-zinc-500">Visualize interchangeable algorithms at runtime</p>
        </div>
        <Badge variant="outline" className="text-zinc-500 border-zinc-800">
          Context: RoutePlanner
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Strategy Selection */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Select Strategy</h4>
          <div className="grid grid-cols-1 gap-3">
            {(Object.keys(strategies) as Strategy[]).map((s) => (
              <button
                key={s}
                onClick={() => setStrategy(s)}
                className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                  strategy === s 
                    ? 'bg-blue-600/10 border-blue-500 text-white' 
                    : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${strategy === s ? 'bg-blue-500 text-white' : 'bg-zinc-900 text-zinc-600 group-hover:text-zinc-400'}`}>
                    {strategies[s].icon}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold uppercase tracking-wider">{s}</div>
                    <div className="text-[10px] opacity-60">Travel via {s.toLowerCase()}</div>
                  </div>
                </div>
                {strategy === s && (
                  <motion.div layoutId="active-indicator">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Strategy Execution (Result) */}
        <div className="flex flex-col gap-6">
          <div className="flex-1 p-8 bg-zinc-950 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-4 left-4 text-[10px] font-bold text-zinc-700 uppercase tracking-widest">Execution Result</div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={strategy}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="w-24 h-24 bg-zinc-900 rounded-full border-2 border-zinc-800 flex items-center justify-center mx-auto shadow-2xl">
                  {current.icon}
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-2xl font-bold text-white">Route Calculated!</h5>
                  <p className="text-zinc-500 text-sm">Optimized using {strategy} strategy</p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="space-y-1">
                    <Clock className="w-4 h-4 text-zinc-600 mx-auto" />
                    <div className="text-[10px] text-zinc-500 uppercase">Time</div>
                    <div className="text-xs font-bold text-white">{current.time}</div>
                  </div>
                  <div className="space-y-1">
                    <CreditCard className="w-4 h-4 text-zinc-600 mx-auto" />
                    <div className="text-[10px] text-zinc-500 uppercase">Cost</div>
                    <div className="text-xs font-bold text-white">{current.cost}</div>
                  </div>
                  <div className="space-y-1">
                    <ShieldCheck className="w-4 h-4 text-zinc-600 mx-auto" />
                    <div className="text-[10px] text-zinc-500 uppercase">Reliability</div>
                    <div className="text-xs font-bold text-white">{current.reliability}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Pattern Logic</h4>
            <div className="text-[10px] font-mono text-zinc-600 space-y-1">
              <p><span className="text-blue-500">interface</span> RouteStrategy {'{'}</p>
              <p className="pl-4">Route calculate(A, B);</p>
              <p>{'}'}</p>
              <p className="mt-2"><span className="text-blue-500">class</span> RoutePlanner {'{'}</p>
              <p className="pl-4 text-blue-400">private RouteStrategy strategy;</p>
              <p className="pl-4"><span className="text-zinc-400">// Strategy can be swapped at runtime</span></p>
              <p className="pl-4">void setStrategy(RouteStrategy s) {'{'} ... {'}'}</p>
              <p>{'}'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
        <p className="text-xs text-zinc-400 leading-relaxed">
          <strong className="text-blue-400">Strategy Pattern:</strong> This pattern allows you to define a family of algorithms, encapsulate each one, and make them interchangeable. 
          The <span className="text-blue-300">Context</span> (RoutePlanner) remains independent of which <span className="text-blue-300">Strategy</span> is being used, adhering to the <span className="text-blue-300">Open/Closed Principle</span>.
        </p>
      </div>
    </div>
  );
};
