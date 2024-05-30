import { Link } from "react-router-dom"
import PathConstants from '../route/pathConstants'
import { useSelector } from "react-redux"
import { selectAuth } from "../../redux/slices/authSlice"
import { LoginButton } from "../buttons/login-button"
import { LogoutButton } from "../buttons/logout-button"

function Navbar() {
  const {isAuthenticated, isLoading} = useSelector(selectAuth)


  console.log("AUTHENTICATION REDUX" + isAuthenticated)
  console.log("Loading REDUX" + isLoading)

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
            <li className="nav-item"><Link to={PathConstants.Profile}>Profile</Link></li>
            { isLoading ? <></> : 
              !isAuthenticated ? 
              <li className="nav-item"><LoginButton className="" key="login"></LoginButton></li> :
              <li className="nav-item"><LogoutButton className="" key="logout"></LogoutButton></li>
            }
        </ul>
    </div>
  )
}

export default Navbar