VendorRoute.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import VendorSignup from '../components/vendorComponents/VendorSignup';
import VendorLogin from '../pages/vendorPages/VendorLogin';
import VendorOtp from '../pages/vendorPages/VendorOtp';
import VendorHome from '../pages/vendorPages/VendorHome';
import CreateStudio from '../pages/vendorPages/CreateStudio';
import VendorStudio from '../pages/vendorPages/VendorStudio';
function VendorRoute() {
  return (
    <Routes>
      <Route path='/signup' element={<VendorSignup/>} />
      <Route path='/login' element={<VendorLogin/>} />
      <Route path='/otp' element={<VendorOtp/>} />
      <Route path='/' element={<VendorHome/>}/>
      <Route path='/createStudio' element={<CreateStudio/>} />
      <Route path='/studio/:vendorId' element={<VendorStudio/>}/>
    </Routes>
  );
}

export default VendorRoute;
