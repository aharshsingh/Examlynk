import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Test.css';
import { UserContext } from '../context/userContext';
import { getTest, handleSubmitAnswers } from '../uitls/Test';
import { TestContext } from '../context/testContext';
import logo from '../public/logo-transparent-png.png';

export default function Test() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const {testId, test, setTest, questions, setQuestions} = useContext(TestContext);

  useEffect(() => {
    getTest(setTest, setLoading, setErrorMessage, setQuestions, testId);
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    console.log(user)
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
    <>
     <div>
            <img style={{width:'120px', height:'120px'}} src={logo} alt='logo' />
          </div>
    <div>
      <div className='headerTest'>
        <p className='headerTitle'>{test.title}</p>
      </div>
      <div className='horizontalLine'></div>
      {errorMessage && (
        <div className="error-container" style={{ margin: '20px', color: 'red', backgroundColor: '#f8d7da', padding: '10px', borderRadius: '5px' }}>
          <p className="error-message">{errorMessage}</p>
        </div>
      )}

      <div>
        <p className='questionp'>Question {currentQuestionIndex + 1}</p>
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
          onClick={()=> handleSubmitAnswers(testId, answers, user._id , setErrorMessage, navigate)}
        >
          Submit Answers
        </button>
      </div>
    </div>
    </>
  );
}
