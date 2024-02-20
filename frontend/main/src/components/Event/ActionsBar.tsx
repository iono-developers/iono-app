import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/main.scss';

const ActionsBar = () => {
  return (
    <div className="actions-bar-container">
      {/* Change the Link to route to the "/create" path */}
      <Link to="/create" className="action-btn create-event-btn">Crea Sfida!</Link>
      <Link to="/invited" className="action-btn invited-events-btn">Le tue Sfide</Link>
      <Link to="/manage" className="action-btn manage-events-btn">Sfide Create</Link>
    </div>
  );
};

export default ActionsBar;
