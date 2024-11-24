import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='navBar'>
        <div><Link className='navElement' to='./home' >Home</Link></div>
        <div><Link className='navElement' to='./list' >List</Link></div>
        <div><Link className='navElement' to='./' >Welcome</Link></div>
        <div><Link className='navElement' to='./login' >login</Link></div>
    </div>
  )
}

export default NavBar