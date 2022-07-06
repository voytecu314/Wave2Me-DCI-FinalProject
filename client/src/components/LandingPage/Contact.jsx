import './styles/Contact.css';

const Contact = ({setContact}) => {
  return (
    <div id="contact">

<main className='contact'>

  <h2>Allan</h2>
  <h2>Anne</h2>
  <h2>Egle</h2>
  <h2>Wojteck</h2>
  <h2>Vonn</h2>

<br /><br /><br /><br />
</main>
    <hr />
  
        <h2 className='back-home' onClick={()=>setContact(false)}>Back Home: <span>&#9166;</span> </h2>
  
    
    </div>
  )
}

