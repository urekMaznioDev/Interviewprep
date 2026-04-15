import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ZapOff, Activity, RefreshCcw, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type State = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export const CircuitBreakerSim: React.FC = () => {
  const [state, setState] = useState<State>('CLOSED');
  const [failureCount, setFailureCount] = useState(0);
  const [threshold] = useState(3);
  const [logs, setLogs] = useState<{ msg: string; type: 'success' | 'error' | 'warning' }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addLog = (msg: string, type: 'success' | 'error' | 'warning') => {
    setLogs(prev => [{ msg, type }, ...prev].slice(0, 5));
  };

  const handleRequest = async (shouldFail: boolean) => {
    if (state === 'OPEN') {
      addLog("Circuit is OPEN. Request rejected immediately (Fail-Fast).", 'error');
      return;
    }

    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 600));
    setIsProcessing(false);

    if (shouldFail) {
      addLog("Request Failed!", 'error');
      if (state === 'CLOSED') {
        const newFailures = failureCount + 1;
        setFailureCount(newFailures);
        if (newFailures >= threshold) {
          setState('OPEN');
          addLog("Threshold reached. Circuit opened!", 'error');
        }
      } else if (state === 'HALF_OPEN') {
        setState('OPEN');
        addLog("Half-Open request failed. Circuit opened again!", 'error');
      }
    } else {
      addLog("Request Successful!", 'success');
      if (state === 'HALF_OPEN') {
        setState('CLOSED');
        setFailureCount(0);
        addLog("Half-Open request succeeded. Circuit closed.", 'success');
      } else if (state === 'CLOSED') {
        setFailureCount(0);
      }
    }
  };

  useEffect(() => {
    if (state === 'OPEN') {
      const timer = setTimeout(() => {
        setState('HALF_OPEN');
        addLog("Wait time elapsed. Circuit is now HALF-OPEN.", 'warning');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const getStateColor = (s: State) => {
    switch (s) {
      case 'CLOSED': return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5';
      case 'OPEN': return 'text-red-500 border-red-500/20 bg-red-500/5';
      case 'HALF_OPEN': return 'text-amber-500 border-amber-500/20 bg-amber-500/5';
    }
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Circuit Breaker Simulator
          </h3>
          <p className="text-sm text-zinc-500">Visualize Fault Tolerance in Microservices</p>
        </div>
        <Badge variant="outline" className={getStateColor(state)}>
          State: {state}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Visualization */}
        <div className="flex flex-col items-center justify-center p-8 bg-zinc-950 rounded-2xl border border-zinc-800 relative overflow-hidden">
          <div className="absolute top-4 left-4 text-[10px] font-bold text-zinc-700 uppercase tracking-widest">Circuit Status</div>
          
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: state === 'OPEN' ? 45 : 0,
                color: state === 'CLOSED' ? '#10b981' : state === 'OPEN' ? '#ef4444' : '#f59e0b'
              }}
              className="w-32 h-32 flex items-center justify-center"
            >
              {state === 'CLOSED' ? <Zap className="w-20 h-20 fill-current" /> : <ZapOff className="w-20 h-20" />}
            </motion.div>
            
            {/* Connection Points */}
            <div className="absolute top-1/2 -left-12 w-12 h-1 bg-zinc-800" />
            <div className="absolute top-1/2 -right-12 w-12 h-1 bg-zinc-800" />
          </div>

          <div className="mt-8 flex gap-4">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Failures</span>
              <div className="flex gap-1">
                {Array.from({ length: threshold }).map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i < failureCount ? 'bg-red-500' : 'bg-zinc-800'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Controls & Logs */}
        <div className="space-y-6">
          <div className="p-6 bg-zinc-950 rounded-xl border border-zinc-800 space-y-4">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Test Service Call</h4>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => handleRequest(false)} 
                disabled={isProcessing}
                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Success
              </Button>
              <Button 
                onClick={() => handleRequest(true)} 
                disabled={isProcessing}
                className="bg-red-600 hover:bg-red-700 text-white gap-2"
              >
                <XCircle className="w-4 h-4" />
                Failure
              </Button>
            </div>
          </div>

          <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 h-48 overflow-hidden flex flex-col">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Event Logs</h4>
            <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
              {logs.map((log, i) => (
                <div key={i} className={`text-[10px] flex items-center gap-2 ${
                  log.type === 'success' ? 'text-emerald-400' : 
                  log.type === 'error' ? 'text-red-400' : 'text-amber-400'
                }`}>
                  <div className={`w-1 h-1 rounded-full ${
                    log.type === 'success' ? 'bg-emerald-400' : 
                    log.type === 'error' ? 'bg-red-400' : 'bg-amber-400'
                  }`} />
                  {log.msg}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
        <p className="text-xs text-zinc-400 leading-relaxed">
          <strong className="text-blue-400">Resiliency:</strong> The Circuit Breaker pattern prevents an application from repeatedly trying to execute an operation that's likely to fail. 
          When the <span className="text-red-400">Threshold</span> is reached, the circuit <span className="text-red-400">Opens</span>, and all calls fail fast. After a timeout, it enters <span className="text-amber-400">Half-Open</span> state to test if the service has recovered.
        </p>
      </div>
    </div>
  );
};
