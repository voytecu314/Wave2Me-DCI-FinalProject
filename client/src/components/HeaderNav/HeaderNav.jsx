import { Link } from 'react-router-dom';
import './HeaderNav.css';

const HeaderNav = ({setLandingModal}) => {

  return (
    <nav className="navbar">
        <div>
            <span className="navbar-brand">Welcome user!</span>
            
        </div>
            
        
        
        <div className="list">
            <label className="toggler" htmlFor="toggle"> 
                <span className="material-icons"> menu</span>
            </label>

            <input type="checkbox" name="toggle" id="toggle" />

            <div className="nav-menu">    
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
                    <Link to="/" onClick={()=>{
                                              localStorage.removeItem('W2M-JWT-Token');
                                              setLandingModal(true)
                                              }}>Logout</Link>
                  </li>
                </ul>
            </div>
            
        </div>
       
            
    
    </nav>
  )
}

export default HeaderNav;