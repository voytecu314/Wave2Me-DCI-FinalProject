import './Home.css';
import logo from '../../assets/w2m2.png';

const Home = () => {
  return (
    <div>
      <div className="head-div">
            <div className="img-container">
                <img className="my-img img-size" src={logo} alt="Anne" />
            </div>
             
            <h1 className="wave-font">
              WAVE <br/> 2 
              <br />
              ME
            </h1>
            <hr/>
          
          <div className="text">
            <p>
            LEARN EASILY CONVERSATIONAL <strong>SIGN LANGUAGE</strong>  WITH YOUR LOVED ONES...
            </p>
          </div>
        </div>
    </div>
  )
}

export default Home;