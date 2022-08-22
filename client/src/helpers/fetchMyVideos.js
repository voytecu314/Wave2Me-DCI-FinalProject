export const fetchMyQuiz = (setQuizVideo, level) => {

  const difficulty = Math.floor(level/5)+1;
  const randomizedAnswers = [];

  fetch('http://localhost:5000/quiz')
  .then(res=>res.json())
  .then(data=>{
    data.randomizedTitles.splice(difficulty);
    data.randomizedTitles.push({title: data.title});
    for(let i=0; i<difficulty+1;i++){
      randomizedAnswers.push(
        ...data.randomizedTitles.splice(Math.floor(Math.random()*(difficulty+1)))
      );
    }
    data.randomizedTitles = randomizedAnswers;
    setQuizVideo(data);
    })
  .catch(err=>console.log({'QuizFetchError':err}));

}

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