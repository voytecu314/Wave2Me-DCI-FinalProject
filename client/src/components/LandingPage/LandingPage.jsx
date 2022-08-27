import { useState, useEffect } from 'react';
import AboutUs from './AboutUs.jsx';
import Contact from './Contact.jsx';
import SignUp from './SignUp.jsx';
import Logo from './Logo.jsx';
import Faq from './Faq.jsx';
import './styles/LandingPage.css';

const LandingPage = ({setLandingModal}) => {

    useEffect(()=>{

        if(localStorage.getItem('W2M-JWT-Token')) {

            const fetchOptions = {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                    token: localStorage.getItem('W2M-JWT-Token')
                }
            }

            fetch('http://localhost:5000/islogged', fetchOptions)
            .then(res=>res.json())
            .then(data=>{ 
                data.token_error === 'jwt expired' && localStorage.removeItem('W2M-JWT-Token');
                setLandingModal(!data.auth)})
            .catch(err=>console.log('fetch error',err.message));

        }
    },[setLandingModal]);

    const loginHandler = (e) => {
        e.preventDefault();
        const login_data = {email:e.target.firstChild.value, password:e.target.children[2].value}
        const fetchOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(login_data)
        }

        fetch('http://localhost:5000/login',fetchOptions)
        .then(res=>res.json())
        .then(({token, jwt_payload})=>{
                                        jwt_payload?.auth && setLandingModal(!jwt_payload.auth);
                                        localStorage.setItem('W2M-JWT-Token',token);
                                    })
        .catch(console.log);
    }

    const [about, setAbout] = useState(false);
    const [contact, setContact] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [faq, setFaq] = useState(false);

  return (
    
    <div id="landing-page">
    <header>
        <h5 className='header-text'>
            LEARN EASILY CONVERSATIONAL <strong>SIGN LANGUAGE</strong>  WITH YOUR LOVED ONES...
        </h5>
        <h1 className='wave-font'>WAVE2ME</h1>
    </header>
    <main style={{position: 'relative'}}>
    {about && <AboutUs setAbout={setAbout}/>}
    {contact && <Contact setContact={setContact} setLandingModal={setLandingModal}/>}
    {signUp && <SignUp setSignUp={setSignUp} setLandingModal={setLandingModal}/>}
    {faq && <Faq setFaq={setFaq} setLandingModal={setLandingModal}/>}
        <Logo/>
        <br /><br /><br />
        <section id='insert-details'>
            <div>
                <form className='landing-form' onSubmit={loginHandler}>
                    <input id='midlane1' type="email" name='email' placeholder='Email'/>
                    <br />
                    <input id='midlane2' type="password" name='password' placeholder='Password'/>
                    <br />
                    <br />
                    <input id='button-submit1' type="submit" value="Login" />
                    <br />
                    <br />
                    <br />

                    <div className='Sign-up'><h1>No Account?:<span><button id='button-submit2' type="button" onClick={()=>setSignUp(true)} >SignUp</button></span></h1>
                    </div>
                     
                
                </form>
                
            </div>
        </section>
    </main>
    <br /><br /><br /><br />
       <div className='ftr'> 
            <span className='foot' onClick={()=>setAbout(true)} >About Us</span>
            <span className='foot' onClick={()=>setContact(true)} >Contact</span>
            <span className='foot' onClick={()=>setFaq(true)} >FAQ</span>
       </div>
        
    </div>
  )
}

export default LandingPage;