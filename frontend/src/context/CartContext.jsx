import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
          withCredentials: true,
        });
        setCart(res.data);
      } catch {
        setCart({ items: [], total: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem('access_token');
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/add/`,
        { product_id: productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log(res.data);
      setCart(res.data);
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/cart/items/${itemId}/update/`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
          withCredentials: true,
        }
      );
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        withCredentials: true,
      });
      setCart(res.data);
      console.log(cart);
    } catch (err) {
      // Handle error
      console.log(err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart/items/${itemId}/remove/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        withCredentials: true,
      });
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        withCredentials: true,
      });
      setCart(res.data);
    } catch (err) {
      // Handle error
    }
  };

  const getItemQuantity = (productId) => {
    const item = cart.items?.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const getTotalItems = () => (cart.items ?? []).reduce((sum, item) => sum + item.quantity, 0);

  const getTotalPrice = () => {
    return (cart.items ?? [])
      .reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        getItemQuantity,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
