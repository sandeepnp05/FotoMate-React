import React from 'react'
import { useFormik } from 'formik'
import { userSchema } from '../../validations/user/userSignupValidation'
import { userSignup } from '../../api/userApi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from '@material-tailwind/react'
import { UserNavbar } from './UserNavbar'
import Oauth from '../../components/userComponents/Oauth'

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
     <div
      className='mt-12 flex-flex col absolute top-0 z-[-2] min-h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]'

        // style={{
        //   backgroundImage: "url('/src/assets/wedding1.jpg')",
        // }}
      >
        <UserNavbar></UserNavbar>

        <div className='flex-grow  mt-36 md:mt-8 p-4 md:p-4 lg:w-1/2'>
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
                    <p className='text-red-700 text-xs dark:text-red-500'>
                      {errors.name}
                    </p>
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
                    <p className='text-red-700 text-xs dark:text-red-50'>
                      {errors.email}
                    </p>
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
                    placeholder='Mobile'
                    className='input input-bordered'
                    required
                  />
                  {errors.mobile && touched.mobile && (
                    <p className='text-red-700 text-xs dark:text-red-500'>
                      {errors.mobile}
                    </p>
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
                      placeholder='Password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='password'
                      className='input input-bordered w-full'
                      required
                      autoComplete='new-password'
                    />
                  </div>
                  {errors.password && touched.password && (
                    <p className='text-red-700 text-xs dark:text-red-500'>
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className='form-control'>
                  <label className='label'>
                    {/* <span className='label-text'>Confirm Password</span>   */}
                  </label>
                  <input
                    type='password'
                    value={values.cpassword}
                    placeholder='Confirm Password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='cpassword'
                    className='input input-bordered'
                    required
                    autoComplete='new-password'
                  />
                  {errors.cpassword && touched.cpassword && (
                    <p className='text-red-700 text-xs dark:text-red-500'>
                      {errors.cpassword}
                    </p>
                  )}
                </div>
                <div className='form-control mt-4'>
                  <Button
                    className='btn btn-dark bg-indigo-900 text-white hover:bg-indigo-800 w-full'
                    type='submit'
                    disabled={isSubmitting}
                  >
                    Signup
                  </Button>
                  <Oauth />
                  <div className='flex flex-col items-center justify-center space-y-2 mt-2'>
                    <p>
                      Already have an account?{' '}
                      <Link to='/login' className='text-indigo-900'>
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
