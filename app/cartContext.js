// contexts/CartContext.js
"use client"
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  console.log("Cart Provider")
  const [cart, setCart] = useState([]);
  console.log(`cart: ${cart} `)

  // useEffect(() => {
  // }, []);

  useEffect(() => {
    if (cart.length === 0) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart && JSON.parse(savedCart).length > 0) {
        setCart(JSON.parse(savedCart));
      }
    }
    else {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prevCart, product];
    });
  };
  const increaseQuantity = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === productId);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return prevCart;
    });
  }

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === productId);
      if (existingProduct && existingProduct.quantity > 1) {
        return prevCart.map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart;
    });
  }
  const removeFromCart = (productId) => {
    if (cart.length === 1 && cart[0]._id === productId) {
      localStorage.removeItem('cart');
      setCart([]);
    }
    else {
      setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    }
  }
  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
