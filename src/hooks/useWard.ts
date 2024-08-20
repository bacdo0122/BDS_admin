import { fetcher } from "helpers/fetcher"
import { getAccessToken } from "helpers/localStorage";
import { useEffect } from "react";
import { useAppSelector } from "stores/hook";
import useSWR from "swr"
import { setAllRegion, setRegions } from "../reducers/regions";
import { setAllDistrict, setDistricts } from "../reducers/district";
import { setAllWard, setWards } from "../reducers/ward";


export const useWard = (location:any ,dispatch:any,type:(string | null) = null, search:(string | null) = null) =>{
    const reset = useAppSelector((state:any)=>state.films.reset)
    const {
        data: actors,
        error: actorError,
        mutate: reloadActor
    } = useSWR(
       ((location.pathname === "/wards") && getAccessToken()) ? [search === null ? '/ward?page=1&limit=100' :`/ward?page=1&limit=100&${type}=${search}`, getAccessToken()] : null ,fetcher)
       useEffect(()=>{
        const a = async ()=>{
            const newActor = await reloadActor();
         if(actors){  
             if(!search){
                
                dispatch(setAllWard(newActor.data))
            }
             dispatch(setWards(newActor.data))
         }
       
    
        }
        a();
     },[search, actors, reset])
}