import React from 'react'
import {Route,Routes} from 'react-router-dom'
import AdminLogin from '../pages/adminPages/adminLogin'
import AdminDashBoard from '../pages/adminPages/AdminDashBoard'
import VendorList from '../pages/vendorPages/VendorList'



function AdminRoute() {  
  return (
    <div>
      <Routes>
        <Route path='/' element={<AdminLogin/>}/>
        <Route path='/dashboard' element={<AdminDashBoard/>}/>
        <Route path='/vendorList' element={<VendorList/>}/>
      </Routes>
    </div>
  )
}

export default AdminRoute
