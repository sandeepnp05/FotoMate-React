import React, { useState, useEffect } from 'react'
import { vendorList } from '../../api/userApi'
import { Link } from 'react-router-dom'
import Loading from '../common/Loading'

function Gallery () {
  const [vendors, setVendors] = useState(null)
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await vendorList();
        const studio = res.data;
        console.log(studio, 'result');
        setVendors(studio);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
 if (loading) {
  return(
    <div className="flex items-center justify-center h-screen">
        <Loading/>
      </div>
  )
 }  
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 sm:px-6 mb-6 md:px-10 lg:px-12'>
        {vendors &&
          vendors.map(vendor => (
            <div
              key={vendor._id}
              className='card  bg-base-100 shadow-xl transform transition duration-500 ease-in-out hover:scale-105 sm:p-2'
            >
              <figure>
                <img
                  src={vendor.studioInfo.coverImage}
                  alt={vendor.studioInfo.studioName}
                  className='w-full h-48 object-cover'
                />
              </figure>
              <div className='card-body p-4 m-4 '>
                <p className='flex items-center'>
                  <svg
                    className='h-4 w-4 text-red-500 mr-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1'
                      d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>

                 <span className='font-semibold'>{vendor.studioInfo.studioName}</span>
                </p>
                <p className='flex items-center'>
                  <svg
                    className='h-4 w-4 text-red-500 mr-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  {vendor.studioInfo.city}
                </p>
                {/* <p>{vendor.studioInfo.description}</p> */}

                <div className='card-actions'>
                  <Link to={`/studio/${vendor._id}`}>
                    <button className='btn btn-outline stroke-2 btn-error hover:text-white'>
                      View Studio
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default Gallery
