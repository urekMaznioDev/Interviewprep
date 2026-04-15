import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Hash, ArrowRight, Copy, CheckCircle2, Globe, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Mapping {
  short: string;
  original: string;
  hash: string;
}

export const UrlShortenerSim: React.FC = () => {
  const [url, setUrl] = useState('');
  const [mappings, setMappings] = useState<Mapping[]>([]);
  const [isShortening, setIsShortening] = useState(false);

  const shortenUrl = () => {
    if (!url) return;
    
    setIsShortening(true);
    
    // Simulate hashing
    const hash = Math.random().toString(36).substring(2, 8);
    const short = `bit.ly/${hash}`;
    
    setTimeout(() => {
      setMappings(prev => [{ short, original: url, hash }, ...prev].slice(0, 5));
      setUrl('');
      setIsShortening(false);
    }, 1000);
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Link2 className="w-5 h-5 text-blue-500" />
            URL Shortener Simulator
          </h3>
          <p className="text-sm text-zinc-500">Visualize Base62 encoding and hash mapping</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Input Area */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://very-long-url.com/path/to/resource"
              className="pl-10 bg-zinc-950 border-zinc-800 focus:border-blue-500"
            />
          </div>
          <Button 
            onClick={shortenUrl} 
            disabled={isShortening || !url}
            className="bg-blue-600 hover:bg-blue-700 min-w-[120px]"
          >
            {isShortening ? "Hashing..." : "Shorten"}
          </Button>
        </div>

        {/* Visualization Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-64">
          {/* Original URL */}
          <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800">
              <Globe className="w-5 h-5 text-zinc-400" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Input</p>
              <p className="text-xs text-zinc-300 truncate max-w-[150px]">{url || "Waiting..."}</p>
            </div>
          </div>

          {/* Hashing Logic */}
          <div className="flex flex-col items-center justify-center relative">
            <div className="z-10 bg-zinc-900 p-4 rounded-2xl border-2 border-blue-500/50 flex flex-col items-center gap-2">
              <Hash className={`w-8 h-8 text-blue-500 ${isShortening ? 'animate-spin' : ''}`} />
              <span className="text-[10px] font-bold text-blue-500 uppercase">Base62 Encoder</span>
            </div>
            {/* Connection Lines */}
            <div className="absolute inset-0 flex items-center justify-between px-4 -z-0">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-zinc-800 to-blue-500/30" />
              <div className="w-24" />
              <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-500/30 to-zinc-800" />
            </div>
          </div>

          {/* Database Mapping */}
          <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800">
              <Database className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Storage</p>
              <p className="text-xs text-emerald-500 font-mono">{mappings[0]?.short || "---"}</p>
            </div>
          </div>
        </div>

        {/* History / Mappings Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Recent Mappings</h4>
          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {mappings.map((m, i) => (
                <motion.div
                  key={m.hash}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold">Short</span>
                      <span className="text-sm text-blue-400 font-mono">{m.short}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-700" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold">Original</span>
                      <span className="text-sm text-zinc-400 truncate">{m.original}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Copy className="w-4 h-4 text-zinc-500" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
            {mappings.length === 0 && (
              <div className="p-8 text-center border-2 border-dashed border-zinc-800 rounded-lg text-zinc-600 text-sm">
                No URLs shortened yet.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
        <p className="text-xs text-zinc-400 leading-relaxed">
          <strong className="text-blue-400">System Design:</strong> A URL shortener uses a hashing algorithm or a counter to generate a unique ID, which is then encoded in <span className="text-blue-300">Base62</span> (a-z, A-Z, 0-9) to create a short, readable string. 
          The mapping is stored in a distributed database (like Redis or Cassandra) for fast lookups.
        </p>
      </div>
    </div>
  );
};
