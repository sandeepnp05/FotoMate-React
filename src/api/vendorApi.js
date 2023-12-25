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





