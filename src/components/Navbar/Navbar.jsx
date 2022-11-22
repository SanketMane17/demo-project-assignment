import React from 'react'
import {HiUserCircle} from "react-icons/hi";
import {AiFillCaretDown} from "react-icons/ai";
import "./Navbar.scss";

function Navbar() {
  return (
    <div className='app__navbar'>
      <p>Get Supermind</p>
      <div className='app__user'>
        <HiUserCircle size={30}/>
        <AiFillCaretDown size={12}/>
      </div>
    </div>
  )
}

export default Navbar