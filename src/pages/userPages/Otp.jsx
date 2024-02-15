import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { otpSchema } from '../../validations/user/otpValidation'
import { useEffect, useState, useRef } from 'react'
import { otpVerification } from '../../api/userApi'
import { toast } from 'react-toastify'

function Otp () {
  const location = useLocation()
  const navigate = useNavigate()
  const { userEmail, userId, otpId } = location.state
  const [countDown, setCountDown] = useState(60)
  const [showResendButton, setShowResendButton] = useState(false)

  const decrementTimer = () => {
    if (countDown > 0) {
      setCountDown(countDown - 1)
    } else {
      setShowResendButton(true)
    }
  }

  useEffect(() => {
    const timer = setInterval(decrementTimer, 1000)
    return () => {
      return clearInterval(timer)
    }
  }, [countDown])

  const onSubmit = async () => {
    try {
      const combinedOtp = Object.values(values).join('')
      const res = await otpVerification(combinedOtp, otpId, userId)
      if (res?.data?.status) {
        toast.success(res?.data?.message)
        navigate('/login', { state: 'Email verified' })
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const resendOtp = async () => {
    try {
      const res = await clientResendOtp(userEmail)
      if (res.status == 200) {
        toast.success(res.data.message)
        setCountDown(60)
        setShowResendButton(false)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.message)
    }
  }

  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: ''
    },
    validationSchema: otpSchema,
    onSubmit
  })

  const input1Ref = useRef()
  const input2Ref = useRef()
  const input3Ref = useRef()
  const input4Ref = useRef()

  const handleKeyUp = e => {
    switch (e.target.name) {
      case 'otp1':
        input2Ref.current.focus()
        if (!e.target.value) {
          input1Ref.current.focus()
        } else {
          input2Ref.current.focus()
        }
        break
      case 'otp2':
        if (!e.target.value) {
          input1Ref.current.focus()
        } else {
          input3Ref.current.focus()
        }
        break
      case 'otp3':
        if (!e.target.value) {
          input2Ref.current.focus()
        } else {
          input4Ref.current.focus()
        }
        break
      case 'otp4':
        if (!e.target.value) {
          input3Ref.current.focus()
        } else {
          input4Ref.current.focus()
        }
        break
      default:
        break
    }
  }

  return (
    <>
      <div
        className='h-screen w-full py-20 px-3 flex items-center justify-center'
        style={{
          backgroundImage: "url('/src/assets/camera1.jpg')",
          backgroundSize: 'cover'
        }}
      >
        <div className='container mx-auto'>
          <div className='max-w-sm mx-auto md:max-w-lg'>
            <div className='w-full'>
              <div
                className='bg-white h-96 py-8 px-6 rounded text-center shadow-xl'
                style={{
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.2)'
                }}
              >
                <h1 className='text-3xl font-bold mb-6 text-amber-800'>
                  Verify Your Account
                </h1>
                <div className='flex flex-col mb-4'>
                  <span className='text-sm text-white'>
                    Enter the OTP sent to
                  </span>
                  <span className='font-bold text-white'>{userEmail}</span>
                </div>
                <form onSubmit={handleSubmit}>
                  <div
                    id='otp'
                    className='flex flex-row justify-center text-center px-2 mt-5'
                  >
                    <div className='flex flex-col mt-2'>
                      <input
                        className='m-2 border h-10 w-10 text-center form-control rounded'
                        type='text'
                        name='otp1'
                        ref={input1Ref}
                        value={values.otp1}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                        id=''
                        maxLength={1}
                      />

                      {errors.otp1 && touched.otp1 && (
                        <p className='text-red-50 text-center text-sm px-2'>
                          {errors.otp1}
                        </p>
                      )}
                    </div>
                    <div className='flex flex-col mt-2'>
                      <input
                        className='m-2 border h-10 w-10 text-center form-control rounded'
                        type='text'
                        name='otp2'
                        ref={input2Ref}
                        value={values.otp2}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                        id=''
                        maxLength={1}
                      />
                      {errors.otp2 && touched.otp2 && (
                        <p className='text-red-50 text-sm px-2'>{errors.otp2}</p>
                      )}
                    </div>
                    <div className='flex flex-col mt-2 text-sm'>
                      <input
                        className='m-2 border h-10 w-10 text-center form-control rounded'
                        type='text'
                        name='otp3'
                        ref={input3Ref}
                        value={values.otp3}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                        id=''
                        maxLength={1}
                      />
                      {errors.otp3 && touched.otp3 && (
                        <p className='text-red-50 text-sm px-2'>{errors.otp3}</p>
                      )}
                    </div>
                    <div className='flex flex-col mt-2'>
                      <input
                        className='m-2 border h-10 w-10 text-center form-control rounded'
                        type='text'
                        name='otp4'
                        ref={input4Ref}
                        value={values.otp4}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                        id=''
                        maxLength={1}
                      />
                      {errors.otp4 && touched.otp4 && (
                        <p className='text-red-50 text-sm px-2'>{errors.otp4}</p>
                      )}
                    </div>
                  </div>
                  <div className='flex justify-center  '>
                    <button
                      className=' item-center text-center border rounded-xl outline-none py-2 px-3 bg-amber-800 border-none text-white text-sm shadow-sm'
                      type='submit'
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className='flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-white py-3'>
                    {countDown > 0 ? (
                      <p>Resend otp in {countDown} seconds</p>
                    ) : (
                      showResendButton && (
                        <p
                          className='font-medium text-white hover:underline cursor-pointer'
                          onClick={resendOtp}
                        >
                          Resend OTP
                        </p>
                      )
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Otp
