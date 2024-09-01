import { axiosInstance } from 'apis';

export const CreateNewRegion = async(name:string, wardId: number)=>{
   return  await axiosInstance.post("/region/create", {
        name, wardId
    })
 
}

export const EditExisRegion = async(id:string, name:string, wardId: number)=>{
    return await axiosInstance.put("/region/edit", {
        id, name, wardId
    })

}