import {adminAxioseInstance} from './axioseInstance'

export const adminLoginVerify = async(loginData)=>{
    const data = await adminAxioseInstance.post('/login',loginData)
    return data;
}

export const userList = async()=>{
    const data  = await adminAxioseInstance.get('/userList')
    return data;
}
export const blockUser = async(userId,status)=>{
    const data = await adminAxioseInstance.patch('/userBlock',{userId,status})
   
    return data;
}

export const vendorList = async()=>{
    try {
        const data = await adminAxioseInstance.get('/vendorList')
        console.log(data,'rom admin api vendorList')
        return data;
    } catch (error) {
        console.log(error.message)
        console.log('object')
    }
}
export const blockVendor = async(vendorId,status)=>{
    console.log('working api')
   try {
    const data = await adminAxioseInstance.patch('/vendorBlock',{vendorId,status})
    console.log(data,'data api')
    return data;
   } catch (error) {
    
   }
}
export const blockStudio = async ( studioId, status ) => {
    console.log('working api');
    try {
      const data = await adminAxioseInstance.patch('/studioBlock', { studioId, status });
      console.log(data, 'data api');
      return data;
    } catch (error) {
      console.error('Axios Error:', error);
      throw error;
    }
  };

  export const addCategory = async (categoryData)=>{
    try {
        const data = await adminAxioseInstance.post('/addCategory',categoryData)
        console.log(categoryData,'api data')
        
        return data;
    } catch (error) {
        console.log(error)
    }
  }
  
  export const adminCategoryList = async ()=>{
    try {
        const data = await adminAxioseInstance.get('/categoryList')
        
        return data;
    } catch (error) {
        console.log(error)
    }
  }
  export const singleCategory = async (cat_id)=>{
    try {
        const data = await adminAxioseInstance.get(`/singleCategory/${cat_id}`)
        return data;
    } catch (error) {
        console.log(error)
    }
  } 
  export const edit_category = async(cat_id,name,description)=>{
    try {
        console.log('from api')
        console.log(cat_id,name,description,'cat_id,name,description from api')
        const data = await adminAxioseInstance.patch(`/editCategory/${cat_id}`,{cat_id,name,description})
        return data;
    } catch (error) {
        console.log(error)
        throw error
    }
  }

  export const unlistCategory = async(_id,status)=>{
    const data = await adminAxioseInstance.patch('/categoryList',{_id,status});
    return data;
  }

  export const add_subcategory = async(cat_id,values,baseImage)=>{
    try {
        const data = await adminAxioseInstance.post(`/addSubCategory`,{cat_id,values,baseImage})
        return data;
    } catch (error) {
        console.log(error.message)
    }
  }
  export const subcategories = async(cat_id)=>{
    try {
        const data = await adminAxioseInstance.get(`/subcategory/${cat_id}`)
        console.log(data,'data')
        return data;
    } catch (error) {
        console.log(error.message)
    }
  }


  export const getBookingList = async()=>{
    const data = await adminAxioseInstance.get('/bookingList')
    return data;
  }

  export const cancelBooking = async(reason,bookingId) =>{
    const data = await adminAxioseInstance.post('/cancelBooking',{reason,bookingId})
    return data;
  }