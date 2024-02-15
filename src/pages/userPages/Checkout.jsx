import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getBooking, getCheckoutPackage, paymentCheckout } from '../../api/userApi';
import { useQuery } from '@tanstack/react-query';
import { UserNavbar } from './UserNavbar';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function Checkout() {
    const { state } = useLocation();
    const { responseData, ...values } = state ? state : {};
    const { date, place, selectedPlace } = values;
  
    
    const { user } = useSelector((state) => state.userReducer);
    // const {_id:userId} = user;
    useEffect(() => {               
        initFlowbite();
      }, []);

   

      
      async function checkout () {
        const stripePromise = loadStripe("pk_test_51OdspaSGkLuCRTDWFPKKeCPtiQHUkbyMUXCURUrfUQSK6aqMS5Xv0wAzPq9nwVZSHJkquAZw7VBlmTpkQTpQL7MB00JLquZsMx")
        const stripe = await stripePromise;
        const body  = {
          booking:responseData?.booking
        }
        try {
       
          const session = await paymentCheckout(body)
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
          Services
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
    
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
        {responseData?.packageData?.name}
        </th>
        <td className="px-6 py-4">
  {responseData?.packageData?.services.map((item, index) => (
    <span key={index}>
      {item.serviceName}
      {index < responseData.packageData.services.length - 1 && ', '}
    </span>
  ))}
</td>
        <td className="px-6 py-4">{place}</td>
        <td className="px-6 py-4">{date}</td>



        <td className="px-6 py-4">{`₹ ${responseData?.booking?.totalAmount}`}</td>

        <td className="px-6 py-4">{`₹ ${responseData?.booking?.advanceAmount}`}</td>

        <td className="px-6 py-4 text-right">
          <a
            href=""
            onClick={(event) => {
                event.preventDefault();
                checkout();
              }}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Pay now
          </a>
        </td>
      </tr>
    
      
    </tbody>

  </table>
</div>
</>
</>


  )
}

export default Checkout
