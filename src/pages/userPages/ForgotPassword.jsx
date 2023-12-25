import React from 'react'
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom'
import { UserNavbar } from './UserNavbar'
import UserFooter from '../../components/userComponents/UserFooter'
import { toast } from 'react-toastify'
import {forgotPassword} from "../../api/userApi"
import { useFormik } from 'formik'



function ForgotPassword() {
  const navigate = useNavigate()
  const formSchema = yup.object().shape({
    email: yup
     .string()
     .email("Please enter a valid email")
     .required("Requiered")
  })

  const onSubmit = async () =>{
    try {
      const res = await forgotPassword({userEmail:values.email})
      if(res.status === 200){
        toast.success(res?.data?.message)
        navigate('/login')
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.response?.data?.message)
    }
  }
  const {values, errors, touched, handleBlur, handleChange, handleSubmit} =  useFormik({
    initialValues:{
      email:"",
    },
    validationSchema: formSchema,
    onSubmit
  })
  return (
    <>
    <UserNavbar/>
    <div className='flex items-center justify-center min-h-screen bg-gray-100 pt-12'>
      <div className='w-full max-w-md p-8 m-4 bg-white rounded shadow-md'>
        <h1 className='mb-6 text-3xl font-bold text-center text-gray-900'>Reset Password</h1>
        <p className='text-center text-gray-700'>
          Trouble accessing your account? Provide your registered email, and we'll guide you through a quick and secure password reset.
        </p>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <input
            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100'
            type='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Email'
            name='email'
            required
          />
           {errors.email && touched.email && (
                  <p className="text-red-600">{errors.email}</p>
                )}
          <div>
            <button
              type='submit'
              className='w-full px-4 py-2 font-medium text-center text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-1'
            >
              Send
            </button>
          </div>
        </form>
        <p className='mt-6 text-center text-sm text-gray-600'>
          Need help? 
          <Link to={'/contact'}>
          <a href='#' className='text-indigo-700 hover:text-indigo-900 no-underline'>
            Contact Support
          </a>
          </Link>
        </p>
      </div>
    </div>
        <UserFooter/>
    </>
  )
}

export default ForgotPassword
