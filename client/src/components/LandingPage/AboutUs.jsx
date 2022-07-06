import './styles/AboutUs.css'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  return (
    <div id="about-us">
    <main class="about">
        <h3>Thank you for visiting our website and also for downloading our app, you're the reason we made this. This app is designed,created and developed by kind hearted W2M members for beautiful people like you.
            The app is our solution to what we consider a "good" problem: People want to understand,connect,express emotions or feelings and to learn more, and since not everyone has access to classes, by adding W2M to their language list,we wanted to take this into our hands and teach you Wave2Me sign language as if we're there with you in person.
            Our goal is to give you the tools, such as everyday greetings or phrases , ways to pick-up and keep a conversation going, and where/how you can start making connections between iconic signs to meaning, so you can hit the ground running and start talking with deaf people . We know for all of its complexities like any other language , one app is never enogh to master a language, however this is an opportunity for you to start the shift from vocal to a visual language.
            Stay connected with us and others through sign language. Enjoy your learning experince , help us improve by giving us feedback, and don't forget to rate this app! 
            Get in touch with us anytime via our Instagram page-https://www.instagram.com/wave2me2022/ and Twitter, also don't forget to tag us on Instagram , and share with your family/friends the signs you've learned! Most importantly,  have fun.
            For further info,questions,or sponsorship -please get in touch with us hello@wave2me.com</h3>
        
        
    </main>
    <br /><br /><br /><br />
    <hr />
    <footer>
        
        <Link  to='/'><h2 className='black1'>Back Home: <span>&#9166;</span></h2></Link>
    </footer>
    </div>
  )
}

export default AboutUs