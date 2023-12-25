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