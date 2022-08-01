import './Learn.css';
// eslint-disable-next-line
import jwtProblem from './jwtProblem.jsx';
import uploadingVid from '../../assets/uploading_bar.mp4';
import notFound from '../../assets/404pagenotfound.mp4';
import decodeJWTPayload from '../../helpers/decodeJWTPayload.js';
import updateUserData from '../../helpers/updateUserData';
import { useState, useRef, useEffect, useContext } from 'react';
import MyContext from '../../context/MyContext.js';


const Learn = () => {

  const {landingModal, setLandingModal} = useContext(MyContext);
 
  const initialPositions = {favorites: 90, workOnIt: 93.3, another: 96.6};
  const expandedPositions = {favorites: 0, workOnIt: 3, another: 6};
 
  const [userData, setUserData] = useState({favorites: [], workOnIt: [], points: 0, dataID: null});console.log(userData);
  const [modalsPosition, setModalsPosition] = useState(initialPositions);
  const [videoData, setVideoData] = useState({title: 'Loading...', data: uploadingVid, videoID: null});      
  const [selectSearch, setSelectSearch] = useState('');  
  const [submitted, setSubmitted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);  
  const [toWorkOnIt, setToWorkOnIt] = useState(false);

  const favoritesRef = useRef();
  const workOnItRef = useRef();
  const anotherRef = useRef();
  const heartRef = useRef();
  const workOnVideoRef = useRef();

  useEffect(()=>{
    if(workOnVideoRef.current) workOnVideoRef.current.style.color=toWorkOnIt?'#9168a1':'white';
    if(heartRef.current) heartRef.current.style.color=isLiked?'#7f6ea6':'white';
    //setToWorkOnIt(userData.workOnIt.includes(videoData.videoID));
    //setIsLiked(userData.favorites.includes(videoData.videoID));
  },[videoData]); 
  
  const workOnVideo = () =>{
    if(userData.dataID && videoData.videoID){
      if(!toWorkOnIt){
        userData.workOnIt.push(videoData.videoID);
        userData.points+=2;
        updateUserData(userData,'workOnIt');
      } else {
        userData.points+=2;
        const removeID = userData.workOnIt.filter(id=>id!==videoData.videoID);
        updateUserData({...userData,workOnIt:removeID},'workOnIt');
        setUserData({...userData, workOnIt: removeID});
      }
      
      setToWorkOnIt(!toWorkOnIt)
      workOnVideoRef.current.classList.add("shake");
      workOnVideoRef.current.style.color=!toWorkOnIt?'#9168a1':'white';
      setTimeout(()=>{ workOnVideoRef?.current && workOnVideoRef.current.classList.remove("shake");},1000);
    }
  }
   
  const likeVideo = () =>{
    if(userData.dataID && videoData.videoID){
      if(!isLiked){
        userData.favorites.push(videoData.videoID);
        userData.points+=3;
        updateUserData(userData,'favorites');
      } else {
        const removeID = userData.favorites.filter(id=>id!==videoData.videoID);
        updateUserData({...userData, favorites: removeID},'favorites');
        setUserData({...userData, favorites: removeID});
      }
      heartRef.current.parentElement.style.color=isLiked?'white':'#7f6ea6';
      heartRef.current.style.color='#7f6ea6';
      heartRef.current.style.top='-4500%';
      heartRef.current.style.transform="rotateY(1080deg)";
      heartRef.current.style.opacity='1';
      setIsLiked(!isLiked);
    }
  }
    
  useEffect(()=> {

    let resetHeart;
    if(heartRef.current){
    resetHeart = setTimeout(() => {
      heartRef.current.style.color=isLiked?'#7f6ea6':'white';
      //heartRef.current.style.opacity='0';
      heartRef.current.style.top='0';
      heartRef.current.style.transform="initial";
    }, 1000);}

    return ()=>{resetHeart && clearTimeout(resetHeart)};

  },[isLiked]);

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
		             input && setVideoData({title: 'Loading...', data: uploadingVid});
	  break;
		
		case 'SELECT': e.target.previousSibling.firstChild.value = e.target.value;
		return;
		
		case 'I': input = e.target.parentElement.previousSibling.value;
		          input && setVideoData({title: 'Loading...', data: uploadingVid});
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
				if(video){
        setVideoData({title:video.title,data:video.data, videoID: video._id});
        setIsLiked(userData.favorites.includes(video._id));
        setToWorkOnIt(userData.workOnIt.includes(video._id));
				setSubmitted(true);
          } else {setVideoData({title:'Video not found.',data:notFound, videoID: null});}
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

  const userDataID = decodeJWTPayload().dataID;

 
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            token: localStorage.getItem('W2M-JWT-Token')
        },
        body: JSON.stringify({dataID: userDataID})
    }

    fetch('http://localhost:5000/get-user-data', fetchOptions)
    .then(res=>res.json())
    .then(data=>{ 
                data.token_error || !localStorage.getItem('W2M-JWT-Token') ? 
                setUserData({favorites: [], workOnIt: [], points: 0, dataID: null}) :
                data.data_error ? console.log(data) : setUserData(data)})
    .catch(err=>console.log('fetch error',err.message));

	  
	fetch('http://localhost:5000/video-of-the-day')
	.then(res=>res.json())
	.then(video=>{
			setVideoData({title: video.title, data: video.data, videoID: video._id});
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

  if(!localStorage.getItem('W2M-JWT-Token')) setLandingModal(true);

  return ( landingModal ? <jwtProblem /> :
    <div id="learn-container">
        <div id="first-page">
            <form id="search-container" onSubmit={submitHandler}>
              <div id='search-div'>
                <input
                onChange={onChangeHandler} 
                type='text'
                name='search' 
                placeholder='Search sign videos here'
                autoFocus={true} /> 
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
              <h5> 
                {submitted || videoData.title==='Video not found.' ? videoData.title.toUpperCase() : 'Video of the day: '+videoData.title.toUpperCase()}
              </h5>
            </div>
                  
            <div className="img-container">
                      <video src={videoData.data} width="1000" height="600" type="video/mp4" controls autoPlay loop>
                Your browser does not support the video tag.</video> 
            </div>
            
            {videoData.videoID &&
            <div id="video-likes">
              <i className="fa fa-heart" title={isLiked?"Remove like?":"Add to favorites"} style={{position:'relative'}}>
                <i className="fa fa-heart video-icon" ref={heartRef} onClick={likeVideo}></i>
              </i>
              <i className='fas fa-business-time' title="Work on it later" style={{position:'relative'}}>
                <i className='fas fa-business-time video-icon' ref={workOnVideoRef} onClick={workOnVideo}></i>
              </i>
            </div>}
          
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