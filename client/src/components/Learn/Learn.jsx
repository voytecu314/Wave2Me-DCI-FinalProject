import './Learn.css';
import banana from '../../assets/banana.mp4'
import { useState } from 'react';
//import {useEffect} from 'react';

const Learn = () => {

  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  }

  return (
    <div>
             
            <h1 class="heading">
              LEARN-SIGN-LANGUAGE
            </h1>

            <hr/>
            <input
            type='text'
            placeholder='Search here'
            onChange={handleChange}
            value={searchInput} />

            <hr />

            <div class="img-container">
                <video controls src={banana}></video> 
            </div>
           
            
            <hr/>
          
          <div class="text">
            <h5>Word of the day: "banana"</h5>
          </div>
    
    </div>
  )
}

export default Learn;