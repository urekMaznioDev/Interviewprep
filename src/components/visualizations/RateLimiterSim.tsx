import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw, Zap, AlertCircle, Clock, Layers, ListFilter, Activity } from 'lucide-react';

type Algorithm = 'token-bucket' | 'leaky-bucket' | 'fixed-window' | 'sliding-window-log' | 'sliding-window-counter';

export const RateLimiterSim = () => {
  const [algorithm, setAlgorithm] = useState<Algorithm>('token-bucket');
  const [tokens, setTokens] = useState(5);
  const [capacity] = useState(10);
  const [requests, setRequests] = useState<{ id: number; status: 'success' | 'fail'; timestamp: number }[]>([]);
  const [refillRate] = useState(1); // tokens per second
  const [queue, setQueue] = useState<number[]>([]);
  const [windowCount, setWindowCount] = useState(0);
  const [windowStart, setWindowStart] = useState(Date.now());
  const [log, setLog] = useState<number[]>([]);
  
  const requestCounter = useRef(0);
  const windowSize = 5000; // 5 seconds window
  const limit = 5;

  // Token Bucket Refill
  useEffect(() => {
    if (algorithm !== 'token-bucket') return;
    const interval = setInterval(() => {
      setTokens((prev) => Math.min(capacity, prev + refillRate));
    }, 1000);
    return () => clearInterval(interval);
  }, [algorithm, capacity, refillRate]);

  // Leaky Bucket Leak
  useEffect(() => {
    if (algorithm !== 'leaky-bucket') return;
    const interval = setInterval(() => {
      setQueue((prev) => prev.slice(1));
    }, 1000);
    return () => clearInterval(interval);
  }, [algorithm]);

  // Fixed Window Reset
  useEffect(() => {
    if (algorithm !== 'fixed-window') return;
    const interval = setInterval(() => {
      setWindowCount(0);
      setWindowStart(Date.now());
    }, windowSize);
    return () => clearInterval(interval);
  }, [algorithm]);

  const handleRequest = () => {
    const id = ++requestCounter.current;
    const now = Date.now();
    let success = false;

    switch (algorithm) {
      case 'token-bucket':
        if (tokens >= 1) {
          setTokens((prev) => prev - 1);
          success = true;
        }
        break;
      case 'leaky-bucket':
        if (queue.length < capacity) {
          setQueue((prev) => [...prev, id]);
          success = true;
        }
        break;
      case 'fixed-window':
        if (windowCount < limit) {
          setWindowCount((prev) => prev + 1);
          success = true;
        }
        break;
      case 'sliding-window-log':
        const validLog = log.filter(ts => now - ts < windowSize);
        if (validLog.length < limit) {
          setLog([...validLog, now]);
          success = true;
        } else {
          setLog(validLog);
        }
        break;
      case 'sliding-window-counter':
        // Simplified simulation of sliding window counter
        const currentLog = log.filter(ts => now - ts < windowSize);
        if (currentLog.length < limit) {
          setLog([...currentLog, now]);
          success = true;
        } else {
          setLog(currentLog);
        }
        break;
    }

    setRequests((prev) => {
      const newReq: { id: number; status: 'success' | 'fail'; timestamp: number } = { 
        id, 
        status: success ? 'success' : 'fail', 
        timestamp: now 
      };
      return [newReq, ...prev].slice(0, 10);
    });
  };

  const reset = () => {
    setTokens(5);
    setRequests([]);
    setQueue([]);
    setWindowCount(0);
    setLog([]);
    setWindowStart(Date.now());
  };

  const algorithms: { id: Algorithm; name: string; icon: any }[] = [
    { id: 'token-bucket', name: 'Token Bucket', icon: Zap },
    { id: 'leaky-bucket', name: 'Leaky Bucket', icon: ListFilter },
    { id: 'fixed-window', name: 'Fixed Window', icon: Clock },
    { id: 'sliding-window-log', name: 'Sliding Window Log', icon: Layers },
    { id: 'sliding-window-counter', name: 'Sliding Window Counter', icon: Activity },
  ];

  return (
    <div className="p-6 bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-100 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Rate Limiter Simulation</h3>
          <div className="flex flex-wrap gap-2">
            {algorithms.map((alg) => (
              <button
                key={alg.id}
                onClick={() => { setAlgorithm(alg.id); reset(); }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${
                  algorithm === alg.id 
                    ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <alg.icon className="w-3.5 h-3.5" />
                {alg.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={reset} className="border-zinc-700 hover:bg-zinc-800">
            <RotateCcw className="w-4 h-4 mr-2" /> Reset
          </Button>
          <Button onClick={handleRequest} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Zap className="w-4 h-4 mr-2" /> Send Request
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="relative h-64 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center justify-center p-6 overflow-hidden">
            <div className="absolute top-4 left-4 flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-widest">
              <Activity className="w-3 h-3" />
              <span>Internal State</span>
            </div>

            {algorithm === 'token-bucket' && (
              <div className="flex flex-wrap-reverse gap-2 justify-center max-w-[240px]">
                <AnimatePresence>
                  {Array.from({ length: Math.floor(tokens) }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, y: -50 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="w-8 h-8 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center"
                    >
                      <Zap className="w-4 h-4 text-white" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {algorithm === 'leaky-bucket' && (
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="w-32 h-48 border-2 border-zinc-700 rounded-b-3xl relative overflow-hidden flex flex-col-reverse p-2 gap-2">
                  <AnimatePresence>
                    {queue.map((id, i) => (
                      <motion.div
                        key={id}
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="w-full h-8 bg-blue-600 rounded-lg flex items-center justify-center text-[10px] font-bold"
                      >
                        REQ #{id}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="w-2 h-8 bg-blue-500/20 rounded-full relative overflow-hidden">
                  <motion.div 
                    animate={{ y: [0, 32] }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-full h-4 bg-blue-500 rounded-full"
                  />
                </div>
              </div>
            )}

            {algorithm === 'fixed-window' && (
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-zinc-800"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="60"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="377"
                      initial={{ strokeDashoffset: 377 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: windowSize / 1000, repeat: Infinity, ease: "linear" }}
                      className="text-blue-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">{windowCount}</span>
                    <span className="text-[10px] text-zinc-500 uppercase">Requests</span>
                  </div>
                </div>
                <div className="text-xs text-zinc-400">Limit: {limit} per {windowSize/1000}s</div>
              </div>
            )}

            {(algorithm === 'sliding-window-log' || algorithm === 'sliding-window-counter') && (
              <div className="w-full h-full flex flex-col gap-2 overflow-y-auto custom-scrollbar p-2">
                <AnimatePresence>
                  {log.map((ts, i) => (
                    <motion.div
                      key={ts + i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      className="flex items-center justify-between p-2 bg-zinc-800/50 rounded border border-zinc-700"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-blue-400" />
                        <span className="text-[10px] font-mono">TS: {ts}</span>
                      </div>
                      <Badge variant="outline" className="text-[8px] border-zinc-600">VALID</Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {log.length === 0 && <div className="m-auto text-zinc-600 text-xs italic">Log is empty</div>}
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center px-2">
            <span className="text-sm text-zinc-400 uppercase tracking-widest">
              {algorithm === 'token-bucket' ? 'Available Tokens' : 
               algorithm === 'leaky-bucket' ? 'Queue Size' : 
               algorithm === 'fixed-window' ? 'Window Count' : 'Log Size'}
            </span>
            <span className="text-2xl font-mono font-bold text-blue-400">
              {algorithm === 'token-bucket' ? Math.floor(tokens) : 
               algorithm === 'leaky-bucket' ? queue.length : 
               algorithm === 'fixed-window' ? windowCount : log.length}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-widest">Recent Requests</h4>
          <div className="space-y-2 h-64 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence initial={false}>
              {requests.map((req) => (
                <motion.div
                  key={req.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className={`p-3 rounded-md border flex justify-between items-center ${
                    req.status === 'success' 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                      : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {req.status === 'success' ? <Zap className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span className="font-mono text-sm">REQ #{req.id}</span>
                  </div>
                  <Badge variant="outline" className={req.status === 'success' ? 'border-emerald-500/30 text-emerald-500' : 'border-rose-500/30 text-rose-500'}>
                    {req.status === 'success' ? 'ALLOWED' : 'DENIED'}
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
            {requests.length === 0 && (
              <div className="h-full flex items-center justify-center text-zinc-600 italic text-sm">
                No requests sent yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
