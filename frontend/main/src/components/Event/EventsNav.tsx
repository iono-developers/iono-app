import React, { useContext, useState } from 'react';
import './EventsNav.scss';
import EventContext from '../../context/EventContext';
import { useAuth, AuthContextData } from '../../context/AuthContext';

const BottomNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('In Scadenza');
  const [tabs] = useState<string[]>(['Tutti', 'Aperti', 'Creati', 'Archivio']);
  const { allEvents, openEvents, pastEvents, hostEvents } = useContext(EventContext);
  const { user_id } = useAuth() as AuthContextData;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Tutti')
      allEvents()
    if (tab === 'Aperti')
      openEvents()
    if (tab === 'Creati') {
      if (typeof user_id === "number") {
        hostEvents(user_id)
      }
    }
    if (tab === 'Archivio')
      pastEvents()
  };

  return (
    <div className="top-navigation">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`top-navigation-tab ${activeTab === tab ? 'active' : ''}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default BottomNavigation;
