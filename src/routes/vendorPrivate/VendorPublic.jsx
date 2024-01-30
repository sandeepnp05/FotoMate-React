import React from 'react'
import { Navigate } from 'react-router-dom'

function VendorPublic(props) {
  try {
    const token = localStorage.getItem("vendorToken")
    if (token) {
      return  <Navigate to={"/vendor"}/>
    }else{
       <Navigate to={"/vendor/login"}/>
       return props.children;
    }
  } catch (error) {
    console.log(error.message)
  }
}

export default VendorPublic
