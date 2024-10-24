'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Define the CartItem type to hold both id and quantity
interface CartItem {
  id: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: any) {
  // Initialize cart from localStorage or default to an empty array
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    // Update localStorage whenever cart changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add a new item to the cart or update its quantity if it already exists
  const addToCart = (id: string, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);
      if (existingItem) {
        // If item exists, update its quantity
        return prevCart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // If item doesn't exist, add it to the cart
        return [...prevCart, { id, quantity }];
      }
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Function to update quantity directly
  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
