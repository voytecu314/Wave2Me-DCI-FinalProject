import './Learn.css';
import banana from '../../assets/banana.mp4'
import anne from '../../assets/anne.mp4'
import anne2 from '../../assets/anne2.mp4'
import { useState } from 'react';
//import {useEffect} from 'react';

const Learn = () => {

  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  }

  return (
    <div id="learn-container">
        <div id="first-page">
            <span>{'Learn >>'}</span>
            <div id="search-container">
              <input
              type='text'
              placeholder='Search sign videos here'
              onChange={handleChange}
              value={searchInput} />
            </div>

            <div className="img-container">
                <video controls src={banana}></video> 
            </div>
            <div className="img-container">
                <video controls src={banana}></video> 
            </div>
            <div className="img-container">
                <video controls src={anne}></video> 
            </div>
            <div className="img-container">
                <video controls src={anne2}></video> 
            </div>
            
            <hr/>
          
          <div className="text">
            <h5>Word of the day: "banana"</h5>
          </div>
        </div>
        <div id="second-page">

        </div>
        <div id="third-page">
          
        </div>
        <div id="fourth-page">
          
        </div>
    </div>
  )
}

export default Learn;