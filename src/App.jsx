import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRoute from './routes/UserRoute'
import { ToastContainer } from 'react-toastify'
import './App.css'
import AdminRoute from './routes/AdminRoute'
import VendorRoute from './routes/VendorRoute'



function App () {       
  React.useEffect(() => {
    var _mtm = window._mtm = window._mtm || [];
    _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=import.meta.env.REACT_APP_MATOMO_URL; s.parentNode.insertBefore(g,s);
   }, [])
  return (
    <>
      <Router>
        <ToastContainer/>
          <Routes>
            <Route path='/admin/*' element={<AdminRoute/>} />
            <Route path='/vendor/*' element={<VendorRoute/>} />
            <Route path='/*' element={<UserRoute />} />
          </Routes>
      </Router>
    </>
  )
}


export default App
