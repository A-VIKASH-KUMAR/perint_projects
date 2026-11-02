import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import DebounceSearchTSX from './implementDebounceSearchApiCall';
import LiftingStateUp from './implementliftingStateUp';
import InfiniteScroll from './infinitescrollUsingObserverintersect';
import IncreasingNumbersCounter from './renderIncreasingnumbersSetTimeout';
import OnlineStatusChecker from './useOnlineSattausHook';

interface ComponentItem {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType;
}

const componentsList: ComponentItem[] = [
  {
    id: 'debounce-search',
    title: '1. Debounced Search API Call',
    description: 'Debounces search queries by 2 seconds before making dummyjson fetch requests.',
    component: DebounceSearchTSX,
  },
  {
    id: 'lifting-state-up',
    title: '2. Lifting State Up (Accordion)',
    description: 'Demonstrates shared state across child CardRow components in an Accordion.',
    component: LiftingStateUp,
  },
  {
    id: 'infinite-scroll',
    title: '3. Infinite Scroll (Intersection Observer)',
    description: 'Paginates posts automatically as you scroll to the bottom observer trigger.',
    component: InfiniteScroll,
  },
  {
    id: 'set-timeout-counter',
    title: '4. Incrementing Counter (SetTimeout)',
    description: 'Sequentially adds numbers to an array on a 1-second interval using setTimeout.',
    component: IncreasingNumbersCounter,
  },
  {
    id: 'online-status-hook',
    title: '5. Custom useOnlineStatus Hook',
    description: 'Tracks browser connectivity events (online / offline) via custom hook.',
    component: OnlineStatusChecker,
  },
];

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '24px 16px',
  },
  header: {
    marginBottom: '28px',
    paddingBottom: '16px',
    borderBottom: '2px solid #e2e8f0',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '28px',
    color: '#1a202c',
  },
  subtitle: {
    margin: 0,
    fontSize: '15px',
    color: '#718096',
  },
  viewModeBar: {
    display: 'flex',
    gap: '12px',
    margin: '16px 0 24px 0',
    flexWrap: 'wrap' as const,
  },
  button: (isActive: boolean) => ({
    padding: '8px 16px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    backgroundColor: isActive ? '#3182ce' : '#ffffff',
    color: isActive ? '#ffffff' : '#334155',
    fontWeight: 600 as const,
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }),
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
    marginBottom: '28px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
  },
  cardHeader: {
    backgroundColor: '#f8fafc',
    padding: '16px 20px',
    borderBottom: '1px solid #e2e8f0',
  },
  cardTitle: {
    margin: '0 0 4px 0',
    fontSize: '18px',
    color: '#2d3748',
  },
  cardDescription: {
    margin: 0,
    fontSize: '13px',
    color: '#718096',
  },
  cardBody: {
    padding: '20px',
  },
};

function App() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const displayedComponents =
    activeTab === 'all'
      ? componentsList
      : componentsList.filter((item) => item.id === activeTab);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Coding Tests Showcase</h1>
        <p style={styles.subtitle}>
          All components from the coding tests rendered on a single page with tab filtering.
        </p>
      </header>

      <div style={styles.viewModeBar}>
        <button
          style={styles.button(activeTab === 'all')}
          onClick={() => setActiveTab('all')}
        >
          Show All
        </button>
        {componentsList.map((item) => (
          <button
            key={item.id}
            style={styles.button(activeTab === item.id)}
            onClick={() => setActiveTab(item.id)}
          >
            {item.title.split('. ')[1] || item.title}
          </button>
        ))}
      </div>

      <main>
        {displayedComponents.map((item) => {
          const ComponentToRender = item.component;
          return (
            <section key={item.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>{item.title}</h2>
                <p style={styles.cardDescription}>{item.description}</p>
              </div>
              <div style={styles.cardBody}>
                <ComponentToRender />
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
