import React, { useState } from 'react'
import Sidebar from '../../components/adminComponents/Sidebar'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { cancelBooking, getBookingList } from '../../api/adminApi'
import { Modal, Ripple, initTE } from 'tw-elements'

initTE({ Modal, Ripple })

function BookingList () {
  const [reason, setReason] = useState('')
  const [bookingId, setBookingId] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    const { data } = await cancelBooking(reason, bookingId)
    const myModal = document.getElementById('my_modal_1')
    myModal.close()
  }

  const { error, data, isLoading, isError } = useQuery({
    queryKey: ['booking'],
    queryFn: async () => await getBookingList()
  })

  return (
    <>
      <Sidebar />
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs w-full text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Category name
              </th>

              <th scope='col' className='px-6 py-3'>
                User 
              </th>
              <th scope='col' className='px-6 py-3'>
                Sub Categoryies
              </th>
              <th scope='col' className='px-6 py-3'>
                Total amount
              </th>
              <th scope='col' className='px-6 py-3'>
                Advance amount
              </th>
              <th scope='col' className='px-6 py-3'>
                Event date
              </th>
              <th scope='col' className='px-6 py-3'>
                Event location
              </th>
              <th scope='col' className='px-6 py-3'>
                status
              </th>
              <th scope='col' className='px-6 py-3'></th>
            </tr>
          </thead>
          {data &&
            data.data.bookingList.map((bookingData, index) => (
              <tbody className='group'>
                <tr className=' bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                  <td
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {bookingData.studioId.studioName}
                  </td>
                  <td className='px-6 py-4'> {bookingData.userId.name}</td>
                  <td className='px-6 py-4'> {bookingData.category}</td>
                  <td className='px-6 py-4'> {bookingData.totalAmount}</td>
                  <td className='px-6 py-4'> {bookingData.advanceAmount}</td>
                  <td className='px-6 py-4'>
                    {' '}
                    {new Date(bookingData.eventDate).toLocaleDateString()}
                  </td>
                  <td className='px-6 py-4'> {bookingData.location}</td>
                  <td
                    className={`px-6 py-4 ${
                      bookingData.workStatus === 'cancelled'
                        ? 'text-red-500'
                        : 'text-yellow-500'
                    }`}
                  >
                    {bookingData.workStatus}
                  </td>

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

                  {/* cancel modal  */}
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </>
  )
}

export default BookingList
