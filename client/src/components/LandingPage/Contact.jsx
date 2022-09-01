import "./styles/Contact.css";
import React, { useState } from "react";
import background from '../../../src/assets/L.jpg' 

const Contact = ({setContact}) => {
  const [status, setStatus] = useState("Submit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending....");
    const { firstname, lastname, email, message } = e.target.elements;
    let details = {
      firstname: firstname.value,
      lastame: lastname.value,
      email: email.value,
      message: message.value,
    };

    let response = await fetch("https://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
  };

  /*  const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '********@gmail.com',
      pass: '*******',
    },
  });

  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Ready to Send');
    }
  });
 */

  return (
    /*  <div id="contact">
      <form id="contact-form" onSubmit={(e)=>e.target.reset()}>
        <input
          type='text'
          placeholder='FirstName'<form id='contact' onSubmit={handleSubmit}>
      <div id='contact-form'>
        <label htmlFor="firstname" >First 
        <input
          type='email'
          placeholder='Email'
        />
        <div>
          <textarea id="textarea" cols="30" rows="10" placeholder='Please input your message'/>
        </div>
        
        <button id="button-contact">Send</button>
      </form>
  
        <h2 className='back-home' onClick={()=>setContact(false)}>Go Back</h2>
  
    
    </div> */

    <div className='form-holder' id="contact">
       <h1>Get in Touch</h1>
       <hr />
    <form onSubmit={handleSubmit}>
     
        <label htmlFor="title">Title</label>
        <select name="title" id="title">
          <option value="" selected disabled>
            ...Choose Your Title
          </option>
          <option value="" disabled>
            -------------------
          </option>
          <option value="mr">Mr.</option>
          <option value="ms">Ms.</option>
          <option value="mrs">Mrs.</option>
          <option value="other">Other</option>
        </select>
       <br></br>
        <label htmlFor="firstname">First Name:<span>*</span></label>
        <input type="text" id="name" placeholder="Wave" required />
        <label htmlFor="lastname">Last Name:</label>
        <input type="text" id="name" placeholder="2me" required />
      <label htmlFor="email">Email:<span>*</span></label>
      <input type="email" id="email" placeholder="wave2me@web.com" required />
     <div className="gender">
 <label htmlFor="gender">Gender</label> <br></br>
 <div><span>Male</span> <input type="radio" name="gender" id="gender" /></div>
 <div><span>Female</span> <input type="radio" name="gender" id="gender" /></div>
 <div><span>Other</span> <input type="radio" name="gender" id="gender" /></div>
     </div>
        <label htmlFor="about">How can i be of help? <span>*</span> </label> <br></br>
        <textarea
          name=""
          id=""
          cols="60"
          rows="10"
          required placeholder="....Please enter  your message here"
        ></textarea><br></br>
     
      <button type="submit">{status}</button>
      <button type="reset">Reset</button>
    </form>

        
    <footer>
   <h2 className='back-home' onClick={()=>setContact(false)}>Go Back</h2>
   </footer>
     

    </div>
   
    
  );
};

export default Contact;
