import React, { useState } from 'react';
import { Folder, File, ChevronRight, ChevronDown, Plus, Trash2, HardDrive } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Entry {
  id: string;
  name: string;
  type: 'file' | 'directory';
  children?: Entry[];
}

export const FileSystemSim: React.FC = () => {
  const [root, setRoot] = useState<Entry>({
    id: 'root',
    name: '/',
    type: 'directory',
    children: [
      { id: '1', name: 'home', type: 'directory', children: [
        { id: '2', name: 'user', type: 'directory', children: [
          { id: '3', name: 'resume.pdf', type: 'file' },
          { id: '4', name: 'projects', type: 'directory', children: [] }
        ]}
      ]},
      { id: '5', name: 'etc', type: 'directory', children: [] },
      { id: '6', name: 'var', type: 'directory', children: [] }
    ]
  });

  const [expanded, setExpanded] = useState<Set<string>>(new Set(['root', '1', '2']));

  const toggleExpand = (id: string) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpanded(next);
  };

  const renderEntry = (entry: Entry, depth: number = 0) => {
    const isExpanded = expanded.has(entry.id);
    const isDirectory = entry.type === 'directory';

    return (
      <div key={entry.id} className="select-none">
        <div 
          className={`flex items-center gap-2 py-1.5 px-2 rounded-md transition-colors cursor-pointer group ${
            isDirectory ? 'hover:bg-zinc-800/50' : 'hover:bg-zinc-800/30'
          }`}
          style={{ paddingLeft: `${depth * 1.5 + 0.5}rem` }}
          onClick={() => isDirectory && toggleExpand(entry.id)}
        >
          {isDirectory ? (
            isExpanded ? <ChevronDown className="w-4 h-4 text-zinc-500" /> : <ChevronRight className="w-4 h-4 text-zinc-500" />
          ) : (
            <div className="w-4" />
          )}
          
          {isDirectory ? (
            <Folder className={`w-4 h-4 ${isExpanded ? 'text-blue-400' : 'text-zinc-400'}`} />
          ) : (
            <File className="w-4 h-4 text-zinc-500" />
          )}
          
          <span className={`text-sm ${isDirectory ? 'text-zinc-200 font-medium' : 'text-zinc-400'}`}>
            {entry.name}
          </span>
          
          {isDirectory && (
            <div className="ml-auto opacity-0 group-hover:opacity-100 flex gap-1">
              <button className="p-1 hover:bg-zinc-700 rounded text-zinc-500 hover:text-blue-400 transition-colors">
                <Plus className="w-3 h-3" />
              </button>
              <button className="p-1 hover:bg-zinc-700 rounded text-zinc-500 hover:text-red-400 transition-colors">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
        
        <AnimatePresence>
          {isDirectory && isExpanded && entry.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {entry.children.map(child => renderEntry(child, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 shadow-2xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <HardDrive className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">File System Simulation</h3>
          <p className="text-xs text-zinc-500">Composite Pattern & Hierarchical Navigation</p>
        </div>
      </div>

      <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800 min-h-[300px]">
        {renderEntry(root)}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-zinc-800/30 rounded-lg border border-zinc-800">
          <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Pattern</p>
          <p className="text-xs text-zinc-300">Composite</p>
        </div>
        <div className="p-3 bg-zinc-800/30 rounded-lg border border-zinc-800">
          <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Complexity</p>
          <p className="text-xs text-zinc-300">O(Depth) Path Resolution</p>
        </div>
        <div className="p-3 bg-zinc-800/30 rounded-lg border border-zinc-800">
          <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Structure</p>
          <p className="text-xs text-zinc-300">Recursive Tree</p>
        </div>
      </div>
    </div>
  );
};
