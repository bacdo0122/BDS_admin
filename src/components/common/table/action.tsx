import { axiosInstance } from 'apis';
import React, { useEffect } from 'react';
import { setReset } from 'reducers/Film';
export const deleteUser =  async (id:number )=>{

    await axiosInstance.post("/listing/delete",{
        id: id
    });
   
}
export const deleteCategoryListing =  async (id:number )=>{

    await axiosInstance.post("/categoryListing/delete",{
        id
    });
   
}
export const deleteTypeListing =  async (id:number )=>{

    await axiosInstance.post("/typeListing/delete",{
        id
    });
   
}
export const deleteNews =  async (id:number )=>{

    await axiosInstance.post("/news/delete",{
        id
    });
   
}

export const deleteNewsCategory =  async (id:number )=>{

    await axiosInstance.post("/categoryNews/delete",{
        id
    });
   
}

export const deleteRegion =  async (id:number )=>{

    await axiosInstance.post("/region/delete",{
        id
    });
   
}

export const deleteReview =  async (id:number )=>{

    await axiosInstance.post("/Review/delete",{
        id
    });
   
}

export const deleteUserAdmin =  async (id:number )=>{

    await axiosInstance.post("/user/delete",{
        id
    });
   
}