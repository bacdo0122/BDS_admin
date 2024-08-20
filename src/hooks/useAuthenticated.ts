import { publicRouters } from 'consts/auth';
import { getAccessToken } from 'helpers/localStorage';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAuthenticated, setUser } from 'reducers';
import { useAppDispatch, useAppSelector } from 'stores/hook';
import {fetcher} from '../helpers/fetcher'
import useSWR from 'swr';
export const useAuthenticated = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
  const isAuthenticated = useAppSelector((state:any) => state.auth.isAuthenticated);
  const {
    data:user,
    error: userError,
    mutate: reloadUser,
  } = useSWR([
    getAccessToken() ? '/user' : null,getAccessToken()
  ], fetcher)

    useEffect(()=>{
    
      if(user){
              
        dispatch(setUser(user));
        dispatch(setAuthenticated(true));
      }
    },[user,userError])
    
    useEffect(()=>{
      console.log("data:", user)
      if(getAccessToken() !== null && getAccessToken() && !publicRouters.includes(location.pathname) ){
        
        dispatch(setAuthenticated(true));
        navigate(location.pathname);
      }
      else if(publicRouters.includes(location.pathname) && getAccessToken()){
        dispatch(setAuthenticated(true));
        navigate("/")
      }else if (
        ((isAuthenticated !== null && !isAuthenticated) || !getAccessToken())
      ) {
        console.log("a")
        dispatch(setAuthenticated(false));
        navigate('/login');
      }
    },[isAuthenticated, location.pathname])

}