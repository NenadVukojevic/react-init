import React from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const fakeLogin = ()=>{
        localStorage.setItem('authToken', 'daVolimCrnoBele');
        navigate("/");
    }
  return (
    <div>
        <p>Login</p>
        <button onClick={fakeLogin}>Fake it!</button>

    </div>
  )
}

export default Login