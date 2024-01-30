import React from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function VendorProtect(props) {
 try {
    const token = localStorage.getItem('vendorToken')
    if (token) {
        return props.children;
    }else{
        toast.success("You must login first")
        return <Navigate to={"/vendor/login"}/>
    }
 } catch (error) {
    console.log(error.message)
 }
}

export default VendorProtect
