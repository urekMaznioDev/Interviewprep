import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Lock, Unlock, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const SingletonSim: React.FC = () => {
  const [instance, setInstance] = useState<number | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [threads, setThreads] = useState<{ id: number; status: 'idle' | 'waiting' | 'success' | 'conflict' }[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const addThread = () => {
    const newId = threads.length + 1;
    setThreads(prev => [...prev, { id: newId, status: 'idle' }]);
  };

  const requestInstance = async (threadId: number) => {
    setThreads(prev => prev.map(t => t.id === threadId ? { ...t, status: 'waiting' } : t));
    setLogs(prev => [`Thread ${threadId}: Requesting instance...`, ...prev].slice(0, 5));

    if (instance === null && !isInitializing) {
      setIsInitializing(true);
      setLogs(prev => [`Thread ${threadId}: Initializing unique instance (Double-Checked Locking)...`, ...prev].slice(0, 5));
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newInstanceId = Math.floor(Math.random() * 10000);
      setInstance(newInstanceId);
      setIsInitializing(false);
      
      setThreads(prev => prev.map(t => t.id === threadId ? { ...t, status: 'success' } : t));
      setLogs(prev => [`Thread ${threadId}: Created Instance #${newInstanceId}`, ...prev].slice(0, 5));
    } else {
      // Simulate waiting if another thread is initializing
      if (isInitializing) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setThreads(prev => prev.map(t => t.id === threadId ? { ...t, status: 'success' } : t));
      setLogs(prev => [`Thread ${threadId}: Received existing Instance #${instance}`, ...prev].slice(0, 5));
    }
  };

  const reset = () => {
    setInstance(null);
    setThreads([]);
    setLogs([]);
    setIsInitializing(false);
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-500" />
            Singleton Pattern Simulator
          </h3>
          <p className="text-sm text-zinc-500">Visualize thread-safe lazy initialization</p>
        </div>
        <Badge variant={instance ? "default" : "outline"} className={instance ? "bg-emerald-600" : "text-zinc-500"}>
          {instance ? `Instance Active: #${instance}` : "No Instance"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Memory View */}
        <div className="p-6 bg-zinc-950 rounded-xl border border-zinc-800 flex flex-col items-center justify-center min-h-[300px] relative">
          <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            <Cpu className="w-3 h-3" /> Heap Memory
          </div>

          <div className="w-48 h-48 rounded-full border-4 border-dashed border-zinc-800 flex items-center justify-center relative">
            <AnimatePresence>
              {instance ? (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-32 h-32 bg-blue-600/20 rounded-3xl border-2 border-blue-500 flex flex-col items-center justify-center gap-2 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                >
                  <Zap className="w-10 h-10 text-blue-500 fill-blue-500" />
                  <span className="text-xs font-mono font-bold text-blue-400">ID: {instance}</span>
                </motion.div>
              ) : isInitializing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                />
              ) : (
                <span className="text-xs text-zinc-700 uppercase tracking-widest font-bold">Empty</span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Thread Controls */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Active Threads</h4>
            <div className="flex gap-2">
              <Button onClick={addThread} size="sm" variant="outline" className="border-zinc-800 h-8">
                Add Thread
              </Button>
              <Button onClick={reset} size="sm" variant="ghost" className="text-zinc-500 h-8">
                Reset
              </Button>
            </div>
          </div>

          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
            {threads.map((thread) => (
              <div key={thread.id} className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    thread.status === 'success' ? 'bg-emerald-500' :
                    thread.status === 'waiting' ? 'bg-amber-500 animate-pulse' :
                    'bg-zinc-700'
                  }`} />
                  <span className="text-sm text-zinc-300 font-mono">Thread-{thread.id}</span>
                </div>
                <Button 
                  size="sm" 
                  disabled={thread.status !== 'idle'}
                  onClick={() => requestInstance(thread.id)}
                  className="h-7 text-[10px] uppercase font-bold"
                >
                  {thread.status === 'success' ? "Has Instance" : "Get Instance"}
                </Button>
              </div>
            ))}
            {threads.length === 0 && (
              <div className="text-center py-8 text-zinc-600 text-xs italic">No threads active. Add a thread to begin.</div>
            )}
          </div>

          <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Execution Logs</h4>
            <div className="space-y-2">
              {logs.map((log, i) => (
                <div key={i} className="text-[10px] font-mono text-zinc-500 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-zinc-800" />
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
        <p className="text-xs text-zinc-400 leading-relaxed">
          <strong className="text-blue-400">Thread Safety:</strong> In a multithreaded environment, simple lazy initialization can create multiple instances. 
          This simulator uses <span className="text-blue-300">Double-Checked Locking</span> with the <code className="text-blue-300">volatile</code> keyword to ensure that only one instance is ever created, even when multiple threads request it simultaneously.
        </p>
      </div>
    </div>
  );
};
