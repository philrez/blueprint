import React, { useMemo, useState } from 'react';
import styles from './Tabs.module.scss';

const Tabs = ({ tabs, tabAction }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const CurrentTabContent = useMemo(() => {
    return tabs[selectedTab].content;
  }, [selectedTab]);

  const TabActionComponent = useMemo(() => {
    return tabAction ? tabAction() : null;
  }, [tabAction]);

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabTitleContainer}>
        <div className={styles.tabTitleScrollable}>
          {tabs.map((tab, index) => {
            return (
              <>
                <div
                  key={index}
                  className={`${styles.tabItem} ${selectedTab === index ? styles.selected : ''}`}
                  onClick={() => setSelectedTab(index)}
                >
                  {tab.title}
                  <div className={styles.selectionBar} />
                </div>
              </>
            );
          })}
        </div>
        <div className={styles.tabActionContainer}>{TabActionComponent}</div>
      </div>
      <div className={styles.tabContent}>
        <CurrentTabContent />
      </div>
    </div>
  );
};

export default Tabs;
