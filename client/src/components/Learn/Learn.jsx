import './Learn.css';
import banana from '../../assets/banana.mp4'
import { useState, useRef, useEffect } from 'react';


const Learn = () => {
  const initialPositions = {favorites: 90, workOnIt: 93.3, another: 96.6};
  const expandedPositions = {favorites: 3, workOnIt: 6, another: 9};
 
  const [modalsPosition, setModalsPosition] = useState(initialPositions);;                                                                               

  const favoritesRef = useRef();
  const workOnItRef = useRef();
  const anotherRef = useRef();

  useEffect(()=>{
    favoritesRef.current.style.left = modalsPosition.favorites+'%';
    workOnItRef.current.style.left = modalsPosition.workOnIt+'%';
    anotherRef.current.style.left = modalsPosition.another+'%';
  },[modalsPosition]);

  const resizeModal = (modal_name) => {

    switch(modal_name){

      case 'favorites': modalsPosition.workOnIt > 10 ? 
                        setModalsPosition(prev => prev = modalsPosition[modal_name] < 10? initialPositions : {...initialPositions, [modal_name]:expandedPositions.favorites}) :
                        setModalsPosition({...initialPositions, [modal_name]:expandedPositions.favorites});
      break;

      case 'workOnIt': modalsPosition.another > 10 ? 
                       setModalsPosition(prev => prev = modalsPosition[modal_name] < 10? {...initialPositions, 'favorites':3} : {...expandedPositions, 'another':initialPositions.another}) :
                       setModalsPosition({...expandedPositions, 'another':initialPositions.another});
      break;

      case 'another': setModalsPosition(prev => prev = modalsPosition[modal_name] < 10? {...expandedPositions, [modal_name]:initialPositions.another} : expandedPositions);
      break;

      case 'search': setModalsPosition(initialPositions);
      break;
      default: return;
    }



  }

  return (
    <div id="learn-container">
        <div id="first-page"><h1>W2M</h1>
            <span id="search-span" onClick={(e)=>resizeModal('search')}>{'Search >>'}</span>
            <div id="search-container">
              <input
              type='text'
              placeholder='Search sign videos here' />
            </div>
            
            <div className="img-container">
                <video controls src={banana} width="1000"></video> 
            </div>
            
            <hr/>
          
          <div className="text">
            <h5>Word of the day: "banana"</h5>
          </div>
        </div>
        <div id="favorites-modal" onClick={(e)=>resizeModal('favorites')} ref={favoritesRef}>
        </div>
        <div id="work-on-it-modal" ref={workOnItRef} onClick={(e)=>resizeModal('workOnIt')}>
        </div>
        <div id="another-modal" ref={anotherRef} onClick={(e)=>resizeModal('another')}>
        </div>
    </div>
  )
}

export default Learn;