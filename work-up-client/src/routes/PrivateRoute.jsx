import React, { useContext } from 'react';
import { FirebaseAuthContext } from '../contexts/firebaseAuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';

const PrivateRoute = ({children}) => {
    const {initialUser,loading}=useContext(FirebaseAuthContext);
    const location = useLocation();
    if(loading){
        return <LoadingSpinner></LoadingSpinner>
    }
    if(!initialUser){
        return <Navigate state={{ from: location }} to={'/signin'} replace></Navigate>
    }
    return children
};

export default PrivateRoute;