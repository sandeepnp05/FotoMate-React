import React from 'react'
import {Route,Routes} from 'react-router-dom'
import AdminLogin from '../pages/adminPages/adminLogin'
import AdminDashBoard from '../pages/adminPages/AdminDashBoard'
import VendorList from '../pages/vendorPages/VendorList'
import StudioList from '../pages/vendorPages/StudioList'

function AdminRoute() {  

  return (
    <div>
      <Routes>
        <Route path='/' element={<AdminLogin/>}/>
        <Route path='/dashboard' element={<AdminDashBoard/>}/>
        <Route path='/vendorList' element={<VendorList/>}/>
        <Route path='/studioList' element={<StudioList/>}/>
      </Routes>
    </div>
  )
}

export default AdminRoute
