import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const [testId, setTestId] = useState(() => localStorage.getItem('testId') || '');
  const [test, setTest] = useState(() => JSON.parse(localStorage.getItem('test')) || {}); 
  const [questions, setQuestions] = useState(() => JSON.parse(localStorage.getItem('questions')) || []); 

  useEffect(() => {
    if (testId) {
      localStorage.setItem('testId', testId);
    }
  }, [testId]);

  useEffect(() => {
    if (test && Object.keys(test).length > 0) {
      localStorage.setItem('test', JSON.stringify(test));
    }
  }, [test]);

  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem('questions', JSON.stringify(questions));
    }
  }, [questions]);

  return (
    <TestContext.Provider value={{testId, setTestId, test, setTest, questions, setQuestions}}>
      {children}
    </TestContext.Provider>
  );
};
