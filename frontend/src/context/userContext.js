import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const token = localStorage.getItem('UserToken');
        const response = await axios.get('https://examlynk.onrender.com/getUserEmail', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userEmail = response.data.email; 
        const name = userEmail.split('@')[0];
        setUserName(name);
        console.log(userName)
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchUserEmail();
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId, userName }}>
      {children}
    </UserContext.Provider>
  );
};
