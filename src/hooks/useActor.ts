import { fetcher } from "helpers/fetcher"
import { getAccessToken } from "helpers/localStorage";
import { useEffect } from "react";
import { useAppSelector } from "stores/hook";
import useSWR from "swr"
import { setActors, setAllActor } from "reducers/actor";


export const useActor = (location:any ,dispatch:any,type:(string | null) = null, search:(string | null) = null) =>{
    const reset = useAppSelector((state:any)=>state.films.reset)
    const {
        data: actors,
        error: actorError,
        mutate: reloadActor
    } = useSWR(
       ((location.pathname === "/listings" || location.pathname === "/listing_categories") && getAccessToken()) ? [search === null ? '/categoryListing?page=1&limit=100' :`/categoryListing?page=1&limit=100&${type}=${search}`, getAccessToken()] : null ,fetcher)
       useEffect(()=>{
        const a = async ()=>{
            const newActor = await reloadActor();
            console.log("newActor:", newActor)
         if(actors){  
             if(!search){
                
                dispatch(setAllActor(newActor.data))
            }
             dispatch(setActors(newActor.data))
         }
       
    
        }
        a();
     },[search, actors, reset])
}