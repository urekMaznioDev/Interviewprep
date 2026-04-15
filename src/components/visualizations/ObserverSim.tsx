import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellRing, User, Send, Radio, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Subscriber {
  id: number;
  name: string;
  notifications: string[];
}

export const ObserverSim: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    { id: 1, name: 'User A', notifications: [] },
    { id: 2, name: 'User B', notifications: [] },
    { id: 3, name: 'User C', notifications: [] },
  ]);
  const [message, setMessage] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const addSubscriber = () => {
    const newId = subscribers.length + 1;
    const name = String.fromCharCode(65 + subscribers.length);
    setSubscribers(prev => [...prev, { id: newId, name: `User ${name}`, notifications: [] }]);
  };

  const removeSubscriber = (id: number) => {
    setSubscribers(prev => prev.filter(s => s.id !== id));
  };

  const broadcast = () => {
    if (!message) return;
    setIsBroadcasting(true);
    
    setTimeout(() => {
      setSubscribers(prev => prev.map(s => ({
        ...s,
        notifications: [message, ...s.notifications].slice(0, 3)
      })));
      setMessage('');
      setIsBroadcasting(false);
    }, 800);
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-blue-500" />
            Observer Pattern Simulator
          </h3>
          <p className="text-sm text-zinc-500">Visualize the Subject-Observer relationship</p>
        </div>
        <Badge variant="outline" className="text-zinc-500 border-zinc-800">
          {subscribers.length} Observers Subscribed
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subject (Publisher) */}
        <div className="p-6 bg-zinc-950 rounded-xl border border-zinc-800 flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-blue-600/10 rounded-full border-2 border-blue-500 flex items-center justify-center relative">
            <Radio className={`w-10 h-10 text-blue-500 ${isBroadcasting ? 'animate-ping' : ''}`} />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
              S
            </div>
          </div>
          
          <div className="w-full space-y-3">
            <p className="text-[10px] text-zinc-500 uppercase font-bold text-center tracking-widest">Subject (Publisher)</p>
            <input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message to broadcast..."
              className="w-full bg-zinc-900 border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <Button 
              onClick={broadcast} 
              disabled={isBroadcasting || !message}
              className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
            >
              <Send className="w-4 h-4" />
              Notify All
            </Button>
          </div>
        </div>

        {/* Observers (Subscribers) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Observers (Subscribers)</h4>
            <Button onClick={addSubscriber} variant="outline" size="sm" className="h-7 border-zinc-800 text-[10px] uppercase font-bold">
              Add Observer
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {subscribers.map((sub) => (
                <motion.div
                  key={sub.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 relative group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800">
                        <User className="w-4 h-4 text-zinc-500" />
                      </div>
                      <span className="text-sm font-bold text-white">{sub.name}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-zinc-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeSubscriber(sub.id)}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {sub.notifications.length > 0 ? (
                      sub.notifications.map((n, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="flex items-start gap-2 text-[10px] text-zinc-400 bg-zinc-900/50 p-2 rounded border border-zinc-800/50"
                        >
                          <BellRing className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="truncate">{n}</span>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-[10px] text-zinc-700 italic py-2 text-center">No notifications yet</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
        <p className="text-xs text-zinc-400 leading-relaxed">
          <strong className="text-blue-400">Observer Pattern:</strong> This pattern defines a one-to-many dependency between objects. When the <span className="text-blue-300">Subject</span> changes state, all its <span className="text-blue-300">Observers</span> are notified and updated automatically. 
          It's the foundation of event-driven systems and reactive programming.
        </p>
      </div>
    </div>
  );
};
