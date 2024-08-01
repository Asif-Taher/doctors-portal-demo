import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';
import useAdmin from '../../hook/useAdmin';
import { signOut } from 'firebase/auth';

export default function RequeireAdmin({children}) {
    const [user, loading, error] = useAuthState(auth);
    const [admin,adminLoading] = useAdmin(user);
    const location = useLocation();
    if(!user || !admin){
            return <Navigate to="/login" state={{from: location}} replace></Navigate>
    }
    if(loading || adminLoading){
        return <Loading></Loading>
    }
  return children;
}
