import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRoute from './routes/UserRoute'
import { ToastContainer } from 'react-toastify'
import './App.css'
import AdminRoute from './routes/AdminRoute'
import VendorRoute from './routes/VendorRoute'
;

function App () {       
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
