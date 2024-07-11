import React, { useState, useRef, useEffect } from "react";
import "./TerminalScreen.css"; // Import CSS for styling
import {
  FaWindowMinimize,
  FaWindowMaximize,
  FaWindowClose,
} from "react-icons/fa";

const TerminalScreen = ({ onClose }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });

  const inputRef = useRef(null);
  const bodyRef = useRef(null); // Reference for terminal body

  const initial = "Basudev@Ubuntu:~$ ";
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [input, setInput] = useState("");
  const [scrData, setScrData] = useState([]);

  useEffect(() => {
    // Scroll to bottom of the terminal body on content change
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [scrData]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setPrevPosition({ ...position });
    setPosition({ x: 0, y: window.innerHeight - 40 }); // Adjust based on where you want to minimize
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleRestore = () => {
    setIsMinimized(false);
    setPosition({ ...prevPosition });
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    }
    if (e.key === "Enter") {
      setHistoryIndex(0);
      setHistory((prev) => [input, ...prev]);
      if (input === "") {
        setScrData((prev) => [
          ...prev,
          {
            id: Date.now(),
            command: initial,
            output: "",
          },
        ]);
        return;
      }
      const command = input.trim().split(" ")[0];
      const args = command.split(/\s+/).slice(1);
      if (command === "clear") {
        setScrData([]);
        setInput("");
        return;
      }
      // Simulate command execution with a delay (for demonstration)
      const output = await simulateCommandExecution(command, args);
      setScrData((prev) => [
        ...prev,
        {
          id: Date.now(),
          command: initial + input,
          output,
        },
      ]);
      setInput("");
    }
    if (e.key === "ArrowUp") {
      setInput(() => {
        if (history.length === 0) return "";
        setHistoryIndex((prev) => {
          if (historyIndex === history.length - 1) return prev;
          else return prev + 1;
        });
        return history[historyIndex];
      });
    }
    if (e.key === "ArrowDown") {
      setInput(() => {
        if (history.length === 0) return "";
        if (historyIndex === 0) return "";
        setHistoryIndex((prev) => prev - 1);
        return history[historyIndex - 1];
      });
    }
  };

  const simulateCommandExecution = (command, args) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`${command}: command not found`);
      }, 1000); // Simulating 1 second delay
    });
  };

  return (
    <div
      className={`terminal ${isMaximized ? "maximized" : ""} ${
        isMinimized ? "minimized" : ""
      }`}
      style={{ top: position.y, left: position.x }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="terminal-header">
        <span>Terminal</span>
        <span>Basudev@Ubuntu:~$</span>
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
      <div
        ref={bodyRef}
        className="terminal-body"
        style={{ overflowY: isMaximized ? "auto" : "hidden" }}
      >
        {scrData.map((data, index) => (
          <div key={data.id}>
            <div className="command">{`${data.command}`}</div>
            <div className="output">{data.output}</div>
          </div>
        ))}
        <div id="terminal_input">
          <span className="prompt">{initial}</span>
          <span className="user-input">{input}</span>
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value=""
            className="input-field"
            onChange={(e) => setInput((prev) => prev + e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalScreen;
