import React, { useContext } from 'react';
import { FirebaseAuthContext } from '../contexts/firebaseAuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';

const PrivateRoute = ({children}) => {
    const {initialUser,loading}=useContext(FirebaseAuthContext);
    const location = useLocation();
    console.log(location.pathname);
    if(loading){
        return <p>loading ...............................................</p>
    }
    if(!initialUser){
        return <Navigate state={location.pathname} to={'/signin'}></Navigate>
    }
    return children
};

export default PrivateRoute;