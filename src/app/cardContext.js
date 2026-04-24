"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [activeCard, setActiveCard] = useState(null);

  // Load from storage on mount
  useEffect(() => {
    const savedCard = localStorage.getItem('selected_scry_card');
    if (savedCard) setActiveCard(JSON.parse(savedCard));
  }, []);

  // Save to storage whenever card changes
  const updateCard = (card) => {
    setActiveCard(card);
    if (card) {
      localStorage.setItem('selected_scry_card', JSON.stringify(card));
    }
  };

  return (
    <CardContext.Provider value={{ activeCard, setActiveCard: updateCard }}>
      {children}
    </CardContext.Provider>
  );
};


export const useCard = () => {
    const context = useContext(CardContext);
    if (!context) {
      throw new Error("useCard must be used within a CardProvider");
    }
    return context;
  };