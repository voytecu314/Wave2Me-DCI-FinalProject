import './Footer.css';

const Footer = () => {

  return (
    <footer id="footer">
    <div className="foot-footer">
      <a href="https://www.instagram.com/wave2me2022/" target="_blank" rel="noreferrer"><i className="fab fa-instagram coloring"><h4 className='logo-text'>instagram</h4></i></a>
      
      <a href="mailto:anmomoan@gmail.com"><i className="fas fa-envelope-square coloring"><h4 className='logo-text'>email</h4></i></a>
      <a href="https://github.com/voytecu314/Wave2Me-DCI-FinalProject" target="_blank" rel="noreferrer"><i className="fab fa-github coloring"><h4 className='logo-text'>github</h4></i></a>
      <a href="http://localhost:3000/#/rate-us"><i className="fa fa-star-o coloringstar"><h4 className='logo-text'>rate us</h4></i></a>
  
    </div>
    
      <div>
        <span className='copyright'>Copyright</span> &copy;<strong>2022 - W2M</strong> 
      </div>
      <br />
    
  </footer>
  )
}

export default Footer;