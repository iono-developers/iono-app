import React from 'react';
import { Link } from 'react-router-dom';
import './BottomNav.scss'; // CSS for styling
import { useAuth } from '../../context/AuthContext';


const BottomNav: React.FC = () => {
  const { username } = useAuth();
  return (
    <div className="bottom-navigation">
      <Link to="/" className="bottom-navigation-tab">🏠</Link>
      <Link to="/create/" className="bottom-navigation-tab">➕</Link>
      <Link to={`/user/${username}/`} className="bottom-navigation-tab">👋🏻</Link>
    </div>
  );
};

export default BottomNav;