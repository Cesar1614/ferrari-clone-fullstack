import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.tipo === product.tipo);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.tipo === product.tipo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const removeFromCart = (productId, tipo) => {
    setCartItems(prev =>
      prev.filter(item => !(item.id === productId && item.tipo === tipo))
    );
  };

  const clearCart = () => setCartItems([]);

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotal }}>
      {children ?? null}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
