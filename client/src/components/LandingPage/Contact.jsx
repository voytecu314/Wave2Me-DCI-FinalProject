import './styles/Contact.css';

const Contact = ({setContact}) => {

  return (
    <div id="contact">
      <form id="contact-form">
        <input
          type='text'
          placeholder='FirstName'
        />
           <input
          type='text'
          placeholder='LastName'
        />
        <input
          type='email'
          placeholder='Email'
        />
        <div>
          <textarea id="textarea" cols="30" rows="10" placeholder='Please input your message'/>
        </div>
        
        <button id="button-contact">Send</button>
      </form>
  
        <h2 className='back-home' onClick={()=>setContact(false)}>Back Home: <span className='back-home'>&#9166;</span> </h2>
  
    
    </div>
  )
}

export default Contact