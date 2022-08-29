import './styles/AboutUs.css'
import React, {useState } from  'react';
import anne2 from '../../assets/ann2.jpg'
import wojtek from '../../assets/Wojtek.png'
import vonn from '../../assets/vonn.jpg'
import egle from '../../assets/egle.jpg'
import allan from '../../assets/allan.JPG'






const AboutUs = ({setAbout}) => {
  const [newText,setNewText] = useState(true) 
  
  const lessText = (e) => {
    e.target.previousSibling.innerHTML=`Thank you for visiting our website and also for <a>downloading our app</a>, you're the reason we made this. This app is designed,created and developed by kind hearted W2M members for beautiful people like you.
    The app is our solution to what we consider a "good" problem: People want to understand,connect,express emotions or feelings and to learn more, and since not everyone has access to classes, by adding W2M to their language list,we wanted to take this into our hands and teach you Wave2Me sign language as if we're there with you in person.
 `
    setNewText(!newText)
  
  }
 
  const moreText = (e) => {
    e.target.previousSibling.innerHTML=`Thank you for visiting our website and also for <a>downloading our app</a>, you're the reason we made this. This app is designed,created and developed by kind hearted W2M members for beautiful people like you.
    The app is our solution to what we consider a "good" problem: People want to understand,connect,express emotions or feelings and to learn more, and since not everyone has access to classes, by adding W2M to their language list,we wanted to take this into our hands and teach you Wave2Me sign language as if we're there with you in person. Our goal is to give you the tools, such as everyday greetings or phrases , ways to pick-up and keep a conversation going, and where/how you can start making connections between iconic signs to meaning, so you can hit the ground running and start talking with deaf people . We know for all of its complexities like any other language , one app is never enough to master a language, however this is an opportunity for you to start the shift from vocal to a visual language.
    Stay connected with us and others through sign language. Enjoy your learning experience , help us improve by giving us feedback, and don't forget to rate this app! 
    Get in touch with us anytime vi{a our Instagram page- <a>https://www.instagram.com/wave2me2022/</a> and Twitter, also don't forget to tag us on Instagram , and share with your family/friends the signs you've learned! Most importantly,  have fun.
    For further info,questions,or sponsorship -please get in touch with us <a>hello@wave2me.com</a>
 `
    setNewText(!newText)
  
  }
  return (
    <div id="about-us">
    <main id='content-about-us'>
        <h2>
        
          Thank you for visiting our website and also for <a>downloading our app</a>, you're the reason we made this. This app is designed,created and developed by kind hearted W2M members for beautiful people like you.
            The app is our solution to what we consider a "good" problem: People want to understand,connect,express emotions or feelings and to learn more, and since not everyone has access to classes, by adding W2M to their language list,we wanted to take this into our hands and teach you Wave2Me sign language as if we're there with you in person.
           
          
             </h2>
             <button onClick={(e)=> {if(newText) moreText(e) 
              else lessText(e)}} >Read { newText?"More":"Less"}</button>

        
        
    </main>

  

    <div className='container'>
        <section>
        <article className="front">
          <img src={vonn} alt="" className="front2"/>
          <div className="back pallete1">
              <h1 className='color'>Vonn Ryann Cruz</h1>
          <h3>Frontend Developer</h3>
          <hr />
          <h3 className='last'>Nationality</h3>
          <h4 className='origin'>Philippines</h4>

          </div>
          
      </article>
      </section>
        <section>
        <article className="front">
          <img src={anne2} alt="" className="front2"/>
          <div className="back pallete2">
              <h1 className='color'>Anne Mueni Musyoki</h1>
          <h3>Frontend Developer</h3>
          <hr />
          <h3 className='last'>Nationality</h3>
          <h4 className='origin'>Kenya</h4>
          </div>
          
      </article>
      </section>
        <section>
        <article className="front">
          <img src={wojtek} alt="" className="front2"/>
          <div className="back pallete3">
              <h1 className='color'>Wojtek Urbanski</h1>
          <h3>Fullstack Developer</h3>
          <hr />
          <h3 className='last'>Nationality</h3>
          <h4 className='origin'>Poland</h4>
          </div>
          
      </article>
      </section>
        <section>
        <article className="front">
          <img src={egle} alt="" className="front2"/>
          <div className="back pallete4">
              <h1 className='color'>Egle Jakonyte </h1>
          <h3>Presentation</h3>
          <hr />
          <h3 className='last'>Nationality</h3>
          <h4 className='origin'>Lithuania</h4>
          </div>
          
      </article>
      </section>
        <section>
        <article className="front">
          <img src={allan} alt="" className="front2"/>
          <div className="back pallete5">
              <h1 className='color'>Allan Lufunda Chiyangi</h1>
          <h3>Presentation</h3>
          <hr />
          <h3 className='last'>Nationality</h3>
          <h4 className='origin'>Zambia</h4>
          </div>
          
      </article>
      </section>
    </div>
    
    

    <footer>
        
        <h2 className='back-home' onClick={()=>setAbout(false)}>Go Back</h2>
    </footer>
    </div>
  )
}

export default AboutUs