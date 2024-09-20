import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Test.css';
import { UserContext } from '../context/userContext';

export default function Test() {
  const [test, setTest] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const videoRef = useRef(null);
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
        const response = await axios.get('https://localhost:7000/test', getAuthHeaders());
        // console.log(response.data);
        setTest(response.data);
        await getQuestionsSequentially(response.data.questions);
      } catch (error) {
        console.log(error);
      }
    };
    getTest();
  }, []);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
          };
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    startVideo();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const getQuestionsSequentially = async (questionIds) => {
    const fetchedQuestions = [];
    for (let id of questionIds) {
      try {
        const response = await axios.get(`https://localhost:7000/question/${id}`, getAuthHeaders());
        fetchedQuestions.push(response.data);
      } catch (error) {
        console.log(`Error fetching question with ID ${id}`, error);
      }
    }
    setQuestions(fetchedQuestions);
  };

  useEffect(() => {
    console.log('Updated questions:', questions);
  }, [questions]);

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

      await axios.post('https://localhost:7000/uploadSubmission', submission, getAuthHeaders());
      alert('Answers submitted successfully!');
      navigate('/finish');
    } catch (error) {
      console.log('Error submitting answers:', error);
    }
  };

  if (questions.length === 0) {
    return (
      <p className='loading' style={{ marginTop: '350px', marginLeft: '850px', color: 'white', fontSize: '30px' }}>
        Loading questions...
      </p>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <div className='headerTest'>
        <p className='headerTitle'>{test.title}</p>
      </div>

      <div>
        <p className='questionp'>Question {currentQuestionIndex + 1}</p>
        <div className='horizontalLine'></div>
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
        <div className='cameraContainer'>
          <video ref={videoRef} className='cameraPreview' autoPlay muted></video>
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
