import React from 'react'
import VendorNavbar from '../../components/vendorComponents/vendorCommon/VendorNavbar'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import { fetchBooking } from '../../api/vendorApi';

function Booking() {
    const {vendorId} = useParams()
    

      const { data, isError, isLoading } = useQuery({
        queryKey: ['booking', vendorId], 
        queryFn: async () => await fetchBooking(vendorId)
      });
      
      console.log(vendorId,'vendorId')
      console.log(data,'ddataa')
      if (isLoading) {
          return <div>Loading...</div>;
      }
  
      if (isError) {
          return <div>Error occurred while fetching user details</div>;
      }
  return (
    <ErrorBoundary>
    <>
    <VendorNavbar/>
  <>
  <div className='mt-12'></div>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Booked package
        </th>
        <th scope="col" className="px-6 py-3">
          User name
        </th>
        <th scope="col" className="px-6 py-3">
          Email
        </th>
        <th scope="col" className="px-6 py-3">
          Location
        </th>
        <th scope="col" className="px-6 py-3">
          Date
        </th>
        <th scope="col" className="px-6 py-3">
          Total amount
        </th>
        <th scope="col" className="px-6 py-3">
          Advance amount
        </th>
        <th scope="col" className="px-6 py-3">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
    {data && data.data.bookingData.map((bookingData, index) => (
    <tbody  key={index}>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
        {bookingData.packageId.name}
        </th>
        <td className="px-6 py-4">{bookingData.userId.name}</td>
        <td className="px-6 py-4">{bookingData.userId.email}</td>
        <td className="px-6 py-4">{bookingData.location}</td>
        <td className="px-6 py-4">{new Date(bookingData.eventDate).toLocaleDateString()}</td>
        <td className="px-6 py-4">{bookingData.totalAmount}</td>
        <td className="px-6 py-4">{bookingData.advanceAmount}</td>
        <td className="px-6 py-4 text-right">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Contact
          </a>
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
