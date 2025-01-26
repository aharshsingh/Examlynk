import axios from 'axios';
import { AuthHeader } from './AuthHeader';

export const DateSort = (event, setSelectedOption1, tests, setTests)=>{
    setSelectedOption1(event.target.value);
    var sortedTests;
    if(event.target.value === "option1"){
      sortedTests = tests.sort(
        (a,b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else{
      sortedTests = tests.sort(
        (a,b) => new Date(a.createdAt) - new Date(b.createdAt)
      )}
    setTests(sortedTests);
    return;
    }

export const TitleSort = (event, setSelectedOption2, tests, setTests)=>{
    setSelectedOption2(event.target.value);
    var sortedTests;
    if(event.target.value === "option1"){
        sortedTests = tests.sort((a, b) => 
          a.title.localeCompare(b.title)
        ); 
    } else{
        sortedTests = tests.sort((a, b) => 
          b.title.localeCompare(a.title)
        )} 
        setTests(sortedTests);
    return;
    }

export const getTest = async (setTest, setLoading, setErrorMessage, setQuestions, testId) => {
  try {
    const response = await axios.get(`http://localhost:7000/test/${testId}`, AuthHeader());
    console.log(response.data)
    setTest(response.data);
    await getQuestionsSequentially(response.data.questions, setQuestions);
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
  return;
};

const getQuestionsSequentially = async (questionIds, setQuestions) => {
  const fetchedQuestions = [];
  for (let id of questionIds) {
    try {
      const response = await axios.get(`http://localhost:7000/question/${id}`,AuthHeader());
      fetchedQuestions.push(response.data);
    } catch (error) {
      console.log(`Error fetching question with ID ${id}`, error);
    }
  }
  setQuestions(fetchedQuestions);
  return;
};

export const handleSubmitAnswers = async (answers, userId, setErrorMessage, navigate) => {
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

    await axios.post('http://localhost:7000/uploadSubmission', submission, AuthHeader());
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