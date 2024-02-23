import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@material-tailwind/react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { studioSchema } from '../../../validations/vendor/studioValidationSchema'
import { addStudio } from '../../../api/vendorApi'
import { useEffect } from 'react'
import { Multiselect } from 'multiselect-react-dropdown'
import { getCategories } from '../../../api/userApi'
import { useQuery } from '@tanstack/react-query'

function VendorHero ({ studio }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [coverImage, setCoverImage] = useState('')
  const [galleryImages, setGalleryImage] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [isStudio, setStudio] = useState(null)
  const [category, setCategory] = useState([])
  const [cities, setCities] = useState([])
  const [cityName, setCityName] = useState('')
  const [buttonDisplay, setButtonDisplay] = useState('none')
  // const [selectedCat, setSelectedCat] = useState([])
  const navigate = useNavigate()
  const { _id } = useSelector(state => state.vendorReducer.vendor)

  useEffect(() => {
    const storedStudio = JSON.parse(localStorage.getItem('studio'))
    if (storedStudio) {
      setStudio(storedStudio)
    }
  }, [])

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
        vendorId,
        selectedCat: values.selectedCat.map(category => category.name),
        cities
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
    
    if (isValid) {
      setGalleryImageToBase(files)
    }
  }

  const setGalleryImageToBase = async files => {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader()

      reader.readAsDataURL(files[i])

      reader.onload = () => {
        setGalleryImage(prev => [...prev, reader.result])

        if (i === files.length - 1) {
        }
      }

      reader.onerror = error => {
        console.error('Error converting image:', error)
      }
    }
  }

  const setCoverImageToBase = async file => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setCoverImage(reader.result)
    }
  }

  //////////////////////////////////ADD CITIES //////////////////////////////
  const handleRemoveCity = index => {
    const updatedCities = [...cities]
    updatedCities.splice(index, 1)
    setCities(updatedCities)
  }

  const handleAddCities = () => {
    if (cityName) {
      const newCity = {
        cityName
      }
      setCities(prevCities => [...prevCities, newCity])
      setCityName('')
    } else {
      toast.error('Please enter city name')
    }
  }

  const updateButtonDisplay = cityName => {
    if (cityName) {
      setButtonDisplay('inline-block')
    } else {
      setButtonDisplay('none')
    }
  }

  //////////////////////////////////////////////////////////////////////////////

  const { error, data } = useQuery({
    queryKey: ['category'],
    queryFn: () => getCategories()
  })

  const options = data?.map(item => ({ name: item.name }))

  const { errors, handleBlur, handleChange, handleSubmit, values, touched } =
    useFormik({
      initialValues: {
        studioName: '',
        description: '',
        location: '',
        selectedCat: []
      },
      // validationSchema: studioSchema,
      onSubmit
    })
  return (
    <>
    <div className='relative h-screen overflow-hidden'>
    <div className=" top-0 z-[-2] h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <section className=''>
        <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
          <div className='mr-auto place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-400'>
              Enhance your wedding business with top industry leaders preferred
              by couples.
            </h1>
            <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl'>
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
                className='inline-flex z-10 cursor-pointer items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-400 border border-gray-300 rounded-lg hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 dark:text-white dark:border-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-400'
                style={{ zIndex: 9999 }} 
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
                <button className='inline-flex cursor-pointer items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-400 border border-gray-300 rounded-lg hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 dark:text-white dark:border-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-400'>
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
            className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100% - 1rem)] max-h-full'
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
                        className='input input-bordered w-full bg-blue-gray-50 mb-2'
                        placeholder='Type studio name'
                        required=''
                      />
                      {touched.studioName && errors.studioName && (
                        <div className='text-red-500 text-sm'>
                          {errors.studioName}
                        </div>
                      )}
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
                        className='input input-bordered w-full bg-blue-gray-50 mb-2'
                        placeholder='location'
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
                        htmlFor='cityName'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                      Type and add service locations.
                      </label>
                      <input
                        type='text'
                        name='cityName'
                        id='cityName'
                        value={cityName}
                        onChange={e => {
                          setCityName(e.target.value)
                          updateButtonDisplay(e.target.value)
                        }}
                        className='input input-bordered w-full bg-blue-gray-50'
                        placeholder='city'
                      />

                      <div className='col-span-2 md:col-span-1 mt-2'>
                        <button
                          type='button'
                          className=' inline-block rounded-lg bg-gray-900 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]'
                          data-te-ripple-init=''
                          data-te-ripple-color='light'
                          onClick={handleAddCities}
                          style={{ display: buttonDisplay }}
                          disabled={!cityName}
                        >
                          Add +
                        </button>
                      </div>
                    </div>
                    {cities.length > 0 && (
                      <div className='mb-4'>
                        <h6 className='mb-2 text-lg font-medium text-neutral-800 dark:text-neutral-50'>
                          Added Cities
                        </h6>

                        <ul>
                          {cities.map((cities, index) => (
                            <li key={index} className='mb-1'>
                              <span
                                id={`badge-dismiss-${cities.cityName}`}
                                className='inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300'
                              >
                                {`${cities.cityName}`}
                                <button
                                  type='button'
                                  className='inline-flex items-center p-1 ms-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300'
                                  data-dismiss-target={`#badge-dismiss-${cities.cityName}`}
                                  aria-label='Remove'
                                  onClick={() => handleRemoveCity(index)}
                                >
                                  <svg
                                    className='w-2 h-2'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 14 14'
                                  >
                                    <path
                                      stroke='currentColor'
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth='2'
                                      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                                    />
                                  </svg>
                                  <span className='sr-only'>Remove badge</span>
                                </button>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className='col-span-2 z-10'>
                      <label
                        htmlFor='category'
                        className='block mb-2 text-sm  t font-medium text-gray-900 dark:text-white'
                      >
                        Category
                      </label>
                      <Multiselect
                        options={options}
                        value={values.selectedCat} // Use values.selectedCat
                        onSelect={selectedList => {
                          handleChange({
                            target: { name: 'selectedCat', value: selectedList }
                          })
                        }}
                        onRemove={selectedList => {
                          handleChange({
                            target: { name: 'selectedCat', value: selectedList }
                          })
                        }}
                        labelledBy={'Select'}
                        isCreatable={true}
                        displayValue='name'
                        closeOnSelect={false}
                        className='text-gray-900 w-full bg-blue-gray-50'
                      />
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
        </div>
        </div>
    </>
  )
}

export default VendorHero
