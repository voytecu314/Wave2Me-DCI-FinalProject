import './Learn.css';
import banana from '../../assets/banana.mp4'
//import {useEffect} from 'react';

const Learn = () => {

  
  return (
    <div>
             
            <h1 class="heading">
              LEARN-SIGN-LANGUAGE
            </h1>

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