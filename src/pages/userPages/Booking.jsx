import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getBooking,cancelBookings } from '../../api/userApi'
import { useQuery } from '@tanstack/react-query'
import { UserNavbar } from './UserNavbar'
import { loadStripe } from '@stripe/stripe-js'
import Tooltip from '../../components/common/Tooltip'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserFooter from '../../components/userComponents/UserFooter'

function Booking () {
  const { user } = useSelector(state => state.userReducer)
  const [reason, setReason] = useState('')
  const [bookingId, setBookingId] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    console.log('Reason:', reason)
    const { data } = await cancelBookings(reason, bookingId)
    console.log(data, 'cancel data')
    const myModal = document.getElementById('my_modal_1')
    setReason('')
    myModal.close()
  }
  useEffect(() => {
    initFlowbite()
  }, [])

  const {
    data: data,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['booking', user._id],
    queryFn: () => getBooking(user._id)
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error occurred while fetching user details</div>
  }
  console.log(data,'data')

  return (
    <>
      <UserNavbar />
      <>
        <div className='mt-36'></div>

        <h1 className='justify-center text-center text-lg mb-8 '>
          Pay advance amount and book now
        </h1>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mb-20'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3 '>
                  Package
                </th>

                <th scope='col' className='px-6 py-3'>
                  Location
                </th>

                <th scope='col' className='px-6 py-3'>
                  Date
                </th>

                <th scope='col' className='px-6 py-3'>
                  Total amount
                </th>
                <th scope='col' className='px-6 py-3'>
                  Advance amount
                </th>
                <th scope='col' className='px-6 py-3'>
                  Stauts
                </th>
                <th scope='col' className='px-6 py-3'>
                  Payment
                </th>
                <th scope='col' className='px-6 py-3'>
                
                </th>
              <th scope='col' className='px-6 py-3'> 
                  <span className='sr-only'>Edit</span>
                </th>
              </tr>
            </thead>
           
                <tbody>
                  {data &&
                    data.data.bookingData.map((bookingData, index) => (
                      <tr
                        key={index}
                        className='group relative bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                      >
                        <th
                          scope='row'
                          className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                        >
                          {bookingData?.packageId?.name}
                        </th>
                        <td className='px-6 py-4'>{bookingData?.location}</td>
                        <td className='px-6 py-4'>
                          {new Date(bookingData.eventDate).toLocaleDateString()}
                        </td>
                        <td className='px-6 py-4'>{bookingData.totalAmount}</td>
                        <td className='px-6 py-4'>
                          {bookingData.advanceAmount}
                        </td>
                        <td
                    className={`px-6 py-4 ${
                      bookingData.workStatus === 'cancelled'
                        ? 'text-red-500'
                        : 'text-yellow-500'
                    }`}
                  >
                    {bookingData.workStatus}
                  </td>
                        <td className='px-6 py-4'>{`${bookingData.workStatus==='cancelled'?'Advance refunded':'Advance paid'}`}</td>
                        <td className='px-6 py-4 text-right'>
                    <button
                      className='btn-link opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-danger dark:text-blue-500 hover:underline mx-2'
                      onClick={() => {
                        setBookingId(bookingData._id)
                        document.getElementById('my_modal_1').showModal()
                      }}
                    >
                      cancel booking
                    </button>

                    {/* className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-danger dark:text-blue-500 hover:underline mx-2' */}
                    <dialog id='my_modal_1' className='modal'>
                      <div className='modal-box rounded-sm'>
                        <h3 className='font-bold text-xl'>
                          Reason for cancellation!
                        </h3>
                        <form onSubmit={handleSubmit}>
                          <textarea
                            className='w-full h-full rounded-sm'
                            onChange={e => setReason(e.target.value)}
                          />
                          <div className='modal-action'>
                            <button
                              type='submit'
                              className='btn btn-success btn-sm text-white'
                            >
                              Submit and cancel
                            </button>
                            <button
                              type='button'
                              className='btn btn-danger btn-sm text-blak'
                            >
                              Close
                            </button>
                          </div>
                        </form>
                      </div>
                    </dialog>
                  </td>
                        <td>
                          <Tooltip text={'chat with vendor'}>
                            <Link to={`/chat/${bookingData.vendorId}`}>
                            <button className='z-20 text-white flex flex-col  shrink-0 grow-0 justify-around mr-1 mb-1 lg:mr-1 lg:mb-1 xl:mr-1 xl:mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                              <div className='p-2 rounded-full border-4 border-white bg-green-600'>
                                <svg
                                  className='w-5 h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5'
                                  fill='currentColor'
                                  viewBox='0 0 20 20'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    fillRule='evenodd'
                                    d='M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z'
                                    clipRule='evenodd'
                                  ></path>
                                </svg>
                              </div>
                            </button>
                            </Link>
                            
                          </Tooltip>
                        </td>
                      </tr>
                    ))}
                </tbody>
          </table>
        </div>
      </>
      {/* <UserFooter/> */}
    </>
  )
}

export default Booking
