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
      const data = await vendorAxioseInstance.post('/addStudio', {...formData}, vendorId);
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





