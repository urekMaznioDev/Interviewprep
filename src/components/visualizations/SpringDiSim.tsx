import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, ArrowRight, Settings, Database, Server, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const SpringDiSim: React.FC = () => {
  const [isWired, setIsWired] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const components = [
    { id: 'controller', name: 'UserController', type: 'Controller', icon: <Server className="w-5 h-5" />, dependsOn: 'service' },
    { id: 'service', name: 'UserService', type: 'Service', icon: <Settings className="w-5 h-5" />, dependsOn: 'repository' },
    { id: 'repository', name: 'UserRepository', type: 'Repository', icon: <Database className="w-5 h-5" />, dependsOn: null },
  ];

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Box className="w-5 h-5 text-emerald-500" />
            Spring DI & IoC Simulator
          </h3>
          <p className="text-sm text-zinc-500">Visualize Dependency Injection and Bean Wiring</p>
        </div>
        <Button 
          onClick={() => setIsWired(!isWired)} 
          className={`${isWired ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'} gap-2`}
        >
          <Zap className={`w-4 h-4 ${isWired ? 'fill-white' : ''}`} />
          {isWired ? "Beans Wired" : "Wire Beans"}
        </Button>
      </div>

      <div className="relative p-12 bg-zinc-950 rounded-2xl border border-zinc-800 flex flex-col items-center gap-16 overflow-hidden">
        {/* IoC Container Background */}
        <div className="absolute inset-0 border-4 border-dashed border-zinc-900 m-4 rounded-3xl pointer-events-none flex items-center justify-center">
          <span className="text-[40px] font-black text-zinc-900 uppercase tracking-[20px] rotate-12">ApplicationContext</span>
        </div>

        {components.map((comp, i) => (
          <div key={comp.id} className="relative flex flex-col items-center group">
            <motion.div
              onHoverStart={() => setActiveComponent(comp.id)}
              onHoverEnd={() => setActiveComponent(null)}
              animate={{ 
                scale: activeComponent === comp.id ? 1.05 : 1,
                borderColor: isWired ? '#10b981' : '#27272a'
              }}
              className={`w-48 p-4 bg-zinc-900 rounded-xl border-2 z-10 transition-colors flex items-center gap-3 shadow-xl ${
                isWired ? 'border-emerald-500/50' : 'border-zinc-800'
              }`}
            >
              <div className={`p-2 rounded-lg ${isWired ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-600'}`}>
                {comp.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">{comp.name}</span>
                <span className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest">@{comp.type}</span>
              </div>
            </motion.div>

            {/* Dependency Arrow */}
            {comp.dependsOn && (
              <div className="absolute top-full h-16 flex flex-col items-center">
                <div className={`w-0.5 h-full transition-colors duration-1000 ${isWired ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
                <motion.div 
                  animate={isWired ? { y: [0, 10, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`absolute bottom-0 -mb-2 transition-colors duration-1000 ${isWired ? 'text-emerald-500' : 'text-zinc-800'}`}
                >
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </motion.div>
                {isWired && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-zinc-900 px-2 py-0.5 rounded border border-emerald-500/30 text-[8px] font-bold text-emerald-500 uppercase whitespace-nowrap"
                  >
                    Injected
                  </motion.div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
        <p className="text-xs text-zinc-400 leading-relaxed">
          <strong className="text-emerald-400">IoC & DI:</strong> In Spring, the <span className="text-emerald-300">Inversion of Control (IoC)</span> container manages the lifecycle of objects (Beans). 
          Instead of components creating their own dependencies, the container <span className="text-emerald-300">Injects</span> them at runtime. 
          This promotes loose coupling and makes the system easier to test and maintain.
        </p>
      </div>
    </div>
  );
};
