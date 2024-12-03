import React, { createContext, useState, useEffect } from 'react';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [FavoriteItems, setFavoriteItems] = useState(() => {
    const savedFavoriteItems = localStorage.getItem('FavoriteItems');
    return savedFavoriteItems ? JSON.parse(savedFavoriteItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('FavoriteItems', JSON.stringify(FavoriteItems));
  }, [FavoriteItems]);

  const addToFavorite = (product) => {
    setFavoriteItems((prevItems) => {
      // Check if the product is already in favorites
      const isAlreadyFavorite = prevItems.some(item => item.id === product.id);
      if (isAlreadyFavorite) {
        return prevItems; // Return the existing list without adding the duplicate
      }
      return [...prevItems, product]; // Add the product if it's not already in the list
    });
  };

  const removeFromFavorite = (productId) => {
    setFavoriteItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  return (
    <FavoriteContext.Provider value={{ FavoriteItems, addToFavorite, removeFromFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
