import React, {useState} from 'react'
import logo from '../public/logo-transparent-png.png';

export default function SelectTest() {
  const[selectedOption1, setSelectedOption1] = useState('');
  const[selectedOption2, setSelectedOption2] = useState('');
  const[selectedOption3, setSelectedOption3] = useState('');

  const handleChange = ()=>{
    setSelectedOption1()
  }
  return (
    <div>
      <div>
        <img style={{width:'120px', height:'120px'}} src={logo} alt='logo' />
      </div>
      <div>
        <p style={{fontSize:'25px', color:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>Select test to start</p>
      </div>
      <div>
        <div>
          <p>Sort by Date</p>
          <select id="options" value={selectedOption1} onChange={handleChange()}>
            <option value="" disabled>Select an option</option>
            <option value="option1">Recent to oldest</option>
            <option value="option2">Oldest to recent</option>
          </select>
        </div>
      </div>
    </div>
  )
}
