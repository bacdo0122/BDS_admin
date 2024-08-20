import { fetcher } from "helpers/fetcher"
import { getAccessToken } from "helpers/localStorage";
import { useEffect } from "react";
import { useAppSelector } from "stores/hook";
import { setAllUser, setUserFilter} from "reducers/user";
import useSWR from "swr"

export const useUser = (location:any ,dispatch:any,type:(string | null) = null, search:(string | null) = null) =>{
    const reset = useAppSelector((state:any)=>state.films.reset)
    const {
        data: user,
        error: userError,
        mutate: reloadUser
    } = useSWR(
       ((location.pathname === "/users" || location.pathname === "/" ) && getAccessToken()) ? [search === null ? '/user/getUsers/?page=1&limit=100' :`/user/getUsers/?page=1&limit=100&${type}=${search}`, getAccessToken()] : null ,fetcher)
       useEffect(()=>{
        const a = async ()=>{
            const newUser = await reloadUser();
         if(user){  
            if(!search){
                dispatch(setAllUser(newUser.data))
            }
     
             dispatch(setUserFilter(newUser.data))
         }
       
    
        }
        a();
     },[search, user, reset])
}