import React from 'react'
import { Link } from "react-router-dom"
import PathConstants  from '../route/pathConstants'

function Navbar() {
  return (
    <nav className="navbar">
        <ul className="nav-list">
            <li className= "nav-item" id='logo-container'><img className="small-logo" src="/src/assets/logo.svg"></img><p id="orange">Marry</p><p id="green">Monio</p></li>
            <li className="nav-item"><Link to={PathConstants.Home}>Home</Link></li>
            <li className="nav-item"><Link to={PathConstants.RSVP}>RSVP</Link></li>
            <li className="nav-item"><Link to={PathConstants.Ceremony}>Ceremony</Link></li>
            <li className="nav-item"><Link to={PathConstants.Reception}>Reception</Link></li>
            <li className="nav-item"><Link to={PathConstants.Posts}>Posts</Link></li>
            <li className="nav-item"><Link to={PathConstants.Profile}>Profile</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar