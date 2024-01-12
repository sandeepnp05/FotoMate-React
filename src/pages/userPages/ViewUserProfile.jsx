import React from 'react';
import { useSelector } from 'react-redux';
import { UserNavbar } from './UserNavbar';
import { initFlowbite } from 'flowbite';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const ViewUserProfile = () => {
    const { user } = useSelector((state) => state.userReducer);
    useEffect(() => {
        initFlowbite();
      }, []);

  return (
    <>
      <UserNavbar />
      <div className='flex flex-col items-center justify-center mt-40 md:mt-0 w-full md:h-screen'>
        <div className="w-full max-w-md bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-md rounded-lg p-4">
          <div className="flex justify-end">
            <button
              id="dropdownButton"
              data-dropdown-toggle="dropdown"
              className="inline-block text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
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
              src={user.profileImage}
              alt="Profile Image"
            />
            <h5 className="mb-1 text-2xl md:text-xl font-semibold text-gray-900 dark:text-white">
              {user.name}
            </h5>
            <span className="text-lg text-gray-600 dark:text-gray-400">
              {user.email}
            </span>
            <span className="text-lg text-gray-600 dark:text-gray-400">
              Wallet Balance: {user.wallet}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUserProfile;
