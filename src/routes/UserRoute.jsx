import {Route,Routes} from 'react-router-dom'
import UserSignup from '../pages/userPages/UserSignup'
import Otp from '../pages/userPages/Otp'
import UserLogin from '../pages/userPages/UserLogin'
import UserHome from '../pages/userPages/UserHome'
import Contact from '../pages/userPages/Contact'
import UserProfile from '../pages/userPages/userProfile'
import ForgetPassword from '../pages/userPages/ForgotPassword'
import ResetPassword from '../pages/userPages/ResetPassword'
import UserPublic from './userPrivate/UserPublic'

function UserRoute() {
  return (
    <Routes>
        <Route path='/signup' element={<UserPublic><UserSignup/></UserPublic>}/>
        <Route path='/otp' element={<UserPublic><Otp/></UserPublic>}/>
        <Route path='/login' element={<UserPublic><UserLogin/></UserPublic>}/>
        <Route path='/' element={<UserHome/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/forgotPassword' element={<UserPublic><ForgetPassword/></UserPublic>}/>
        <Route path='/resetPassword/:id/:token' element={<UserPublic><ResetPassword/></UserPublic>}/>
    </Routes>
  )
}

export default UserRoute
