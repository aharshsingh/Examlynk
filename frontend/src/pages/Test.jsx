import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Test.css';
import { UserContext } from '../context/userContext';

export default function Test() {
  const [test, setTest] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  const token = localStorage.getItem('UserToken');

  const getAuthHeaders = () => ({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  useEffect(() => {
    const getTest = async () => {
      try {
        const response = await axios.get('https://examlynk.onrender.com/test', getAuthHeaders());
        console.log(response.data)
        setTest(response.data);
        await getQuestionsSequentially(response.data.questions);
        setLoading(false); 
      } catch (error) {
        setLoading(false); 
        if (error.response && error.response.status === 401) {
          setErrorMessage('Unauthorized access. Please log in to continue.');
        } else {
          setErrorMessage('An error occurred while fetching the test. Please try again later.');
          console.error('Error fetching test:', error); 
        }
      }
    };
    getTest();
  }, []);

  const getQuestionsSequentially = async (questionIds) => {
    const fetchedQuestions = [];
    for (let id of questionIds) {
      try {
        const response = await axios.get(`https://examlynk.onrender.com/question/${id}`, getAuthHeaders());
        fetchedQuestions.push(response.data);
      } catch (error) {
        console.log(`Error fetching question with ID ${id}`, error);
      }
    }
    setQuestions(fetchedQuestions);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionChange = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: {
        option,
        savedAt: new Date().toISOString()
      }
    });
  };

  const handleSubmitAnswers = async () => {
    try {
      const endedAt = new Date().toISOString();
      const formattedAnswers = Object.entries(answers).map(([questionId, { option, savedAt }]) => ({
        questionId,
        option,
        savedAt
      }));

      const submission = {
        testId: test._id,
        userId: userId,
        selections: formattedAnswers,
        endedAt
      };
      console.log(userId);
      console.log(submission);

      await axios.post('https://examlynk.onrender.com/uploadSubmission', submission, getAuthHeaders());
      alert('Answers submitted successfully!');
      navigate('/finish');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Unauthorized access. Please log in to continue.');
      } else {
        setErrorMessage('An error occurred while submitting answers. Please try again later.');
        console.log('Error submitting answers:', error);
      }
    }
  };

  if (loading) {
    return (
      <p className='loading' style={{ marginTop: '350px', marginLeft: '850px', color: 'white', fontSize: '30px' }}>
        Loading questions...
      </p>
    );
  }

  if (questions.length === 0) {
    return (
      <p className='loading' style={{ marginTop: '350px', marginLeft: '850px', color: 'white', fontSize: '30px' }}>
        No questions available.
      </p>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <div className='headerTest'>
        <p className='headerTitle'>{test.title}</p>
      </div>

      {errorMessage && (
        <div className="error-container" style={{ margin: '20px', color: 'red', backgroundColor: '#f8d7da', padding: '10px', borderRadius: '5px' }}>
          <p className="error-message">{errorMessage}</p>
        </div>
      )}

      <div>
        <p className='questionp'>Question {currentQuestionIndex + 1}</p>
        <div className='horizontalLine'></div>
        <div style={{display:'flex', columnGap:'500px'}}>
          <div>
          <p className='questionpara'>{currentQuestion.question}</p>
          <div className='optionsdiv'>
            {currentQuestion.options.map((option, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name={`question-${currentQuestion._id}`}
                  value={option}
                  checked={answers[currentQuestion._id]?.option === option}
                  onChange={() => handleOptionChange(currentQuestion._id, option)}
                />
                {option}
              </label>
            </div>
            ))}
          </div>
        <div style={{display:'flex'}}>
          <div className='verticalLine'></div>
          <div className='questionSerial'></div>
        </div>
        </div>
        </div>
      </div>
      <div>
        <button
          id='driverbutton1'
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          id='driverbutton2'
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </button>
        <button
          className='submitbutton'
          onClick={handleSubmitAnswers}
        >
          Submit Answers
        </button>
      </div>
    </div>
  );
}
