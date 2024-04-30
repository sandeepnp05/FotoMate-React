import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchema } from '../../validations/user/loginValidation'
import { loginVerification } from '../../api/userApi'
import { userLogin } from '../../reduxStore/slices/userSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserNavbar } from './UserNavbar'
import Oauth from '../../components/userComponents/Oauth'
import { Button } from '@material-tailwind/react'


function UserLogin () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { errors, values, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: loginSchema,
      onSubmit
    })

  async function onSubmit () {
    try {
      const res = await loginVerification(values)
      if (res?.status === 200) {
        const { user, token } = res.data
        localStorage.setItem('userToken', token)
        dispatch(
          userLogin({
            user: user,
            token: token
          })
        )
        toast.success(res?.data?.message)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
      console.log(error.message)
    }
  }
  const demoEmail ='demo@gmail.com'
  const demoPassword = '123456Aaa@@'
   console.log(demoEmail,demoPassword)
  const handleDemoLogin = async () => {
    
    try {
      const res = await loginVerification({ email:demoEmail, password:demoPassword });
      if (res?.status === 200) {
        const { user, token } = res.data
        localStorage.setItem('userToken', token)
        dispatch(
          userLogin({
            user: user,
            token: token
          })
        )
        toast.success(res?.data?.message)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
      console.log(error.message)
    }
  }
  const isFullWidth = window.innerWidth === window.screen.width
  return (
    <>
     <div className="inset-0 z-0 min-h-screen w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
    <UserNavbar/>
     <div className='flex justify-items-center'>
          <div className='flex-grow mt-36  p-4 md:p-4 lg:w-1/2'>
          <div className='hero-content flex-col lg:flex-row-reverse text-black'>
            <div className='text-center lg:text-left'></div>
            <div
              className='item-center justify-center card w-full max-w-md mx-auto shadow-2xl bg-base-100'
              style={{
                backdropFilter: 'blur(1px)',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, .9)'
              }}
            >
              <form onSubmit={handleSubmit} className='card-body'>
                <div className='form-control'>
                  <label htmlFor='email' className='label'>
                    <span className='label-text text-gray-800'>Email</span>
                  </label>
                  <input
                    type='email'
                    id='email'
                    placeholder='Email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className='input input-bordered'
                    autoComplete='email'
                    required
                  />
                  {errors.email && touched.email && (
                    <p className='text-red-600 text-xs '>{errors.email}</p>
                  )}
                </div>
                <div className='form-control'>
                  <label htmlFor='password' className='label'>
                    <span className='label-text text-black '>Password</span>
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className='input input-bordered'
                    autoComplete='current-password'
                    required
                  />
                  {errors.password && touched.password && (
                    <p className='text-red-600 text-xs'>{errors.password}</p>
                  )}
                  <label htmlFor='password' className='label text-black'>
                    <Link to='/forgotPassword'>Forgot password?</Link>
                  </label>
                </div>
                <div className='form-control mt-'>
                  <Button
                    type='submit'
                    className='bg-indigo-800 hover:bg-indigo-800 w-full'
                  >
                    Login
                  </Button>
                
                  <Button
                    onClick={handleDemoLogin}
                    className='bg-indigo-500 hover:bg-indigo-800 w-full my-3'
                  >
                   Try Demo 
                  </Button>
                  <Oauth />
                  
                </div>
              </form>
              <div className='flex flex-col items-center justify-center space-y-2'>
                <p className='text-black text-sm'>
                  Not a member yet?
                  <Link to='/signup' className='text-indigo-900 ml-1'>
                    Join us now.
                  </Link>
                </p>
                <Link to='/vendor' className='text-indigo-900 pb-4'>
                  Sign in as a vendor.
                </Link>
              </div>
            </div>
          </div>
         </div>
        </div>
      </div>
    </>
  )
}

export default UserLogin
