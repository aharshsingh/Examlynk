import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const [testId, setTestId] = useState('');

  useEffect(()=>{
    if(testId){
      const id = localStorage.getItem("testId");
      setTestId(id);
    }
  },[testId]);
  

  return (
    <TestContext.Provider value={{testId, setTestId}}>
      {children}
    </TestContext.Provider>
  );
};
