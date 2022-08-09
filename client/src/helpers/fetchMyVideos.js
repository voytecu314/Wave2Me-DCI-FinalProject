const fetchMyVideos = (setChosenVideosData,userData,chosenVideosData,modal_name) => {
    fetch('http://localhost:5000/get-my-videos',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({data: userData[modal_name]})
    })
    .then(res=>res.json())
    .then(vids=>setChosenVideosData({...chosenVideosData,[modal_name]:vids}))
    .catch(err=>console.log('fetch-my-vids',err));
}
export default fetchMyVideos;