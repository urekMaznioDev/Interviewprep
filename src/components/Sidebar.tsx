import React from 'react';
import { TOPICS, Topic } from '@/src/data/topics';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutGrid, 
  Cpu, 
  Waves, 
  Brain, 
  Puzzle, 
  Zap, 
  Lock,
  ChevronRight,
  Code2,
  CheckCircle2
} from 'lucide-react';

interface SidebarProps {
  selectedTopicId: string;
  onSelectTopic: (id: string) => void;
  completedTopicIds: string[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  "Java Core": <Code2 className="w-4 h-4" />,
  "Multithreading & Concurrency": <Cpu className="w-4 h-4" />,
  "Object-Oriented Design & Patterns": <Puzzle className="w-4 h-4" />,
  "Low-Level Design": <LayoutGrid className="w-4 h-4" />,
  "Spring Boot": <Zap className="w-4 h-4" />,
  "System Design": <Brain className="w-4 h-4" />,
  "Performance & Scalability": <Zap className="w-4 h-4" />,
};

const CATEGORY_ORDER = [
  "Java Core",
  "Multithreading & Concurrency",
  "Object-Oriented Design & Patterns",
  "Low-Level Design",
  "Spring Boot",
  "System Design",
  "Performance & Scalability"
];

export const Sidebar: React.FC<SidebarProps> = ({ selectedTopicId, onSelectTopic, completedTopicIds }) => {
  const categories = Array.from(new Set(TOPICS.map(t => t.category)))
    .sort((a, b) => {
      const indexA = CATEGORY_ORDER.indexOf(a);
      const indexB = CATEGORY_ORDER.indexOf(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

  const progress = (completedTopicIds.length / TOPICS.length) * 100;

  return (
    <div className="w-80 h-full bg-zinc-950 border-r border-zinc-800 flex flex-col">
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Code2 className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">SDE-3 Masterclass</h2>
            <p className="text-xs text-zinc-500 font-mono">JAVA INTERVIEW PREP</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="p-4 space-y-8">
          {categories.map((category) => (
            <div key={category} className="space-y-2">
              <div className="flex items-center gap-2 px-2 mb-3">
                <span className="text-blue-500">{categoryIcons[category] || <LayoutGrid className="w-4 h-4" />}</span>
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{category}</h3>
              </div>
              <div className="space-y-1">
                {TOPICS.filter(t => t.category === category).map((topic) => {
                  const isCompleted = completedTopicIds.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      onClick={() => onSelectTopic(topic.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-all group ${
                        selectedTopicId === topic.id
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {isCompleted && <CheckCircle2 className={`w-3.5 h-3.5 ${selectedTopicId === topic.id ? 'text-blue-200' : 'text-emerald-500'}`} />}
                        <span className="truncate">{topic.title}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        selectedTopicId === topic.id ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900/20">
        <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Current Progress</p>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-zinc-400 mt-2 text-right">{completedTopicIds.length} / {TOPICS.length} TOPICS COMPLETED</p>
        </div>
      </div>
    </div>
  );
};
