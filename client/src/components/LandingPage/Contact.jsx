import './styles/Contact.css';
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <>

<main className='contact'>

  <h2>Allan</h2>
  <h2>Anne</h2>
  <h2>Egle</h2>
  <h2>Wojteck</h2>
  <h2>Vonn</h2>

<br /><br /><br /><br />
</main>
    <hr />
  <footer>
        <Link  to='/'><h2 className='back-home'>Back Home: <span>&#9166;</span> </h2></Link>
  </footer>
    
    </>
  )
}

