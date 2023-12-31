import React from 'react'
import { useFormik } from 'formik'
import { userSchema } from '../../validations/user/userSignupValidation'
import { userSignup } from '../../api/userApi'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Navbar } from '@material-tailwind/react'
import { UserNavbar } from './UserNavbar'

const UserSignup = () => {
  const navigate = useNavigate()
  async function onSubmit () {
    try {
      const res = await userSignup(values)
      if (res?.status === 201) {
        const { user, otpId } = res.data
        toast(res?.data?.status)
        navigate('/otp', {
          state: { userEmail: user.email, otpId: otpId, userId: user._id }
        })
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.status)
    }
  }
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
      cpassword: ''
    },
    validationSchema: userSchema,
    onSubmit
  })
  return (
    <>
    <UserNavbar></UserNavbar>
    <div
        className='flex items-center lg:pl-12'
        style={{
          backgroundImage: "url('/src/assets/wedding1.jpg')",
          backgroundSize: 'cover'
        }}
      >
    <div className='mt-32 p-3'>
        <div className='hero-content flex-col lg:flex-row-reverse text-black'>
          <div className='text-center lg:text-left'>
            
            
          </div>
          <div
            className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'
            style={{
              backdropFilter: 'blur(1px)',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.3)'
            }}
          >
            <form
              onSubmit={handleSubmit}
              className='card-body'
              style={{ width: '100%' }}
            >
              <div className='form-control'>
                <label className='label'>
                  {/* <span className='label-text'>Name</span> */}
                </label>
                <input
                  type='name'
                  placeholder='Name'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='name'
                  className='input input-bordered'
                  required
                />
                {errors.name && touched.name && (
                  <p className='text-red-700 dark:text-red-500'>{errors.name}</p>
                )}
              </div>
              <div className='form-control'>
                <label className='label'>
                  {/* <span className='label-text'>Email</span> */}
                </label>
                <input
                  type='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='email'
                  placeholder='Email'
                  className='input input-bordered'
                  required
                />
                {errors.email && touched.email && (
                  <p className='text-red-700 dark:text-red-50'>{errors.email}</p>
                )}
              </div>
              <div className='form-control'>
                <label className='label'>
                  {/* <span className='label-text'>Mobile</span> */}
                </label>
                <input
                  type='mobile'
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='mobile'
                  placeholder='mobile'
                  className='input input-bordered'
                  required
                />
                {errors.mobile && touched.mobile && (
                  <p className='text-red-700 dark:text-red-500'>{errors.mobile}</p>
                )}
              </div>
              <div className='form-control flex flex-col '>
                <label className='label'>
                  {/* <span className='label-text'>Confirm Password</span> */}
                </label>
                <div className='w-full'>
                  <input
                    type='password'
                    value={values.password}
                    placeholder='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='password'
                    className='input input-bordered w-full'
                    required
                    autoComplete='new-password'
                  />
                </div>
                {errors.password && touched.password && (
                   <p className='text-red-700 dark:text-red-500'> {errors.password}</p>
                )}
              </div>

              <div className='form-control'>
                <label className='label'>
                  {/* <span className='label-text'>Confirm Password</span>   */}
                </label>
                <input
                  type='password'
                  value={values.cpassword}
                  placeholder='confirm password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='cpassword'
                  className='input input-bordered'
                  required
                  autoComplete='new-password'
                />
                {errors.cpassword && touched.cpassword && (
                  <p className='text-red-700 dark:text-red-500'> {errors.cpassword}</p>
                )}
              </div>
              <div className='form-control mt-6'>
                <button
                  className='btn btn-dark bg-indigo-900 text-white hover:bg-indigo-800'
                  type='submit'
                  disabled={isSubmitting}
                >
                  Signup
                </button>
                <div className='mt-3 text-black justify-center'>
                  <p>
                    Already have an account?{' '}
                    <Link to='/login' className='text-purple-00'>
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
export default UserSignup
