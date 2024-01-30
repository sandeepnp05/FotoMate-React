import React from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminProtect(props) {
 try {
    const token = localStorage.getItem("adminToken");
    if (token) {
        return props.children;
    }else{
         toast.success("You must login first");
        return <Navigate to={"/admin"}/>
    }
 } catch (error) {
    console.log(error.message)
 }
}

export default AdminProtect
