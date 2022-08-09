import './Learn.css';
import uploadingVid from '../../assets/uploading_bar.mp4';
import notFound from '../../assets/404pagenotfound.mp4';
import decodeJWTPayload from '../../helpers/decodeJWTPayload.js';
import updateUserData from '../../helpers/updateUserData';
import { useState, useRef, useEffect, useContext } from 'react';
import MyContext from '../../context/MyContext.js';
import fetchMyVideos from '../../helpers/fetchMyVideos';


const Learn = () => {

  const {setLandingModal} = useContext(MyContext);

  const initialPositions = {favorites: 90, workOnIt: 93.3, another: 96.6};
  const expandedPositions = {favorites: 0, workOnIt: 3, another: 6};
 
  const [userData, setUserData] = useState({favorites: [], workOnIt: [], points: 0, dataID: null});
  const [modalsPosition, setModalsPosition] = useState(initialPositions);
  const [videoData, setVideoData] = useState({title: 'Loading...', data: uploadingVid, videoID: null});  
  const [chosenVideosData, setChosenVideosData] = useState({favorites:[], workOnIt: []});
  const [selectSearch, setSelectSearch] = useState('');  
  const [submitted, setSubmitted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);  
  const [toWorkOnIt, setToWorkOnIt] = useState(false);
  //const [fvLst, setFvLst] = useState(null);


  const favoritesRef = useRef();
  const workOnItRef = useRef();
  const anotherRef = useRef();
  const heartRef = useRef();
  const workOnVideoRef = useRef();
  const favVidRef = useRef();
  const workVidRef = useRef();
  const anotherVidRef = useRef();

  const testRef = useRef();
  const [testState, setTestState] = useState(true);

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

  const chngTestState = () => {
    console.log('click');
    setTestState(!testState);
  }


  const favList = () => {

    return    chosenVideosData.favorites.map((vidData,i)=>
                            <div key={Math.random()/i}>

                              <div className="img-container">
                                        <video 
                                              src={vidData.data} 
                                              type="video/mp4"
                                              onPlay={()=>addPoints(2)} 
                                              onPause={()=>addPoints(2)}
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

  /* useEffect(()=>{
    
    setFvLst(chosenVideosData.favorites.map((vidData,i)=><div style={{display:'grid',placeItems:'center',cursor:'pointer'}}
                                                            key={i} 
                                                            onClick={(e)=>{e.target.style.opacity='.5'
                                                                           removeVid('favorites',vidData._id);}}>
                                                            {vidData.title}</div>));

  },[chosenVideosData]); */


  /* const favList = chosenVideosData.favorites.map((vidData,i)=>
                <div key={'fav_'+i}>
      
                  <div className="img-container">
                            <video 
                                  src={vidData.data} 
                                  type="video/mp4"
                                  onPlay={()=>addPoints(2)} 
                                  onPause={()=>addPoints(2)}
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
                       onClick={(e)=>{e.target.parentElement.parentElement.remove();
                                      likeVideo('favorites',vidData._id);
                                      }}
                       style={{cursor:'pointer', color: '#404756'}}></i>
                    <i className="fa fa-arrow-up" 
                       title='Remove this video from favorites' 
                       onClick={(e)=>{e.target.parentElement.parentElement.style.display='none';
                                      likeVideo('favorites',vidData._id);
                                      }}
                       style={{cursor:'pointer', 	color: '#404756'}}></i>
                  </div> 

                </div>) ; console.log(favList,chosenVideosData.favorites); */

  const addPoints = (points) => {

    updateUserData({...userData, points: userData.points+points});
    setUserData({...userData, points: userData.points+points});

  }
  
  const removeVid = (property,videoID) => {
        userData.points+=2;
        const removeID = userData[property].filter(id=>id!==videoID);
        updateUserData({...userData,[property]:removeID},property);
        setUserData({...userData, [property]: removeID});
        //setIsLiked(!isLiked);
  }
  
  const workOnVideo = () =>{
    const property = 'workOnIt';
    if(userData.dataID && videoData.videoID){
      if(!toWorkOnIt){
        userData.workOnIt.push(videoData.videoID);
        userData.points+=2;
        updateUserData(userData,property);
        setUserData({...userData,[property]:[...userData[property]]});
      } else {
        removeVid(property,videoData.videoID);
      }
      
      setToWorkOnIt(!toWorkOnIt)
      workOnVideoRef.current.classList.add("shake");
      //workOnVideoRef.current.style.color=!toWorkOnIt?'#9168a1':'white';
      setTimeout(()=>{ workOnVideoRef?.current && workOnVideoRef.current.classList.remove("shake");},1000);
    }
  }

  const likeVideo = () =>{
    const property = 'favorites';

    if(userData.dataID && videoData.videoID){
      if(!isLiked){
        userData.favorites.push(videoData.videoID);
        userData.points+=3;
        updateUserData(userData,property);
        setUserData({...userData,[property]:[...userData[property]]});
      } else {
        removeVid(property,videoData.videoID);
      }
      //heartRef.current.parentElement.style.color=isLiked?'white':'#7f6ea6';
      //heartRef.current.style.color='#7f6ea6';
      heartRef.current.style.top='-4500%';
      heartRef.current.style.transform="rotate(1080deg)";
      heartRef.current.style.opacity='1';
      setIsLiked(!isLiked);
    }
  }

 /*  useEffect(()=>{
    setToWorkOnIt(userData.workOnIt.includes(videoData.videoID));
    setIsLiked(userData.favorites.includes(videoData.videoID));
  }); */

 /*  useEffect(()=>{
    if(workOnVideoRef.current) workOnVideoRef.current.style.color=toWorkOnIt?'#9168a1':'white';
    if(heartRef.current) heartRef.current.style.color=isLiked?'#7f6ea6':'white';
  },[videoData,toWorkOnIt]);  */

  useEffect(()=> {

    let resetHeart;
    if(heartRef.current){
    resetHeart = setTimeout(() => {
      //heartRef.current.style.color=isLiked?'#7f6ea6':'white';
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
                setLandingModal(true) :
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

    addPoints(2);

    if( modal_name==='favorites' && modalsPosition[modal_name]>10 ) {
      favVidRef.current.style.opacity=1; workVidRef.current.style.opacity=0; anotherVidRef.current.style.opacity=0;}
    if( modal_name==='workOnIt' && modalsPosition[modal_name]>10 ) {
      favVidRef.current.style.opacity=.4; workVidRef.current.style.opacity=1; anotherVidRef.current.style.opacity=0;}
    if( modal_name==='favorites' && modalsPosition[modal_name]<10 && modalsPosition.workOnIt > 10) {
      favVidRef.current.style.opacity=0; workVidRef.current.style.opacity=0; anotherVidRef.current.style.opacity=0;}
    if( modal_name==='favorites' && modalsPosition[modal_name]<10 && modalsPosition.workOnIt < 10) {
        favVidRef.current.style.opacity=1; workVidRef.current.style.opacity=0; anotherVidRef.current.style.opacity=0;}
    if( modal_name==='workOnIt' && modalsPosition[modal_name]<10 ) {
      favVidRef.current.style.opacity=1; workVidRef.current.style.opacity=0; anotherVidRef.current.style.opacity=0;}
    if( modal_name==='another' && modalsPosition[modal_name]<10 ) {
      favVidRef.current.style.opacity=.4; workVidRef.current.style.opacity=1; anotherVidRef.current.style.opacity=0;}
    if( modal_name==='another' && modalsPosition[modal_name]>10 ) {
      favVidRef.current.style.opacity=.4; workVidRef.current.style.opacity=.4; anotherVidRef.current.style.opacity=1;}
    if(modal_name==='search'){
      favVidRef.current.style.opacity=0; workVidRef.current.style.opacity=0; anotherVidRef.current.style.opacity=0;
    }
    
    modal_name!=='another' && (modalsPosition[modal_name]>10 || modalsPosition.workOnIt<10) && 
    fetchMyVideos(setChosenVideosData,userData,chosenVideosData,modal_name);
    /* fetch('http://localhost:5000/get-my-videos',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({data: userData[modal_name]})
    })
    .then(res=>res.json())
    .then(vids=>{setChosenVideosData({...chosenVideosData,[modal_name]:vids}); console.log(vids);})
    .catch(err=>console.log('fetch-my-vids',err)); */

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

  return ( 
    <div id="learn-container">{/* <div id='test' ref={testRef} onClick={chngTestState}></div> */}
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
                            width="1000" 
                            height="600" 
                            type="video/mp4"
                            onPlay={()=>addPoints(2)} 
                            onPause={()=>addPoints(2)}
                            controls 
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
                {/* fvLst */}              

              </div>

          </section>
        </div>
        <div id="work-on-it-modal" ref={workOnItRef}>
          <div className="dummy-margin-top" style={{height: '15px'}}></div>
          <div onClick={(e)=>resizeModal('workOnIt')} className='modal-icons'>
            {modalsPosition.workOnIt>10 ? <i className="fa fa-arrow-left"></i> : 
            modalsPosition.another>10 ? <i className="fa fa-arrow-right"></i> : < span style={{marginRight: '1%'}}></span>}
            {'    '}<i className='fas fa-business-time'></i>
          </div>
          <section className='videos-wrapper'>

              <div className='videos-container' ref={workVidRef}>

                {chosenVideosData.workOnIt.map((vidData,i)=>
                
                <div key={'work'+i}>
      
                  <div className="img-container">
                            <video 
                                  src={vidData.data} 
                                  type="video/mp4"
                                  onPlay={()=>addPoints(2)} 
                                  onPause={()=>addPoints(2)}
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
                       title='Remove this video from her' 
                       onClick={(e)=>{
                                      removeVid('workOnIt',vidData._id);
                                      e.target.parentElement.parentElement.style.display='none';}}
                       style={{cursor:'pointer', color: '#404756'}}></i>
                    <i className="fa fa-arrow-up" 
                       title='Remove this video from here' 
                       onClick={(e)=>{
                                      removeVid('workOnIt',vidData._id);
                                      e.target.parentElement.parentElement.style.display='none';}}
                       style={{cursor:'pointer', 	color: '#404756'}}></i>
                  </div> 

                </div>

                )  }              

              </div>

          </section>
        </div>
        <div id="another-modal" ref={anotherRef}>
          <div className="dummy-margin-top" style={{height: '15px'}}></div>
          <div onClick={(e)=>resizeModal('another')} className='modal-icons'>
            {modalsPosition.another>10 ? <i className="fa fa-arrow-left"></i> : <i className="fa fa-arrow-right"></i>}
            {'    '}<i className="fa fa-play-circle-o"></i></div>
          <section className='videos-wrapper' style={{opacity: '0'}} ref={anotherVidRef}>

              bla bla bla

          </section>
        </div>
    </div>
  )
}

export default Learn;