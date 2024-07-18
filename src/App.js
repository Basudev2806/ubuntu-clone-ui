import React from 'react';
import HomeScreen from './components/HomeScreen/HomeScreen';
import { Analytics } from "@vercel/analytics/react"
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HomeScreen />
        <Analytics />
      </header>
    </div>
  );
}

export default App;
