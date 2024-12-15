import React from 'react'
import { Link } from 'react-router-dom'
import { basename } from '../Util/Constants'
import Logo from '../../images/logo.png'
const NavBar = () => {
  return (
    <div className='navBar'>
      <div><Link className='navElement' to={`${basename}/version`} ><img src={Logo} alt="campManager"></img></Link></div>
      <div><Link className='navElement' to={`${basename}/atmBackgrounds`}>Backgrounds</Link></div>
      <div><Link className='navElement' to={`${basename}/responses`}>Responses</Link></div>
      <div><Link className='navElement' to={`${basename}/campaigns`} >Campaigns</Link></div>
      <div><Link className='navElement' to={`${basename}/offers`}>Report</Link></div>
      <div><Link className='navElement' to={`${basename}/terminals`}>Terminals</Link></div>
      <div><Link className='navElement' to={`${basename}/terminalGroups`}>TerminalGroups</Link></div>

      <div><Link className='navElement' to={`${basename}/binRanges`}>BinRanges</Link></div>
      <div><Link className='navElement' to={`${basename}/binRangeGroups`}>BinRangeGroups</Link></div>
      <div><Link className='navElement' to={`${basename}/campaignConfig`}>Config</Link></div>
      <div><Link className='navElement' to={`${basename}/city`}>City</Link></div>
      <div><Link className='navElement' to={`${basename}/users`}>Users</Link></div>
      <div><Link className='navElement' to={`${basename}/login`}>Logout</Link></div>
    </div>
  )
}

export default NavBar