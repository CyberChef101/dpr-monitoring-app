import React from 'react';

const Tabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'submission', label: 'DPR Submission' },
    { id: 'history', label: 'DPR History' },
    { id: 'dashboard', label: 'Dashboard' },
  ];

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      onTabChange(tabs[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      onTabChange(tabs[prevIndex].id);
    }
  };

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className="bg-muted text-muted-foreground h-9 items-center justify-center rounded-xl p-[3px] grid w-full grid-cols-3 mb-6"
      tabIndex={0}
    >
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`tab-panel-${tab.id}`}
          id={`tab-${tab.id}`}
          data-state={activeTab === tab.id ? 'active' : 'inactive'}
          onClick={() => onTabChange(tab.id)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          tabIndex={activeTab === tab.id ? 0 : -1}
          className={`${
            activeTab === tab.id
              ? 'bg-card text-foreground dark:text-muted-foreground dark:bg-input/30 border border-input'
              : 'text-muted-foreground'
          } focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground h-[calc(100%-1px)] flex-1 justify-center rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
