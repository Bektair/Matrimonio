import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectAuth } from "../../redux/selectors/selectAuth"
import { LoginButton } from "../buttons/login-button"
import { LogoutButton } from "../buttons/logout-button"
import PathConstants from '../route/pathConstants'

function Navbar() {
  const {isAuthenticated, isLoading, user} = useSelector(selectAuth)
 


  return (
    <div className="navbar-custom">
        <ul className="nav-list">
            <li className= "nav-item"><Link to={PathConstants.Admin} id='logo-container'>
              <div className='logo-img'><img className="small-logo" alt="website-logo" src={"/logo.svg"}></img></div>
              <div className="logo-text"><span id="orange">Marry</span><span id="green">Monio</span></div>
            </Link></li>
            <li className="nav-item"><Link to={PathConstants.Home}>Home</Link></li>
            <li className="nav-item"><Link to={PathConstants.RSVP}>RSVP</Link></li>
            <li className="nav-item"><Link to={PathConstants.Schedule}>Scedule</Link></li>
            <li className="nav-item"><Link to={PathConstants.Posts}>Posts</Link></li>
            <li className="nav-item"><Link to={PathConstants.Profile}><img className='profile-picture-nav' src={user?.picture}></img></Link></li>
            {  process.env.NODE_ENV === 'development' && isLoading ? <li className="nav-item"><div className="list-loader-navbar"></div></li> : 
              !isAuthenticated ? 
              <li className="nav-item"><LoginButton className="" key="login"></LoginButton></li> :
              <li className="nav-item"><LogoutButton className="" key="logout"></LogoutButton></li>
            }
        </ul>
    </div>
  )
}

export default Navbar