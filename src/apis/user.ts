import { axiosInstance } from 'apis';

export const CreateNewuser = async(name:string, email:string, password:string)=>{
   return  await axiosInstance.post("/user/create", {
        name,email,password, role: "user"
    })
 
}

export const EditExisUser = async(id:string, name:string, email:string, password:string)=>{
    return await axiosInstance.put("/user/edit", {
        id,  name,email,password, role: "user"
    })

}