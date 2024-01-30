import React from 'react'
import {Route,Routes} from 'react-router-dom'
import AdminLogin from '../pages/adminPages/adminLogin'
import AdminDashBoard from '../pages/adminPages/AdminDashBoard'
import VendorList from '../pages/vendorPages/VendorList'
import StudioList from '../pages/adminPages/StudioList'
import CreateCategory from '../pages/adminPages/CreateCategory'
import CatelgoryList from '../pages/adminPages/CatelgoryList'
import EditCategory from '../pages/adminPages/EditCategory'
import SubCategoryList from '../pages/adminPages/SubCategory'
import AddSubCategory from '../pages/adminPages/AddSubCategory'
import AdminPublic from './adminPrivate/AdminPublic'
import AdminProtect from './adminPrivate/AdminProtect'
import BookingList from '../pages/adminPages/BookingList'
import PageNotFound from '../components/common/PageNotFound'

function AdminRoute() {  

  return (
    <div>
      <Routes>
        <Route path='/' element={<AdminPublic> <AdminLogin/> </AdminPublic>}/>
        <Route path='/dashboard' element={<AdminProtect> <AdminDashBoard/> </AdminProtect>}/>
        <Route path='/vendorList' element={<AdminProtect> <VendorList/> </AdminProtect>}/>
        <Route path='/studioList' element={<AdminProtect> <StudioList/> </AdminProtect>}/>
        <Route path='/addCategory' element={<AdminProtect> <CreateCategory/> </AdminProtect>}/>
        <Route path='/categoryList' element={<AdminProtect> <CatelgoryList/> </AdminProtect>}/>
        <Route path='/editCategory/:cat_id' element={<AdminProtect> <EditCategory/> </AdminProtect>}/>
        <Route path='/subcategory/:id' element={<AdminProtect> <SubCategoryList/></AdminProtect>}/>
        <Route path='/addSubCategory/:id' element={<AdminProtect> <AddSubCategory/> </AdminProtect>}/>
        <Route path='/bookingList' element={<AdminProtect> <BookingList/> </AdminProtect>}/>
        <Route path='/*' element={<AdminPublic><PageNotFound/></AdminPublic>}/>

         

      </Routes>
    </div>
  )
}

export default AdminRoute
