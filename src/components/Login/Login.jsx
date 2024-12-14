import React, { useEffect, useState } from 'react'
import authService from '../Services/AuthService';
import { basename } from '../Util/Constants';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] =
    useState({
      username: ''
      , password: ''
    });

  useEffect(() => {
    localStorage.clear();
  }, [])



  const handleChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  }



  const handleEnter = (ev) => {
    if (ev.key === "Enter" && credentials.password !== '' && credentials.username !== '') {
      login();
    }
  }


  const login = (ev) => {
  
    authService.login(credentials).then((res) => {
      const token = res.data.token;

      localStorage.setItem("authToken", "Bearer " + token);
      document.body.style.backgroundColor = "white";
      navigate(`${basename}/version`)
      //window.location.href = `${basename}/`;

    });
  }

  document.body.style.backgroundColor = "black";

  return (
    <div className='loginForm'>
      <div className='loginFormControl'>
        <div className='label'>
          <div>username</div>
        </div>
        <div><input
          type="text"
          name="username"
          placeholder='username'
          value={credentials.username}
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
        </div>
      </div>
      <div className='loginFormControl'>
        <div className='label'>
          <div>password</div>
        </div>
        <div><input
          type="password"
          name="password"
          placeholder='password'
          value={credentials.password}
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
        </div>
      </div>
      <div className='loginFormControl'>
        <div className='button'>
          <button onClick={login}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login