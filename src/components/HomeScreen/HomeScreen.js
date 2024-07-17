import React, { useState, useEffect } from "react";
import firefoxIcon from "../../assets/icons/firefox.png";
import folderIcon from "../../assets/icons/folder.png";
import terminalIcon from "../../assets/icons/terminal.png";
import settingsIcon from "../../assets/icons/settings.png";
import wordIcon from "../../assets/icons/word.png";
import excelIcon from "../../assets/icons/excel.png";
import networkIcon from "../../assets/icons/network.png";
import batteryIcon from "../../assets/icons/battery-status.png";
import volumeIcon from "../../assets/icons/volume-up.png";
import { CgLayoutGridSmall } from 'react-icons/cg';
import TerminalScreen from "../TerminalScreen/TerminalScreen";
import FileExplorer from "../FileExplorer/FileExplorer";
import Firefox from "../Firefox/FirefoxHomePage";
import "./HomeScreen.css"; // Add your CSS for styling

const HomeScreen = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [windows, setWindows] = useState([]);
  const [nextZIndex, setNextZIndex] = useState(1);

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
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[dayIndex];
  };

  const formatTime = (hours, minutes) => {
    const period = hours >= 12 ? "PM" : "AM";
    const twelveHourFormat = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${twelveHourFormat}:${formattedMinutes} ${period}`;
  };

  const openWindow = (windowType) => {
    const newWindow = { id: Date.now(), type: windowType, zIndex: nextZIndex };
    setWindows([newWindow, ...windows]);
    setNextZIndex(nextZIndex + 1);
  };

  const closeWindow = (windowId) => {
    setWindows(windows.filter((win) => win.id !== windowId));
  };

  return (
    <div className="home-screen">
      <div className="header">
        <div>
          <span>Activities</span>
        </div>
        <div className="current-time">{currentTime}</div>
        <div className="right-header">
          <img src={networkIcon} alt="Network" className="icon-header" />{" "}
          <img src={volumeIcon} alt="Volume" className="icon-header" />{" "}
          <img src={batteryIcon} alt="Battery" className="icon-header" />{" "}
        </div>
      </div>

      <div className="home-screen-icons">
        <div className="icons-container">
          <div className="icon-container" onClick={() => openWindow("fileExplorer")}>
            <img src={folderIcon} alt="Folder" className="icon" />
          </div>
          <div className="icon-container" onClick={() => openWindow("firefox")}>
            <img src={firefoxIcon} alt="Firefox" className="icon" />
          </div>
          <div className="icon-container" onClick={() => openWindow("terminal")}>
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

        {/* Bottom icon container */}
        <div className="bottom-icon" onClick={() => openWindow("menu")}>
          <CgLayoutGridSmall />
        </div>
      </div>

      {windows.map((win, index) => {
        if (win.type === "fileExplorer") {
          return (
            <FileExplorer key={win.id} onClose={() => closeWindow(win.id)} style={{ zIndex: 100 + index }} />
          );
        } else if (win.type === "terminal") {
          return (
            <TerminalScreen key={win.id} onClose={() => closeWindow(win.id)} style={{ zIndex: 200 + index }} />
          );
        } else if (win.type === "firefox") {
          return (
            <Firefox key={win.id} onClose={() => closeWindow(win.id)} style={{ zIndex: 200 + index }} />
          );
        }
        return null;
      })}
    </div>
  );
};

export default HomeScreen;