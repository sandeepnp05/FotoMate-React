import { userAxiosInstance } from "./axioseInstance";

export const userSignup = async (signupData)=>{
    console.log(signupData)
    const data = await userAxiosInstance.post("/signup",signupData)
    return data;
}

export const otpVerification = async (otp,otpId,userId)=>{
    const data = await userAxiosInstance.post('/otp',{otp,userId})
    return data
}

export const clientResendOtp = async (userEmail)=>{
    const data = await userAxiosInstance.post('/resendOtp',{userEmail})
    return data
}

export const loginVerification = async (loginData)=>{
    const data = await userAxiosInstance.post('/login',loginData)
    return data

}