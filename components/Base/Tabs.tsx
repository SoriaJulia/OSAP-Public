import React, { FC } from 'react';

type TabsProps = {
  tabs: {
    label: string;
    index: number;
    Component: FC<{ index: number }>;
  }[];
  selectedTab: number;
  onClick: (index: number) => void;
  orientation?: 'horizontal' | 'vertical';
};

/**
 * Avalible Props
 * @param className string
 * @param tab Array of object
 * @param selectedTab number
 * @param onClick Function to set the active tab
 * @param orientation Tab orientation Vertical | Horizontal
 */
const Tabs: FC<TabsProps> = ({ tabs = [], selectedTab = 0, onClick, orientation = 'horizontal' }) => {
  const Panel = tabs && tabs.find((tab) => tab.index === selectedTab);

  return (
    <div className="rounded bg-gradient-to-t from-yellow-50/80 to-red-100/60 p-4 pt-0">
      <div role="tablist" className="flex gap-2" aria-orientation={orientation}>
        {tabs.map((tab) => (
          <button
            className={`-mb-0.5 flex items-center gap-2 rounded-t-lg  py-4 px-7 text-xl text-orange-600
          ${selectedTab === tab.index ? 'border-x-2  border-t-2 border-orange-600  bg-white ' : 'bg-white/30'} `}
            onClick={() => onClick(tab.index)}
            key={tab.index}
            type="button"
            role="tab"
            aria-selected={selectedTab === tab.index}
            aria-controls={`tabpanel-${tab.index}`}
            tabIndex={selectedTab === tab.index ? 0 : -1}
            id={`btn-${tab.index}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        className="rounded border-2 border-orange-500 bg-white p-3"
        aria-labelledby={`btn-${selectedTab}`}
        id={`tabpanel-${selectedTab}`}
      >
        {Panel && <Panel.Component index={selectedTab} />}
      </div>
    </div>
  );
};
export default Tabs;
