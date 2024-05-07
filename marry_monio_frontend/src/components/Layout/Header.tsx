import React from 'react'

import './Header.sass'
import Navbar from './Navbar'

function Header() {
  return (
    <header>
      <div className="header-div">
        <Navbar></Navbar>
      </div>
    </header>
  )
}

export default Header