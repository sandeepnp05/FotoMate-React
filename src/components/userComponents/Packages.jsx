import React, { useEffect, useRef, useState } from 'react';
import { Modal, Ripple, initTE } from 'tw-elements';
import ReactDatePicker from 'react-datepicker';
import { useFormik } from 'formik';
import { bookingPackage } from '../../api/userApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Multiselect from 'multiselect-react-dropdown';


function Packages({ packages, cities }) {
  const navigate = useNavigate();
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { user } = useSelector(state => state.userReducer);
  const { _id } = user;


  useEffect(() => {     
    initTE({ Modal, Ripple });          
  }, []);
  const openModal = packageId => {
    setSelectedPackageId(packageId);
    setIsModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const onSubmit = async () => {
    try {
      const res = await bookingPackage({
        ...values,
        packageId: selectedPackageId,
        userId: _id
      });
      if (res.status === 200) {
        const responseData = res.data;
       closeModal()
        navigate(`/checkout`, {
          state: { responseData, ...values }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  

  const { handleChange, handleBlur, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        date: '',
        place: '',
        selectedPlace: []
      },
      validationSchema: Yup.object({
        date: Yup.date()
          .required('Please select a date')
          .min(new Date(), 'Date must be in the future'),
        place: Yup.string().required('Please select a place')
      }),
      onSubmit
    });

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  sm:gap-4 sm:px-6 mb-6  px-8 md:px-10 lg:px-12'>
        {packages.map(packageItem => {
          // Calculate the total price
          const totalPrice = packageItem.services.reduce(
            (total, service) => total + service.price,
            0
          )

          return (
            <div
              key={packageItem._id}
              className='my-10 block max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'
            >
              <div className='relative overflow-hidden bg-cover bg-no-repeat'>
                <img
                  className='w-full h-48 object-cover rounded-t-lg'
                  src={packageItem.image}
                  alt=''
                />
              </div>
              <div className='p-6'>
                <h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
                  {packageItem.name}
                </h5>
                <p className='text-base text-neutral-600 dark:text-neutral-200'>
                  {packageItem.description}
                </p>
              </div>
              <ul className='w-full'>
                <li className='w-full border-b-2 border-neutral-100 border-opacity-100 px-6  dark:border-opacity-50'></li>
                {packageItem.services.map((service, index) => (
                  <li
                    key={index}
                    className='w-full border-b-2 border-neutral-100 border-opacity-100 px-6 py-3 dark:border-opacity-50'
                  >
                    {`${service.serviceName} :  ₹${service.price}`}
                  </li>
                ))}
              </ul>
              <p className='w-full border-b-2 border-neutral-100 border-opacity-100 px-6 py-3 dark:border-opacity-50'>{`Total amount :  ₹${totalPrice}`}</p>
              {/* <p className='w-full border-b-2 border-neutral-100 border-opacity-100 px-6 py-3 dark:border-opacity-50'>
                Advance : ₹{totalPrice * 0.2}
              </p> */}
              <p className='px-6 text-xs py-3'>
                Pay 20% for advance and book the date
              </p>
              {/* modal ///////////////////////////////////////////////// */}
              {isModalOpen && (
                <div
                  data-te-modal-init=''
                  className='fixed px-6 left-0 top-20 z-[1055] hidden h-full w-full md:w-1/2 overflow-y-auto overflow-x-hidden outline-none'
                  id='bookingModal'
                  tabIndex={-1}
                  aria-labelledby='bookingModal'
                  aria-modal='true'
                  role='dialog'
                >
                  <div
                    data-te-modal-dialog-ref=''
                    
                    className='pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px]'
                  >
                    <div className='pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600'>
                      <div className='flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50'>
                        {/*Modal title*/}
                        <h5
                          className='text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200'
                          id='bookingModal'
                        >
                          Book the studio
                        </h5>
                        {/*Close button*/}
                        <button
                          type='button'
                          className='box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none'
                          data-te-modal-dismiss=''
                          aria-label='Close'
                          id='bookingModal'
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
                      <form onSubmit={handleSubmit} className='p-4 md:p-5'>
                        <div className='grid gap-4 mb-4 grid-cols-2'>
                          <div className='col-span-2'>
                            <label
                              htmlFor='packageName'
                              className='block my-1 text-sm font-medium text-gray-900 dark:text-white'
                            >
                              Pick a date
                            </label>
                            <input
                              type='date'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              id='date'
                              className={`input input-bordered w-full bg-blue-gray-50 ${
                                errors.date && touched.date ? 'input-error' : ''
                              }`}
                              placeholder='Pick a date'
                              required=''
                              min={new Date().toISOString().split('T')[0]}
                            />

                            <label
                              htmlFor='place'
                              className='block mt-3 text-sm font-medium text-gray-900 dark:text-white'
                            >
                              Place
                            </label>
                            <select
                              name='place'
                              id='place'
                              value={values.place}
                              onChange={handleChange}
                              className='input input-bordered w-full bg-blue-gray-50'
                            >
                              {cities.map((city, index) => (
                                <option
                                  value={city}
                                  key={index}
                                  className='optionClass'
                                >
                                  {city}
                                </option>
                              ))}
                            </select>
                            <label
                              htmlFor='place'
                              className='block mt-3 text-sm font-medium text-gray-900 dark:text-white'
                            >
                              Advance amount
                            </label>
                            <input
                              type='text'
                              id='disabled-input-2'
                              aria-label='disabled input 2'
                              className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              value={`₹ ${totalPrice * 0.2}`}
                              disabled
                              readOnly
                            ></input>
                            <button
                              type='submit'
                              className='mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
              {/* modal ///////////////////////////////////////////////// */}
              <div className='p-6'>
                <button
                  type='button'
                  onClick={() => openModal(packageItem._id)}
                  className='pointer-events-auto mr-5 inline-block cursor-pointer rounded text-base font-normal leading-normal text-success transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700'
                  data-te-toggle='modal'
                
                  data-te-target='#bookingModal'
                  data-te-ripple-init=''
                  data-te-ripple-color='light'
                >
                  Book now
                </button>
                {/* <a
                  type='button'
                  href='#'
                  className='pointer-events-auto inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700'
                >
                  Enquire pricing
                </a> */}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Packages;
