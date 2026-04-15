import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, CheckCircle2, XCircle, Settings2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface Node {
  id: number;
  status: 'active' | 'failed';
  value: string;
  version: number;
}

export const ConsistencySim: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 1, status: 'active', value: 'A', version: 1 },
    { id: 2, status: 'active', value: 'A', version: 1 },
    { id: 3, status: 'active', value: 'A', version: 1 },
    { id: 4, status: 'active', value: 'A', version: 1 },
    { id: 5, status: 'active', value: 'A', version: 1 },
  ]);

  const [n, setN] = useState(5); // Total nodes
  const [r, setR] = useState(3); // Read quorum
  const [w, setW] = useState(3); // Write quorum
  const [logs, setLogs] = useState<{ msg: string; type: 'success' | 'error' | 'info' }[]>([]);

  const addLog = (msg: string, type: 'success' | 'error' | 'info' = 'info') => {
    setLogs(prev => [{ msg, type }, ...prev].slice(0, 5));
  };

  const toggleNode = (id: number) => {
    setNodes(prev => prev.map(node => 
      node.id === id ? { ...node, status: node.status === 'active' ? 'failed' : 'active' } : node
    ));
  };

  const handleWrite = () => {
    const activeNodes = nodes.filter(node => node.status === 'active');
    if (activeNodes.length >= w) {
      const newValue = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      const updatedNodes = [...nodes];
      let writesDone = 0;
      
      for (let i = 0; i < updatedNodes.length && writesDone < w; i++) {
        if (updatedNodes[i].status === 'active') {
          updatedNodes[i] = { ...updatedNodes[i], value: newValue, version: updatedNodes[i].version + 1 };
          writesDone++;
        }
      }
      
      setNodes(updatedNodes);
      addLog(`Write Successful: Value "${newValue}" written to ${writesDone} nodes.`, 'success');
    } else {
      addLog(`Write Failed: Only ${activeNodes.length} nodes active, need ${w} for quorum.`, 'error');
    }
  };

  const handleRead = () => {
    const activeNodes = nodes.filter(node => node.status === 'active');
    if (activeNodes.length >= r) {
      // Pick R active nodes
      const sampledNodes = activeNodes.slice(0, r);
      const latestNode = sampledNodes.reduce((prev, curr) => (prev.version > curr.version ? prev : curr));
      
      addLog(`Read Successful: Found version ${latestNode.version} with value "${latestNode.value}".`, 'success');
      
      // Read Repair simulation
      const needsRepair = sampledNodes.some(node => node.version < latestNode.version);
      if (needsRepair) {
        addLog(`Read Repair: Updating stale nodes to version ${latestNode.version}.`, 'info');
        setNodes(prev => prev.map(node => {
          const isSampled = sampledNodes.some(s => s.id === node.id);
          if (isSampled && node.version < latestNode.version) {
            return { ...node, value: latestNode.value, version: latestNode.version };
          }
          return node;
        }));
      }
    } else {
      addLog(`Read Failed: Only ${activeNodes.length} nodes active, need ${r} for quorum.`, 'error');
    }
  };

  const isStrong = r + w > n;

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-500" />
            Quorum Consistency Simulator
          </h3>
          <p className="text-sm text-zinc-500">Visualize R + W &gt; N for Strong Consistency</p>
        </div>
        <Badge variant={isStrong ? "default" : "destructive"} className={isStrong ? "bg-emerald-600" : ""}>
          {isStrong ? "Strong Consistency" : "Eventual Consistency"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="space-y-6 p-4 bg-zinc-950 rounded-lg border border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-400 mb-4">
            <Settings2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Parameters</span>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Total Nodes (N)</span>
                <span className="text-white font-mono">{n}</span>
              </div>
              <Slider value={[n]} disabled max={5} min={3} step={1} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Read Quorum (R)</span>
                <span className="text-white font-mono">{r}</span>
              </div>
              <Slider 
                value={[r]} 
                onValueChange={(val) => {
                  if (Array.isArray(val)) setR(val[0]);
                  else if (typeof val === 'number') setR(val);
                }} 
                max={n} 
                min={1} 
                step={1} 
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Write Quorum (W)</span>
                <span className="text-white font-mono">{w}</span>
              </div>
              <Slider 
                value={[w]} 
                onValueChange={(val) => {
                  if (Array.isArray(val)) setW(val[0]);
                  else if (typeof val === 'number') setW(val);
                }} 
                max={n} 
                min={1} 
                step={1} 
              />
            </div>
          </div>

          <div className="pt-4 flex gap-2">
            <Button onClick={handleWrite} className="flex-1 bg-blue-600 hover:bg-blue-700">Write</Button>
            <Button onClick={handleRead} variant="outline" className="flex-1 border-zinc-700">Read</Button>
          </div>
        </div>

        {/* Visualization */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex justify-around items-end h-40 gap-4">
            {nodes.map((node) => (
              <div key={node.id} className="flex flex-col items-center gap-3 group">
                <motion.div
                  animate={{ 
                    scale: node.status === 'active' ? 1 : 0.9,
                    opacity: node.status === 'active' ? 1 : 0.4 
                  }}
                  onClick={() => toggleNode(node.id)}
                  className={`w-16 h-20 rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    node.status === 'active' 
                      ? 'bg-zinc-800 border-zinc-700 hover:border-emerald-500' 
                      : 'bg-red-950/20 border-red-900/50'
                  }`}
                >
                  <Database className={`w-6 h-6 mb-1 ${node.status === 'active' ? 'text-zinc-400' : 'text-red-900'}`} />
                  <span className="text-xs font-bold text-white">{node.value}</span>
                  <span className="text-[8px] text-zinc-500">v{node.version}</span>
                </motion.div>
                <span className="text-[10px] text-zinc-600 font-mono">Node {node.id}</span>
              </div>
            ))}
          </div>

          <div className="flex-1 p-4 bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
            <div className="flex items-center gap-2 text-zinc-500 mb-3">
              <Info className="w-3 h-3" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Operation Logs</span>
            </div>
            <div className="space-y-2">
              {logs.map((log, i) => (
                <div key={i} className={`text-xs flex items-center gap-2 ${
                  log.type === 'success' ? 'text-emerald-400' : 
                  log.type === 'error' ? 'text-red-400' : 'text-blue-400'
                }`}>
                  {log.type === 'success' ? <CheckCircle2 className="w-3 h-3" /> : 
                   log.type === 'error' ? <XCircle className="w-3 h-3" /> : 
                   <div className="w-1 h-1 rounded-full bg-blue-400" />}
                  {log.msg}
                </div>
              ))}
              {logs.length === 0 && <div className="text-zinc-600 text-xs italic">No operations performed yet...</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
        <p className="text-xs text-zinc-400 leading-relaxed">
          <strong className="text-emerald-400">Quorum Rule:</strong> To guarantee strong consistency, the sum of Read Quorum (R) and Write Quorum (W) must be greater than the total number of nodes (N). 
          This ensures that the read set and write set always overlap by at least one node, which will have the latest version.
        </p>
      </div>
    </div>
  );
};
