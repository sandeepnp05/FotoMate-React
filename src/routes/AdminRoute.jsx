import React from 'react'
import {Route,Routes} from 'react-router-dom'
import AdminLogin from '../pages/adminPages/adminLogin'
import AdminDashBoard from '../pages/adminPages/AdminDashBoard'



function AdminRoute() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<AdminLogin/>}/>
        <Route path='/dashboard' element={<AdminDashBoard/>}/>
      </Routes>
    </div>
  )
}

export default AdminRoute
