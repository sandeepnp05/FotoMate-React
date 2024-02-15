import React, { useRef, useEffect } from 'react'
import { studioList } from '../../api/userApi'
import { Link } from 'react-router-dom'
import Loading from '../common/Loading'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'

function Gallery ({ catId }) {
  const loadMoreButtonRef = useRef()

  const fetchStudios = async ({ pageParam = 1 }) => {
    const res = await studioList(catId, pageParam);
    return res.data;
  };
  

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
  useInfiniteQuery({
    queryKey: ['studios', catId],
    queryFn: fetchStudios,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
  });


  useEffect(() => {
    if (isLoading || isError || !hasNextPage) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: .1 }
    );
  
    const el = loadMoreButtonRef.current;
    if (!el) return;
  
    observer.observe(el);
  
    return () => observer.unobserve(el);
  }, [isLoading, isError, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <p>Error fetching studios</p>
  }


  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  sm:gap-4 sm:px-6 mb-6  px-8 md:px-10 lg:px-12'>
        {data.pages.map((page, pageIndex) =>
          page.studios.map((studio, studioIndex) => (
            <div
              key={`page-${pageIndex}-studio-${studioIndex}`}
              className='card  bg-base-100 shadow-xl transform transition duration-500 ease-in-out hover:scale-105 my-7 sm:my-4 sm:p-2'
            >
              <figure>
                <img
                  src={studio.coverImage}
                  alt={studio.name}
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

                  <span className='font-semibold'>{studio.studioName}</span>
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
                  {studio.cities[0]||studio.city}
                </p>

                <div className='card-actions'>
                  <Link to={`/studio/${studio._id}`}>
                    <button className='btn btn-outline stroke-2 btn-error hover:text-white'>
                      View Studio
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {isLoading && <Loading />}
    {isError && <p>Error fetching studios</p>}
    {data.pages.length === 0 && !isLoading && !isError && (
      <p>No studios available.</p>
    )
    }
    <div className='flex justify-center items-center my-4'> 
      <div ref={loadMoreButtonRef}>{hasNextPage && <span className="loading loading-spinner bg-gray-500 loading-lg"></span>}</div>
    </div>

    </>
  )
}
export default Gallery
