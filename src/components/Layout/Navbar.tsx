import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectAuth } from "../../redux/selectors/selectAuth"
import { LoginButton } from "../buttons/login-button"
import { LogoutButton } from "../buttons/logout-button"
import PathConstants from '../route/pathConstants'
import { useEffect } from "react"
import { useAppDispatch } from "../../redux/Hooks/hooks"
import { selectLanguage } from "../../redux/selectors/selectLanguage"
import { Languages } from "../../constants/supportedLanguages"
import LangDropDown from "../lists/langDropDown"

function Navbar() {
  const {isAuthenticated, isLoading, user} = useSelector(selectAuth)
  const dispatch = useAppDispatch();
  const language = useSelector(selectLanguage);

  useEffect(()=>{
  }, [])

  //https://www.svgrepo.com/collection/flags-collection-4/2

  function GetOptions(){
    var options = [];

    options.push({
      selectedOptionName: Languages.English,
      selectedOptionImg: "https://res.cloudinary.com/dgegmm2pt/image/upload/v1721396516/united-kingdom-svgrepo-com_e2v4gs.svg"
    })
    options.push({
      selectedOptionName: Languages.Italian,
      selectedOptionImg: "https://res.cloudinary.com/dgegmm2pt/image/upload/v1721396516/italy-svgrepo-com_yzwhgr.svg"
    })
    options.push({
      selectedOptionName: Languages.Norwegian,
      selectedOptionImg: "https://res.cloudinary.com/dgegmm2pt/image/upload/v1721396517/norway-svgrepo-com_ehm11t.svg"
    })
    return options;
  }




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
            <li className="nav-item"><LangDropDown style="language-picture" defaultOptionIndex={0} options={GetOptions()}></LangDropDown></li>
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