import React, { useEffect,useRef } from 'react'
import "./Navbar.css"
import logo from '../../assets/logo.png'
import searchIcon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'

function Navbar() {
  const navref=useRef()
  useEffect(()=>{
    window.addEventListener("scroll",()=>{
      if(window.scrollY>80){
        navref.current.classList.add("nav-black")
      }else{
        navref.current.classList.remove("nav-black")
      }
  })
},[])
  return (
    <div ref={navref} className='navbar'>
      <div className='navbar-left'>
        <img src={logo} alt="logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>Browse My Language</li>
        </ul>
      </div>

      <div className='navbar-right'>
        <img src={searchIcon} alt="search icon" className="icons" />
        <p>Children</p>
        <img src={bell_icon} alt="bell icon" className="icons" />

        <div className="navbar-profile">
          <img src={profile_img} alt="profile icon" className="profile" />
          <img src={caret_icon} alt="caret icon" className="icons" />
        <div className="dropdown">sign out of netflix</div>
        </div>
      </div>
    </div>
  )
}


export default Navbar
