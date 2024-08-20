import { axiosInstance } from 'apis';

export const CreateNewListingType = async(name:string, description: string)=>{
   return  await axiosInstance.post("/typeListing/create", {
        name, description
    })
 
}

export const EditExisListingType = async(id:string, name:string, description: string)=>{
    return await axiosInstance.put("/typeListing/edit", {
        id, name, description
    })

}