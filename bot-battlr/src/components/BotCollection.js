import React from 'react';

function BotCollection({ bots, onClick }) {
  return (
    <div className="bot-collection">
      <h2>Bot Collection</h2>
      <div className="bots">
        {bots.map(bot => (
          <div key={bot.id} className="bot-card" onClick={() => onClick(bot)}>
            <img src={bot.avatar_url} alt={bot.name} />
            <h3>{bot.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
