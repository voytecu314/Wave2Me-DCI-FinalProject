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

    if(modalsPosition.favorites >= 90) {
      favoritesRef.current.style.height = '0';
      } else {
        favoritesRef.current.style.height = '120%';
      }
    
    if(modalsPosition.workOnIt >= 90) {
      workOnItRef.current.style.height = '0';
      } else {
        workOnItRef.current.style.height = '120%';
      }

    if(modalsPosition.another >= 90) {
      anotherRef.current.style.height = '0';
      } else {
        anotherRef.current.style.height = '120%';
      }

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
        <div id="favorites-modal" ref={favoritesRef}>
          <div className="dummy-margin-top" style={{height: '15px'}}></div>
          <div className='modal-icons' onClick={(e)=>resizeModal('favorites')}>
            {modalsPosition.favorites>10 ? <i className="fa fa-arrow-left"></i> : modalsPosition.workOnIt>10 ? <i className="fa fa-arrow-right"></i> : 
			<span style={{marginRight: '1%'}}></span> }
           {'    '} <i className="fa fa-heart"></i>
          </div>
        </div>
        <div id="work-on-it-modal" ref={workOnItRef}>
          <div className="dummy-margin-top" style={{height: '15px'}}></div>
          <div onClick={(e)=>resizeModal('workOnIt')} className='modal-icons'>
          {modalsPosition.workOnIt>10 ? <i className="fa fa-arrow-left"></i> : modalsPosition.another>10 ? <i className="fa fa-arrow-right"></i> : 
			<span style={{marginRight: '1%'}}></span>}
           {'    '}<i className='fas fa-business-time'></i></div>
        </div>
        <div id="another-modal" ref={anotherRef}>
          <div className="dummy-margin-top" style={{height: '15px'}}></div>
          <div onClick={(e)=>resizeModal('another')} className='modal-icons'>
            {modalsPosition.another>10 ? <i className="fa fa-arrow-left"></i> : <i className="fa fa-arrow-right"></i>}
           {'    '}<i className="fa fa-play-circle-o"></i></div>
        </div>
    </div>
  )
}

export default Learn;