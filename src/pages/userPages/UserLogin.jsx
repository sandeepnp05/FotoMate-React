import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchema } from '../../validations/user/loginValidation'
import { loginVerification } from '../../api/userApi'
import { userLogin } from '../../reduxStore/slices/userSlice'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { UserNavbar } from './UserNavbar'

function UserLogin () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {errors,values,handleChange,handleSubmit,touched,handleBlur} = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema:loginSchema,
    onSubmit
  })

async function onSubmit  (){
     try {
      const res = await loginVerification(values)
      console.log(res,'response')
      if (res?.status==200) {
        const {user,token} = res.data;
        localStorage.setItem('userToken',token);
        dispatch(
          userLogin({
            user:user,
            token:token,
          })
        )
        toast.success(res?.data?.message)
        console.log('success')
        navigate('/')
      }
     } catch (error) {
      toast.error(error.response?.data?.message); 
      console.log(error.message)
     }
  }
  return (
    <>
    <UserNavbar></UserNavbar>
    <div
        className='mt-12 hero min-h-screen bg-cover bg-center '
        // style={{
        //   backgroundImage: 'url("/src/assets/camera1.jpg")'
        // }}
        >
        <div className='hero-content flex-col lg:flex-row-reverse'>
          <div className='text-center lg:text-left'>
            <h1 className='text-5xl font-bold text-indigo-900 '>Login now!</h1>
            <p className='text-black'>
            Please enter your username and password to access your account. 
            </p>
          </div>
          <div
            className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'
            style={{
              backdropFilter: 'blur(1px)',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.1)'
            }}
          >
            <form onSubmit={handleSubmit} className='card-body'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-black'>Email</span>
                </label>
                <input
                  type='email'
                  placeholder='email'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='input input-bordered'
                  autoComplete='email'
                  required
                />
                 {errors.email && touched.email && (
                  <p className='text-red-500 '>{errors.email}</p>
                )}
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-black '>Password</span>
                </label>
                <input
                  type='password'
                  name='password'
                  placeholder='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='input input-bordered'
                  autoComplete='current-password'
                  required
                />
                 {errors.password && touched.password && (
                  <p className='text-red-500 '>{errors.password}</p>
                )}
                <label className='label text-black' >
                  <Link to='/forgotPassword'>
                    Forgot password?
                    </Link>
                </label>
              </div>
              <div className='form-control mt-6'>
                <button className='btn btn-primary bg-indigo-900 hover:bg-indigo-800'>Login</button>
              </div>
            </form>
            <div className='inline-flex items-center justify-center'>
              <p className='text-black text-sm mb-5'>

                Not a member yet? 
              
              <Link to='/signup' className='text-indigo-900'>Join us now.</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
     
    </>
  )
}

export default UserLogin
