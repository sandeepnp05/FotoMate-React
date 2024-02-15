import { useState } from 'react'
import { useSelector } from 'react-redux'
import { postReview } from '../../api/userApi'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function Review () {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const {user:{_id:userId}} = useSelector(state => state.userReducer)
  const {studioId} = useParams()
  const navigate = useNavigate()

  const handleStarClick = starNumber => {
    setRating(Number(starNumber));
  }
  

  const handleInputChange = e => {
    if (e.target.value.length <= 120) {
      setReview(e.target.value)
    }
  }

  const handleSubmit = async () =>  {
    if (rating === 0) {
      toast.error('Please rate the studio before submitting your review.')
      return
    }
    const res = await postReview(rating, review, userId,studioId)
    if(res.status === 200){
      toast.success(res?.data?.message)
       navigate('/booking')
    }
    console.log(res,'res')
  }
  return (
    <>
      <div className='absolute top-0 z-[-2] h-screen w-screen bg-[#201f1f] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]'></div>
      <div className='relative min-h-screen flex justify-center items-center'>
        <div className='w-full  md:w-1/2 lg:w-1/2 xl:w-1/2 px-4'>
          <div className='rounded-lg bg-white shadow-lg dark:bg-neutral-700'>
            <h5 className='text-center p-10 px-6 py-3 text-2xl font-bold dark:text-neutral-50'>
              Rate your experience
            </h5>

            <div className='flex items-center justify-center cursor-pointer mb-4'>
              {[1, 2, 3, 4, 5].map(starNumber => (
                <svg
                  key={starNumber}
                  className={`w-6 h-6 ms-2 ${
                    starNumber <= rating
                      ? 'text-yellow-300'
                      : 'text-gray-300 dark:text-gray-500'
                  }`}
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 22 20'
                  onClick={() => handleStarClick(starNumber)}
                >
                  <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                </svg>
              ))}
            </div>
            <div className='px-8'>
              <p className='mb-2 text-wrap text-base text-neutral-500 dark:text-neutral-200'>
                We highly value your feedback. Kindly take a moment to rate your
                experience and provide us with your valuable feedback.
              </p>
              <input
                type='text'
                placeholder='Tell us about your experience'
                className='input input-bordered input-lg text-sm p-3 w-full mb-4'
                value={review}
                onChange={handleInputChange}  
              />
                <p>{`${review.length}/120`}</p>
              <div className='flex justify-center pb-3'
              onClick={handleSubmit}>
                <button
                  type='button'
                  className='inline-block rounded-full bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]'
                >
                  post
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='absolute inset-0 z-[-10] h-full w-full bg-white bg-radial-gradient bg-background-size'></div>
      </div>
    </>
  )
}

export default Review
