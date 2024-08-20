import { fetcher } from "helpers/fetcher"
import { getAccessToken } from "helpers/localStorage";
import { useEffect } from "react";
import { useAppSelector } from "stores/hook";
import useSWR from "swr"
import { setFilmMostView, setAllFilm } from "../reducers/Film";
const useFetchMostViewFilm = (location:any ,dispatch:any,type:(string | null) = null, search:(string | null) = null) =>{
    const reset = useAppSelector((state:any)=>state.films.reset)
    const {
        data: films,
        error: filmError,
        mutate: reloadFilm
    } = useSWR(
       ((location.pathname === "/" || location.pathname === "/listings")  && getAccessToken() ) ? [search === null ? '/listing?page=1&limit=100' :`/listing?page=1&limit=100&${type}=${search}`, getAccessToken()] : null ,fetcher)
       useEffect(()=>{
           
           const a = async ()=>{
               const newFilm = await reloadFilm();
               if(films){  
                   if(!search){
                       dispatch(setAllFilm(newFilm.data))
                    }
             dispatch(setFilmMostView(newFilm.data))
        }
      
   
       }
       a();
    },[search, films, reset])
 
}

export default useFetchMostViewFilm;