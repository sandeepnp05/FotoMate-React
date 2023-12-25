import React from 'react'
import { useEffect } from 'react'
import Sidebar from '../../components/adminComponents/Sidebar'
// import Topbar from '../../components/adminComponents/Topbar'
import UserList from '../../components/adminComponents/UserList'
import { Sidenav, initTE } from "tw-elements";


function AdminDashBoard() {
    useEffect(() => {
        // Initialize Tailwind Elements
        initTE({ Sidenav });
        console.log("Tailwind Elements initialized");
      }, []); 
  return (  
    <div>
        {/* <Topbar/> */}
      <Sidebar/>
      <UserList/>
    </div>
  )
}

export default AdminDashBoard
