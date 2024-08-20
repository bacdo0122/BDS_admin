import { fetcher } from "helpers/fetcher"
import { getAccessToken } from "helpers/localStorage";
import { useEffect } from "react";
import { useAppSelector } from "stores/hook";
import { setAllBanner, setBanner } from "reducers/banner";
import useSWR from "swr"

export const useBanner = (location:any ,dispatch:any,type:(string | null) = null, search:(string | null) = null) =>{
    const reset = useAppSelector((state:any)=>state.films.reset)
    const {
        data: banner,
        error: bannerError,
        mutate: reloadbanner
    } = useSWR(
       ((location.pathname === "/banners" || location.pathname === "/films" ) && getAccessToken()) ? [search === null ? '/banner?page=1&limit=100' :`/banner?page=1&limit=100&${type}=${search}`, getAccessToken()] : null ,fetcher)
       useEffect(()=>{
        const Banner = async ()=>{
            const newbanner = await reloadbanner();
            if(banner){  
             if(!search){
                dispatch(setAllBanner(newbanner.data))
            }
           
             dispatch(setBanner(newbanner.data))
         }
       
    
        }
        Banner(); 
     },[search, banner, reset])
}