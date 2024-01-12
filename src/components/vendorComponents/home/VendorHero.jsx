import React from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@material-tailwind/react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { studioSchema } from '../../../validations/vendor/studioValidationSchema'
import { addStudio } from '../../../api/vendorApi'
import { useEffect } from 'react'

function VendorHero ({studio}) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [coverImage, setCoverImage] = useState('')
  const [galleryImages, setGalleryImage] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [isStudio,setStudio] = useState(null)
  const navigate = useNavigate()
  const { _id } = useSelector(state => state.vendorReducer.vendor)
 
  useEffect(() => {
  const storedStudio = JSON.parse(localStorage.getItem('studio'));
  if (storedStudio) {
    setStudio(storedStudio);
  }
}, []);


  const vendorId = _id
  const handleModalToggle = () => {
    setModalOpen(!isModalOpen)
  }

  const onSubmit = async () => {
    try {
      setLoading(true)
      const res = await addStudio({
        ...values,
        coverImage,
        galleryImages: galleryImages.map(imageUrl => imageUrl),
        vendorId
      })
    
      if (res.status === 201) {
        setStudio(true)
        navigate(`/vendor/studio/${vendorId}`, { state: { vendorId } })
        toast.success(res?.data?.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }
  const handleCoverImageChange = e => {
    const file = e.target.files[0]
    if (
      file.type &&
      (file.type.startsWith('image/jpeg') || file.type.startsWith('image/png'))
    ) {
      setCoverImageToBase(file)
    } else {
      setCoverImage([])
      e.target.value = null
    }
  }

  const handleGalleryImageChange = e => {
    const files = Array.from(e.target.files)
    const isValid = files.every(
      file =>
        file.type.startsWith('image/jpeg') || file.type.startsWith('image/png')
    )
    console.log('Image types:', files.map(file => file.type));
    if (isValid) {
      setGalleryImageToBase(files)
    }
  }
  

  const setGalleryImageToBase = async files => {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
  
      reader.readAsDataURL(files[i]);
  
      reader.onload = () => {
        setGalleryImage(prev => [...prev, reader.result]);
  
       
        if (i === files.length - 1) {
          console.log('All images processed:', galleryImages);
        }
      };
  
      reader.onerror = error => {
        console.error('Error converting image:', error);
      };
    }
  };
  
  const setCoverImageToBase = async file => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setCoverImage(reader.result)
    }
  }

  const { errors, handleBlur, handleChange, handleSubmit, values, touched } =
    useFormik({
      initialValues: {
        studioName: '',
        location: '',
        description: ''
      },
      // validationSchema: studioSchema,
      onSubmit
    })

  return (
    <>
      <section className='bg-black dark:bg-gray-900'>
        <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
          <div className='mr-auto place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-400'>
              Enhance your wedding business with top industry leaders preferred
              by couples.
            </h1>
            <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl text-gray-300'>
              Elevate your photography business with our comprehensive studio
              management tools. From creating and customizing your studio
              profile to managing bookings seamlessly, our platform empowers
              photographers to focus on what they do best - capturing
              unforgettable moments.
            </p>

       

{vendorId && !isStudio && (
        <button
          onClick={handleModalToggle}
          type='button'
          className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-400 border border-gray-300 rounded-lg hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 dark:text-white dark:border-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-400'
        >
          Get Started
        </button>
      )}

      {!vendorId && !isStudio && (
        <Link to='/vendor/login'>
          <button className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-400 border border-gray-300 rounded-lg hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 dark:text-white dark:border-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-400'>
            Log In
          </button>
        </Link>
      )}

      {isStudio && (
        <Link to={`/vendor/studio/${vendorId}`}>
          <button className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-400 border border-gray-300 rounded-lg hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 dark:text-white dark:border-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-400'>
            View Studio
          </button>
        </Link>
      )}
          </div>
          <div className='hidden lg:mt-0 lg:col-span-5 lg:flex'>
            <img src='/src/assets/camera2.png' alt='mockup' />
          </div>
        </div>
      </section>
      {/* Modal area >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

      <>
        {/* Modal toggle */}

        {/* Main modal */}
        {isModalOpen && (
          <div
            id='crud-modal'
            tabIndex={-1}
            aria-hidden='true'
            className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'
          >
            <div className='relative p-4 w-full max-w-md  max-h-full'>
              {/* Modal content */}
              <div className='relative bg-blue-gray-50 rounded-lg shadow dark:bg-gray-700'>
                {/* Modal header */}
                <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                    Create Studio
                  </h3>
                  <button
                    onClick={handleModalToggle}
                    type='button'
                    className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                    data-modal-toggle='crud-modal'
                  >
                    <svg
                      className='w-3 h-3'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 14 14'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                      />
                    </svg>
                    <span className='sr-only'>Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <form onSubmit={handleSubmit} className='p-4 md:p-5'>
                  <div className='grid gap-4 mb-4 grid-cols-2'>
                    <div className='col-span-2'>
                      <label
                        htmlFor='name'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Name
                      </label>
                      <input
                        type='text'
                        name='studioName'
                        id='name'
                        value={values.studioName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='input input-bordered w-full bg-blue-gray-50'
                        placeholder='Type studio name'
                        required=''
                      />
                      {touched.studioName && errors.studioName && (
                        <div className='text-red-500 text-sm'>
                          {errors.studioName}
                        </div>
                      )}
                    </div>
                    <div className='col-span-2'>
                      <label
                        htmlFor='name'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        City
                      </label>
                      <input
                        type='text'
                        name='location'
                        id='location'
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='input input-bordered w-full bg-blue-gray-50'
                        placeholder='city'
                        required=''
                      />
                      {touched.location && errors.location && (
                        <div className='text-red-500 text-sm'>
                          {' '}
                          {errors.location}
                        </div>
                      )}
                    </div>

                    <div className='col-span-2'>
                      <label
                        htmlFor='galleryImage'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Cover Image
                      </label>
                      <div className='relative'>
                        <input
                          type='file'
                          accept='image/*'
                          name='coverImage'
                          onChange={handleCoverImageChange}
                          id='coverImage'
                          className='file-input file-input-bordered w-full bg-blue-gray-50'
                          required
                        />
                        {/* {errors.galleryImage && touched.galleryImage && (
                          <div className='text-red-500 text-sm'>
                            {errors.galleryImage}
                          </div>
                        )} */}
                      </div>
                    </div>
                    <div className='col-span-2'>
                      <label
                        htmlFor='galleryImages'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Gallery Images
                      </label>
                      <div className='relative'>
                        <input
                          type='file'
                          accept='image/*'
                          name='galleryImages'
                          onChange={handleGalleryImageChange}
                          id='galleryImage'
                          className='file-input file-input-bordered w-full bg-blue-gray-50'
                          multiple
                          required
                        />
                        {/* {errors.galleryImage && touched.galleryImage && (
                          <div className='text-red-500 text-sm'>
                            {errors.galleryImage}
                          </div>
                        )} */}
                      </div>
                    </div>

                    <div className='col-span-2'>
                      <label
                        htmlFor='description'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        About the Studio
                      </label>
                      <textarea
                        id='description'
                        name='description'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        rows={4}
                        maxLength={200} // Add a character limit
                        className='input input-bordered input-lg w-full bg-blue-gray-50'
                        placeholder='Write a brief description' 
                      />
                      {errors.description && touched.description && (
                        <div className='text-red-500 text-sm'>
                          {errors.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    type='submit'
                    className={`text-white btn inline-flex items-center bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                    ${isLoading ? 'opacity-95 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <>
                        <span className='text-white text-center'>
                          Creating...
                        </span>
                      </>
                    )}
                    {!isLoading && 'Create'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  )
}

export default VendorHero
