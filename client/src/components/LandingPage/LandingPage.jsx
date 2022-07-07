import {Link} from 'react-router-dom';
import Logo from './Logo.jsx';
import './styles/LandingPage.css';

const LandingPage = ({setLandingModal}) => {

    const submitHandler = (e) => {
        e.preventDefault();
        setLandingModal(false);
    }

  return (
    <div id="landing-page">
    <header>
        <h5 className='header-text'>
            LEARN EASILY CONVERSATIONAL SIGN LANGUAGE WITH YOUR LOVED ONES...
        </h5>
        <h1 className='wave-font'>WAVE2ME</h1>
    </header>
    <main>
        <Logo/>
        <br /><br /><br />
        <section id='insert-details'>
            <div>
                <form className='landing-form' onSubmit={submitHandler}>
                    <input id='midlane1' type="email" name='email' placeholder='Email'/>
                    <br />
                    <input id='midlane2' type="password" name='password' placeholder='Password'/>
                    <br />
                    <input id='button-submit' type="submit" value='Login'/>
                </form>
            </div>
        </section>
    </main>
    <br /><br /><br /><br />
    <section className="donate">
        <button className="donate1">Donate Us</button>
      </section>
      <br /><br />
    <footer>
       {/*  <Nav/> */}
       
        <Link className='foot' to='/contact'>Contact</Link>
        <Link className='foot' to='/about-us'>About Us</Link>
    
    </footer>
    
    
    </div>
    
  )
}

export default LandingPage;