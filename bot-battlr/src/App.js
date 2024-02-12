import React, { useState, useEffect } from 'react';
import './App.css';
import BotCollection from './components/BotCollection';
import YourBotArmy from './components/YourBotArmy';

const API_BASE_URL = 'http://localhost:8001';

function App() {
  const [bots, setBots] = useState([]);
  const [selectedBots, setSelectedBots] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/bots`);
      if (!response.ok) {
        throw new Error('Failed to fetch bots');
      }
      const data = await response.json();
      setBots(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleBotClick = (bot) => {
    if (!selectedBots.includes(bot)) {
      setSelectedBots([...selectedBots, bot]);
    }
  };

  const handleReleaseBot = (botId) => {
    setSelectedBots(selectedBots.filter(bot => bot.id !== botId));
  };

  const handleDischargeBot = async (botId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bots/${botId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete bot');
      }
      setSelectedBots(selectedBots.filter(bot => bot.id !== botId));
    } catch (error) {
      console.error('Error discharging bot:', error);
    }
  };

  return (
    <div className="App">
      <h1>Bot Battlr</h1>
      <div className="container">
        <BotCollection bots={bots} onClick={handleBotClick} />
        <YourBotArmy bots={selectedBots} onRelease={handleReleaseBot} onDischarge={handleDischargeBot} />
      </div>
    </div>
  );
}

export default App;
