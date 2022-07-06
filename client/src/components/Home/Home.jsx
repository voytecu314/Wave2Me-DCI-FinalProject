import './Home.css';
import logo from '../../assets/w2m.jpg';

const Home = () => {
  return (
    <div>
      <div class="head-div">
            <div class="img-container">
                <img class="my-img" src={logo} alt="Anne" />
            </div>
             
            <h1 class="heading">
              WAVE <br/> 2 ME
            </h1>
            <hr/>
          
          <div class="text">
            <p>
            LEARN EASILY CONVERSATIONAL SIGN LANGUAGE WITH YOUR LOVED ONES...
            </p>
          </div>
        </div>
    </div>
  )
}

export default Home;