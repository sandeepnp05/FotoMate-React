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
import SingleStudio from '../pages/userPages/SingleStudio'
import Studios from '../pages/userPages/Studios'
import ViewUserProfile from '../pages/userPages/viewUserProfile'
import Booking from '../pages/userPages/Booking'
import NotFound from '../components/userComponents/NotFound'
import UserProtect from './userPrivate/UserProtect'
import Cancel from '../pages/userPages/Cancel'
import Success from '../pages/userPages/Success'

function UserRoute() {
  return (
    <Routes>
        <Route path='/signup' element={<UserPublic><UserSignup/></UserPublic>}/>
        <Route path='/otp' element={<UserPublic><Otp/></UserPublic>}/>
        <Route path='/login' element={<UserPublic><UserLogin/></UserPublic>}/>
        <Route path='/' element={<UserHome/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/viewProfile' element={<ViewUserProfile/>}/>
        <Route path='/forgotPassword' element={<UserPublic><ForgetPassword/></UserPublic>}/>
        <Route path='/resetPassword/:id/:token' element={<UserPublic><ResetPassword/></UserPublic>}/>
        <Route path='/studio/:id'element={<UserProtect><SingleStudio/></UserProtect>}/>
        <Route path='/studios'element={<Studios/>}/>
        <Route path='/booking'element={<Booking/>}/>
        <Route path='/success'element={<Success/>}/>
        <Route path='/cancel'element={<Cancel/>}/>
        <Route path='/*'element={<NotFound/>}/>


    </Routes>
  )
}

export default UserRoute
