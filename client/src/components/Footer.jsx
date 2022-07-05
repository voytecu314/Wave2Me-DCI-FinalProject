import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <hr />
    <br /><br /><br /><br />
    <section className="donate">
        <button className="donate1">Donate Us</button>
      </section>
      <br /><br />
    <footer>
       {/*  <Nav/> */}
       
        <Link className='foot' to='/contact'>Contact</Link>
        <Link className='foot' to='/about-us'>About Us</Link>
    
    </footer>
    </>
  )
}

export default Footer