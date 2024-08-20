import { fetcher } from "helpers/fetcher"
import { getAccessToken } from "helpers/localStorage";
import { useEffect } from "react";
import { useAppSelector } from "stores/hook";
import { setCategory, setAllCategory } from "reducers/category";
import useSWR from "swr"

export const useCategory = (location:any ,dispatch:any,type:(string | null) = null, search:(string | null) = null) =>{
    const reset = useAppSelector((state:any)=>state.films.reset)
    const {
        data: categories,
        error: categoryError,
        mutate: reloadCategory
    } = useSWR(
       ((location.pathname === "/listing_types" || location.pathname === "/listings" ) && getAccessToken()) ? [search === null ? '/typeListing?page=1&limit=100' :`/typeListing?page=1&limit=100&${type}=${search}`, getAccessToken()] : null ,fetcher)
       useEffect(()=>{
        const Category = async ()=>{
            const newCategory = await reloadCategory();
            if(categories){  
             if(!search){
                dispatch(setAllCategory(newCategory.data))
            }
             dispatch(setCategory(newCategory.data))
         }
       
    
        }
        Category(); 
     },[search, categories, reset])
}