import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Languages } from "../../constants/supportedLanguages"
import { selectAuth } from "../../redux/selectors/selectAuth"
import { LoginButton } from "../buttons/login-button"
import { LogoutButton } from "../buttons/logout-button"
import LangDropDown from "../lists/langDropDown"
import PathConstants from '../route/pathConstants'

function Navbar() {
  const {isAuthenticated, isLoading, user, profilePic} = useSelector(selectAuth)
  const { t } = useTranslation();

  useEffect(()=>{
    
  }, [])

  //https://www.svgrepo.com/collection/flags-collection-4/2

  function GetOptions(){
    var options = [];

    options.push({
      selectedOptionName: Languages.English,
      selectedOptionImg: "https://res.cloudinary.com/dgegmm2pt/image/upload/v1724574963/united-kingdom-uk-svgrepo-com_d1wc2u.svg"
    })
    options.push({
      selectedOptionName: Languages.Italian,
      selectedOptionImg: "https://res.cloudinary.com/dgegmm2pt/image/upload/v1724574870/flag-for-flag-italy-svgrepo-com_h3hjwv.svg"
    })
    options.push({
      selectedOptionName: Languages.Norwegian,
      selectedOptionImg: "https://res.cloudinary.com/dgegmm2pt/image/upload/v1724574963/flag-for-flag-norway-svgrepo-com_he0eo2.svg"
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
            <li className="nav-item"><Link to={PathConstants.Home}>{t("home")}</Link></li>
            <li className="nav-item"><Link to={PathConstants.RSVP}>RSVP</Link></li>
            <li className="nav-item"><Link to={PathConstants.Schedule}>{t("schedule")}</Link></li>
            <li className="nav-item"><Link to={PathConstants.Posts}>{t("posts")}</Link></li>
            <li className="nav-item"><Link to={PathConstants.Profile}><img className='profile-picture-nav' src={profilePic ?? user?.picture ?? ""}></img></Link></li>
            <li className="nav-item"><LangDropDown style="language-picture" defaultOptionIndex={0} options={GetOptions()}></LangDropDown></li>
            {  process.env.NODE_ENV === 'development' && isLoading ? <li className="nav-item"><div className="list-loader-navbar"></div></li> : 
              !isAuthenticated ? 
              <li className="nav-item"><LoginButton className="login-btn" key="login"></LoginButton></li> :
              <li className="nav-item"><LogoutButton className="logout-btn" key="logout"></LogoutButton></li>
            }
        </ul>
    </div>
  )
}

export default Navbar