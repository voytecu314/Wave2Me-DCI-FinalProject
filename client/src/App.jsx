import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage.jsx';
import HeaderNav from './components/HeaderNav/HeaderNav.jsx';
import Home from './components/Home/Home.jsx';
import Learn from './components/Learn/Learn.jsx';
import Footer from './components/Footer/Footer.jsx';
import './app.css'
import { useState } from 'react';

function App() {
  const [landingModal, setLandingModal] = useState(true);
  return (
    <Router>
      {landingModal && <LandingPage setLandingModal={setLandingModal}/>}
      
        <HeaderNav setLandingModal={setLandingModal}/>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/learn' element={<Learn />} />
          </Routes>
          
        <Footer/>
      

    </Router>
  );
}

export default App;
