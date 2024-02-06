import React from 'react'
import VendorNavbar from '../../components/vendorComponents/vendorCommon/VendorNavbar'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import ErrorBoundary from '../../components/common/ErrorBoundary'
import { fetchBooking } from '../../api/vendorApi'
import Tooltip from '../../components/common/Tooltip'

function Booking () {
  const { vendorId } = useParams()

  const { data, isError, isLoading } = useQuery({
    queryKey: ['booking', vendorId],
    queryFn: async () => await fetchBooking(vendorId)
  })

  console.log(vendorId, 'vendorId')
  console.log(data, 'ddataa')
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error occurred while fetching user details</div>
  }
  return (
    <ErrorBoundary>
      <>
        <VendorNavbar />
        <>
          <div className='mt-12'></div>
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Booked package
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    User name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Email
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
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              {data &&
                data.data.bookingData.map((bookingData, index) => (
                  <tbody key={index}>
                    <tr className='group bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      <th
                        scope='row'
                        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                      >
                        {bookingData.packageId.name}
                      </th>
                      <td className='px-6 py-4'>{bookingData.userId.name}</td>
                      <td className='px-6 py-4'>{bookingData.userId.email}</td>
                      <td className='px-6 py-4'>{bookingData.location}</td>
                      <td className='px-6 py-4'>
                        {new Date(bookingData.eventDate).toLocaleDateString()}
                      </td>
                      <td className='px-6 py-4'>{bookingData.totalAmount}</td>
                      <td className='px-6 py-4'>{bookingData.advanceAmount}</td>
                      <td className='px-6 py-4 text-right '>
             
                        <Tooltip text={'chat with user'}>
                          <Link to={`/vendor/chat/${bookingData.userId._id}`}>
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
                  </tbody>
                ))}
            </table>
          </div>
        </>
      </>
    </ErrorBoundary>
  )
}

export default Booking
