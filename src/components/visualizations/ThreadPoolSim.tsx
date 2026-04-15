import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Cpu, CheckCircle2, Clock } from 'lucide-react';

interface Task {
  id: number;
  status: 'queued' | 'running' | 'completed';
  progress: number;
  workerId?: number;
}

export const ThreadPoolSim = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [workers, setWorkers] = useState<{ id: number; taskId?: number }[]>([
    { id: 1 }, { id: 2 }, { id: 3 }
  ]);
  const taskCounter = useRef(0);

  const addTask = () => {
    const newTask: Task = {
      id: ++taskCounter.current,
      status: 'queued',
      progress: 0
    };
    setTasks(prev => [...prev, newTask]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prevTasks => {
        const nextTasks = [...prevTasks];
        
        // Find idle workers and assign tasks
        setWorkers(prevWorkers => {
          const nextWorkers = [...prevWorkers];
          nextWorkers.forEach(worker => {
            if (!worker.taskId) {
              const nextQueuedTask = nextTasks.find(t => t.status === 'queued');
              if (nextQueuedTask) {
                nextQueuedTask.status = 'running';
                nextQueuedTask.workerId = worker.id;
                worker.taskId = nextQueuedTask.id;
              }
            }
          });
          return nextWorkers;
        });

        // Update progress of running tasks
        nextTasks.forEach(task => {
          if (task.status === 'running') {
            task.progress += 5;
            if (task.progress >= 100) {
              task.status = 'completed';
              task.progress = 100;
              // Free up the worker
              setWorkers(prevWorkers => 
                prevWorkers.map(w => w.id === task.workerId ? { ...w, taskId: undefined } : w)
              );
            }
          }
        });

        return nextTasks;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const reset = () => {
    setTasks([]);
    setWorkers([{ id: 1 }, { id: 2 }, { id: 3 }]);
    taskCounter.current = 0;
  };

  return (
    <div className="p-6 bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-100 font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">Thread Pool Simulation</h3>
          <p className="text-zinc-400 text-sm">Fixed Thread Pool: 3 Workers | Task Queue: Unbounded</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={reset} className="border-zinc-700 hover:bg-zinc-800">
            <RotateCcw className="w-4 h-4 mr-2" /> Reset
          </Button>
          <Button onClick={addTask} size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Play className="w-4 h-4 mr-2" /> Submit Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Workers Section */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <Cpu className="w-3 h-3" /> Worker Threads
          </h4>
          <div className="space-y-3">
            {workers.map(worker => (
              <div key={worker.id} className={`p-4 rounded-lg border transition-colors ${
                worker.taskId ? 'bg-blue-500/10 border-blue-500/30' : 'bg-zinc-900 border-zinc-800'
              }`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-zinc-400">THREAD-{worker.id}</span>
                  <Badge variant={worker.taskId ? "default" : "outline"} className={worker.taskId ? "bg-blue-600" : "text-zinc-500 border-zinc-700"}>
                    {worker.taskId ? 'BUSY' : 'IDLE'}
                  </Badge>
                </div>
                {worker.taskId ? (
                  <div className="text-sm text-blue-400 font-medium">Executing Task #{worker.taskId}</div>
                ) : (
                  <div className="text-sm text-zinc-600 italic">Waiting for work...</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Task Queue Section */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <Clock className="w-3 h-3" /> Task Queue & Lifecycle
          </h4>
          <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-4 min-h-[300px] max-h-[400px] overflow-y-auto custom-scrollbar space-y-3">
            <AnimatePresence initial={false}>
              {tasks.slice().reverse().map(task => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className={`p-3 rounded-md border flex flex-col gap-2 ${
                    task.status === 'completed' ? 'bg-emerald-500/5 border-emerald-500/20' :
                    task.status === 'running' ? 'bg-blue-500/5 border-blue-500/20' :
                    'bg-zinc-800 border-zinc-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-zinc-300">TASK #{task.id}</span>
                      {task.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                    </div>
                    <Badge variant="outline" className={`text-[10px] ${
                      task.status === 'completed' ? 'text-emerald-500 border-emerald-500/30' :
                      task.status === 'running' ? 'text-blue-500 border-blue-500/30' :
                      'text-zinc-500 border-zinc-700'
                    }`}>
                      {task.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  {task.status === 'running' && (
                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-blue-500" 
                        initial={{ width: 0 }}
                        animate={{ width: `${task.progress}%` }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {tasks.length === 0 && (
              <div className="h-full flex items-center justify-center text-zinc-600 italic text-sm py-20">
                Queue is empty. Submit a task to begin.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
