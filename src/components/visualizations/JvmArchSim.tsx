import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Layers, Database, Zap, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const JvmArchSim: React.FC = () => {
  const [activeArea, setActiveArea] = useState<'HEAP' | 'STACK' | 'METASPACE' | 'PC'>('HEAP');

  const areas = {
    HEAP: {
      title: "Heap Memory",
      desc: "Shared area where all objects and their instance variables are stored. Managed by Garbage Collector.",
      color: "bg-blue-500",
      details: ["Young Generation (Eden, S0, S1)", "Old Generation", "String Pool"]
    },
    STACK: {
      title: "Stack Memory",
      desc: "Thread-specific area storing local variables and method call frames. LIFO structure.",
      color: "bg-emerald-500",
      details: ["Local Variables", "Operand Stack", "Frame Data"]
    },
    METASPACE: {
      title: "Metaspace",
      desc: "Stores class metadata, static variables, and method bytecode. Replaced PermGen in Java 8.",
      color: "bg-purple-500",
      details: ["Class Metadata", "Method Bytecode", "Static Constants"]
    },
    PC: {
      title: "PC Register",
      desc: "Program Counter register stores the address of the current JVM instruction being executed.",
      color: "bg-amber-500",
      details: ["Instruction Pointer", "Thread-specific"]
    }
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-500" />
            JVM Architecture Simulator
          </h3>
          <p className="text-sm text-zinc-500">Visualize Runtime Data Areas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* JVM Layout */}
        <div className="relative aspect-square max-w-[400px] mx-auto w-full bg-zinc-950 rounded-3xl border-4 border-zinc-800 p-8 flex flex-col gap-4 shadow-2xl">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-800 px-4 py-1 rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-zinc-700">
            JVM Runtime Data Areas
          </div>

          {/* Shared Areas */}
          <div className="flex-1 flex flex-col gap-4">
            <motion.div 
              onClick={() => setActiveArea('HEAP')}
              animate={{ scale: activeArea === 'HEAP' ? 1.02 : 1 }}
              className={`flex-1 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                activeArea === 'HEAP' ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Database className={`w-8 h-8 ${activeArea === 'HEAP' ? 'text-blue-500' : 'text-zinc-600'}`} />
              <span className="text-xs font-bold uppercase tracking-wider">Heap</span>
              <Badge variant="outline" className="text-[8px] uppercase border-zinc-800 text-zinc-500">Shared</Badge>
            </motion.div>

            <motion.div 
              onClick={() => setActiveArea('METASPACE')}
              animate={{ scale: activeArea === 'METASPACE' ? 1.02 : 1 }}
              className={`h-24 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                activeArea === 'METASPACE' ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Layers className={`w-6 h-6 ${activeArea === 'METASPACE' ? 'text-purple-500' : 'text-zinc-600'}`} />
              <span className="text-xs font-bold uppercase tracking-wider">Metaspace</span>
              <Badge variant="outline" className="text-[8px] uppercase border-zinc-800 text-zinc-500">Shared</Badge>
            </motion.div>
          </div>

          {/* Per-Thread Areas */}
          <div className="h-32 flex gap-4">
            <motion.div 
              onClick={() => setActiveArea('STACK')}
              animate={{ scale: activeArea === 'STACK' ? 1.02 : 1 }}
              className={`flex-1 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                activeArea === 'STACK' ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Zap className={`w-5 h-5 ${activeArea === 'STACK' ? 'text-emerald-500' : 'text-zinc-600'}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Stack</span>
              <Badge variant="outline" className="text-[8px] uppercase border-zinc-800 text-zinc-500">Per-Thread</Badge>
            </motion.div>

            <motion.div 
              onClick={() => setActiveArea('PC')}
              animate={{ scale: activeArea === 'PC' ? 1.02 : 1 }}
              className={`flex-1 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                activeArea === 'PC' ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Info className={`w-5 h-5 ${activeArea === 'PC' ? 'text-amber-500' : 'text-zinc-600'}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider">PC Reg</span>
              <Badge variant="outline" className="text-[8px] uppercase border-zinc-800 text-zinc-500">Per-Thread</Badge>
            </motion.div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeArea}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${areas[activeArea].color}`} />
                <h4 className="text-xl font-bold text-white">{areas[activeArea].title}</h4>
              </div>
              
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                {areas[activeArea].desc}
              </p>

              <div className="space-y-3">
                <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Key Components</h5>
                <div className="grid grid-cols-1 gap-2">
                  {areas[activeArea].details.map((detail, i) => (
                    <div key={i} className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 text-xs text-zinc-300 flex items-center gap-3">
                      <div className={`w-1 h-1 rounded-full ${areas[activeArea].color}`} />
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
        <p className="text-xs text-zinc-400 leading-relaxed">
          <strong className="text-blue-400">JVM Internals:</strong> The JVM divides memory into several runtime data areas. Some are shared across all threads (Heap, Metaspace), while others are private to each thread (Stack, PC Register, Native Method Stack). 
          Understanding this layout is crucial for <span className="text-blue-300">Garbage Collection</span> tuning and troubleshooting <span className="text-blue-300">Memory Leaks</span>.
        </p>
      </div>
    </div>
  );
};
