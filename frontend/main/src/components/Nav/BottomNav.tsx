import React from 'react';
import { Link } from 'react-router-dom';
import './BottomNav.scss'; // CSS for styling

const BottomNav: React.FC = () => {
  return (
    <div className="bottom-navigation">
      <Link to="/" className="bottom-navigation-tab">🏠</Link>
      <Link to="/create" className="bottom-navigation-tab">➕</Link>
      <Link to="/users" className="bottom-navigation-tab">🫂</Link>
    </div>
  );
};

export default BottomNav;