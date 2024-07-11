import React, { useState, useEffect } from 'react';
import firefoxIcon from '../../assets/icons/firefox.png';
import folderIcon from '../../assets/icons/folder.png';
import terminalIcon from '../../assets/icons/terminal.png';
import settingsIcon from '../../assets/icons/settings.png';
import wordIcon from '../../assets/icons/word.png';
import excelIcon from '../../assets/icons/excel.png';
import networkIcon from '../../assets/icons/network.png';
import batteryIcon from '../../assets/icons/battery-status.png';
import volumeIcon from '../../assets/icons/volume-up.png';
import './HomeScreen.css'; // Add your CSS for styling

const HomeScreen = () => {
    
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
          const now = new Date();
          const dayName = getDayName(now.getDay());
          const formattedTime = formatTime(now.getHours(), now.getMinutes());
          setCurrentTime(`${dayName}, ${formattedTime}`);
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);

      const getDayName = (dayIndex) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[dayIndex];
      };

      const formatTime = (hours, minutes) => {
        const period = hours >= 12 ? 'PM' : 'AM';
        const twelveHourFormat = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${twelveHourFormat}:${formattedMinutes} ${period}`;
      };

  return (
    <div className="home-screen">
        <div className='header'>
            <div><span>Activities</span></div>
            <div className='current-time'>{currentTime}</div>
            <div className='right-header'><img src={networkIcon} alt="Excel" className="icon-header" /> <img src={volumeIcon} alt="Excel" className="icon-header" /> <img src={batteryIcon} alt="Excel" className="icon-header" /> </div>
        </div>
      <div className='home-screen-icons'>
        <div className="icon-container">
          <img src={folderIcon} alt="Folder" className="icon" /> 
        </div>
        <div className="icon-container">
          <img src={firefoxIcon} alt="Browser" className="icon" />
        </div>
        <div className="icon-container">
          <img src={terminalIcon} alt="Terminal" className="icon" /> 
        </div>
        <div className="icon-container">
          <img src={settingsIcon} alt="Settings" className="icon" /> 
        </div>
        <div className="icon-container">
          <img src={wordIcon} alt="Word" className="icon" /> 
        </div>
        <div className="icon-container">
          <img src={excelIcon} alt="Excel" className="icon" /> 
        </div>                        
      </div>
    </div>
  );
};

export default HomeScreen;