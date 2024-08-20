import { fetcher } from "helpers/fetcher"
import { getAccessToken } from "helpers/localStorage";
import { useEffect } from "react";
import { useAppSelector } from "stores/hook";
import useSWR from "swr"
import { setActors, setAllActor } from "reducers/actor";
import { setAllNew, setNews } from "../reducers/news";


export const useNews = (location:any ,dispatch:any,type:(string | null) = null, search:(string | null) = null) =>{
    const reset = useAppSelector((state:any)=>state.films.reset)
    const {
        data: actors,
        error: actorError,
        mutate: reloadActor
    } = useSWR(
       ((location.pathname === "/news" || location.pathname === "/") && getAccessToken()) ? [search === null ? '/news?page=1&limit=100' :`/news?page=1&limit=100&${type}=${search}`, getAccessToken()] : null ,fetcher)
       useEffect(()=>{
        const a = async ()=>{
            const newActor = await reloadActor();
         if(actors){  
             if(!search){
                
                dispatch(setAllNew(newActor.data))
            }
             dispatch(setNews(newActor.data))
         }
       
    
        }
        a();
     },[search, actors, reset])
}