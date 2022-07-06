import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({setLandingModal}) => {

  return (
    <header id="header">
        {'<-------------------------------------------------------------Header/Navbar-------------------->'}
      <Link  to="/blog">Link1</Link> 
      <Link  to="">Link2</Link> 
      <Link  to="">Link3</Link> 
        <button style={{float: 'left', color: 'black'}} onClick={()=>setLandingModal(true)}>Logout</button>
    </header>
  )
}

export default Header