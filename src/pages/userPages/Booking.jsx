import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getBooking, paymentCheckout } from '../../api/userApi';
import { useQuery } from '@tanstack/react-query';
import { UserNavbar } from './UserNavbar';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

function Booking() {
    const { user } = useSelector((state) => state.userReducer);
    useEffect(() => {
        initFlowbite();
      }, []);

      const { data:data, isError, isLoading } = useQuery({
        queryKey: ['booking', user._id], 
        queryFn: () => getBooking(user._id)
      });
     

      if (isLoading) {
          return <div>Loading...</div>;
      }
  
      if (isError) {
          return <div>Error occurred while fetching user details</div>;
      }

      
      async function checkout (bookingData) {
        const stripePromise = loadStripe("pk_test_51OdspaSGkLuCRTDWFPKKeCPtiQHUkbyMUXCURUrfUQSK6aqMS5Xv0wAzPq9nwVZSHJkquAZw7VBlmTpkQTpQL7MB00JLquZsMx")
        const stripe = await stripePromise;
        const body  = {
          packageData:bookingData
        }
        try {
       
          const session = await paymentCheckout(body)
          console.log(session,'session')
           const result = await stripe.redirectToCheckout({
            sessionId: session.data.id,
          });
          if (result.error) {
            console.log(result.error);
          }
        } catch (error) {
          console.error(error.message);
        }
      };
      
  return (
    <>
    <UserNavbar/>
  <>
  <div className='mt-36'></div>
  <h1 className='justify-center text-center text-lg mb-8 '>Pay advance amount and book now</h1>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
           Package
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
    {data && data.data.map((bookingData, index) => (
    <tbody  key={index}>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
        {bookingData.packageId.name}
        </th>
        <td className="px-6 py-4">{bookingData.location}</td>
        <td className="px-6 py-4">{new Date(bookingData.eventDate).toLocaleDateString()}</td>
        <td className="px-6 py-4">{bookingData.totalAmount}</td>
        <td className="px-6 py-4">{bookingData.advanceAmount}</td>
        <td className="px-6 py-4 text-right">
          <a
            href="#"
            onClick={() => checkout(bookingData)}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Pay now
          </a>
        </td>
      </tr>
    
      
    </tbody>
  ))}
  </table>
</div>
</>
</>


  )
}

export default Booking
