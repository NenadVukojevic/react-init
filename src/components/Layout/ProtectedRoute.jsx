import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { basename } from '../Util/Constants';

const ProtectedRoute = () => {
    const isLoggedIn = !!localStorage.getItem('authToken'); // Or your session check logic

    console.log("protectedRoute", isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to={`${basename}/login`} replace />;
    }

    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
        ;
};

export default ProtectedRoute;
