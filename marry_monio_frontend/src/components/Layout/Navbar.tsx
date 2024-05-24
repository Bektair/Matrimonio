import React from 'react'
import { Link } from "react-router-dom"
import PathConstants  from '../route/pathConstants'

function Navbar() {
  return (
    <div className="navbar-custom">
        <ul className="nav-list">
            <li className= "nav-item"><Link to={PathConstants.Menu} id='logo-container'>
              <div className='logo-img'><img className="small-logo" src="/src/assets/logo.svg"></img></div>
              <div className="logo-text"><span id="orange">Marry</span><span id="green">Monio</span></div>
            </Link></li>
            <li className="nav-item"><Link to={PathConstants.Home}>Home</Link></li>
            <li className="nav-item"><Link to={PathConstants.RSVP}>RSVP</Link></li>
            <li className="nav-item"><Link to={PathConstants.Ceremony}>Ceremony</Link></li>
            <li className="nav-item"><Link to={PathConstants.Reception}>Reception</Link></li>
            <li className="nav-item"><Link to={PathConstants.Posts}>Posts</Link></li>
            <li className="nav-item"><Link to={PathConstants.Profile}>Profile</Link></li>
        </ul>
    </div>
  )
}

export default Navbar