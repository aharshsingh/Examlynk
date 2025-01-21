import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function AdminRepositingQue() {
    const[test, setTest] = useState({});
    const[questions, setQuestions] = useState([]);
    const[errorMessage, setErrorMessage] = useState(null);
    const[loading, setLoading] = useState(true); 

    const TestID = localStorage.getItem('TestID'); 
    const token = localStorage.getItem('UserToken');

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
      };

      const onDragEnd = (result)=> {
        console.log({"Drag event": result});
        const{ source, destination } = result; 
        if(!destination) 
            return;
        const reorderQues = reorder(questions, source.index, destination.index);
        setQuestions(reorderQues);
    }

    const getAuthHeaders = () => ({
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    useEffect(()=>{
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
    },[])

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
  return (
    <>
      {errorMessage && (
        <div className="error-container" style={{ margin: '20px', color: 'red', backgroundColor: '#f8d7da', padding: '10px', borderRadius: '5px' }}>
          <p className="error-message">{errorMessage}</p>
        </div>
      )}
      <div>
        <h1 style={{color: 'white'}}>Repositioning Questions</h1>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="questions">
                {(provided) => (
                    <div {...provided.droppableProps} 
                         ref={provided.innerRef}>
                        {questions.map((question, index)=>(
                            <Draggable key={question._id} draggableId={String(question._id)} index={index}>
                                {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                        ...provided.draggableProps.style,
                                        padding: '30px',
                                        margin:'20px 0',
                                        backgroundColor: 'white',
                                        border: '1px solid black',
                                        borderRadius: '25px',
                                        ...provided.draggableProps.style,
                                    }}
                                >
                                    {index + 1}. {question.question}
                                </div>
                              )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        <button style={{width: "150px", marginLeft:"870px"}}>save </button>
      </div>
    </>
  )
}
