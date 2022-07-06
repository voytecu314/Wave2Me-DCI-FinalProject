import { Link } from 'react-router-dom';
import './HeaderNav.css';

const HeaderNav = ({setLandingModal}) => {

  return (
    <nav class="navbar">
        <div>
            <span class="navbar-brand">Welcome user!</span>
        </div>
            
        
        
        <div class="list">
            <label class="toggler" for="toggle"> 
                <span class="material-icons"> menu</span>
            </label>

            <input type="checkbox" name="toggle" id="toggle" />

            <div class="nav-menu">    
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/learn">Learn</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={()=>setLandingModal(true)}>Logout</Link>
                  </li>
                </ul>
            </div>
            
        </div>
       
            
    
    </nav>
  )
}

export default HeaderNav;