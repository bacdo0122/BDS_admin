import { axiosInstance } from 'apis';
import { newListing } from '../components/common/Pop';

export const CreateNewListing = async(payload: newListing)=>{
    const {
        regionId,
        userId,
        price,
        title,
        description,
        address,
        area,
        status_listing,
        legal_status,
        furnishing,
        orientation,
        bedrooms,
        bathrooms,
        type_id,
        category_id
    } = payload
    await axiosInstance.post("/listing/create", {
        regionId,
        userId,
        price,
        title,
        description,
        address,
        area,
        status_listing,
        legal_status,
        furnishing,
        orientation,
        bedrooms,
        bathrooms ,
        type_id,
        category_id,
        image: '[https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww]'
    }
    )
   
}

export const EditNewListing = async(payload:newListing)=>{
    const {
        regionId,
        userId,
        price,
        title,
        description,
        address,
        area,
        status_listing,
        legal_status,
        furnishing,
        orientation,
        bedrooms,
        bathrooms ,
        type_id,
        category_id
    } = payload

    await axiosInstance.put("/listing/edit", {
        regionId,
        userId,
        price,
        title,
        description,
        address,
        area,
        status_listing,
        legal_status,
        furnishing,
        orientation,
        bedrooms,
        bathrooms ,
        type_id,
        category_id,
        image: '[https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww]'
    })
}