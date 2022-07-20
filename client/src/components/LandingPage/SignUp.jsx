import './styles/SignUp.css';

const SignUp = ({setSignUp, setLandingModal}) => {

    const signUpHandler = (e) => {
        const formInputsHTMLCollection = e.target.previousSibling.children;
        const form_data = Array.from(formInputsHTMLCollection).reduce((acc,input)=>{return {...acc,[input.name]:input.value}},{});
        const fetchOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(form_data)
        }

        fetch('http://localhost:5000/signup', fetchOptions)
        .then(res=>res.json())
        .then(data=>{   console.log(data);
                        data.jwt_payload?.auth && setLandingModal(!data.jwt_payload.auth); 
                        localStorage.setItem('W2M-JWT-Token',data.token);
                                    })
        .catch(err=>console.log('signup error', err.message));
        }

  return (
    <div id="contact">
      <form id="contact-form">
           <input
          className='same-input'
          type='text'
          placeholder='Name'
          name="name"
        />
        <input
          className='same-input'
          type='email'
          placeholder='Email'
          name="email"
        /> 
        <input
        className='same-input'
        type='password'
        placeholder='Password'
        name="password"
      />
        <input
          className='same-input'
          type='password'
          placeholder='Confirm password'
          name="confirm_password"
        /> 
      </form>
      <button id="button-contact" onClick={signUpHandler}>SignUp</button>
  
        <h2 className='back-home' onClick={()=>setSignUp(false)}>Go Back</h2>
  
    
    </div>
  )
}

export default SignUp;