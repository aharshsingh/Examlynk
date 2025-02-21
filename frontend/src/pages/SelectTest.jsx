import React, {useState, useEffect, useContext} from 'react'
import logo from '../public/logo-transparent-png.png';
import axios from 'axios';  
import '../styles/SelectTest.css'
import { AuthHeader } from '../uitls/AuthHeader';
import {Link} from 'react-router-dom';
import { DateSort, TitleSort } from '../uitls/Test';
import { TestContext } from '../context/testContext';
export default function SelectTest() {
  const[selectedOption1, setSelectedOption1] = useState('');
  const[selectedOption2, setSelectedOption2] = useState('');
  const[selectedOption3, setSelectedOption3] = useState('');
  const[tests, setTests] = useState([]);
  const {setTestId} = useContext(TestContext);

  useEffect(()=>{
    const getTest = async()=>{
      try {
        const response = await axios.get('https://examlynk.onrender.com/getalltest', AuthHeader());
        setTests(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getTest();
  },[])

  const handleChange1 = (event)=>{
    DateSort(event, setSelectedOption1, tests, setTests)
  }

  const handleChange2 = (event)=>{
    TitleSort(event, setSelectedOption2, tests, setTests);
  }

  const handleChange3 = (event)=>{
    setSelectedOption3(event.target.value);
  }

  const handlclick = (id) =>{
    localStorage.setItem("testId", id)
    setTestId(id);
  }

  return (
    <div>
      <div>
        <img style={{width:'120px', height:'120px'}} src={logo} alt='logo' />
      </div>
      <div>
        <p style={{fontSize:'35px', color:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>Select test to start</p>
      </div>
      <div style={{display:'flex', justifyContent:'center', columnGap:'100px', marginTop: '50px'}}>
        <div>
          <p style={{fontSize:'18px', color:'white', textAlign:'left'}}>Sort by Date</p>
          <select style={{width:'250px', height:'40px', fontSize:'16px', marginTop:'15px', borderRadius:'5px'}} id="options" value={selectedOption1} onChange={handleChange1}>
            <option value="" disabled>Select an option</option>
            <option value="option1">Recent to oldest</option>
            <option value="option2">Oldest to recent</option>
          </select>
        </div>
        <div>
          <p style={{fontSize:'18px', color:'white', textAlign:'left'}}>Sort by alphabets </p>
          <select style={{width:'250px', height:'40px', fontSize:'16px', marginTop:'15px', borderRadius:'5px'}} id="options" value={selectedOption2} onChange={handleChange2}>
            <option value="" disabled>Select an option</option>
            <option value="option1">A-Z</option>
            <option value="option2">Z-A</option>
          </select>
        </div>
        <div>
          <p style={{fontSize:'18px', color:'white', textAlign:'left'}}>Test status</p>
          <select style={{width:'250px', height:'40px', fontSize:'16px', marginTop:'15px', borderRadius:'5px'}} id="options" value={selectedOption3} onChange={handleChange3}>
            <option value="" disabled>Select an option</option>
            <option value="option1">All</option>
            <option value="option2">Not taken</option>
            <option value="option2">Taken</option>
          </select>
        </div>
      </div>
      <div style={{borderTop: '1px #666666 solid', width:'1000px', margin:'50px auto'}}></div>
      <div style={{display:'flex', justifyContent:'center', columnGap:'650px'}}>
        <p style={{color:'white', fontSize:'15px', fontWeight:'500'}}>Test Name</p>
        <p style={{color:'white', fontSize:'15px', fontWeight:'500'}}>Test Status</p>
      </div>
      <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'50px'}}>
        {
          tests.map((test)=>(
            <div className='glass-effect' key={test._id}>
            <p style={{color:'white', fontSize:'15px', marginLeft:'55px', marginTop:'10px'}}>{test.title}</p>
            <Link to='/enviromentpreview'><button style={{width:'120px', height:'30px', margin:'0px', marginRight:'30px', marginTop:'5px', padding:'5px'}} onClick={()=>handlclick(test._id)}>{"Start"}</button></Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}
