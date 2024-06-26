import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom' 
import { loginSchema } from "../../validations/user/loginValidation";
import { toast } from 'react-toastify'
import { vendorLoginVerify } from '../../api/vendorApi'
import { vendorLogin } from '../../reduxStore/slices/vendorSlice'
import { useFormik } from 'formik'
function VendorLogin () {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async () =>{
        try {
            const res = await vendorLoginVerify(values);
            const studio = res?.data?.studio
            if(res?.status === 200){
                const {token,vendor} = res.data;
                localStorage.setItem("vendorToken", token)
                dispatch(
                    vendorLogin ({
                        token:token,
                        vendor:vendor,
                    })
                )
                toast.success(res?.data?.message)
              
                navigate("/vendor",{state:{studio}})
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.response?.data?.message)
        }
    }
    
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
      initialValues:{
        email:"",
        password:"",
      },
      validationSchema:loginSchema,
      onSubmit,
    })
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900'>
  <div className='flex items-center justify-center absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]'>
    <div className='flex w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden'>
      
      <img
        src='https://res.cloudinary.com/dti7ahrb6/image/upload/v1712309498/vendor%20assets/hzsqghybjysodsv7genl.jpg'
        alt='form'
        className='w-1/2 h-auto object-cover hidden md:block' // Hide the image on screens smaller than md
      />
      
      <div className='p-8 w-full md:w-1/2'> {/* Adjusted width to full on smaller screens */}
        <h2 className='mb-6 text-2xl font-bold text-gray-800 text-center'>
          Vendor Login
        </h2>

        <form onSubmit={handleSubmit}>
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
                  id='your-email'
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  placeholder='Email'
                  required
                />
                {errors.email && touched.email}
                <p className='text-red-600 text-xs'>{errors.email}</p>
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
                  id='password'
                  autoComplete='password'
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  placeholder='Password'
                  required
                />
                {errors.password && touched.password}
                <p className='text-red-600 text-xs'>{errors.password}</p>
              </div>

              <div className='text-center'>
                <button
                  type='submit'
                  className='w-full px-4 py-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-600 focus:outline-none focus:shadow-outline'
                >
                 Login
                </button>
              </div>
            </form>
            <p className='mt-6 text-center text-sm text-gray-600'>
              Not have an account ?
              <Link to='/vendor/signup'>
                <span
                
                  className='text-blue-500 hover:text-blue-700 no-underline'
                >
                 {'  '} Register
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorLogin
