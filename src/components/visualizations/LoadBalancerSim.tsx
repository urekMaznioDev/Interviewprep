import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, User, ArrowRight, Activity, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Request {
  id: number;
  serverId: number;
  status: 'pending' | 'processing' | 'completed';
}

interface ServerNode {
  id: number;
  name: string;
  load: number;
  capacity: number;
  isHealthy: boolean;
}

export const LoadBalancerSim: React.FC = () => {
  const [servers, setServers] = useState<ServerNode[]>([
    { id: 1, name: 'Server A', load: 0, capacity: 5, isHealthy: true },
    { id: 2, name: 'Server B', load: 0, capacity: 5, isHealthy: true },
    { id: 3, name: 'Server C', load: 0, capacity: 5, isHealthy: true },
  ]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [algorithm, setAlgorithm] = useState<'round-robin' | 'least-connections'>('round-robin');
  const [nextServerIndex, setNextServerIndex] = useState(0);
  const [requestIdCounter, setRequestIdCounter] = useState(0);

  const addRequest = () => {
    let targetServerId = -1;

    if (algorithm === 'round-robin') {
      let index = nextServerIndex;
      // Find next healthy server
      for (let i = 0; i < servers.length; i++) {
        const s = servers[(index + i) % servers.length];
        if (s.isHealthy) {
          targetServerId = s.id;
          setNextServerIndex((index + i + 1) % servers.length);
          break;
        }
      }
    } else {
      // Least Connections
      const healthyServers = servers.filter(s => s.isHealthy);
      if (healthyServers.length > 0) {
        const bestServer = healthyServers.reduce((prev, curr) => (prev.load < curr.load ? prev : curr));
        targetServerId = bestServer.id;
      }
    }

    if (targetServerId !== -1) {
      const newRequest: Request = {
        id: requestIdCounter,
        serverId: targetServerId,
        status: 'pending'
      };
      setRequests(prev => [...prev, newRequest]);
      setRequestIdCounter(prev => prev + 1);

      // Update server load
      setServers(prev => prev.map(s => 
        s.id === targetServerId ? { ...s, load: s.load + 1 } : s
      ));

      // Simulate processing
      setTimeout(() => {
        setRequests(prev => prev.map(r => 
          r.id === newRequest.id ? { ...r, status: 'processing' } : r
        ));
      }, 500);

      setTimeout(() => {
        setRequests(prev => prev.filter(r => r.id !== newRequest.id));
        setServers(prev => prev.map(s => 
          s.id === targetServerId ? { ...s, load: Math.max(0, s.load - 1) } : s
        ));
      }, 2500);
    }
  };

  const toggleHealth = (id: number) => {
    setServers(prev => prev.map(s => 
      s.id === id ? { ...s, isHealthy: !s.isHealthy, load: !s.isHealthy ? s.load : 0 } : s
    ));
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Load Balancer Simulator
          </h3>
          <p className="text-sm text-zinc-500">Visualize request distribution algorithms</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={algorithm === 'round-robin' ? 'default' : 'outline'}
            onClick={() => setAlgorithm('round-robin')}
            size="sm"
          >
            Round Robin
          </Button>
          <Button 
            variant={algorithm === 'least-connections' ? 'default' : 'outline'}
            onClick={() => setAlgorithm('least-connections')}
            size="sm"
          >
            Least Connections
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Client Side */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center border-2 border-zinc-700">
            <User className="w-8 h-8 text-zinc-400" />
          </div>
          <Button onClick={addRequest} className="w-full bg-blue-600 hover:bg-blue-700">
            Send Request
          </Button>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Incoming Traffic</div>
        </div>

        {/* Load Balancer */}
        <div className="flex flex-col items-center justify-center relative">
          <div className="w-24 h-24 bg-blue-600/10 rounded-2xl border-2 border-blue-500 flex flex-col items-center justify-center gap-2 z-10">
            <Shield className="w-8 h-8 text-blue-500" />
            <span className="text-[10px] font-bold text-blue-500 uppercase">LB</span>
          </div>
          
          {/* Animated Requests */}
          <div className="absolute inset-0 pointer-events-none">
            <AnimatePresence>
              {requests.map(req => (
                <motion.div
                  key={req.id}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Servers */}
        <div className="space-y-4">
          {servers.map(server => (
            <div 
              key={server.id}
              className={`p-4 rounded-lg border transition-all ${
                server.isHealthy ? 'bg-zinc-800/50 border-zinc-700' : 'bg-red-950/20 border-red-900/50 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Server className={`w-4 h-4 ${server.isHealthy ? 'text-emerald-500' : 'text-red-500'}`} />
                  <span className="text-sm font-bold text-white">{server.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => toggleHealth(server.id)}
                >
                  <Activity className="w-3 h-3" />
                </Button>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>Load: {server.load}/{server.capacity}</span>
                  <span>{Math.round((server.load / server.capacity) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${server.load > 4 ? 'bg-red-500' : 'bg-emerald-500'}`}
                    animate={{ width: `${(server.load / server.capacity) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
        <p className="text-xs text-zinc-400 leading-relaxed">
          <strong className="text-blue-400">How it works:</strong> The Load Balancer receives requests from clients and distributes them to healthy backend servers. 
          <span className="text-zinc-500"> Round Robin</span> cycles through servers equally, while <span className="text-zinc-500">Least Connections</span> prioritizes servers with the lowest current load.
        </p>
      </div>
    </div>
  );
};
