import { fetcher } from "helpers/fetcher"
import { getAccessToken } from "helpers/localStorage";
import { useEffect } from "react";
import { useAppSelector } from "stores/hook";
import useSWR from "swr"
import { setActors, setAllActor } from "reducers/actor";
import { setAllNew, setNews } from "../reducers/news";
import { setAllRegion, setRegions } from "../reducers/regions";


export const useRegion = (location:any ,dispatch:any,type:(string | null) = null, search:(string | null) = null) =>{
    const reset = useAppSelector((state:any)=>state.films.reset)
    const {
        data: actors,
        error: actorError,
        mutate: reloadActor
    } = useSWR(
       ((location.pathname === "/regions" || location.pathname === "/") && getAccessToken()) ? [search === null ? '/region?page=1&limit=100' :`/region?page=1&limit=100&${type}=${search}`, getAccessToken()] : null ,fetcher)
       useEffect(()=>{
        const a = async ()=>{
            const newActor = await reloadActor();
         if(actors){  
             if(!search){
                
                dispatch(setAllRegion(newActor.data))
            }
             dispatch(setRegions(newActor.data))
         }
       
    
        }
        a();
     },[search, actors, reset])
}