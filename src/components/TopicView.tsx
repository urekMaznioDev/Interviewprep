import React, { useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import { Topic } from '@/src/data/topics';
import { RateLimiterSim } from './visualizations/RateLimiterSim';
import { CacheSim } from './visualizations/CacheSim';
import { ThreadPoolSim } from './visualizations/ThreadPoolSim';
import { FileSystemSim } from './visualizations/FileSystemSim';
import { ParkingLotSim } from './visualizations/ParkingLotSim';
import { SplitwiseSim } from './visualizations/SplitwiseSim';
import { LoadBalancerSim } from './visualizations/LoadBalancerSim';
import { ConsistencySim } from './visualizations/ConsistencySim';
import { VendingMachineSim } from './visualizations/VendingMachineSim';
import { UrlShortenerSim } from './visualizations/UrlShortenerSim';
import { SnakeAndLadderSim } from './visualizations/SnakeAndLadderSim';
import { SingletonSim } from './visualizations/SingletonSim';
import { ObserverSim } from './visualizations/ObserverSim';
import { BlockingQueueSim } from './visualizations/BlockingQueueSim';
import { StrategySim } from './visualizations/StrategySim';
import { SnowflakeIdSim } from './visualizations/SnowflakeIdSim';
import { JvmArchSim } from './visualizations/JvmArchSim';
import { DeadlockSim } from './visualizations/DeadlockSim';
import { SpringDiSim } from './visualizations/SpringDiSim';
import { CircuitBreakerSim } from './visualizations/CircuitBreakerSim';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Code2, Info, Lightbulb, GitCompare, Play, BookOpen, ArrowRight, FileText, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopicViewProps {
  topic: Topic;
  isCompleted: boolean;
  onToggleCompletion: () => void;
}

// Mermaid component to render diagrams
const Mermaid = ({ chart }: { chart: string }) => {
  useEffect(() => {
    mermaid.contentLoaded();
  }, [chart]);

  return <div className="mermaid bg-white p-4 rounded-lg my-6 flex justify-center">{chart}</div>;
};

export const TopicView: React.FC<TopicViewProps> = ({ topic, isCompleted, onToggleCompletion }) => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
      securityLevel: 'loose',
    });
  }, []);

  const renderVisualization = () => {
    switch (topic.id) {
      case 'rate-limiter':
        return <RateLimiterSim />;
      case 'lru-cache':
        return <CacheSim />;
      case 'thread-pool':
        return <ThreadPoolSim />;
      case 'file-system':
        return <FileSystemSim />;
      case 'parking-lot':
        return <ParkingLotSim />;
      case 'splitwise':
        return <SplitwiseSim />;
      case 'load-balancer':
      case 'load-balancing-strategies':
        return <LoadBalancerSim />;
      case 'consistency-models':
        return <ConsistencySim />;
      case 'vending-machine':
        return <VendingMachineSim />;
      case 'url-shortener':
        return <UrlShortenerSim />;
      case 'snake-and-ladder':
        return <SnakeAndLadderSim />;
      case 'singleton':
        return <SingletonSim />;
      case 'observer-pattern':
        return <ObserverSim />;
      case 'blocking-queue':
        return <BlockingQueueSim />;
      case 'strategy-pattern':
        return <StrategySim />;
      case 'snowflake-id':
        return <SnowflakeIdSim />;
      case 'jvm-architecture':
        return <JvmArchSim />;
      case 'deadlock-prevention':
        return <DeadlockSim />;
      case 'spring-di-ioc':
        return <SpringDiSim />;
      case 'microservices-patterns':
        return <CircuitBreakerSim />;
      default:
        return (
          <div className="p-12 border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-500 gap-4">
            <Play className="w-12 h-12 opacity-20" />
            <p>Interactive simulation coming soon for this topic.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100">
      <header className="p-8 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                {topic.category}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-4">{topic.title}</h1>
            <p className="text-zinc-400 text-lg max-w-3xl leading-relaxed">
              {topic.description}
            </p>
          </div>
          <Button
            onClick={onToggleCompletion}
            variant={isCompleted ? "default" : "outline"}
            className={`gap-2 transition-all ${
              isCompleted 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-none' 
                : 'border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </>
            ) : (
              <>
                <Circle className="w-4 h-4" />
                Mark as Completed
              </>
            )}
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="overview" orientation="horizontal" className="h-full flex flex-col">
          <div className="px-8 border-b border-zinc-800 bg-zinc-900/30">
            <TabsList variant="line" className="bg-transparent border-none gap-8">
              <TabsTrigger value="overview" className="data-active:text-blue-500 data-active:after:bg-blue-500 rounded-none px-0 h-12 gap-2">
                <Info className="w-4 h-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="deep-dive" className="data-active:text-blue-500 data-active:after:bg-blue-500 rounded-none px-0 h-12 gap-2">
                <FileText className="w-4 h-4" /> Documentation
              </TabsTrigger>
              <TabsTrigger value="interactive" className="data-active:text-blue-500 data-active:after:bg-blue-500 rounded-none px-0 h-12 gap-2">
                <Play className="w-4 h-4" /> Interactive Sim
              </TabsTrigger>
              <TabsTrigger value="code" className="data-active:text-blue-500 data-active:after:bg-blue-500 rounded-none px-0 h-12 gap-2">
                <Code2 className="w-4 h-4" /> Java Implementation
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="overview" className="h-full m-0 p-8 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl">
                <section className="space-y-6">
                  <div className="flex items-center gap-2 text-blue-400 font-semibold uppercase tracking-widest text-sm">
                    <Lightbulb className="w-4 h-4" /> Key Concepts
                  </div>
                  <ul className="space-y-3">
                    {topic.concepts.map((concept, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        {concept}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold uppercase tracking-widest text-sm">
                    <GitCompare className="w-4 h-4" /> Trade-offs
                  </div>
                  <ul className="space-y-3">
                    {topic.tradeoffs.map((tradeoff, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                        {tradeoff}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="md:col-span-2 space-y-6">
                  <div className="flex items-center gap-2 text-zinc-400 font-semibold uppercase tracking-widest text-sm">
                    <ArrowRight className="w-4 h-4" /> Step-by-Step Workflow
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {topic.steps.map((step, i) => (
                      <div key={i} className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 relative">
                        <span className="absolute -top-2 -left-2 w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-[10px] font-bold text-zinc-500 border border-zinc-700">
                          {i + 1}
                        </span>
                        <h4 className="text-white font-semibold mb-1 text-sm">{step.title}</h4>
                        <p className="text-zinc-500 text-xs leading-relaxed">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="md:col-span-2 p-6 bg-zinc-900 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase tracking-widest text-sm mb-4">
                    <Code2 className="w-4 h-4" /> Interview Tips
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {topic.interviewTips.map((tip, i) => (
                      <div key={i} className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 text-zinc-400 text-sm italic">
                        "{tip}"
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="deep-dive" className="h-full m-0 p-8 overflow-y-auto custom-scrollbar">
              <div className="max-w-4xl mx-auto prose prose-invert prose-zinc prose-headings:text-white prose-strong:text-blue-400 prose-code:text-emerald-400">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      if (!inline && match && match[1] === 'mermaid') {
                        return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                      }
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {topic.deepDive}
                </ReactMarkdown>
              </div>
            </TabsContent>

            <TabsContent value="interactive" className="h-full m-0 p-8 overflow-y-auto custom-scrollbar">
              <div className="max-w-5xl mx-auto">
                {renderVisualization()}
              </div>
            </TabsContent>

            <TabsContent value="code" className="h-full m-0 p-0 overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex justify-between items-center">
                  <span className="text-xs font-mono text-zinc-500">Java Implementation</span>
                  <Badge variant="outline" className="text-[10px] uppercase border-zinc-700 text-zinc-500">Read Only</Badge>
                </div>
                <div className="flex-1 overflow-auto bg-[#1e1e1e]">
                  <SyntaxHighlighter
                    language="java"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: '2rem',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      background: 'transparent',
                    }}
                  >
                    {topic.javaCode.trim()}
                  </SyntaxHighlighter>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
