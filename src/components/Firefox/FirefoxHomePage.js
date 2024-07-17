import React, { useState } from "react";
import Draggable from "react-draggable";
import {
  FaWindowMinimize,
  FaWindowMaximize,
  FaWindowClose,
  FaBars,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import firefoxLogo from "../../assets/icons/firefox.png";
import settingsIcon from "../../assets/icons/settings.png";
import refreshIcon from "../../assets/icons/refresh.svg";
import Google from "../../assets/icons/google.svg";
import news1 from "../../assets/img/news1.webp";
import news2 from "../../assets/img/news2.webp";
import news3 from "../../assets/img/news3.webp";
import web from "../../assets/icons/web.svg";
import "./FirefoxHomePage.css";

const initialTabs = [{ id: 1, title: "New Tab" }];

const bookmarks = [
  { imgSrc: web, alt: "hub.techbanda", link: "#" },
  { imgSrc: web, alt: "localhost", link: "#" },
  { imgSrc: web, alt: "techbanda", link: "#" },
  { imgSrc: web, alt: "monesta", link: "#" },
  { imgSrc: web, alt: "ap-south-1.com", link: "#" },
  { imgSrc: web, alt: "whoisdata", link: "#" },
  { imgSrc: web, alt: "aapanel.techbanda", link: "#" },
  { imgSrc: web, alt: "portal2.passportindia.gov", link: "#" },
];

const newsArticles = [
  {
    title:
      "Gond Katira: a Natural Way to Cool Down in India's Scorching Summers",
    description:
      "This year, when India experienced its longest ever heatwave, locals turned to cool drinks like never before.",
    source: "BBC",
    imgSrc: news1,
  },
  {
    title: "Dance Your Way to a Sharper Brain, Fitter Body, and Better Mood",
    description:
      "On days when hitting the gym feels like a tedious task, just dance to your favourite song. This delightful form of exercise not...",
    source: "India Today",
    imgSrc: news2,
  },
  {
    title:
      "How Microsoft's Satya Nadella Became Tech's Steely Eyed A.I. Gambler",
    description:
      "Earlier this year, Satya Nadella hammered out a deal that surprised everyone outside his inner circle at Microsoft. Mr. Nadella,...",
    source: "The New York Times",
    imgSrc: news3,
  },
];

const FirefoxHomePage = ({ onClose }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [prevPosition, setPrevPosition] = useState({ x: 645, y: 1282 });
  const [tabs, setTabs] = useState(initialTabs);
  const [nextTabId, setNextTabId] = useState(2);

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleRestore = () => {
    setIsMinimized(false);
    document.querySelector(".firefox-homepage").style.left = prevPosition.x;
    document.querySelector(".firefox-homepage").style.top = prevPosition.y;
  };

  const addNewTab = () => {
    const newTab = { id: nextTabId, title: `New Tab` };
    setTabs([...tabs, newTab]);
    setNextTabId(nextTabId + 1);
  };

  const handleCloseTab = (id) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(updatedTabs);
  };

  return (
    <Draggable
      handle=".firefox-homepage"
      defaultPosition={{ x: -575, y: -408 }}
      bounds="parent"
    >
      <div className={`firefox-homepage ${isMaximized ? "maximized" : ""} ${isMinimized ? "minimized" : "" }`}>
        <div className={`firefox`} >
          <div className="firefox-header">
            <div className="header-left">
              <span className="header-icon">
                <FaBars />
              </span>
              {tabs.map((tab) => (
                <span className="selected-item" key={tab.id}>
                  <img
                    src={firefoxLogo}
                    alt="Firefox Logo"
                    className="header-icon"
                  />
                  {tab.title}
                  <FaWindowClose
                    className="close-new-tab"
                    onClick={() => handleCloseTab(tab.id)}
                  />
                </span>
              ))}
              <span className="firefox-new-tab" onClick={addNewTab}>
                <FaPlus />
              </span>
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
          <div className="firefox-header2">
            <div className="header-left">
              <FaArrowLeft className="firefox-header-icons"/>
              <FaArrowRight className="firefox-header-icons"/>
              <img
                src={refreshIcon}
                className="firefox-header2-header-icon firefox-header-icons"
                alt="Refresh Icon"
              />
            </div>
            <input type="text" className="search-bar" placeholder="Search..." />
            <div className="header-icons">
              <img
                src={settingsIcon}
                className="settings-icon"
                alt="Settings Icon"
              />
            </div>
          </div>
        </div>
        <div className="firefox-upper-middle">
            <img
                src={firefoxLogo}
                alt="Firefox Logo"
                className="firefox-icon"
                />
            <span><strong>Firefox</strong></span>
        </div>
        <div className="google-search-box">
            <div className="search-icon">
                <img
                    src={Google}
                    alt="Firefox Logo"
                    className="header-icon"
                  />
            </div>
            <input type="text" placeholder="Search with Google or enter address" className="search-input" />
        </div>
        <div className="bookmarks">
            {bookmarks.map((bookmark, index) => (
                <a href={bookmark.link} key={index} className="bookmark">
                <img
                    src={bookmark.imgSrc}
                    alt={bookmark.alt}
                    className="bookmark-icon"
                />
                <span>{bookmark.alt}</span>
                </a>
            ))}
        </div>

        <div className="news-section">
          <h2>Thought-provoking stories</h2>
          <div className="news-articles">
            {newsArticles.map((article, index) => (
              <div className="news-article" key={index}>
                <img
                  src={article.imgSrc}
                  alt={article.title}
                  className="news-image"
                />
                <div className="news-content">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <span>{article.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="footer">
            Popular Topics: <span className="footer-text">Self improvement</span> • 
            <span className="footer-text"> Food</span> • 
            <span className="footer-text"> Entertainment</span> • 
            <span className="footer-text"> Health & fitness</span> • 
            <span className="footer-text"> Science</span> • 
            <span className="footer-text"> More recommendations ›</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="footer-text">Privacy Notice</span>
        </div>

      </div>
    </Draggable>
  );
};

export default FirefoxHomePage;
