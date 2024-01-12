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


export const forgotPassword = async (userEmail)=>{
    const data = await userAxiosInstance.post('/forgotPassword',userEmail)
    return data;
}


export const resetPassword = async(id,email,password) => {
    const data = await userAxiosInstance.put(`/resetPassword/${id}/${email}`,{password})
    return data
  }

  export const googleAuth = async (authResult) => {
    try {
      const { uid, displayName, email, photoURL } = authResult.user;
      const data = await userAxiosInstance.post('/google', {
        uid,
        displayName,
        email,
        photoURL,
      });
      return data;
    } catch (error) {
      console.error("Error during Google authentication:", error);
      throw error;
    }
  };
  export const vendorList = async()=>{
    try {
      const data = await userAxiosInstance.get('vendorList')
      return data;
    } catch (error) {
      console.log(error.message)
    }
  }
  export const singleStudioDetails = async(vendorId)=>{
    try {
      const data = await userAxiosInstance.get(`/singleStudio/${vendorId}`);
      return data;
    } catch (error) {
      console.log(error.message)
    }
  }
  export const updateProfileImage = async (values) => {
    try {
      console.log(values)
      const data = await userAxiosInstance.patch('/updateProfile',values)
      return data;
    } catch (error) {
      // console.error('Error updating profile image:', error);
      throw error;
    }
  };

  export const getUserDetails = async (_id) => {
    console.log('wroking api')
    const data = await userAxiosInstance.get(`/userDetails/${_id}`)
    console.log(data,'dataaaaaaaa ')
    return data
  }
 


