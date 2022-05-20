import React, { FC, ReactNode } from 'react';

export type TabsType = {
  label: string;
  index: number;
  Component: React.FC<any>;
  icon: ReactNode;
}[];

type TabsProps = {
  tabs: TabsType;
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
    <div className="mt-4 lg:mt-0">
      <div
        role="tablist"
        className="hiddenScrollbar z-10 flex gap-2 overflow-x-scroll md:overflow-x-visible"
        aria-orientation={orientation}
      >
        {tabs.map((tab) => (
          <button
            className={`-mb-0.5 mt-2 flex items-center gap-2 rounded-t-lg border-x-2 border-t-2  py-4 px-7 text-xl  text-orange-600
          ${
            selectedTab === tab.index ? ' border-b-2  border-orange-600 border-b-white bg-white' : 'mb-0 bg-white/50'
          } `}
            onClick={() => onClick(tab.index)}
            key={tab.index}
            type="button"
            role="tab"
            aria-selected={selectedTab === tab.index}
            aria-controls={`tabpanel-${tab.index}`}
            tabIndex={selectedTab === tab.index ? 0 : -1}
            id={`btn-${tab.index}`}
          >
            {tab.icon}
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
