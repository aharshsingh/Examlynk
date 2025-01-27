import React, {useEffect, useState} from 'react'
import '../styles/QuestionNav.css';

export default function QuestionNav({handlePrevious, currentQuestionIndex, handleNext, questions, handleSubmitAnswers, testId, answers, user, setErrorMessage, navigate}) {
  const[questionState, setQuestionState] = useState([]);
  useEffect(()=>{
    const arr = [];
    for(let i=0;i<questions.length;i++){
      arr.push({
        questionIndex: i+1,
        attempted: false,
        answered: false,
        reviwed: false
      })
      setQuestionState(arr);
    }

  },[])
  return (
    <div className='glassEffect'>
      <div>
        <p style={{fontSize:'18px', padding:'10px'}}>Total Questions: {questions.length}</p>
      </div>
      <div>
        <p style={{fontSize:'15px', padding:'11px'}}>Question Palette:</p>
        <div style={{width:'380px', height:'300px', marginLeft:'10px', display:'flex', columnGap:'10px', flexWrap: 'wrap'}}>
        {
          questionState.map((que)=>(
            <div className='questionBox' key={que._id}>
            <p>{que.questionIndex}</p>
            </div>
          ))
        }
        </div>
      <div style={{display:'flex', columnGap:'20px', justifyContent:'center'}}>
        <button
          style={{width:'100px'}}
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          style={{width:'100px'}}
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </button>
      </div>
      <div style={{marginLeft:'10px', marginTop:'20px'}}>
        <div style={{display:'flex', flexDirection:'row', columnGap:'50px', marginLeft:'50px'}}>
        <div style={{display:'flex', flexDirection:'row', columnGap:'10px'}}>
          <div className='questionBox' style={{width:'20px', height:'20px'}}></div> 
          <p style={{fontSize:'13px'}}>Not visited</p>
        </div> 
        <div style={{display:'flex', flexDirection:'row', columnGap:'10px'}}>
          <div className='questionBox' style={{width:'20px', height:'20px', backgroundColor:'#f94449'}}></div> 
          <p style={{fontSize:'13px'}}>Not answered</p>
        </div> 
        </div>
        <div style={{display:'flex', flexDirection:'row', columnGap:'56px', marginLeft:'50px', marginTop:'10px'}}>
        <div style={{display:'flex', flexDirection:'row', columnGap:'10px'}}>
          <div className='questionBox' style={{width:'20px', height:'20px', backgroundColor:'#acd8a7'}}></div> 
          <p style={{fontSize:'13px'}}>Answered</p>
        </div>
        <div style={{display:'flex', flexDirection:'row', columnGap:'10px'}}>
          <div className='questionBox' style={{width:'20px', height:'20px', backgroundColor:'#ffad00'}}></div> 
          <p style={{fontSize:'13px'}}>Marked for review</p>
        </div> 
        </div>
      </div>
      <div style={{display:'flex', justifyContent:'space-around'}}>
      <button
          style={{width:'150px'}}
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Mark for review
        </button>
        <button
          style={{width:'150px'}}
          onClick={()=> handleSubmitAnswers(testId, answers, user._id , setErrorMessage, navigate)}
        >
          Submit Answers
        </button></div>
      </div>
    </div>
  )
}
