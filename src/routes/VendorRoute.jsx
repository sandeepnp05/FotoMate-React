VendorRoute.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import VendorSignup from '../components/vendorComponents/VendorSignup';
import VendorLogin from '../pages/vendorPages/VendorLogin';
import VendorOtp from '../pages/vendorPages/VendorOtp';
import VendorHome from '../pages/vendorPages/VendorHome';
function VendorRoute() {
  return (
    <Routes>
      <Route path='/signup' element={<VendorSignup/>} />
      <Route path='/login' element={<VendorLogin/>} />
      <Route path='/otp' element={<VendorOtp/>} />
      <Route path='/' element={<VendorHome/>} />
    </Routes>
  );
}

export default VendorRoute;
