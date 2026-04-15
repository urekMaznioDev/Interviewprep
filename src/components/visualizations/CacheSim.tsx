import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Database, ArrowRight, Trash2, Search } from 'lucide-react';

export const CacheSim = () => {
  const [capacity] = useState(5);
  const [cache, setCache] = useState<{ key: string; value: string }[]>([]);
  const [inputKey, setInputKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const addToCache = () => {
    if (!inputKey) return;

    setCache((prev) => {
      const existingIndex = prev.findIndex((item) => item.key === inputKey);
      let newCache = [...prev];

      if (existingIndex !== -1) {
        // Move to front (Most Recently Used)
        const [item] = newCache.splice(existingIndex, 1);
        newCache = [{ ...item, value: inputValue || item.value }, ...newCache];
        setLogs((l) => [`Update: Key "${inputKey}" moved to head`, ...l].slice(0, 5));
      } else {
        if (newCache.length >= capacity) {
          const removed = newCache.pop();
          setLogs((l) => [`Evict: Key "${removed?.key}" (LRU)`, ...l].slice(0, 5));
        }
        newCache = [{ key: inputKey, value: inputValue || `Val-${inputKey}` }, ...newCache];
        setLogs((l) => [`Insert: Key "${inputKey}" added to head`, ...l].slice(0, 5));
      }
      return newCache;
    });

    setInputKey('');
    setInputValue('');
  };

  const getFromCache = (key: string) => {
    const existingIndex = cache.findIndex((item) => item.key === key);
    if (existingIndex !== -1) {
      setCache((prev) => {
        const newCache = [...prev];
        const [item] = newCache.splice(existingIndex, 1);
        return [item, ...newCache];
      });
      setLogs((l) => [`Hit: Key "${key}" moved to head`, ...l].slice(0, 5));
    } else {
      setLogs((l) => [`Miss: Key "${key}" not in cache`, ...l].slice(0, 5));
    }
  };

  return (
    <div className="p-6 bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-100 font-sans">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-1">LRU Cache Visualization</h3>
        <p className="text-zinc-400 text-sm">Capacity: {capacity} items | Strategy: Least Recently Used</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex gap-2">
            <Input
              placeholder="Key"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
            />
            <Input
              placeholder="Value (optional)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white"
            />
            <Button onClick={addToCache} className="bg-amber-600 hover:bg-amber-700">
              Put
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-xs font-mono text-zinc-500 uppercase tracking-widest px-2">
              <span>MRU (Most Recent)</span>
              <span>LRU (Least Recent)</span>
            </div>
            <div className="flex items-center gap-2 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 min-h-[120px] overflow-x-auto">
              <AnimatePresence mode="popLayout">
                {cache.map((item, index) => (
                  <motion.div
                    key={item.key}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex-shrink-0 w-32 h-24 bg-zinc-800 border border-zinc-700 rounded-md p-3 flex flex-col justify-between relative group"
                  >
                    <div className="text-xs text-zinc-500 font-mono">#{index}</div>
                    <div className="font-bold text-amber-400 truncate">{item.key}</div>
                    <div className="text-xs text-zinc-400 truncate">{item.value}</div>
                    <button 
                      onClick={() => getFromCache(item.key)}
                      className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-md"
                    >
                      <Search className="w-5 h-5 text-amber-500" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {cache.length === 0 && (
                <div className="w-full flex flex-col items-center justify-center text-zinc-600 gap-2">
                  <Database className="w-8 h-8 opacity-20" />
                  <span className="text-sm italic">Cache is empty</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-widest">Operation Log</h4>
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 h-64 font-mono text-xs space-y-2 overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className={`pb-2 border-b border-zinc-800 last:border-0 ${
                log.startsWith('Hit') ? 'text-emerald-400' : 
                log.startsWith('Miss') ? 'text-rose-400' : 
                log.startsWith('Evict') ? 'text-amber-400' : 'text-zinc-300'
              }`}>
                <span className="opacity-50 mr-2">{'>'}</span>
                {log}
              </div>
            ))}
            {logs.length === 0 && <div className="text-zinc-700">Waiting for operations...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
