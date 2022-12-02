import classNames from 'classnames';
import { IconProps } from 'phosphor-react';
import React, { FC } from 'react';

export type TabsType = {
  label: string;
  index: number;
  Component: React.FC<any>;
  Icon: React.FC<IconProps>;
}[];

type TabsProps = {
  tabs: TabsType;
  selectedTab: number;
  onClick: (index: number) => void;
  orientation?: 'horizontal' | 'vertical';
  agentId: string;
};

/**
 * Avalible Props
 * @param className string
 * @param tab Array of object
 * @param selectedTab number
 * @param onClick Function to set the active tab
 * @param orientation Tab orientation Vertical | Horizontal
 */
const Tabs: FC<TabsProps> = ({ tabs = [], selectedTab = 0, onClick, orientation = 'horizontal', agentId }) => {
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
            className={classNames({
              'tab-button': true,
              '-mb-1': selectedTab === tab.index,
              'border-b-2  border-orange-600 border-b-white bg-white': selectedTab === tab.index,
            })}
            onClick={() => onClick(tab.index)}
            key={tab.index}
            type="button"
            role="tab"
            aria-selected={selectedTab === tab.index}
            aria-controls={`tabpanel-${tab.index}`}
            tabIndex={selectedTab === tab.index ? 0 : -1}
            id={`btn-${tab.index}`}
          >
            <tab.Icon weight={selectedTab === tab.index ? 'bold' : 'light'} size="1.2em" />
            <h2>{tab.label}</h2>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        className="rounded border-2 border-orange-500 bg-white p-3"
        aria-labelledby={`btn-${selectedTab}`}
        id={`tabpanel-${selectedTab}`}
      >
        {Panel && <Panel.Component index={selectedTab} agentId={agentId} />}
      </div>
    </div>
  );
};
export default Tabs;
