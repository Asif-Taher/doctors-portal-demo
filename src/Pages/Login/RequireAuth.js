import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';

export default function RequireAuth({children}) {
    const [user, loading, error] = useAuthState(auth);
    const location = useLocation();
    if(!user){
            return <Navigate to="/login" state={{from: location}} replace></Navigate>
    }
    if(loading){
        return <Loading></Loading>
    }
  return children;
}
