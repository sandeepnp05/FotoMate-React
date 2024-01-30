// Example with error handling and logging

import { vendorAxioseInstance } from "./axioseInstance";

export const vendorSignup = async (signupData) => {
  try {
    const data = await vendorAxioseInstance.post("/signup", signupData);
    return data;
  } catch (error) {
    console.error("Vendor signup failed:", error);
    throw new Error("Vendor signup failed");
  }
};

export const vendorOtpVerifiaction = async (otp,vendorId) => {
    try {
      const data = await vendorAxioseInstance.post("/otp",{otp,vendorId});
      return data;
    } catch (error) {
      console.error("Vendor otp verification failed:", error);
      throw new Error("Vendor otp verification failed");
    }
  };
export const vendorLoginVerify = async (loginData) => {
    try {
      const data = await vendorAxioseInstance.post("/login",loginData);
      return data;
    } catch (error) {
      console.error("Vendor otp verification failed:", error);
      throw new Error("Vendor otp verification failed");
    }
  };

  export const addStudio = async (formData, vendorId) => {
    try {
      const data = await vendorAxioseInstance.post('/addStudio', {...formData,}, vendorId);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
export const showVendorStudio = async (vendorId) => {
  try {
    const data = await vendorAxioseInstance.get(`/studio/${vendorId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCoverImage = async (_id,image)=>{
  const data = await vendorAxioseInstance.patch('/studio',{_id,image})
}

export const addPackage = async (formData) =>{
  const data = await vendorAxioseInstance.post('/addPackage',formData)
  return data;
}

export const fetchPackages = async (vendorId) =>{
  const data = await vendorAxioseInstance.get('/getPackages',{
    params: { vendorId }
  })
  return data;
}

export const editStudio = async(formData)=>{
  const data = await vendorAxioseInstance.patch('/editStudio',formData)
  return data;
}

export const fetchBooking = async(vendorId) =>{
  const data  =  await vendorAxioseInstance.get(`/getBooking?vendorId=${vendorId}`)
  return data;
}



