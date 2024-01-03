import React from 'react'
// import { useEffect } from 'react'
import Sidebar from '../../components/adminComponents/Sidebar'
// import Topbar from '../../components/adminComponents/Topbar'
import UserList from '../../components/adminComponents/UserList'


function AdminDashBoard() {
   
  return (  
    <div>
        {/* <Topbar/> */}
      <Sidebar/>
      <UserList/>
    </div>
  )
}

export default AdminDashBoard
