// Loading.jsx

import React from 'react';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-text">io-no</div>
      <div className="loading-spinner">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Loading;
