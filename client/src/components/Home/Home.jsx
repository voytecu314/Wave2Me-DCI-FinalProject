import './Home.css';
import logo from '../../assets/w2m.jpg';

const Home = () => {
  return (
    <div>
      <div className="head-div">
            <div className="img-container">
                <img className="my-img" src={logo} alt="Anne" />
            </div>
             
            <h1 className="heading">
              WAVE <br/> 2 ME
            </h1>
            <hr/>
          
          <div className="text">
            <p>
            LEARN EASILY CONVERSATIONAL SIGN LANGUAGE WITH YOUR LOVED ONES...
            </p>
          </div>
        </div>
    </div>
  )
}

export default Home;