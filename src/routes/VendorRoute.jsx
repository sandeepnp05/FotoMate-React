VendorRoute.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import VendorSignup from '../components/vendorComponents/VendorSignup';
import VendorLogin from '../pages/vendorPages/VendorLogin';
import VendorOtp from '../pages/vendorPages/VendorOtp';
import VendorHome from '../pages/vendorPages/VendorHome';
import CreateStudio from '../pages/vendorPages/CreateStudio';
import VendorStudio from '../pages/vendorPages/VendorStudio';
import VendorPublic from './vendorPrivate/VendorPublic';
import VendorProtect from './vendorPrivate/VendorProtect';
import Bookings from '../pages/vendorPages/Bookings';
import NotFound from '../components/vendorComponents/vendorCommon/NotFound';
function VendorRoute() {
  return (
    <Routes>
      <Route path='/signup' element={<VendorPublic><VendorSignup/></VendorPublic>} />
      <Route path='/login' element={<VendorPublic><VendorLogin/></VendorPublic>} />
      <Route path='/otp' element={<VendorOtp/>} />
      <Route path='/' element={<VendorProtect><VendorHome/></VendorProtect>}/>
      <Route path='/createStudio' element={<VendorProtect><CreateStudio/></VendorProtect>} />
      <Route path='/studio/:vendorId' element={<VendorProtect><VendorStudio/></VendorProtect>}/>
      <Route path='/bookings/:vendorId' element={<VendorProtect><Bookings/></VendorProtect>}/>
      <Route path='/*'element={<VendorPublic><NotFound/></VendorPublic>}/>
    </Routes>
  );
}

export default VendorRoute;
