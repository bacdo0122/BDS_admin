import { axiosInstance } from 'apis';

export const CreateNewNews = async(title:string, content:string, userId: number, category_id: number)=>{
   return  await axiosInstance.post("/news/create", {
        title,content,userId, category_id
    })
 
}

export const EditExisNews = async(id:string, title:string, content:string, userId: number,  category_id: number)=>{
    return await axiosInstance.put("/news/edit", {
        id, title,content,userId, category_id
    })

}