import React, { useState } from 'react';

const CARD_SUITS = ['♠️', '♣️', '♥️', '♦️'];
const CARD_COLORS = ['black', 'black', 'red', 'red'];
const CARD_RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const allCards = [];

CARD_SUITS.forEach((suit, suitIndex) => {
  CARD_RANKS.forEach((rank) => {
    allCards.push({
      suit,
      color: CARD_COLORS[suitIndex],
      rank,
    });
  });
});

const CardDeck = () => {
  const [cards, setCards] = useState(Array.from({ length: 50 }, generateRandomCard));

  function generateRandomCard() {
    const suitIndex = Math.floor(Math.random() * CARD_SUITS.length);
    const color = CARD_COLORS[suitIndex];
    const suit = CARD_SUITS[suitIndex];
    const rank = CARD_RANKS[Math.floor(Math.random() * CARD_RANKS.length)];
    return { suit, color, rank };
  }

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndex = e.dataTransfer.getData('text/plain');
    const newCards = [...cards];
    const [dragCard] = newCards.splice(dragIndex, 1);
    newCards.splice(dropIndex, 0, dragCard);
    setCards(newCards);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {cards.map(({ suit, color, rank }, index) => (
        <div
          key={index}
          style={{
            width: '100px',
            height: '150px',
            border: '1px solid black',
            margin: '10px',
            backgroundColor: 'white',
            color,
          }}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={handleDragOver}
        >
          <div style={{ fontSize: '60px', textAlign: 'center' }}>{rank}</div>
          <div style={{ fontSize: '40px', textAlign: 'center' }}>{suit}</div>
        </div>
      ))}
    </div>
  );
};

export default CardDeck;
