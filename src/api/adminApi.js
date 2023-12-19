import {adminAxioseInstance} from './axioseInstance'

export const adminLoginVerify = async(loginData)=>{
    const data = await adminAxioseInstance.post('/login',loginData)
    console.log(data)
    return data;
}