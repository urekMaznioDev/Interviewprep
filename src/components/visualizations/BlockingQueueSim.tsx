import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ArrowRight, User, Factory, AlertCircle, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Item {
  id: number;
  color: string;
}

export const BlockingQueueSim: React.FC = () => {
  const [queue, setQueue] = useState<Item[]>([]);
  const [capacity] = useState(5);
  const [producers, setProducers] = useState<{ id: number; status: 'idle' | 'working' | 'blocked' }[]>([
    { id: 1, status: 'idle' },
  ]);
  const [consumers, setConsumers] = useState<{ id: number; status: 'idle' | 'working' | 'blocked' }[]>([
    { id: 1, status: 'idle' },
  ]);
  const [itemIdCounter, setItemIdCounter] = useState(1);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const produce = async (producerId: number) => {
    setProducers(prev => prev.map(p => p.id === producerId ? { ...p, status: 'working' } : p));
    
    await new Promise(resolve => setTimeout(resolve, 800));

    if (queue.length < capacity) {
      const newItem = { id: itemIdCounter, color: `hsl(${Math.random() * 360}, 70%, 50%)` };
      setQueue(prev => [...prev, newItem]);
      setItemIdCounter(prev => prev + 1);
      setProducers(prev => prev.map(p => p.id === producerId ? { ...p, status: 'idle' } : p));
      addLog(`Producer ${producerId}: Added item #${newItem.id}`);
    } else {
      setProducers(prev => prev.map(p => p.id === producerId ? { ...p, status: 'blocked' } : p));
      addLog(`Producer ${producerId}: Queue FULL! Blocked...`);
    }
  };

  const consume = async (consumerId: number) => {
    setConsumers(prev => prev.map(c => c.id === consumerId ? { ...c, status: 'working' } : c));
    
    await new Promise(resolve => setTimeout(resolve, 800));

    if (queue.length > 0) {
      const item = queue[0];
      setQueue(prev => prev.slice(1));
      setConsumers(prev => prev.map(c => c.id === consumerId ? { ...c, status: 'idle' } : c));
      addLog(`Consumer ${consumerId}: Removed item #${item.id}`);
      
      // Unblock producers
      setProducers(prev => prev.map(p => p.status === 'blocked' ? { ...p, status: 'idle' } : p));
    } else {
      setConsumers(prev => prev.map(c => c.id === consumerId ? { ...c, status: 'blocked' } : c));
      addLog(`Consumer ${consumerId}: Queue EMPTY! Blocked...`);
    }
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-500" />
            Blocking Queue Simulator
          </h3>
          <p className="text-sm text-zinc-500">Visualize Producer-Consumer synchronization</p>
        </div>
        <Badge variant="outline" className="text-zinc-500 border-zinc-800">
          Capacity: {capacity}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Producers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Producers</h4>
            <Button size="sm" variant="ghost" onClick={() => setProducers(prev => [...prev, { id: prev.length + 1, status: 'idle' }])} className="h-6 text-[8px]">Add</Button>
          </div>
          <div className="space-y-2">
            {producers.map(p => (
              <div key={p.id} className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Factory className={`w-4 h-4 ${p.status === 'blocked' ? 'text-red-500' : 'text-blue-500'}`} />
                  <span className="text-xs text-zinc-400">P-{p.id}</span>
                </div>
                <Button 
                  size="sm" 
                  disabled={p.status === 'working'}
                  onClick={() => produce(p.id)}
                  className="h-7 text-[10px] bg-blue-600 hover:bg-blue-700"
                >
                  {p.status === 'blocked' ? 'Wait' : 'Produce'}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Queue */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-full h-48 bg-zinc-950 rounded-2xl border-2 border-zinc-800 p-4 flex flex-col-reverse gap-2 overflow-hidden relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Buffer</div>
            <AnimatePresence>
              {queue.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  className="h-6 w-full rounded border border-white/10 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: item.color }}
                >
                  Item #{item.id}
                </motion.div>
              ))}
            </AnimatePresence>
            {queue.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-zinc-800 text-[10px] font-bold uppercase">Empty</div>
            )}
          </div>
          <div className="flex justify-between w-full px-2">
            <span className="text-[10px] text-zinc-600 uppercase font-bold">Size: {queue.length}</span>
            {queue.length === capacity && <span className="text-[10px] text-red-500 uppercase font-bold animate-pulse">Full</span>}
          </div>
        </div>

        {/* Consumers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Consumers</h4>
            <Button size="sm" variant="ghost" onClick={() => setConsumers(prev => [...prev, { id: prev.length + 1, status: 'idle' }])} className="h-6 text-[8px]">Add</Button>
          </div>
          <div className="space-y-2">
            {consumers.map(c => (
              <div key={c.id} className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className={`w-4 h-4 ${c.status === 'blocked' ? 'text-red-500' : 'text-emerald-500'}`} />
                  <span className="text-xs text-zinc-400">C-{c.id}</span>
                </div>
                <Button 
                  size="sm" 
                  disabled={c.status === 'working'}
                  onClick={() => consume(c.id)}
                  className="h-7 text-[10px] bg-emerald-600 hover:bg-emerald-700"
                >
                  {c.status === 'blocked' ? 'Wait' : 'Consume'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Event Logs</h4>
        <div className="space-y-2">
          {logs.map((log, i) => (
            <div key={i} className="text-[10px] font-mono text-zinc-500 flex items-center gap-2">
              <div className={`w-1 h-1 rounded-full ${log.includes('FULL') || log.includes('EMPTY') ? 'bg-red-500' : 'bg-zinc-800'}`} />
              {log}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
        <p className="text-xs text-zinc-400 leading-relaxed">
          <strong className="text-blue-400">Concurrency:</strong> A <code className="text-blue-300">BlockingQueue</code> is a thread-safe queue that blocks the producer when the queue is full and blocks the consumer when the queue is empty. 
          This is a fundamental building block for <span className="text-blue-300">Thread Pools</span> and asynchronous messaging systems.
        </p>
      </div>
    </div>
  );
};
