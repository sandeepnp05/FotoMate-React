import React from 'react';
import { useSelector } from 'react-redux';
import { UserNavbar } from './UserNavbar';
import { initFlowbite } from 'flowbite';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBooking, getUserDetails } from '../../api/userApi';


const ViewUserProfile = () => {

    const { user } = useSelector((state) => state.userReducer);
    useEffect(() => {
        initFlowbite();
      }, []);

      const { data, isError, isLoading } = useQuery({
        queryKey: ['booking', user._id], 
        queryFn: () => getBooking(user._id)
      });
      console.log(user._id,'userid')
      console.log(data,'data')

      if (isLoading) {
          return <div>Loading...</div>;
      }
  
      if (isError) {
          return <div>Error occurred while fetching user details</div>;
      }
      console.log(data,'user')
  return (
    <>
      <UserNavbar />
      <div className="flex justify-center items-center h-screen">
        {/* left div */}
        <div className="w-full max-w-md justify-center items-center bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700  p-4">
          <div className="flex justify-end">
            <button
              id="dropdownButton"
              data-dropdown-toggle="dropdown"
              className="inline-block text-gray-600 dark:-gray-400text hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
              type="button"
            >
              <span className="sr-only">Open dropdown</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 3"
              >
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
            </button>
            {/* Dropdown menu */}
            <div
              id="dropdown"
              className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-md md:w-44 dark:bg-gray-700"
            >
              <ul className="py-2" aria-labelledby="dropdownButton">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  ><Link to={'/profile'}>
                    Edit Profile
                    </Link>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center pb-4">
            <img
              className='h-20 w-20 md:h-24 md:w-24 bg-blue-500 rounded-full overflow-hidden border mb-2 md:mb-0 md:mr-4'
              src={data&& data?.data?.user?.profileImage}
              alt="Profile Image"
            />
            <h5 className="mb-1 text-2xl md:text-xl font-semibold text-gray-900 dark:text-white">
              {user.name}
            </h5>
            <span className="text-lg text-gray-600 dark:text-gray-400">
              {user.email}
            </span>
            <span className="text-lg text-gray-600 dark:text-gray-400">
              Wallet Balance: {` ₹ ${data&& data?.data?.user?.wallet}`}
            </span>
            <Link to={'/booking'}>
            <span className="text-lg text-primary dark:text-gray-400">
             View Bookings
            </span>
            </Link>

          </div>
        </div>
        </div>


        
       {/* rightdiv */}
       
     


       {/* <div className='w-full md:w-1/2 flex-grow flex items-center justify-center'>
       <div className='flex flex-col items-center justify-center pl-0 md:pr-36'>
           <h5>You haven't booked studio yet</h5>

          <img
         className='h-4/3 w-full md:h-auto md:w-4/5 object-cover'
            src={
              'https://res.cloudinary.com/dti7ahrb6/image/upload/v1705293156/Assets/BookingImage.jpg'
            }
            alt='Profile'
            />
            </div>
        </div> */}
    </>
  );
};

export default ViewUserProfile;
