import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import HeaderNav from './components/HeaderNav/HeaderNav.jsx';
import Home from './components/Home/Home.jsx';
import Learn from './components/Learn/Learn.jsx';
import Alphabet from './components/Alphabet/Alphabet.jsx';
import Blog from './components/Blog/Blog.jsx';
import Footer from './components/Footer/Footer.jsx';
import RatingStars from './components/Rating/RatingStars.js';
import PointsPopup from './components/PointsPopup/PointsPopup.jsx';
import './app.css';
import { useContext } from 'react';
import MyContext from './context/MyContext.js';


function App() {

  const {pointsPopup, landingModal, setLandingModal} = useContext(MyContext);

  return (
    <Router>
      {landingModal ? <LandingPage setLandingModal={setLandingModal}/> :
      
	  <>
        <HeaderNav setLandingModal={setLandingModal}/>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/learn' element={<Learn />} />
            <Route path='/alphabet-generator' element={<Alphabet />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/rate-us' element={<RatingStars />} />
          </Routes>

        {pointsPopup && <PointsPopup />}

        <Footer/>
	  </>
      }

    </Router>
  );
}

export default App;
