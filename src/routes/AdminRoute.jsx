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

function AdminRoute() {  

  return (
    <div>
      <Routes>
        <Route path='/' element={<AdminLogin/>}/>
        <Route path='/dashboard' element={<AdminDashBoard/>}/>
        <Route path='/vendorList' element={<VendorList/>}/>
        <Route path='/studioList' element={<StudioList/>}/>
        <Route path='/addCategory' element={<CreateCategory/>}/>
        <Route path='/categoryList' element={<CatelgoryList/>}/>
        <Route path='/editCategory/:cat_id' element={<EditCategory/>}/>
        <Route path='/subcategory/:id' element={<SubCategoryList/>}/>
        <Route path='/addSubCategory/:id' element={<AddSubCategory/>}/>
      </Routes>
    </div>
  )
}

export default AdminRoute
