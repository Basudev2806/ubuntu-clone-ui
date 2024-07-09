import React from 'react';
import { FaFolder, FaFirefox, FaTerminal, FaMusic } from 'react-icons/fa';
import './HomeScreen.css'; // Add your CSS for styling

const HomeScreen = () => {
  return (
    <div className="home-screen">
        <div className='home-screen-icons'>
            <div className="icon-container">
                <FaFolder className="icon" />
                <span>Files</span>
            </div>
            <div className="icon-container">
                <FaFirefox className="icon" />
                <span>Browser</span>
            </div>
            <div className="icon-container">
                <FaTerminal className="icon" />
                <span>Terminal</span>
            </div>
            <div className="icon-container">
                <FaMusic className="icon" />
                <span>Music</span>
            </div>
        </div>
    </div>
  );
};

export default HomeScreen;
