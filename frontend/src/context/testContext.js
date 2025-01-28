import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthHeader } from '../uitls/AuthHeader';

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
  
  const getTest = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/test/${testId}`, AuthHeader());
      localStorage.setItem('test', JSON.stringify(response.data));
      setTest(response.data);
      console.log(response.data);
    } catch (error) {
        console.error('Error fetching test:', error); 
      }
    }

  return (
    <TestContext.Provider value={{testId, setTestId, test, setTest, questions, setQuestions, getTest}}>
      {children}
    </TestContext.Provider>
  );
};
