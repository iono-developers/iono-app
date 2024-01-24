/**
 * Loading Component:
 * 
 * This component represents a loading indicator, providing visual feedback to
 * users while content or data is being loaded. It includes a text message and
 * a spinning animation with three circles.
 * 
 * Useful for:
 * - Displaying a loading indicator during asynchronous operations like data fetching.
 * - Improving user experience by indicating that the application is actively processing.
 * - Customizing the loading animation and text to suit the application's design.
 * 
 * When to use:
 * - Integrate this Loading component into your application wherever you need to
 *   indicate loading, such as when fetching data or waiting for asynchronous operations.
 * - Ideal for use in components that might have a brief delay in rendering content.
 * 
 * Function Usage Comments:
 * - Loading.scss: Assumes the existence of a corresponding SCSS file for styling
 *   to enhance the visual appearance of the loading indicator.
 * 
 */


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
