import React from 'react'
import { Link } from 'react-router-dom'
import { basename } from '../Util/Constants'
import Logo from '../../images/logo.png'
const NavBar = () => {
  return (
    <div className='navBar'>
      <div><img src={Logo} alt="campManager"></img> </div>
      <div><Link className='navElement' to={`${basename}/home`} >Home</Link></div>
      <div><Link className='navElement' to={`${basename}/campaigns`} >Campaigns</Link></div>
      <div><Link className='navElement' to={`${basename}/responses`}>Responses</Link></div>
      <div><Link className='navElement' to={`${basename}/terminals`}>Terminals</Link></div>
      <div><Link className='navElement' to={`${basename}/atmBackgrounds`}>Backgrounds</Link></div>
      <div><Link className='navElement' to={`${basename}/`}>Welcome</Link></div>
      <div><Link className='navElement' to={`${basename}/login`}>login</Link></div>
    </div>
  )
}

export default NavBar