import { axiosInstance } from 'apis';

export const CreateNewDistrict = async(name:string)=>{
   return  await axiosInstance.post("/district/create", {
        name
    })
 
}

export const EditExisDistrict = async(id:string, name:string)=>{
    return await axiosInstance.put("/district/edit", {
        id, name
    })

}