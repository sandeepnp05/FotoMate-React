import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {vendorSignup} from '../../api/vendorApi'
import {vendorSignupSchema} from '../../validations/vendor/vendorSignupValidation'


function VendorSignup () {
  const navigate = useNavigate()

  const onSubmit = async () =>{
    try {
      console.log("Submit button clicked");
      const res = await vendorSignup(values)
      if(res?.status === 201){
        const {vendor, otpId} = res.data;
        toast(res?.data?.status)
        navigate("/vendor/otp",{
          state:{
            vendorEmail:vendor.email,
            otpId: otpId,
            vendorId: vendor._id,
          }
        })
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.response?.data?.status);
    }
  }
  const {values, errors, touched, handleBlur, handleChange, handleSubmit} =useFormik({
        initialValues:{
          name: "",
          email: "",
          mobile: "",
          password: "",
          cpassword: "",
        },
        validationSchema: vendorSignupSchema,
        onSubmit,
  })
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900'>
  <div className='flex items-center justify-center absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]'>
      <div className='flex w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden'>
        
        <img
          src='/src/assets/photographer.jpg'
          alt='form'
          className='w-1/2 h-auto object-cover hidden md:block' // Hide the image on screens smaller than md
        />
        
        <div className='p-8 w-full md:w-1/2'> {/* Adjusted width to full on smaller screens */}
          <h2 className='mb-6 text-2xl font-bold text-gray-800 text-center'>
            Become a Partner with Us
          </h2>
  
          <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor='full-name' className='sr-only'>
                  Full Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='full-name'
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  placeholder='Full Name'
                  required
                />
                {errors.name && touched.name && (
                    <p className='text-red-700 text-xs dark:text-red-500 h-4'>
                      {errors.name}
                    </p>
                  )}
              </div>
              <div className='mb-4'>
                <label htmlFor='your-email' className='sr-only'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                   autoComplete='email'
                  id='your-email'
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  placeholder='Email'
                  required
                />
                {errors.email && touched.email && (
                    <p className='text-red-700 text-xs dark:text-red-500'>
                      {errors.email}
                    </p>
                  )}
              </div>
              <div className='mb-4'>
                <label htmlFor='your-mobile-number' className='sr-only'>
                  Mobile
                </label>
                <input
                  type='tel' 
                  name='mobile'
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='your-mobile-number' 
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  placeholder='Mobile'
                  required
                />
                {errors.mobile && touched.mobile && (
                    <p className='text-red-700 text-xs dark:text-red-500'>
                      {errors.mobile}
                    </p>
                  )}
              </div>

              <div className='mb-4'>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='new-password'
                  id='password'
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  placeholder='Password'
                  required
                />
                {errors.password && touched.password && (
                    <p className='text-red-700 text-xs dark:text-red-500'>
                      {errors.password}
                    </p>
                  )}
              </div>
              <div className='mb-6'>
                <label htmlFor='confirm-password' className='sr-only'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  name='cpassword'
                  value={values.cpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='confirm-password'
                   autoComplete='new-password'
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  placeholder='Confirm Password'
                  required
                />
                {errors.cpassword && touched.cpassword && (
                    <p className='text-red-700 text-xs dark:text-red-500'>
                      {errors.cpassword}
                    </p>
                  )}
              </div>
              <div className='text-center'>
                <button
                  type='submit'
                  className='w-full px-4 py-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-600 focus:outline-none focus:shadow-outline'
                >
                  Register
                </button>
              </div>
            </form>
            <p className='mt-6 text-center text-sm text-gray-600'>
              Already have an account ? 
              <Link to='/vendor/login'>
                <span
                 
                  className='text-blue-500 hover:text-blue-700 no-underline'
                >
                 {'  '} Login
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorSignup;
