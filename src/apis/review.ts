import { axiosInstance } from 'apis';

export const CreateNewReview = async(listingId:number, userId:number, rating:number, comment:string)=>{
   return  await axiosInstance.post("/review/create", {
        listingId, userId, rating, comment
    })
 
}

export const EditExisReview = async(id:string,listingId:number, userId:number, rating:number, comment:string)=>{
    return await axiosInstance.put("/review/edit", {
        id,   listingId, userId, rating, comment
    })

}