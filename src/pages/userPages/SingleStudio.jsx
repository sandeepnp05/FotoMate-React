// SingleStudio.js

import React, { useEffect, useState,useCallback } from 'react'
import { UserNavbar } from './UserNavbar'
import { useParams } from 'react-router-dom'
import { fetchStudioPackages, singleStudioDetails } from '../../api/userApi'
import { Carousel, initTE, Ripple } from 'tw-elements'
import Loading from '../../components/common/Loading'
import UserFooter from '../../components/userComponents/UserFooter'
import { getCategories } from '../../api/userApi'
import { useQuery } from '@tanstack/react-query'
import Packages from '../../components/userComponents/Packages'
initTE({ Carousel, Ripple })
function SingleStudio () {
  // const [studio, setStudio] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { id } = useParams()
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768)
  // const [categories, setCategory] = useState([])
  // const [cities,setCities] = useState([])

  const updateWindowSize = () => {
    setIsDesktop(window.innerWidth > 768)
  }
  const { data: studio, isLoading, isError } = useQuery({
    queryKey: ['studio', id],
    queryFn: async () => {
      const res = await singleStudioDetails(id);
      if (res.data) {
        return res.data;
      } else {
        throw new Error('Invalid response structure');
      }
    },
    retry: false, 
  });
  const cities = studio?.cities || []
  const { data: packageData,isLoading:packageLoading,isError:packageError} = useQuery({
    queryKey:['package',id],queryFn: () => fetchStudioPackages(id)
  })
    const packages = packageData?.data || []
    console.log(packages,'packages')
    console.log(id,'iddddd')
  
  useEffect(() => {
    window.addEventListener('resize', updateWindowSize)
    return () => {
      window.removeEventListener('resize', updateWindowSize)
    }
  }, [])

 

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p>{error}</p>
      </div>
    )
  }
  return (
    <>
      <UserNavbar />

      {studio && (
        <>
          <div className='container mx-auto px-5 py-2 lg:pt-24 mt-8 flex flex-col md:flex-row'>
            {/* Left Div */}
            <div
              className={`w-full mt-20 md:mt-0 rounded-t-lg md:w-1/2 p-2 ${
                isDesktop ? 'sticky top-24 h-screen' : ''
              }`}
            >
              <div className='h/2 bg-gray-200 rounded-t-lg md:rounded-lg'>
                <>
                  <div className='block w-full h/2 rounded-t-lg md:rounded-tl-lg bg-white  dark:bg-neutral-700'>
                    <div className='flex flex-col md:flex-row'>
                      <div className='w-full md:w-1/2 rounded-t-lg md:rounded-tl-lg'>
                        <img
                          className='rounded md:rounded-none md:rounded-tl-lg'
                          src={studio.coverImage}
                          alt=''
                        />
                         <h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
                      </h5>
                      <p className='text-base text-neutral-600 dark:text-neutral-200'>
                        {studio && studio.description}
                      </p>
                      </div>
                      <div className='w-full md:w-1/2 rounded-lg'>
                        <div className='max-w-md lg:mx-5 w-full rounded-lg overflow-hidden p-0 md:px-6'>
                          <h5 className='mb-2 text-3xl font-black leading-tight text-neutral-800 dark:text-neutral-50'>
                            {studio && studio.studioName}
                          </h5>

                          <div className='rating mb-6'>
                            <div className='mask mask-star-2 bg-orange-400 w-4 h-4'></div>
                            <div className='mask mask-star-2 bg-orange-400 w-4 h-4'></div>
                            <div className='mask mask-star-2 bg-orange-400 w-4 h-4'></div>
                            <div className='mask mask-star-2 bg-orange-400 w-4 h-4'></div>
                            <div className='mask mask-star-2 bg-orange-400 w-4 h-4'></div>
                          </div>

                          <h5 className='mb-4 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
                            {' '}
                            {studio && studio.city}
                          </h5>

                          <div className='mb-4'>
                            {studio.categories &&
                              studio.categories.map((cat,index )=> (
                                <div key={index} className='badge badge-outline p-2'>
                                  {cat}
                                </div>
                              ))}
                          </div>

                          <h5 className='mb-4 text-base text-neutral-600 dark:text-neutral-200'>
                            Total Rs:
                          </h5>
                          <p className='mb-4 text-base text-neutral-600 dark:text-neutral-200'></p>
                          <button
                            type='button'
                            className='mb-2 block w-full rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
                            data-te-ripple-init
                          >
                            Request reply
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className='p-6'>
                     
                    </div>
                  </div>
                </>
              </div>
            </div>

            {/* Right Gallery */}
            <div className='w-full md:w-1/2 flex flex-wrap mt-0 '>
              {studio.galleryImages.map((image, index) => (
                <div key={index} className={`w-full sm:w-1/2 p-1 md:p-2`}>
                  <img
                    alt={`gallery-${index}`}
                    className='block h-full w-full rounded md:rounded-none md:rounded-tr-lg object-cover object-center'
                    src={image}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='flex w-full'></div>
          <h5 className='mb-2 text-xl pl-12 mt-12 font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
                  Packages
                </h5>
            <Packages packages={packages} cities={cities}/>
          
          <UserFooter />
        </>
      )}

      {loading && (
        <div className='flex items-center justify-center h-screen'>
          <Loading />
        </div>
      )}

      {error && <p>Error fetching studio information</p>}
    </>
  )
}

export default SingleStudio
