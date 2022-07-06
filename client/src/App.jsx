import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Header from './components/Header/Header.jsx';
import Home from './components/Home/Home.jsx';
import Footer from './components/Footer/Footer.jsx';
import './app.css'
import Blog from './components/Blog/Blog.jsx';
import { useState } from 'react';

function App() {
  const [landingModal, setLandingModal] = useState(true);
  return (
    <Router>
      {landingModal && <LandingPage setLandingModal={setLandingModal}/>}
      <main>
        <Header setLandingModal={setLandingModal}/>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/blog' element={<Blog />} />
          </Routes>
          
        <Footer/>
      </main>

    </Router>
  );
}

export default App;
