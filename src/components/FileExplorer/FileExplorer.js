import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import {
  FaWindowMinimize,
  FaWindowMaximize,
  FaWindowClose,
  FaHome,
  FaDesktop,
  FaDownload,
  FaFile,
  FaMusic,
  FaImage,
  FaVideo,
  FaFolderOpen,
  FaArrowLeft,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import Desktop from "../../assets/icons/Desktop.svg";
import Downloads from "../../assets/icons/Download.svg";
import Documents from "../../assets/icons/Documents.svg";
import ImageIcon from "../../assets/icons/Image.svg";
import Videos from "../../assets/icons/Video.svg";
import Music from "../../assets/icons/Music.svg";
import "./FileExplorer.css";

const FileExplorer = ({ onClose }) => {
  const [currentPath, setCurrentPath] = useState("/");
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState("Home");

  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [currentPath]);

  const handleMinimize = () => {
    setIsMinimized(true);
    setPrevPosition({
      x: document.querySelector(".file-explorer").style.left,
      y: document.querySelector(".file-explorer").style.top,
    });
    document.querySelector(".file-explorer").style.left = "0px";
    document.querySelector(".file-explorer").style.top = `${window.innerHeight - 40}px`;
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleRestore = () => {
    setIsMinimized(false);
    document.querySelector(".file-explorer").style.left = prevPosition.x;
    document.querySelector(".file-explorer").style.top = prevPosition.y;
  };

  const handleFolderClick = (folderName) => {
    console.log("Clicked folder:", folderName);
  };

  const handleSidebarItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const handleLeftArrowClick = () => {
    const sidebarItems = ["Home", "Desktop", "Documents", "Downloads", "Pictures", "Videos", "Music"];
    const currentIndex = sidebarItems.indexOf(selectedItem);
    if (currentIndex > 0) {
      setSelectedItem(sidebarItems[currentIndex - 1]);
    }
  };

  const handleRightArrowClick = () => {
    const sidebarItems = ["Home", "Desktop", "Documents", "Downloads", "Pictures", "Videos", "Music"];
    const currentIndex = sidebarItems.indexOf(selectedItem);
    if (currentIndex < sidebarItems.length - 1) {
      setSelectedItem(sidebarItems[currentIndex + 1]);
    }
  };

  return (
    <Draggable handle=".file-explorer-header" defaultPosition={{x: 73,y: 53}} bounds="parent">
      <div
        className={`file-explorer ${isMaximized ? "maximized" : ""} ${isMinimized ? "minimized" : ""}`}
      >
        <div className="file-explorer-header">
          <div className="header-left">
            <FaFolderOpen />
            <span>|</span>
            <div className="header-controls">
              <FaArrowLeft />
              <FaArrowRight />
              <FaChevronLeft onClick={handleLeftArrowClick} style={{ cursor: selectedItem === "Home" ? "default" : "pointer", opacity: selectedItem === "Home" ? 0.3 : 1 }} />
              <span className="selected-item">{selectedItem}</span>
              <FaChevronRight onClick={handleRightArrowClick} style={{ cursor: selectedItem === "Music" ? "default" : "pointer", opacity: selectedItem === "Music" ? 0.3 : 1 }} />
            </div>
          </div>
          <div className="header-icons">
            {isMinimized ? (
              <FaWindowMaximize onClick={handleRestore} />
            ) : (
              <>
                <FaWindowMinimize onClick={handleMinimize} />
                <FaWindowMaximize onClick={handleMaximize} />
                <FaWindowClose onClick={onClose} />
              </>
            )}
          </div>
        </div>
        <div className="file-explorer-body">
          <div className="sidebar">
            <ul className="sidebar-list">
              <li
                className={`sidebar-item ${selectedItem === "Home" ? "selected" : ""}`}
                onClick={() => handleSidebarItemClick("Home")}
              >
                <span className="sidebar-item-icon"><FaHome/></span>
                <span className="sidebar-item-text">Home</span>
              </li>
              <li
                className={`sidebar-item ${selectedItem === "Desktop" ? "selected" : ""}`}
                onClick={() => handleSidebarItemClick("Desktop")}
              >
                <span className="sidebar-item-icon"><FaDesktop/></span>
                <span className="sidebar-item-text">Desktop</span>
              </li>            
              <li
                className={`sidebar-item ${selectedItem === "Documents" ? "selected" : ""}`}
                onClick={() => handleSidebarItemClick("Documents")}
              >
                <span className="sidebar-item-icon"><FaFile/></span>
                <span className="sidebar-item-text">Documents</span>
              </li>
              <li
                className={`sidebar-item ${selectedItem === "Downloads" ? "selected" : ""}`}
                onClick={() => handleSidebarItemClick("Downloads")}
              >
                <span className="sidebar-item-icon"><FaDownload/></span>
                <span className="sidebar-item-text">Downloads</span>
              </li>
              <li
                className={`sidebar-item ${selectedItem === "Pictures" ? "selected" : ""}`}
                onClick={() => handleSidebarItemClick("Pictures")}
              >
                <span className="sidebar-item-icon"><FaImage/></span>
                <span className="sidebar-item-text">Pictures</span>
              </li>
              <li
                className={`sidebar-item ${selectedItem === "Videos" ? "selected" : ""}`}
                onClick={() => handleSidebarItemClick("Videos")}
              >
                <span className="sidebar-item-icon"><FaVideo/></span>
                <span className="sidebar-item-text">Videos</span>
              </li>
              <li
                className={`sidebar-item ${selectedItem === "Music" ? "selected" : ""}`}
                onClick={() => handleSidebarItemClick("Music")}
              >
                <span className="sidebar-item-icon"><FaMusic/></span>
                <span className="sidebar-item-text">Music</span>
              </li>
            </ul>
          </div>
          <div className="main-content" ref={bodyRef}>
            <div className="file-grid">
              <div className="file-item" onClick={() => handleFolderClick("Desktop")}>
                <img src={Desktop} alt="Desktop" className="file-icon" />
                <span className="file-name">Desktop</span>
              </div>
              <div className="file-item" onClick={() => handleFolderClick("Downloads")}>
                <img src={Downloads} alt="Downloads" className="file-icon" />
                <span className="file-name">Downloads</span>
              </div>
              <div className="file-item" onClick={() => handleFolderClick("Documents")}>
                <img src={Documents} alt="Documents" className="file-icon" />
                <span className="file-name">Documents</span>
              </div>
              <div className="file-item" onClick={() => handleFolderClick("Music")}>
                <img src={Music} alt="Music" className="file-icon" />
                <span className="file-name">Music</span>
              </div>
              <div className="file-item" onClick={() => handleFolderClick("Image")}>
                <img src={ImageIcon} alt="Image" className="file-icon" />
                <span className="file-name">Image</span>
              </div>
              <div className="file-item" onClick={() => handleFolderClick("Videos")}>
                <img src={Videos} alt="Videos" className="file-icon" />
                <span className="file-name">Videos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default FileExplorer;