import { fetcher } from "helpers/fetcher"
import { getAccessToken } from "helpers/localStorage";
import { useEffect } from "react";
import { useAppSelector } from "stores/hook";
import useSWR from "swr"
import { setActors, setAllActor } from "reducers/actor";
import { setAllNew, setNews } from "../reducers/news";
import { setAllNewCategory, setNewsCategory } from "../reducers/news_category";


export const useNewsCategory = (location:any ,dispatch:any,type:(string | null) = null, search:(string | null) = null) =>{
    const reset = useAppSelector((state:any)=>state.films.reset)
    const {
        data: actors,
        error: actorError,
        mutate: reloadActor
    } = useSWR(
       ((location.pathname === "/news_category" || location.pathname === "/listing_categories") && getAccessToken()) ? [search === null ? '/categoryNews?page=1&limit=100' :`/categoryNews?page=1&limit=100&${type}=${search}`, getAccessToken()] : null ,fetcher)
       useEffect(()=>{
        const a = async ()=>{
            const newActor = await reloadActor();
         if(actors){  
             if(!search){
                
                dispatch(setAllNewCategory(newActor.data))
            }
             dispatch(setNewsCategory(newActor.data))
         }
       
    
        }
        a();
     },[search, actors, reset])
}