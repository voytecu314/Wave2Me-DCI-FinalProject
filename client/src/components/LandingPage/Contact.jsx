import "./styles/Contact.css";
import React, { useState } from "react";
import background from '../../../src/assets/L.jpg' 

const Contact = ({setContact}) => {
  const [status, setStatus] = useState("Submit");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending....");
    const [title, firstname, lastname, email, male, female, other, message] = e.target.elements;
    //const gender = [male,female, other].filter(gender=>gender.checked)[0]; 
    let details = {
      firstname: firstname.value,
      lastame: lastname.value,
      email: email.value,
      message: message.value,
    };

    try {
          let response = await fetch("http://localhost:5000/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(details),
            });

          setStatus("Sending..");
          let result = await response.json();
          setStatus(result.response);
          e.target.reset();
          setTimeout(()=>setStatus('Submit'),2000);
          
      } catch (error) {
          console.log(error);
      }

    
    }


  return (

    <div className='form-holder' id="contact">
       <h1 className="title">Get in Touch</h1>
       <hr />
    <form onSubmit={handleSubmit} className='form'>
     
        <label htmlFor="title">Title</label>
        <select name="title" id="title">
          <option value="" defaultValue disabled>
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
        <input type="text" className="name" placeholder="Wave" required />
        <label htmlFor="lastname">Last Name:</label>
        <input type="text" className="name" placeholder="2me" required />
      <label htmlFor="email">Email:<span>*</span></label>
      <input type="email" className="name" placeholder="wave2me@web.com" required />
     <div className="gender">
 <label htmlFor="gender">Gender</label> <br></br>
 <div><span>Male</span> <input type="radio" name="male" className="gender" /></div>
 <div><span>Female</span> <input type="radio" name="female" className="gender" /></div>
 <div><span>Other</span> <input type="radio" name="other" className="gender" /></div>
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
      <button type="reset" onClick={(e)=>e.target.parentElement.reset()}>Reset</button>
    </form>

        
    <footer>
   <h2 className='back-home' onClick={()=>setContact(false)}>Go Back</h2>
   </footer>
     

    </div>
   
    
  );
};

export default Contact;