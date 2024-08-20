import { axiosInstance } from 'apis';

export const CreateNewDirection = async(name:string)=>{
   return  await axiosInstance.post("/direction/create", {
        name
    })
 
}

export const EditExisDirection = async(id:string, name:string)=>{
    return await axiosInstance.put("/direction/edit", {
        id, name
    })

}