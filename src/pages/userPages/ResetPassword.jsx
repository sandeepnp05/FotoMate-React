import React from 'react'
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { UserNavbar } from './UserNavbar'
import { toast } from 'react-toastify'
import { resetPassword } from '../../api/userApi'
import { useFormik } from 'formik'

function ResetPassword () {
  const { id, token } = useParams()
  const navigate = useNavigate()
  const passwordRule =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,16}$/;
  const formSchema = yup.object().shape({
    password: yup
      .string()
      .min(6, 'Password should contain a minimum of 6 characters')
      .max(16, 'Password should contain a maximum of 16 characters')
      .matches(
        passwordRule,
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be 5-16 characters long."
      )
      .required('Required field'),
    cpassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Required field'),

  });
  

  const onSubmit = async () => {
    try {
      const res = await resetPassword(id, token, values.password)
      if (res.status === 200) {
        toast.success(res?.data?.message)
        navigate('/login')
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.response?.data?.message)
    }
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        password: '',
        cpassword: ''
      },
      validationSchema: formSchema,
      onSubmit
    })
  return (
    <>
      <UserNavbar />
      <section className='bg-gray-50 dark:bg-gray-900 pt-6 '>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8'>
            <h2 className='mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Change Password
            </h2>
            <form
              className='mt-4 space-y-4 lg:mt-5 md:space-y-5'
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  New Password
                </label>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                />
                {errors.password && touched.password && (
                    <p className="text-red-600">{errors.password}</p>
                  )}
              </div>
              <div>
                <label
                  htmlFor='confirm-password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Confirm password
                </label>
                <input
                  type='password'
                  placeholder='Confirm Password'
                  name='cpassword'
                  value={values.cpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                />
                {errors.cpassword && touched.cpassword && (
                    <p className="text-red-600">{errors.cpassword}</p>
                  )}
              </div>
              <button
                type='submit'
                className='w-full text-white bg-indigo-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Reset password
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default ResetPassword
