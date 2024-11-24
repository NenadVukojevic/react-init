import React from 'react'
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();

    const fakeLogout = () => {
        localStorage.clear();
        console.log("somewhere")
        navigate("/login")
    }

    return (
        <div>
            <p>
                Welcome
            </p>
            <button onClick={fakeLogout}>Logout</button>
        </div>
    )
}

export default Welcome