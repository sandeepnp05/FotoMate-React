import React from 'react'
// import { useEffect } from 'react'
import Sidebar from '../../components/adminComponents/Sidebar'
import UserList from '../../components/adminComponents/UserList'
import Dashboard from '../../components/adminComponents/Dashboard'


function AdminDashBoard() {
   
  return (  
    <div>
      <Sidebar/>
      <Dashboard/>
     
    </div>
  )
}

export default AdminDashBoard
