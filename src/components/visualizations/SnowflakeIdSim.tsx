import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Cpu, Clock, Zap, Database, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SnowflakeIdSim: React.FC = () => {
  const [ids, setIds] = useState<{ id: string; timestamp: number; datacenter: number; worker: number; sequence: number }[]>([]);
  const [datacenterId] = useState(1);
  const [workerId] = useState(1);
  const [sequence, setSequence] = useState(0);

  const generateId = () => {
    const timestamp = Date.now();
    const newSequence = (sequence + 1) % 4096;
    setSequence(newSequence);

    // Conceptual Snowflake ID (64-bit)
    // 1 bit unused | 41 bits timestamp | 5 bits datacenter | 5 bits worker | 12 bits sequence
    const snowflakeId = `${timestamp}${datacenterId}${workerId}${newSequence}`;
    
    setIds(prev => [{ id: snowflakeId, timestamp, datacenter: datacenterId, worker: workerId, sequence: newSequence }, ...prev].slice(0, 5));
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" />
            Snowflake ID Simulator
          </h3>
          <p className="text-sm text-zinc-500">Visualize distributed unique ID generation</p>
        </div>
        <Button onClick={generateId} className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Zap className="w-4 h-4" />
          Generate ID
        </Button>
      </div>

      {/* Bit Layout Visualization */}
      <div className="p-6 bg-zinc-950 rounded-xl border border-zinc-800 space-y-6">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">Snowflake ID Structure (64-bit)</h4>
        <div className="flex h-12 rounded-lg overflow-hidden border border-zinc-800 text-[10px] font-bold">
          <div className="w-[2%] bg-zinc-900 flex items-center justify-center text-zinc-700 border-r border-zinc-800" title="Unused (1 bit)">0</div>
          <div className="w-[64%] bg-blue-600/20 flex items-center justify-center text-blue-400 border-r border-zinc-800" title="Timestamp (41 bits)">Timestamp (41b)</div>
          <div className="w-[8%] bg-emerald-600/20 flex items-center justify-center text-emerald-400 border-r border-zinc-800" title="Datacenter ID (5 bits)">DC (5b)</div>
          <div className="w-[8%] bg-amber-600/20 flex items-center justify-center text-amber-400 border-r border-zinc-800" title="Worker ID (5 bits)">WK (5b)</div>
          <div className="w-[18%] bg-purple-600/20 flex items-center justify-center text-purple-400" title="Sequence (12 bits)">Seq (12b)</div>
        </div>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="space-y-1">
            <Clock className="w-4 h-4 text-blue-500 mx-auto" />
            <div className="text-[8px] text-zinc-500 uppercase">Time-Ordered</div>
          </div>
          <div className="space-y-1">
            <Database className="w-4 h-4 text-emerald-500 mx-auto" />
            <div className="text-[8px] text-zinc-500 uppercase">Distributed</div>
          </div>
          <div className="space-y-1">
            <Cpu className="w-4 h-4 text-amber-500 mx-auto" />
            <div className="text-[8px] text-zinc-500 uppercase">High Throughput</div>
          </div>
          <div className="space-y-1">
            <Hash className="w-4 h-4 text-purple-500 mx-auto" />
            <div className="text-[8px] text-zinc-500 uppercase">Unique</div>
          </div>
        </div>
      </div>

      {/* Generated IDs List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Generated IDs</h4>
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {ids.map((item) => (
              <motion.div
                key={`${item.timestamp}-${item.sequence}`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-between group"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-mono font-bold text-white tracking-tighter">{item.id}</span>
                  <div className="flex gap-3 text-[10px] font-mono">
                    <span className="text-blue-500">TS: {item.timestamp}</span>
                    <span className="text-emerald-500">DC: {item.datacenter}</span>
                    <span className="text-amber-500">WK: {item.worker}</span>
                    <span className="text-purple-500">SEQ: {item.sequence}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Copy className="w-4 h-4 text-zinc-500" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
          {ids.length === 0 && (
            <div className="p-12 text-center border-2 border-dashed border-zinc-800 rounded-xl text-zinc-600 text-sm">
              Click "Generate ID" to see the Snowflake algorithm in action.
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
        <p className="text-xs text-zinc-400 leading-relaxed">
          <strong className="text-blue-400">System Design:</strong> Snowflake IDs are 64-bit unique identifiers used in distributed systems (originally by Twitter). 
          They are <span className="text-blue-300">time-sortable</span> and can be generated independently across multiple nodes without coordination, supporting up to <span className="text-blue-300">4,096 IDs per millisecond</span> per worker.
        </p>
      </div>
    </div>
  );
};
