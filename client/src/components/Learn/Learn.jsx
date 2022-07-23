import './Learn.css';
import uploadingVid from '../../assets/uploading_bar.mp4'
import { useState, useRef, useEffect } from 'react';


const Learn = () => {
  const initialPositions = {favorites: 90, workOnIt: 93.3, another: 96.6};
  const expandedPositions = {favorites: 0, workOnIt: 3, another: 6};
 
  const [modalsPosition, setModalsPosition] = useState(initialPositions);
  const [videoOfTheDay, setVideoOfTheDay] = useState({title: 'Loading...', data: uploadingVid});      
  const [selectSearch, setSelectSearch] = useState('');  
  const [submitted, setSubmitted] = useState(false); 

  const favoritesRef = useRef();
  const workOnItRef = useRef();
  const anotherRef = useRef();
  
  const onChangeHandler = (e) => {
	  
	  if(e.target.value) {
	  
		  fetch('http://localhost:5000/searchVideos', {
			  method: 'POST',
			  headers: {'Content-Type':'application/json'},
			  body: JSON.stringify({ input: e.target.value })
		  })
		  .then(res=>res.json())
		  .then(data=>setSelectSearch(data))
		  .catch(console.log);
	  
	  }
	  
  }
  
  const submitHandler = (e) => {
	e.preventDefault();
	let input = '';
	
	switch(e.target.tagName) {
		
		case 'FORM': input = e.target.firstChild.firstChild.value;
		break;
		
		case 'SELECT': e.target.previousSibling.firstChild.value = e.target.value;
		return;
		
		case 'I': input = e.target.parentElement.previousSibling.value;
		break;
		
		default: return;
	}
	
	fetch('http://localhost:5000/searchVideo', {
			  method: 'POST',
			  headers: {'Content-Type':'application/json'},
			  body: JSON.stringify({ input })
		  })
		  .then(res=>res.json())
  .then(video=>{
				setVideoOfTheDay({title:video.title,data:video.data});
				setSubmitted(true);
				})
		  .catch(console.log);
	
  }

  useEffect(()=>{
    favoritesRef.current.style.left = modalsPosition.favorites+'%';
    workOnItRef.current.style.left = modalsPosition.workOnIt+'%';
    anotherRef.current.style.left = modalsPosition.another+'%';

    if(modalsPosition.favorites >= 90) {
      favoritesRef.current.style.height = '0';
      } else {
        favoritesRef.current.style.height = '100vh';
      }
    
    if(modalsPosition.workOnIt >= 90) {
      workOnItRef.current.style.height = '0';
      } else {
        workOnItRef.current.style.height = '100vh';
      }

    if(modalsPosition.another >= 90) {
      anotherRef.current.style.height = '0';
      } else {
        anotherRef.current.style.height = '100vh';
      }

  },[modalsPosition]);
  
  useEffect(()=>{
	  
	fetch('http://localhost:5000/video-of-the-day')
	.then(res=>res.json())
	.then(video=>{
			setVideoOfTheDay({title: video.title, data: video.data});
		})
		.catch(console.log);
	  
  },[]);

  const resizeModal = (modal_name) => {

    switch(modal_name){

      case 'favorites': modalsPosition.workOnIt > 10 ? 
                        setModalsPosition(prev => prev = modalsPosition[modal_name] < 10? initialPositions : {...initialPositions, [modal_name]:expandedPositions.favorites}) :
                        setModalsPosition({...initialPositions, [modal_name]:expandedPositions.favorites});
      break;

      case 'workOnIt': modalsPosition.another > 10 ? 
                       setModalsPosition(prev => prev = modalsPosition[modal_name] < 10? {...initialPositions, 'favorites': expandedPositions.favorites} : {...expandedPositions, 'another':initialPositions.another}) :
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
        <div id="first-page">
            <form id="search-container" onSubmit={submitHandler}>
				<div id='search-div'>
				  <input
				  onChange={onChangeHandler} 
				  type='text'
				  name='search' 
				  placeholder='Search sign videos here' /> 
				  <span id='search-btn'>
					<i  id='search-vid-icon'
						className="fas fa-search" 
						onClick={submitHandler}>
					</i>
				  </span>
				</div>
				 {selectSearch.length>0 && <select style={{color:'black'}}  onChange={submitHandler}>
						<option value=''></option>
						{selectSearch.map((video,i)=><option key={i} style={{color:'black'}} value={video.title}>{video.title}</option>)}
				 </select>}
            </form>
			
			<div className="text">
				<h5> {submitted ? videoOfTheDay.title.toUpperCase() : 'Word of the day: '+videoOfTheDay.title.toUpperCase()}</h5>
            </div>
            
            <div className="img-container">
                <video src={videoOfTheDay.data} width="1000" type="video/mp4" controls autoPlay loop>
					Your browser does not support the video tag.</video> 
            </div>
            
            <div id="video-likes">
				<i className="fa fa-heart" title="Add to favorites">
          <i className="fa fa-heart" style={{position: 'absolute'}}></i>
        </i>
				<i className='fas fa-business-time' title="Work on it later"></i>
			</div>
          
        </div>
        <div id="favorites-modal" ref={favoritesRef}>
          <div className="dummy-margin-top" style={{height: '15px', cursor: 'pointer'}} onClick={()=>setModalsPosition(initialPositions)}>
		  {modalsPosition.workOnIt<90 && <><i className="fas fa-search"></i><i className="fa fa-arrow-right"></i></>}</div>
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