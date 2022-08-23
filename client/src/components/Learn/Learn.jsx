import { useState, useRef, useEffect, useContext } from 'react';
import MyContext from '../../context/MyContext.js';
import TopUsers from './TopUsers.jsx';
import './Learn.css';
import uploadingVid from '../../assets/uploading_bar.mp4';
import notFound from '../../assets/404pagenotfound.mp4';
import updateUserData from '../../helpers/updateUserData';
import fetchMyVideos, { fetchMyQuiz } from '../../helpers/fetchMyVideos.js';


const Learn = () => {

  const {setLandingModal,justEarnedPoints ,setJustEarnedPoints, setPointsPopup, payload} = useContext(MyContext);
  const userDataID = payload.dataID;
  const initialPositions = {favorites: 90, workOnIt: 93.3, quiz: 96.6};
  const expandedPositions = {favorites: 0, workOnIt: 3, quiz: 6};
 
  const [userData, setUserData] = useState({favorites: [], workOnIt: [], points: 0, dataID: null});
  const [modalsPosition, setModalsPosition] = useState(initialPositions);
  const [videoData, setVideoData] = useState({title: 'Loading...', data: uploadingVid, videoID: null});  
  const [chosenVideosData, setChosenVideosData] = useState({favorites:[], workOnIt: []});
  const [selectSearch, setSelectSearch] = useState('');  
  const [submitted, setSubmitted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);  
  const [toWorkOnIt, setToWorkOnIt] = useState(false);
  const [level, setLevel] = useState({level: 0, levelName: 'NOVICE'});
  const [topUsersIsOpen, setTopUsersIsOpen] = useState(false);
  const [quizVideo, setQuizVideo] = useState(null);

  const favoritesRef = useRef();
  const workOnItRef = useRef();
  const quizRef = useRef();
  const heartRef = useRef();
  const workOnVideoRef = useRef();
  const favVidRef = useRef();
  const workVidRef = useRef();
  const quizVidRef = useRef();
  const levelBarRef = useRef();
  const topRef = useRef();

  const levelName = ['NOVICE',
                     'LEARNING NOVICE', 
                     'BEGINNER',
                     'PROGRESSING BEGINNER',
                     'ENTERING INTERMEDIATE',
                     'ALMOST INTERMEDIATE',
                     'INTERMEDIATE',
                     'PROGRESSING INTERMEDIATE',
                     'ADVANCED',
                     'EXPERT',
                     'MASTER',
                     'MAESTRO',
                     'THE SUPER USER',
                     'THE KING OF THE APP'];

  useEffect(()=>{
    if(heartRef.current && userData.favorites.includes(videoData.videoID)) {
      heartRef.current.style.color='#7f6ea6';
      heartRef.current.title="Remove like?";}
    else if(heartRef.current) {
      heartRef.current.style.color='white';
      heartRef.current.title="Add to favorites";
    }
  },[userData.favorites,videoData.videoID]);
  
  useEffect(()=>{
    if(workOnVideoRef.current && userData.workOnIt.includes(videoData.videoID)) {
      workOnVideoRef.current.style.color='#9168a1';
      workOnVideoRef.current.title="Remove icon?";}
    else if(workOnVideoRef.current) {
      workOnVideoRef.current.style.color='white';
      workOnVideoRef.current.title="Work on it later"}
  },[userData.workOnIt,videoData.videoID]);


  const favList = () => {

    return    chosenVideosData.favorites.map((vidData,i)=>
                            <div key={'fav_'+i}>

                              <div className="img-container">
                                        <video 
                                              src={vidData.data} 
                                              type="video/mp4"
                                              onPlay={()=>addPoints(level.level)} 
                                              onPause={()=>addPoints(level.level)}
                                              controls 
                                              loop>
                                  Your browser does not support the video tag.</video> 
                              </div>
                              
                              <div className="text">
                                <h5 className='fav-title'> 
                                  {vidData.title.toUpperCase()}
                                </h5>
                              </div>

                              <div className="fav-delete">
                                <i className="fa fa-trash-o" 
                                  title='Remove this video from favorites' 
                                  onClick={(e)=>{setIsLiked(!isLiked);
                                    removeVid('favorites',vidData._id);
                                    fetchMyVideos(setChosenVideosData,{...userData,favorites:userData.favorites.filter(id=>id!==vidData._id)},chosenVideosData,'favorites');
                                                  }}
                                  style={{cursor:'pointer', color: '#404756'}}></i>
                                <i className="fa fa-arrow-up" 
                                  title='Remove this video from favorites' 
                                  onClick={(e)=>{setIsLiked(!isLiked);
                                    removeVid('favorites',vidData._id);
                                    fetchMyVideos(setChosenVideosData,{...userData,favorites:userData.favorites.filter(id=>id!==vidData._id)},chosenVideosData,'favorites');
                                                  }}
                                  style={{cursor:'pointer', 	color: '#404756'}}></i>
                              </div> 

                            </div>) ;
  }

  const workOnItList = () => {

    return    chosenVideosData.workOnIt.map((vidData,i)=>
                            <div key={'work_'+i}>

                              <div className="img-container">
                                        <video 
                                              src={vidData.data} 
                                              type="video/mp4"
                                              onPlay={()=>addPoints(level.level)} 
                                              onPause={()=>addPoints(level.level)}
                                              controls 
                                              loop>
                                  Your browser does not support the video tag.</video> 
                              </div>
                              
                              <div className="text">
                                <h5 className='fav-title'> 
                                  {vidData.title.toUpperCase()}
                                </h5>
                              </div>

                              <div className="fav-delete">
                                <i className="fa fa-trash-o" 
                                  title='Remove this video from workOnIt' 
                                  onClick={(e)=>{
                                    removeVid('workOnIt',vidData._id);
                                    fetchMyVideos(setChosenVideosData,{...userData,workOnIt:userData.workOnIt.filter(id=>id!==vidData._id)},chosenVideosData,'workOnIt');
                                                  }}
                                  style={{cursor:'pointer', color: '#404756'}}></i>
                                <i className="fa fa-arrow-up" 
                                  title='Remove this video from workOnIt' 
                                  onClick={(e)=>{
                                    removeVid('workOnIt',vidData._id);
                                    fetchMyVideos(setChosenVideosData,{...userData,workOnIt:userData.workOnIt.filter(id=>id!==vidData._id)},chosenVideosData,'workOnIt');
                                                  }}
                                  style={{cursor:'pointer', 	color: '#404756'}}></i>
                              </div> 

                            </div>) ;
  }

  function getLevel (n) { //based on Fibonacci sequence

    if (n <= 3) {
      return {level:0, levelName: 'NOVICE'};
    }
     
    let a = 0, b = 1, c = 1, level = -4;
    
    while (c < n) {
      c = a + b;
      a = b;
      b = c;
      level++;
    }
    
    return {level, levelName: levelName[Math.floor(level/5)]};
  };

  const addPoints = (points) => {

    if(points<=0) points=1;

    updateUserData({...userData, points: userData.points+points});
    setUserData({...userData, points: userData.points+points});
    setJustEarnedPoints(justEarnedPoints+points);
  }
  
  const removeVid = (property,videoID) => {
        userData.points+=2;
        const removeID = userData[property].filter(id=>id!==videoID);
        updateUserData({...userData,[property]:removeID},property);
        setUserData({...userData, [property]: removeID});
  }
  
  const workOnVideo = () =>{
    const property = 'workOnIt';
    if(userData.dataID && videoData.videoID){
      if(!toWorkOnIt){
        userData.workOnIt.push(videoData.videoID);
        userData.points+=Math.floor(level.level*1.5);
        setJustEarnedPoints(justEarnedPoints+Math.floor(level.level*1.5))
        updateUserData(userData,property);
        setUserData({...userData,[property]:[...userData[property]]});
      } else {
        removeVid(property,videoData.videoID);
      }
      
      setToWorkOnIt(!toWorkOnIt)
      workOnVideoRef.current.classList.add("shake");
      setTimeout(()=>{ workOnVideoRef?.current && workOnVideoRef.current.classList.remove("shake");},1000);
    }
  }

  const likeVideo = () =>{
    const property = 'favorites';

    if(userData.dataID && videoData.videoID){
      if(!isLiked){
        userData.favorites.push(videoData.videoID);
        userData.points+=Math.floor(level.level*1.75);
        setJustEarnedPoints(justEarnedPoints+Math.floor(level.level*1.75))
        updateUserData(userData,property);
        setUserData({...userData,[property]:[...userData[property]]});
      } else {
        removeVid(property,videoData.videoID);
      }
      heartRef.current.style.top='-4500%';
      heartRef.current.style.transform="rotate(1080deg)";
      heartRef.current.style.opacity='1';
      setIsLiked(!isLiked);
    }
  }

   //fibonacci based

   const getFibonacciNumber = (level) => {

    if(level<2) return {previous:1, next:1};
          
    let a = 0, b = 1, c;
      
    for(let i = 2; i <= level; i++) {
          c = a + b;
          a = b;
          b = c;
      }

      return {previous: a, next: c}
  }

  const quizAnswer = (e) => {
    if(e.target.innerText===quizVideo.title) {
      const points = level.level<15?getFibonacciNumber(level.level).next:getFibonacciNumber(level.level).previous;
      addPoints(points);
      const earnedQuizPoints = () => {
        return `\n For this answer you are receiving ${points} points!`
      }
      alert(Math.round(Math.random())?`Correct answer! ${earnedQuizPoints()}`:`Well done!${earnedQuizPoints()}`);
      fetchMyQuiz(setQuizVideo, level.level);
    }
    else {
      alert(Math.round(Math.random())?`Try again!`:Math.round(Math.random())?`Better next time!`:`Almost...`);
      fetchMyQuiz(setQuizVideo, level.level)}
  }

  useEffect(()=> {

    let resetHeart;
    if(heartRef.current){
    resetHeart = setTimeout(() => {
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
    quizRef.current.style.left = modalsPosition.quiz+'%';

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

    if(modalsPosition.quiz >= 90) {
      quizRef.current.style.height = '0';
      } else {
        quizRef.current.style.height = '100vh';
      }

  },[modalsPosition]);

  useEffect(()=>{

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
                setLandingModal(true) :
                data.data_error ? console.log(data) : setUserData(data)})
    .catch(err=>console.log('fetch error',err.message));

	  
	fetch('http://localhost:5000/video-of-the-day')
	.then(res=>res.json())
	.then(video=>{
			setVideoData({title: video.title, data: video.data, videoID: video._id});
		})
		.catch(console.log);


    setJustEarnedPoints(0);
    setPointsPopup(false);

	  return ()=> setPointsPopup(true);

  },[]);


  useEffect(()=>{

    setLevel(getLevel(userData.points)) ;

    const neededForNextLevelPoints = getFibonacciNumber(level.level+5).next-getFibonacciNumber(level.level+5).previous; 
    const colectedLevelPoints = userData.points - getFibonacciNumber(level.level+5).previous;
    const barPercent = (colectedLevelPoints/neededForNextLevelPoints)*100;

    if(levelBarRef.current) 
    levelBarRef.current.style.backgroundImage=`linear-gradient(90deg, #33336C ${barPercent-3}%, #e2f1ff ${barPercent+3}%)`;

  },[userData.points,level.level]);


  const resizeModal = (modal_name) => {

    addPoints(level.level);

    if( modal_name==='favorites' && modalsPosition[modal_name]>10 ) {
      favVidRef.current.style.opacity=1; workVidRef.current.style.opacity=0; quizVidRef.current.style.opacity=0;}
    if( modal_name==='workOnIt' && modalsPosition[modal_name]>10 ) {
      favVidRef.current.style.opacity=.4; workVidRef.current.style.opacity=1; quizVidRef.current.style.opacity=0;}
    if( modal_name==='favorites' && modalsPosition[modal_name]<10 && modalsPosition.workOnIt > 10) {
      favVidRef.current.style.opacity=0; workVidRef.current.style.opacity=0; quizVidRef.current.style.opacity=0;}
    if( modal_name==='favorites' && modalsPosition[modal_name]<10 && modalsPosition.workOnIt < 10) {
        favVidRef.current.style.opacity=1; workVidRef.current.style.opacity=0; quizVidRef.current.style.opacity=0;}
    if( modal_name==='workOnIt' && modalsPosition[modal_name]<10 ) {
      favVidRef.current.style.opacity=1; workVidRef.current.style.opacity=1; quizVidRef.current.style.opacity=0;}
    if( modal_name==='quiz' && modalsPosition[modal_name]<10 ) {
      favVidRef.current.style.opacity=.4; workVidRef.current.style.opacity=1; quizVidRef.current.style.opacity=0;}
    if( modal_name==='quiz' && modalsPosition[modal_name]>10 ) {
      favVidRef.current.style.opacity=.4; workVidRef.current.style.opacity=.4; quizVidRef.current.style.opacity=1;}
    if(modal_name==='search'){
      favVidRef.current.style.opacity=0; workVidRef.current.style.opacity=0; quizVidRef.current.style.opacity=0;
    }
    if(modal_name==='quiz' && modalsPosition[modal_name]>10) fetchMyQuiz(setQuizVideo,level.level);
    else{
    modal_name!=='quiz' && modal_name!=='search'&& (modalsPosition[modal_name]>10 || modalsPosition.workOnIt<10) && 
    fetchMyVideos(setChosenVideosData,userData,chosenVideosData,modal_name); }

    switch(modal_name){

      case 'favorites': modalsPosition.workOnIt > 10 ?
                        setModalsPosition(prev => prev = modalsPosition[modal_name] < 10? initialPositions : {...initialPositions, [modal_name]:expandedPositions.favorites}) :
                        setModalsPosition({...initialPositions, [modal_name]:expandedPositions.favorites});
      break;

      case 'workOnIt': modalsPosition.quiz > 10 ? 
                       setModalsPosition(prev => prev = modalsPosition[modal_name] < 10? {...initialPositions, 'favorites': expandedPositions.favorites} : {...expandedPositions, 'quiz':initialPositions.quiz}) :
                       setModalsPosition({...expandedPositions, 'quiz':initialPositions.quiz});
      break;

      case 'quiz': setModalsPosition(prev => prev = modalsPosition[modal_name] < 10? {...expandedPositions, [modal_name]:initialPositions.quiz} : expandedPositions);
      break;

      case 'search': setModalsPosition(initialPositions);
      break;
      default: return;
    }
  }

  const resizeTopUsersModal = () => {
    if(topRef.current) {
        topRef.current.style.height = '80vh';
        topRef.current.style.width = '80vw';
        topRef.current.style.opacity = '1';
        setTopUsersIsOpen(!topUsersIsOpen);
    } 
}

  if(!localStorage.getItem('W2M-JWT-Token')) setLandingModal(true);

  return (
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
                      <video 
                            src={videoData.data} 
                            type="video/mp4"
                            onPlay={()=>addPoints(level.level)} 
                            onPause={()=>addPoints(level.level)}
                            controls={videoData.title==='Loading...' || videoData.title==='Video not found.'?false:true}
                            autoPlay 
                            loop>
                Your browser does not support the video tag.</video> 
            </div>
            
            {videoData.videoID &&
            <div id="video-likes">
              <i className="fa fa-heart" style={{position:'relative'}}>
                <i className="fa fa-heart video-icon" ref={heartRef} onClick={likeVideo}></i>
              </i>
              <i className='fas fa-business-time' style={{position:'relative'}}>
                <i className='fas fa-business-time video-icon' ref={workOnVideoRef} onClick={workOnVideo}></i>
              </i>
            </div>}
            <div id='level-container' title='Click to see Top Users' onClick={resizeTopUsersModal}>
                <div id='level-indicator'>Level: {level.level} {level.levelName}</div>
                <div id='level-bar' ref={levelBarRef}></div>
            </div>
          
            <TopUsers topRef={topRef} topUsersIsOpen={topUsersIsOpen} getLevel={getLevel}/>

        </div>
        <div id="favorites-modal" ref={favoritesRef}>
          <div className="dummy-margin-top" style={{height: '15px', cursor: 'pointer'}} onClick={(e)=>resizeModal('search')}>
		        {modalsPosition.workOnIt<90 && <><i className="fas fa-search"></i><i className="fa fa-arrow-right"></i></>}
          </div>
          <div className='modal-icons' onClick={(e)=>resizeModal('favorites')}>
            {modalsPosition.favorites>10 ? 
            <i className="fa fa-arrow-left"></i> : 
            modalsPosition.workOnIt>10 ? <i className="fa fa-arrow-right"></i> : <span style={{marginRight: '1%'}}></span> }
            {'    '} <i className="fa fa-heart"></i>
          </div>
          <section className='videos-wrapper'>

              <div className='videos-container' ref={favVidRef}>

                {favList()}             

              </div>

          </section>
        </div>
        <div id="work-on-it-modal" ref={workOnItRef}>
          <div className="dummy-margin-top" style={{height: '15px'}}></div>
          <div onClick={(e)=>resizeModal('workOnIt')} className='modal-icons'>
            {modalsPosition.workOnIt>10 ? <i className="fa fa-arrow-left"></i> : 
            modalsPosition.quiz>10 ? <i className="fa fa-arrow-right"></i> : < span style={{marginRight: '1%'}}></span>}
            {'    '}<i className='fas fa-business-time'></i>
          </div>
          <section className='videos-wrapper'>

              <div className='videos-container' ref={workVidRef}>

                {workOnItList()}              

              </div>

          </section>
        </div>
        <div id="quiz-modal" ref={quizRef}>
          <div className="dummy-margin-top" style={{height: '15px'}}></div>
          <div onClick={(e)=>resizeModal('quiz')} className='modal-icons'>
            {modalsPosition.quiz>10 ? <i className="fa fa-arrow-left"></i> : <i className="fa fa-arrow-right"></i>}
            {'    '}<i className="fa fa-play-circle-o"></i></div>
          <section className='videos-wrapper' style={{opacity: '0'}} ref={quizVidRef}>

          <div className="text">
              <h2> 
                {quizVideo?'Select the correct answer':'Loading...'}
              </h2>
            </div>
                  
            <div className="img-container">
                      <video 
                            src={quizVideo ? quizVideo.data : null} 
                            type="video/mp4"
                            autoPlay 
                            loop>
                Your browser does not support the video tag.</video> 
            </div>
            <div id='quiz-answers'>
              {quizVideo && 
                quizVideo.randomizedTitles.map(answer=><button onClick={quizAnswer}>{answer.title}</button>)}
            </div>
              
          </section>
        </div>
    </div>
     )
}

export default Learn;