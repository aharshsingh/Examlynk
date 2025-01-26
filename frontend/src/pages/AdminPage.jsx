import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import '../styles/AdminPage.css'
import { AuthHeader } from '../uitls/AuthHeader';

export default function AdminPage() {
  const { userName } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [descriptions, setDescriptions] = useState('');

  const navigate = useNavigate();

  const handleTestUpload = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://examlynk.onrender.com/uploadTest',
        {
          title,
          descriptions,
        },
        AuthHeader()
      );
      localStorage.setItem( "TestID", response.data._id )
      console.log(response.data);
      console.log(userName);
      alert('Test uploaded successfully!');
      navigate('/adminUploadQue');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized', error);
      } else {
        console.error('Error in uploading test:', error);
      }
    }
  };

  return (
    <div className="admin-container">
      <form onSubmit={handleTestUpload} className="admin-form">
        <h1 className="admin-heading">Hello, {userName || 'Admin'}</h1>
        <label className="admin-label">Enter the name of the test</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="admin-input"
          placeholder="Test Title"
          required
        />
        <label className="admin-label">Enter the description of the test</label>
        <input
          type="text"
          value={descriptions}
          onChange={(e) => setDescriptions(e.target.value)}
          className="admin-input"
          placeholder="Test Descriptions"
          required
        />
        <button type="submit" className="admin-submit-button">Submit</button>
      </form>
    </div>
  );
}
