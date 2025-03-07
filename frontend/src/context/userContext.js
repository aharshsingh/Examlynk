import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(()=>{
    if(isLoggedIn){
      const info = localStorage.getItem("user");
      setUser(JSON.parse(info));
    }
  },[]);

    const fetchUser = async (token) => {
      try {
        const response = await axios.get('https://examlynk.onrender.com/getuser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setIsLoggedIn(true);
        // const name = userEmail.split('@')[0];
        // setUserName(name);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
