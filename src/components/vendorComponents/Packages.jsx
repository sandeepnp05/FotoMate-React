import React, { useEffect, useRef, useState } from 'react'
import { Modal, Ripple, initTE } from 'tw-elements'
import ReactDatePicker from 'react-datepicker'
initTE({ Modal, Ripple })

function Packages ({ packages }) {
  const [startDate, setStartDate] = useState(new Date())
  const openModal = () => {
    const modal = new Modal(document.getElementById('editPackageModal'))
    modal.show()
  }

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
              <p className='w-full border-b-2 border-neutral-100 border-opacity-100 px-6 py-3 dark:border-opacity-50'>
                Advance 20% : ₹{totalPrice * 0.2}
              </p>
              {/* modal ///////////////////////////////////////////////// */}
              <div
                data-te-modal-init=''
                className='fixed left-0 top-0 z-[1055] hidden h-full w-1/2 overflow-y-auto overflow-x-hidden outline-none'
                id='editPackageModal'
                tabIndex={-1}
                aria-labelledby='editPackageModal'
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
                        id='editPackageModal'
                      >
                        Edit Package
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
                    <div className='relative p-4'>
                
                    <input type="date" />
                    </div>
                  </div>
                </div>
              </div>
              {/* modal ///////////////////////////////////////////////// */}
              <div className='p-6'>
                <button
                  type='button'
                  onClick={openModal}
                  className='pointer-events-auto mr-5 inline-block cursor-pointer rounded text-base font-normal leading-normal text-danger transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700'
                  data-te-toggle='modal'
                  data-te-target='#editPackageModal'
                  data-te-ripple-init=''
                  data-te-ripple-color='light'
                >
                  Edit Package
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

export default Packages
