import './styles/Contact.css';

const Contact = ({setContact}) => {

  return (
    <div id="contact">
      <form id="contact-form">
        <h1>Have Questions? Ask Us?</h1>
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
         <h1>Subject*</h1>
         <label htmlFor="">
          <select name="" id="">
            <option value="app inst/ or purchase issue">App inst/ or purchase issue </option>
            <option value="feedback for the w2m app">Feedback for the w2m App</option>
            <option value="Android Questions/Windows Questions">Android Questions/Windows Questions</option>
            <option value="Other">Other</option>
          </select>
         </label>
        <input type="text" name="" id="" />
        
        <div>
          <textarea id="textarea" cols="30" rows="10" placeholder='Please input your message'/>
        </div>
        
        <button id="button-contact">Submit</button>
      </form>
  
        <h2 className='back-home' onClick={()=>setContact(false)}>Back Home: <span className='back-home'>&#9166;</span> </h2>
  
    
    </div>
  )
}

export default Contact;