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
             
            <h1 className="heading">
              LEARN-SIGN-LANGUAGE
            </h1>

            <div id="search-container">
              <input
              type='text'
              placeholder='Search here'
              onChange={handleChange}
              value={searchInput} />
            </div>

            <div className="img-container">
                <video controls src={banana}></video> 
            </div>
           
            
            <hr/>
          
          <div className="text">
            <h5>Word of the day: "banana"</h5>
          </div>
    
    </div>
  )
}

export default Learn;