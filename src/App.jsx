import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRoute from './routes/UserRoute'
import { ToastContainer } from 'react-toastify'
import './App.css'
import AdminRoute from './routes/AdminRoute'
;

function App () {       
  return (
    <>
      <Router>
        <ToastContainer/>
          <Routes>
            <Route path='/admin/*' element={<AdminRoute/>} />
            <Route path='/*' element={<UserRoute />} />
          </Routes>
        
      </Router>
    </>
  )
}

export default App
