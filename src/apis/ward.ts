import { axiosInstance } from 'apis';

export const CreateNewWard = async(name:string, districtId:number)=>{
   return  await axiosInstance.post("/ward/create", {
        name,districtId
    })
 
}

export const EditExisWard = async(id:string, name:string, districtId:number)=>{
    return await axiosInstance.put("/ward/edit", {
        id, name,districtId 
    })

}