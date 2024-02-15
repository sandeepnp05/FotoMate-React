import React from 'react'

function UserReviews ({ studio }) {
  return (
    <>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8'>
        <div className='mx-auto max-w-2xl md:text-center'>
          <h2 className='font-display text-3xl tracking-tight text-slate-900 sm:text-4xl'>
            What Our Customers Are Saying
          </h2>
        </div>
        <ul
          role='list'
          className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3'
        >
          {studio?.review?.map((userReview, index) => (
            <li key={index}>
              <div
                className='relative rounded-2xl bg-white p-6 border border-gray-300'
                style={{
                  width: '300px',
                  height: '400px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div className='rating-md p-5 justify-center'>
                  {[...Array(5)].map((e, i) => (
                    <input
                      key={i}
                      type='radio'
                      name={`rating-${i}`}
                      className={
                        i < userReview?.star
                          ? 'mask mask-star-2 bg-orange-400'
                          : 'mask mask-star-2 bg-gray-400'
                      }
                    />
                  ))}
                </div>
                <div className='relative flex items-center mb-4'>
                  <div className='overflow-hidden rounded-full bg-slate-50 mr-4'>
                    <img
                      alt=''
                      className='h-14 w-14 object-cover'
                      style={{ color: 'transparent' }}
                      src={userReview?.postedBy?.profileImage}
                    />
                  </div>
                  <div>
                    <div className='font-display text-lg line-clamp-3 leading-loose text-slate-900 font-thin'>
                      {userReview?.postedBy?.name}
                    </div>
                    <div className='font-sans text-xs text-slate-500'>{`${new Date(
                      userReview?.postedDate
                    ).toLocaleDateString()}`}</div>
                  </div>
                </div>

                <div className=' border-t border-slate-100 pt-6 relative flex-grow'>
                  <p className='text tracking-tight text-slate-900'>
                    {userReview?.userReview}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default UserReviews
