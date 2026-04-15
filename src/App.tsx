import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopicView } from './components/TopicView';
import { TOPICS } from './data/topics';

export default function App() {
  const [selectedTopicId, setSelectedTopicId] = useState(TOPICS[0].id);
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('completedTopics');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleCompletion = (id: string) => {
    setCompletedTopicIds(prev => {
      const next = prev.includes(id) 
        ? prev.filter(t => t !== id) 
        : [...prev, id];
      localStorage.setItem('completedTopics', JSON.stringify(next));
      return next;
    });
  };

  const selectedTopic = TOPICS.find(t => t.id === selectedTopicId) || TOPICS[0];

  return (
    <div className="dark flex h-screen w-full bg-zinc-950 overflow-hidden selection:bg-blue-500/30">
      <Sidebar 
        selectedTopicId={selectedTopicId} 
        onSelectTopic={setSelectedTopicId} 
        completedTopicIds={completedTopicIds}
      />
      <main className="flex-1 h-full overflow-hidden">
        <TopicView 
          topic={selectedTopic} 
          isCompleted={completedTopicIds.includes(selectedTopic.id)}
          onToggleCompletion={() => toggleCompletion(selectedTopic.id)}
        />
      </main>
    </div>
  );
}
