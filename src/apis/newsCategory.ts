import { axiosInstance } from 'apis';

export const CreateNewNewsCategory = async(name:string,description:string)=>{
   return  await axiosInstance.post("/categoryNews/create", {
        name, description
    })
 
}

export const EditExisNewsCategory = async(id:string, name:string,description:string)=>{
    return await axiosInstance.put("/categoryNews/edit", {
        id, name, description
    })

}