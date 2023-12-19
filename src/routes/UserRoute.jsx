import {Route,Routes} from 'react-router-dom'
import UserSignup from '../pages/userPages/UserSignup'
import Otp from '../pages/userPages/Otp'
import UserLogin from '../pages/userPages/UserLogin'
import UserHome from '../pages/userPages/UserHome'
import Contact from '../pages/userPages/Contact'

function UserRoute() {
  return (
    <Routes>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/otp' element={<Otp/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/' element={<UserHome/>}/>
        <Route path='/contact' element={<Contact/>}/>
    </Routes>
  )
}

export default UserRoute
