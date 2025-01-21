import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext'; 
import {Link} from 'react-router-dom';
import '../styles/AdminPage.css';

export default function AminUploadQue() {
  const { userName } = useContext(UserContext); 
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [testId, setTestId] = useState('');
  const [marks, setMarks] = useState('1');
  const [correctOption, setCorrectOption] = useState('');
  const token = localStorage.getItem('UserToken');
  const TestID = localStorage.getItem('TestID'); 

  const getAuthHeaders = () => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const temp = [option1, option2, option3, option4];
      console.log(temp);

      const response = await axios.post(
        'https://examlynk.onrender.com/uploadQuestion',
        {
          question,
          options: temp,
          testId: TestID,
          marks,
          correctOption,
        },
        getAuthHeaders()
      );

      console.log(response.data);
      alert('Question uploaded successfully!');
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized', error);
      } else {
        console.error('Error in uploading question:', error);
      }
    }
  };

  return (
    <div className="admin-container">
      <form onSubmit={handleSubmission} className="admin-form">
        <h1 className="admin-heading">Hello, {userName || 'Admin'}</h1>

        <label className="admin-label">Enter the Question</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="admin-input"
          placeholder="Question"
          required
        />

        <label className="admin-label">Enter 1st option</label>
        <input
          type="text"
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
          className="admin-input"
          placeholder="1st Option"
          required
        />

        <label className="admin-label">Enter 2nd option</label>
        <input
          type="text"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
          className="admin-input"
          placeholder="2nd Option"
          required
        />

        <label className="admin-label">Enter 3rd option</label>
        <input
          type="text"
          value={option3}
          onChange={(e) => setOption3(e.target.value)}
          className="admin-input"
          placeholder="3rd Option"
          required
        />

        <label className="admin-label">Enter 4th option</label>
        <input
          type="text"
          value={option4}
          onChange={(e) => setOption4(e.target.value)}
          className="admin-input"
          placeholder="4th Option"
          required
        />

        <label className="admin-label">Enter Test ID</label>
        <input
          type="text"
          value={TestID}
          onChange={(e) => setTestId(e.target.value)}
          className="admin-input"
          placeholder="Test ID"
          required
        />

        <label className="admin-label">Enter correct Option for this question</label>
        <input
          type="text"
          value={correctOption}
          onChange={(e) => setCorrectOption(e.target.value)}
          className="admin-input"
          placeholder="Correct Option"
          required
        />

        <button type="submit" className="admin-submit-button">Submit</button>
        <Link to='/adminReposQue'><button>Repostion Questions</button></Link>
      </form>
    </div>
  );
}
