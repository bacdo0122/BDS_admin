import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { setAuthenticated } from '../reducers';
import { useAppDispatch } from '../stores/hook';

const logOutPage = () => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        localStorage.removeItem("actk");
        localStorage.removeItem("frtk");
           dispatch(setAuthenticated(false));
    },[])
  return <Navigate to="/login"/>;
};

export default logOutPage;
