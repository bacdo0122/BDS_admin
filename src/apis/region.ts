import { axiosInstance } from 'apis';

export const CreateNewRegion = async(district:string, ward: string)=>{
   return  await axiosInstance.post("/region/create", {
        district, ward
    })
 
}

export const EditExisRegion = async(id:string, district:string, ward: string)=>{
    return await axiosInstance.put("/region/edit", {
        id, district, ward
    })

}