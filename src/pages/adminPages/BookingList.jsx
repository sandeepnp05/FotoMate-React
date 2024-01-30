import React from 'react'
import Sidebar from '../../components/adminComponents/Sidebar'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBookingList } from '../../api/adminApi'

function BookingList() {

const {error,data,isLoading,isError} = useQuery({queryKey:['booking'],queryFn:async ()=> await getBookingList()})
console.log(data,'bookingList')


  return (
    <>
    <Sidebar/>
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs w-full text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Category name
            </th>

            <th scope='col' className='px-6 py-3'>
              Description
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
          </tr>
        </thead>
        {data && data.data.bookingList.map((bookingData, index) => (
          <tbody >
            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
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
              <td className='px-6 py-4'> {new Date(bookingData.eventDate).toLocaleDateString()}</td>
              <td className='px-6 py-4'> {bookingData.location}</td>
              <td className='px-6 py-4'>Pending</td>
             
              <td className='px-6 py-4 text-right'>
                {/* <Link to={`/admin/editCategory/${cat._id}`}>
                  <button className='text-blue-600 dark:text-blue-500 hover:underline mx-2'>
                    Edit
                  </button>
                </Link> */}
                {/* <button
                  onClick={() => handleUnlist(cat._id,cat.unlist)}
                  className={
                    !cat.unlist
                      ? 'text-red-600 dark:text-red-500 hover:underline mx-7'
                      : 'text-green-600 hover:uncerline mx-9'
                  }
                >
                  {!cat.unlist ? 'Unlist' : 'List'}
                </button> */}
              </td>
            </tr>
          </tbody>
        ))} 
      </table>
    </div>
  </>
  )
}

export default BookingList
