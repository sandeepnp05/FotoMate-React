import React from 'react'
import { Navigate } from 'react-router-dom'

function AdminPublic(props) {
    try {
     const token = localStorage.getItem('adminToken')
     if (token) {
       return <Navigate to={"/admin/dashboard"}/>
     }else{
         <Navigate to={"/"}/>
         return props.children;
     }

    } catch (error) {
       console.log(error.message)
    }
}

export default AdminPublic
