import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Home from './components/LandingPage/Home';
import AboutUs from './components/LandingPage/AboutUs';
import Contacts from './components/LandingPage/Contact'
import Footer from './components/Footer';
import './app.css'

function App() {
  return (
    <Router>
      <main>
        <Header />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/contact' element={<Contacts/>} />
            <Route path='/about-us' element={<AboutUs/>} />
          </Routes>
          <Footer/>
      </main>

    </Router>
  );
}

export default App;
