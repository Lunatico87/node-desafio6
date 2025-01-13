import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../config/constans';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(ENDPOINT.users, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(ENDPOINT.login, { email, password });
    const { user, token } = response.data;
    console.log("Login response user:", user); // Debug line
    console.log("Login response token:", token); // Debug line
    setUser({ ...user, token });
    localStorage.setItem("token", token); // Store token in local storage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Remove token from local storage
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
