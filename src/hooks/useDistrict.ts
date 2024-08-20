import { fetcher } from "helpers/fetcher"
import { getAccessToken } from "helpers/localStorage";
import { useEffect } from "react";
import { useAppSelector } from "stores/hook";
import useSWR from "swr"
import { setAllRegion, setRegions } from "../reducers/regions";
import { setAllDistrict, setDistricts } from "../reducers/district";


export const useDistrict = (location:any ,dispatch:any,type:(string | null) = null, search:(string | null) = null) =>{
    const reset = useAppSelector((state:any)=>state.films.reset)
    const {
        data: actors,
        error: actorError,
        mutate: reloadActor
    } = useSWR(
       ((location.pathname === "/districts") && getAccessToken()) ? [search === null ? '/district?page=1&limit=100' :`/district?page=1&limit=100&${type}=${search}`, getAccessToken()] : null ,fetcher)
       useEffect(()=>{
        const a = async ()=>{
            const newActor = await reloadActor();
         if(actors){  
             if(!search){
                
                dispatch(setAllDistrict(newActor.data))
            }
             dispatch(setDistricts(newActor.data))
         }
       
    
        }
        a();
     },[search, actors, reset])
}