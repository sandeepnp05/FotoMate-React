import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import {
  addPackage,
  editStudio,
  fetchPackages,
  
  showVendorStudio,
  updateCoverImage
} from '../../api/vendorApi'
import VendorNavbar from '../../components/vendorComponents/vendorCommon/VendorNavbar'
import Loading from '../../components/common/Loading'
import { toast } from 'react-toastify'
import Error from '../../components/common/Error'
import { getCategories } from '../../api/userApi'
import { Modal, Ripple, initTE } from 'tw-elements'
import Multiselect from 'multiselect-react-dropdown'
import { useFormik } from 'formik'
import { useQuery } from '@tanstack/react-query'
import { Navigate, useNavigate,Link } from 'react-router-dom'
import Packages from '../../components/vendorComponents/Packages'

function VendorStudio () {
  const { _id } = useSelector(state => state.vendorReducer.vendor)
  const vendorId = _id
  const [studio, setStudio] = useState(null)
  const [studioError, setStudioError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768)
  const [image, setImage] = useState('')
  const [render, setRender] = useState(false)

  const [services, setServices] = useState([])
  const [serviceName, setServiceName] = useState('')
  const [price, setPrice] = useState('')
  const [packageImage, setPackageImage] = useState('')
  const [buttonDisplay, setButtonDisplay] = useState('none')

  const navigate = useNavigate()
  useEffect(() => {
    initTE({ Modal, Ripple })
  }, [])

  const openModal = () => {
    const modal = new Modal(document.getElementById('addPackageModal'))
    modal.show()
  }

  // Use openModal wherever you need to open the modal

  const updateWindowSize = () => {
    setIsDesktop(window.innerWidth > 768)
  }

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  PACKAGE SECTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const onSubmit = async () => {
    try {
      const res = await addPackage({
        ...values,
        packageImage,
        services,
        vendorId
      })
      if (res.status === 201) {
        toast.success(res?.data?.message || 'Package Added successfully')
        navigate(`/vendor/studio/${vendorId}`)
        resetForm()
        const modal = document.getElementById('addPackageModal')
        if (modal) {
          modal.dispatchEvent(new Event('click'))
        }
      }
    } catch (error) {
      toast.error(error.message || 'An error occured')
    }
  }

  const handleRemoveService = index => {
    const updatedServices = [...services]
    updatedServices.splice(index, 1)
    setServices(updatedServices)
  }
  const handleAddService = () => {
    if (serviceName && price) {
      const newService = {
        serviceName,
        price
      }

      setServices([...services, newService])
      setServiceName('')
      setPrice('')
    } else {
      console.log('Please enter both service name and price.')
    }
  }
  const updateButtonDisplay = (serviceName, price) => {
    if (serviceName && price) {
      setButtonDisplay('inline-block')
    } else {
      setButtonDisplay('none')
    }
  }

  const handlePackageImageChange = e => {
    const file = e.target.files[0]
    if (
      file.type &&
      (file.type.startsWith('image/jpeg') || file.type.startsWith('image/png'))
    ) {
      setPackageImageToBase(file)
    } else {
      setPackageImage([])
      e.target.value = null
    }
  }

  const setPackageImageToBase = async file => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPackageImage(reader.result)
    }
  }

  //  fetching package details

  const {
    error,
    data: packageData,
    isLoading: packageLoading,
    isError: packageError
  } = useQuery({
    queryKey: ['package', { vendorId }],
    queryFn: () => fetchPackages(vendorId) 
  });
  const packages = packageData?.data || [];
  
  

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< PACKAGE SECTION END  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< VENDOR STUDIO SECTION  START >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const setImageToBase = file => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImage(reader.result)
    }
  }
  const handleImageChange = e => {
    const selectedImage = e.target.files[0]
    setImageToBase(selectedImage)
  }

  useEffect(() => {
    setLoading(true)
    setRender(false)

    const fetchStudio = async () => {
      try {
        const studioData = await showVendorStudio(vendorId)
        // Check if studioData is defined and has a status of 403
        if (studioData && studioData.status === 403) {
          const errorMessage =
            studioData.response?.data?.error || 'Studio is blocked'
          setStudioError(errorMessage)
          setLoading(false)
        } else if (studioData && studioData.data) {
          setLoading(false)
          setStudio(studioData.data.studio)
        } else {
          setStudioError('Error fetching studio information')
          setLoading(false)
        }
      } catch (error) {
        setStudioError(error.message || 'Error fetching studio information')
        setLoading(false)
        console.error('Error fetching studio:', error)
      }
    }

    const handleResize = () => {
      updateWindowSize()
    }

    fetchStudio()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [vendorId, render])

  const handleUpdateImage = async () => {
    try {
      if (image) {
        const { _id } = studio
        const res = await updateCoverImage(_id, image)
        setRender(true)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    handleUpdateImage()
  }, [image])

  const {
    isLoading,
    isError,
    data: category
  } = useQuery({ queryKey: ['categories'], queryFn: getCategories })
  let options
  if (category) {
    const filteredCategories = category.filter(
      category => category.name !== 'All categories'
    )

    options = filteredCategories.map(category => ({
      value: category._id,
      name: category.name
    }))
  } 

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< VENDOR STUIO SECTION  END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< PACKAGE FORM  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    touched,
    resetForm
  } = useFormik({
    initialValues: {
      packageName: '',
      description: '',
      selectedCat: []
    },
    // validationSchema: studioSchema,
    onSubmit
  })
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< PACKAGE FORM  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  EDIT STUIDO FORM  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  async function handleStudioEdit (values){
    try {
      const studioId = studio._id;
      const res = await editStudio({...values,studioId})
      if (res.status===201) {
        toast.success(res.data.message)
        setStudio(res?.data?.updatedStudio)
        console.log(res?.data?.updatedStudio
          ,'resssssss')
        console.log(res?.data,'resssss6')
        
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const openEditModal = () => {
    const modal = new Modal(document.getElementById('editModal'))
    modal.show()
  }
  const {
    errors: editStudioErrors,
    handleBlur: handleBlurStudio,
    handleChange: handleChangeStudio,
    handleSubmit: handleSubmitStudio,
    values: studioValues,
    touched: studioTouched,
    resetForm: resetStudio
  } = useFormik({
    initialValues: { 
      studioName:studio?.studioName||'',
      location : studio?.city||"",
      description:studio?.description||"",
      selectedCat:studio?.categories||[]

    },
    enableReinitialize: true, 
    onSubmit:  handleStudioEdit
  });
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  EDIT STUIDO FORM  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  return (
    <>
      <VendorNavbar></VendorNavbar>
      {studio && (
        <>
          <h6 className='text-end mr-56 text-xl '>Gallery Images</h6>
          <div className='container mx-auto px-5 py-2 lg:pt-6 flex flex-col md:flex-row'>
            {/* Left Div */}
            <div
              className={`w-full md:w-1/2 p-2 ${
                isDesktop ? 'sticky top-0 h-screen' : ''
              }`}
            >
              <div className='h-full bg-gray-200  rounded-lg'>
                <>
                  <div className='block w-full h-full rounded-tl-lg bg-white  dark:bg-neutral-700'>
                    <div className='flex flex-col md:flex-row'>
                      <div className='w-full md:w-1/2 rounded-lg'>
                        <label htmlFor='fileInput'>
                          <input
                            type='file'
                            id='fileInput'
                            accept='image/*'
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                          />
                          <div style={{ position: 'relative' }}>
                            <img
                              className='rounded-tl-lg'
                              src={studio.coverImage}
                              alt=''
                            />
                            <div className='absolute top-64 md:top-56  right-32 md:right-28 cursor-pointer flex flex-row'>
                              <h1 className='text-gray-100 justify-center mr-2'>
                                Edit
                              </h1>
                              <PhotoLibraryIcon
                                fontSize='small'
                                style={{ color: 'white' }}
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className='w-full md:w-1/2 rounded-lg'>
                        <div className='max-w-md lg:mx-5 w-full rounded-lg overflow-hidden  p-6'>
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
                              studio.categories.map((cat, index) => (
                                <div
                                  key={index}
                                  className='badge badge-outline p-2'
                                >
                                  {cat}
                                </div>
                              ))}
                          </div>

                          <h5 className='mb-4 text-base text-neutral-600 dark:text-neutral-200'>
                            Total Rs:
                          </h5>
                          <p className='mb-4 text-base text-neutral-600 dark:text-neutral-200'></p>
                          <button
                            onClick={openEditModal}
                            type='button'
                            className='mb-2 block w-full rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
                            data-te-toggle="modal"
                            data-te-target="#editModal"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                          >
                            Edit Studio
                          </button > 
                            <Link to={`/vendor/bookings/${vendorId}`}>
                          <button  
                          className='mb-2 block w-full rounded border-2 border-success px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'>
                           View bookings
                          </button>
                            </Link>
                        </div>
                      </div>
                    </div>

                    <div className='p-6'>
                      <h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
                        About
                      </h5>
                      <p className='text-base text-neutral-600 dark:text-neutral-200'>
                        {studio && studio.description}
                      </p>
                    </div>
                  </div>
                </>
              </div>
            </div>
 {/* Edit modal body */}
 <div
  data-te-modal-init=""
  className="fixed left-0 top-0 z-[1055] hidden h-full w-1/2 overflow-y-auto overflow-x-hidden outline-none"
  id="editModal"
  tabIndex={-1}
  aria-labelledby="editModalLabel"
  aria-modal="true"
  role="dialog"
>
  <div
    data-te-modal-dialog-ref=""
    className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px]"
  >
    <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
      <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
        {/*Modal title*/}
        <h5
          className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
          id="editModalLabel"
        >
          Edit studio
        </h5>
        {/*Close button*/}
        <button
          type="button"
          className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
          data-te-modal-dismiss=""
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {/*Modal body*/}
      <div className="relative p-4">
      <form onSubmit={handleSubmitStudio} className='p-4 md:p-5'>
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
                        value={studioValues.studioName}
                        onChange={handleChangeStudio}
                        onBlur={handleBlurStudio}
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
                        value={studioValues.location} 
                        onChange={handleChangeStudio}
                        onBlur={handleBlurStudio}
                        
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
                    <div className='col-span-2 z-10'>
                      <label
                        htmlFor='category'
                        className='block mb-2 text-sm  t font-medium text-gray-900 dark:text-white'
                      >
                        Category
                      </label>
                      <Multiselect
                        options={options}
                        value={studioValues.selectedCat} // Use values.selectedCat
                        onSelect={selectedList => {
                          handleChangeStudio({
                            target: { name: 'selectedCat', value: selectedList }
                          })
                        }}
                        onRemove={selectedList => {
                          handleChangeStudio({
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
                   
                    {/* <div className='col-span-2'>
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
                        {errors.galleryImage && touched.galleryImage && (
                          <div className='text-red-500 text-sm'>
                            {errors.galleryImage}
                          </div>
                        )}
                      </div>
                    </div> */}

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
                        onChange={handleChangeStudio} 
                        onBlur={handleBlurStudio} 
                        value={studioValues.description}
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
                    {!isLoading && 'Edit'}
                  </button>
                </form>


      </div>
    </div>
  </div>
</div>

 {/* Edit modal body */}
            {/* Right Gallery */}

            <div className='w-full md:w-1/2 flex flex-wrap'>
              {studio.galleryImages.map((image, index) => (
                <div key={index} className={`w-full sm:w-1/2 p-1 md:p-2`}>
                  <img
                    alt={`gallery-${index}`}
                    className='block h-full w-full rounded-tr-lg object-cover object-center'
                    src={image}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='container mx-auto px-5 py-2 lg:pt-6'>
            <div className='block w-full h-full rounded-tl-lg bg-white  dark:bg-neutral-700'>
              <div className='p-6'>
                <h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
                  Packages
                </h5>

                <Packages packages={packages}/>
                
                {/* ////////////////////////////////////////////////////////////////////        */}

                <>
                  {/* Button trigger modal */}
                  <button
                    type='button'
                    className='inline-block rounded bg-green-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
                    data-te-toggle='modal'
                    onClick={openModal}
                    data-te-target='#addPackageModal'
                    data-te-ripple-init=''
                    data-te-ripple-color='light'
                  >
                    Add Packages
                  </button>
                  {/* Modal */}
                  <div
                    data-te-modal-init=''
                    className='fixed left-0 top-0 z-[1055] hidden h-full w-full md:w-1/2  overflow-y-auto overflow-x-hidden outline-none'
                    id='addPackageModal'
                    tabIndex={-1}
                    aria-labelledby='addPackageModalLabel'
                    aria-hidden='true'
                  >
                    <div
                      data-te-modal-dialog-ref=''
                      className='pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]'
                    >
                      <div className='min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600'>
                        <div className='flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50'>
                          {/*Modal title*/}
                          <h5
                            className='text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200'
                            id='addPackageModalLabel'
                          >
                            Add Packages
                          </h5>
                          {/*Close button*/}
                          <button
                            type='button'
                            className='box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none'
                            data-te-modal-dismiss=''
                            aria-label='Close'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth='1.5'
                              stroke='currentColor'
                              className='h-6 w-6'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M6 18L18 6M6 6l12 12'
                              />
                            </svg>
                          </button>
                        </div>
                        {/*Modal body*/}
                        <div
                          className='relative flex-auto p-4'
                          data-te-modal-body-ref=''
                        >
                          <form onSubmit={handleSubmit} className='p-4 md:p-5'>
                            <div className='grid gap-4 mb-4 grid-cols-2'>
                              <div className='col-span-2'>
                                <label
                                  htmlFor='packageName'
                                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                >
                                  Package Name
                                </label>
                                <input
                                  type='text'
                                  name='packageName'
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  rows={4}
                                  maxLength={200}
                                  id='packageName'
                                  className='input input-bordered w-full bg-blue-gray-50'
                                  placeholder='Type package name'
                                  required=''
                                />
                              </div>
                              {/* Category */}
                              <div className='col-span-2 z-10'>
                                <label
                                  htmlFor='category'
                                  className='block mb-2 text-sm   font-medium text-gray-900 dark:text-white'
                                >
                                  Category
                                </label>
                                <Multiselect
                                  singleSelect={true}
                                  options={options}
                                  value={values.selectedCat} // Use values.selectedCat
                                  onSelect={selectedList => {
                                    handleChange({
                                      target: {
                                        name: 'selectedCat',
                                        value: selectedList
                                      }
                                    })
                                  }}
                                  onRemove={selectedList => {
                                    handleChange({
                                      target: {
                                        name: 'selectedCat',
                                        value: selectedList
                                      }
                                    })
                                  }}
                                  labelledBy={'Select'}
                                  isCreatable={true}
                                  displayValue='name'
                                  closeOnSelect={false}
                                  className='text-gray-900 w-full bg-blue-gray-50'
                                />
                              </div>

                              {/* service and price  */}
                              <div className='col-span-2 md:col-span-1 '>
                                <label
                                  htmlFor='Service'
                                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                >
                                  Service
                                </label>
                                <input
                                  type='text'
                                  name='serviceName'
                                  id='serviceName'
                                  placeholder='Service Name'
                                  className='input input-bordered small-input bg-blue-gray-50'
                                  value={serviceName}
                                  onChange={e => {
                                    setServiceName(e.target.value)
                                    updateButtonDisplay(e.target.value, price)
                                  }}
                                />
                              </div>

                              <div className='col-span-2 md:col-span-1 pl-2'>
                                <label
                                  htmlFor='Price'
                                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                >
                                  Price
                                </label>
                                <input
                                  type='text'
                                  name='price'
                                  id='price'
                                  placeholder='Price'
                                  className='input input-bordered small-input bg-blue-gray-50'
                                  value={price}
                                  onChange={e => {
                                    setPrice(e.target.value)
                                    updateButtonDisplay(
                                      serviceName,
                                      e.target.value
                                    )
                                  }}
                                />
                              </div>

                              <div className='col-span-2 md:col-span-1'>
                                <button
                                  type='button'
                                  className=' inline-block rounded-lg bg-gray-900 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]'
                                  data-te-ripple-init=''
                                  data-te-ripple-color='light'
                                  onClick={handleAddService}
                                  style={{ display: buttonDisplay }}
                                  disabled={!serviceName || !price}
                                >
                                  Add +
                                </button>
                              </div>
                              {services.length > 0 && (
                                <div className='mb-4'>
                                  <h6 className='mb-2 text-lg font-medium text-neutral-800 dark:text-neutral-50'>
                                    Added Services
                                  </h6>

                                  <ul>
                                    {services.map((service, index) => (
                                      <li key={index} className='mb-1'>
                                        <span
                                          id={`badge-dismiss-${service.serviceName}`}
                                          className='inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300'
                                        >
                                          {`${service.serviceName}: ₹ ${service.price}`}
                                          <button
                                            type='button'
                                            className='inline-flex items-center p-1 ms-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300'
                                            data-dismiss-target={`#badge-dismiss-${service.serviceName}`}
                                            aria-label='Remove'
                                            onClick={() =>
                                              handleRemoveService(index)
                                            }
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
                                            <span className='sr-only'>
                                              Remove badge
                                            </span>
                                          </button>
                                        </span>
                                      </li> 
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Cover Image  */}
                              <div className='col-span-2'>
                                <label
                                  htmlFor='packageImage'
                                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                >
                                  Cover Image
                                </label>
                                <input
                                  type='file'
                                  accept='image/*'
                                  onChange={handlePackageImageChange}
                                  name='packageImage'
                                  id='packageImage'
                                  className='file-input file-input-bordered file-input-success  w-full bg-blue-gray-50'
                                  required
                                />
                              </div>
                              {/* Package description */}

                              <div className='col-span-2'>
                                <label
                                  htmlFor='description'
                                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                >
                                  Package description
                                </label>
                                <textarea
                                  id='description'
                                  name='description'
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  rows={4}
                                  maxLength={200}
                                  className='input input-bordered input-lg w-full bg-blue-gray-50'
                                  placeholder='Write a brief description'
                                />
                              </div>
                            </div>
                            <button
                              type='submit'
                              className=' inline-block rounded-lg bg-green-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
                              data-te-ripple-init=''
                              data-te-ripple-color='light'
                            >
                              Save changes
                            </button>
                          </form>
                        </div>

                        {/*Modal footer*/}
                        <div className='flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50'>
                          <button
                            type='submit'
                            className='inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200'
                            data-te-modal-dismiss=''
                            data-te-ripple-init=''
                            data-te-ripple-color='light'
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>

                {/* //////////////////////////////////////////// */}
              </div>
            </div>
          </div>
          
        </>
      )}

      {loading && (
        <div className='flex items-center justify-center h-screen'>
          <span className='loading loading-spinner bg-gray-500 loading-lg'></span>
        </div>
      )}

      {studioError && <Error studioError={error} />}
    </>
  )
}

export default VendorStudio
