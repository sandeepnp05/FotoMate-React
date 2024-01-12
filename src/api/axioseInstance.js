import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL = import.meta.env.VITE_BASE_URL;
const userBaseURL = baseURL;
const adminBaseURL = `${baseURL}/admin`
const vendorBaseURL = `${baseURL}/vendor`


const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 200000,
    timeoutErrorMessage: "Request Timeout... Please try again!..",
  });
  return instance;
};

const attatchToken = (req, tokenName) => {
  let authToken = localStorage.getItem(tokenName);
  if (authToken) {
    req.headers.Authorization = `Bearer ${authToken}`;
  }
  return req;
};

//user request interceptor

export const userAxiosInstance = createAxiosInstance(userBaseURL);
userAxiosInstance.interceptors.request.use(async (req) => {
  const modifyReq = attatchToken(req, "userToken");
  return modifyReq;
});

//admin request interceptor
export const adminAxioseInstance = createAxiosInstance(adminBaseURL)
adminAxioseInstance.interceptors.request.use(async(req)=>{
  const modifyReq = attatchToken(req,"adminToken")
  return modifyReq
})

//vendor request interceptor
export const vendorAxioseInstance = createAxiosInstance(vendorBaseURL);
vendorAxioseInstance.interceptors.request.use(async(req) => {
  const modifyReq = attatchToken(req, "vendorToken");  
  return modifyReq;
});

// responce interceptor

userAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error, "user")
);

adminAxioseInstance.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error,"admin")

)

vendorAxioseInstance.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error,"vendor")
)

const handleAxiosError = (error, role) => {
  console.log(error,'handle axiose');
  const errorMessage = error.response
    ? error.response.data.message
    : "An error occurred while request.";

  if (error.response) {
    if (error.response.status === 404) {
      if (role === "user") {
        window.location.href = `/pageNotFound`;
      } else {
        window.location.href = `/${role}/pageNotFound`;
      }
      toast.error("404 - Resource Not Found");
    } else if (error.response.status === 500) {
      toast.error("500 - Internal Server Error");
      if (role === "user") {
        window.location.href = `/error-500`;
      } else {
        window.location.href = `/${role}/error-500`;
      }
    } else if (error.response?.data?.message === "Access Denied") {
      if (role === "user") {
        window.location.href = `/login`;
      } else if (role === "vendor") {
        window.location.href = `/vendor/login`;
      } else if (role === "admin") {
        window.location.href = `/admin`;
      }
    } else if (error.response?.data?.message === "User is blocked") {
      if (role === "user") {
        toast.error("Account blocked by admin");
        window.location.href = `/login`;
      } else if (role === "vendor") {
        toast.error("Account blocked by admin");
        window.location.href = `/vendor/login`;
      } else if (role === "admin") {
        toast.error("Account blocked by admin");
        window.location.href = `/admin`;
      }
    } else {
      console.log("hi from axios");
      toast.error(errorMessage);
    }
  } else {
    toast.error(errorMessage);
  }
};
