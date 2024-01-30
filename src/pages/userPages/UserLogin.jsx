import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '../../validations/user/loginValidation';
import { loginVerification } from '../../api/userApi';
import { userLogin } from '../../reduxStore/slices/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserNavbar } from './UserNavbar';
import Oauth from '../../components/userComponents/Oauth';
import { Button } from '@material-tailwind/react';

function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  async function onSubmit() {
    try {
      const res = await loginVerification(values);
      console.log('submit button clicked')
      console.log(res, 'response');
      if (res?.status === 200) {
        const { user, token } = res.data;
        localStorage.setItem('userToken', token);
        dispatch(
          userLogin({
            user: user,
            token: token,
          })
        );
        toast.success(res?.data?.message);
        console.log('success');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  }

  return (
    <>
      <div
        className='flex flex-col bg-cover md:bg-contain lg:bg-cover min-h-screen  bg-black bg-opacity-50'
        style={{
          backgroundImage: "url('/src/assets/wedding1.jpg')",
        }}
     >
      <div
    className='absolute w-full bg-cover  min-h-full'
  />
        <UserNavbar></UserNavbar>
        <div className='mt-8 p-4 md:p-8 lg:w-1/2'>
          <div className='hero-content flex-col lg:flex-row-reverse text-black'>
            <div className='text-center lg:text-left'></div>
            <div
              className='card w-full max-w-md mx-auto shadow-2xl bg-base-100'
              style={{
                backdropFilter: 'blur(1px)',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.3)',
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
                  <Button type='submit' className='bg-indigo-900 hover:bg-indigo-800 w-full'>
                    Login
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
    </>
  );
}

export default UserLogin;
