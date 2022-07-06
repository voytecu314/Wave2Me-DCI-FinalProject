import { useState } from 'react';
import AboutUs from './AboutUs.jsx';
import Contact from './Contact.jsx';
import Logo from './Logo.jsx';
import './styles/LandingPage.css';

const LandingPage = ({setLandingModal}) => {

    const submitHandler = (e) => {
        e.preventDefault();
        setLandingModal(false);
    }

    const [about, setAbout] = useState(false);
    const [contact, setContact] = useState(false);

  return (
    <div id="landing-page">
    <header>
        <h5 className='header-text'>
            LEARN EASILY CONVERSATIONAL SIGN LANGUAGE WITH YOUR LOVED ONES...
        </h5>
        <h1 className='wave-font'>WAVE2ME</h1>
    </header>
    <main style={{position: 'relative'}}>
    {about && <AboutUs setAbout={setAbout}/>}
    {contact && <Contact setContact={setContact}/>}
        <Logo/>
        <br /><br /><br />
        <section id='insert-details'>
            <div>
                <form className='landing-form' onSubmit={submitHandler}>
                    <input id='midlane1' type="email" name='email' placeholder='Email'/>
                    <br />
                    <input id='midlane2' type="password" name='password' placeholder='Password'/>
                    <br />
                    <input id='button-submit' type="submit" value="Login" />
                </form>
            </div>
        </section>
    </main>
    <br /><br /><br /><br />
    <section className="donate">
        <button className="donate1">Donate</button>
      </section>
       <div className='ftr'> 
            <span className='foot' onClick={()=>setAbout(true)} >About Us</span>
            <span className='foot' onClick={()=>setContact(true)} >Contact</span>
       </div>
        
    </div>
    
  )
}

export default LandingPage;