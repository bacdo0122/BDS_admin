import { axiosInstance } from 'apis';

export const CreateNewListingCategory = async(name:string, description:string)=>{
   return  await axiosInstance.post("/categoryListing/create", {
        name,description
    })
  
}

export const EditListingCategory = async(id:string, name:string, description:string)=>{
    return await axiosInstance.put("/categoryListing/edit", {
        id, name,description
    })

}