import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { initFlowbite } from 'flowbite'
import HorizontalScroll from './HorizontalScroll'

function MainContent ({category}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const parallaxTextRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const setHeight = () => {
      if (sectionRef.current) {
        sectionRef.current.style.height = `${window.innerHeight}px`
      }
    }

    setHeight() // Set initial height

    window.addEventListener('resize', setHeight) // Update height on window resize

    return () => {
      window.removeEventListener('resize', setHeight) // Clean up event listener
    }
  }, [])

  useEffect(() => {
    const handleObserver = entries => {
      entries.forEach(entry => {
        setIsIntersecting(entry.isIntersecting)
      })
    }

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.5
    })

    if (parallaxTextRef.current) {
      observer.observe(parallaxTextRef.current)
    }

    return () => {
      if (parallaxTextRef.current) {
        observer.unobserve(parallaxTextRef.current)
      }
    }
  }, [])
  return (
    <>
      {/* Gogole Fonts */}
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
      <link
        href='https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;1,100;1,200&display=swap'
        rel='stylesheet'
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n    section {\n        font-family: "Poppins", sans-serif;\n    }\n'
        }}
      />
      {/* Page Main */}
      <main className='flex flex-col items-center justify-center mt-32'>
        {/* Hero */}
        <section
          ref={sectionRef}
          className='flex flex-wrap items-center -mx-3 font-sans px-4 w-full lg:max-w-screen-lg sm:max-w-screen-sm md:max-w-screen-md pb-20'
        >
          {/* Column-1 */}
          <div className='px-3 w-full lg:w-2/5'>
            <div className='mx-auto mb-8 max-w-lg text-center lg:mx-0 lg:max-w-md lg:text-left'>
              <h3 className='mb-4 text-2xl font-bold text-center lg:text-left lg:text-5xl'>
                Find a great{' '}
                <span className='text-2xl lg:text-5xl text-red-500 leading-relaxed'>
                  {' '}
                  photographer{' '}
                </span>{' '}
                nearby, no matter where you are.
              </h3>
              <p className='visible mx-auto mt-3 mb-0 text-sm leading-relaxed lg:text-left text-slate-400'>
                Just tell us where you want to go, pick your photographer, and
                we'll handle everything else!
              </p>
            </div>
            <div className='text-center lg:text-left'>
              <Link to={'/studios'}>
                <span className='block visible py-4 px-8 mb-4 text-xs font-semibold tracking-wide leading-none text-white bg-red-500 rounded cursor-pointer sm:mx-auto sm:mb-0 sm:inline-block sm:px-6'>
                  Get Started
                </span>
              </Link>
            </div>
          </div>
          {/* Column-2 */}
          <div className='w-full lg:w-3/5 flex justify-center sm:mt-8 lg:mt-0'>
            <img
              src='https://res.cloudinary.com/dti7ahrb6/image/upload/v1714325316/user%20assets/zchokgjsiuykbi3jamji.png'
              alt='Vector Image'
              className='max-w-full lg:max-w-md sm:max-w-xs'
            />
          </div>
        </section>

        {/* Parallax Background */}
        <section
          className='flex flex-col w-full h-[2000px] bg-cover bg-fixed bg-center justify-center items-center relative'
          style={{
            backgroundImage:
              'url(https://res.cloudinary.com/dti7ahrb6/image/upload/v1712409338/user%20assets/qb93njo2ufmfatdhonzn.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Content */}
{/* 
          <span
            ref={parallaxTextRef}
            className={`text-center font-bold my-20 text-white/90 ${
              isIntersecting ? 'animate-fade-right' : ''
            }`}
          >
            <Link
              to={''}
              className='text-white/90 hover:text-white animate-fade-right'
            >
              Convetert to SASS
            </Link>
            <hr className='my-4 border border-white animate-fade-right' />
            <Link className='text-white/90 hover:text-white animate-fade-right'>
              Image Source
            </Link>
            <hr className='my-4 border border-white text-white animate-fade-right' />
            <p>
              <Link className='text-white/90 hover:text-white animate-fade-right'>
                Source Code
              </Link>
              <span className='animate-fade-right'> | </span>
              <Link className='text-white/90 hover:text-white animate-fade-right'>
                Full Preview
              </Link>
            </p>
          </span> */}
          <HorizontalScroll category={category}/>
        </section>
        {/* Content */}
        <section className='p-20 space-y-4'>
          <h1
            className={`text-4xl text-center my-10 ${
              isIntersecting ? 'animate-fade-right' : ''
            }`}
          >
            Our Mission
          </h1>

          <span
            className={`inline-block ${
              isIntersecting ? 'animate-fade-right' : ''
            }`}
            ref={parallaxTextRef}
          >
            "Our mission is to build a vibrant community where professional
            portrait photographers can connect, collaborate, and reach a wider
            audience. We aim to disrupt the industry's limitations and create a
            more accessible marketplace where photographers have greater control
            over their work, and everyone can easily find exceptional
            photography services."
          </span>
        </section>

        <section
          className='flex flex-col w-full h-[500px] bg-cover bg-fixed bg-center justify-center items-center'
          style={{
            backgroundImage:
              'url(https://res.cloudinary.com/dti7ahrb6/image/upload/v1707722832/GalleryImages/fckj4qjftug0lsycikkg.webp)'
          }}
        >
          {/* <h1 className='text-white  text-5xl font-semibold mt-20 mb-10 animate-slidein'>
            Another Parallax Section
          </h1> */}
          {/* <span className="text-center font-bold my-20 text-slate text-opacity-50">

      Links or content for the second parallax section
    </span> */}
        </section>

        <section className='bg-white my-28 max-w-[800px] px-4 sm:px-6 md:px-8'>
          <div
            id='accordion-flush'
            data-accordion='collapse'
            data-active-classes='bg-white dark:bg-gray-900 text-gray-900 dark:text-white'
            data-inactive-classes='text-gray-500 dark:text-gray-400'
            className='w-full'
          >
            <h2 id='accordion-flush-heading-1' className='mb-2'>
              <button
                type='button'
                className='flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3'
                data-accordion-target='#accordion-flush-body-1'
                aria-expanded='true'
                aria-controls='accordion-flush-body-1'
              >
                <span className='justify-center text-center lg:text-start w-full'>
                  What is FotoMate?
                </span>
                <svg
                  data-accordion-icon=''
                  className='w-3 h-3 rotate-180 shrink-0'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 10 6'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5 5 1 1 5'
                  />
                </svg>
              </button>
            </h2>
            <div
              id='accordion-flush-body-1'
              className='hidden'
              aria-labelledby='accordion-flush-heading-1'
            >
              <div className='py-5 border-b border-gray-200 dark:border-gray-700'>
                <p className='mb-2 text-gray-500 dark:text-gray-400'>
                  Fotomate is the platform that simplifies studio bookings and
                  photography services. Find the ideal space for your shoot,
                  connect with talented
                </p>
                <p className='text-gray-500 dark:text-gray-400'>
                  Fotomate revolutionizes the way photographers find and book
                  studios.{' '}
                  <Link to={'/studios'} className='text-primary'>
                    Discover inspiring spaces,
                  </Link>{' '}
                  streamline your workflow, and collaborate with other
                  creatives.
                </p>
              </div>
            </div>
            <h2 id='accordion-flush-heading-2' className='mb-2'>
              <button
                type='button'
                className='flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3'
                data-accordion-target='#accordion-flush-body-2'
                aria-expanded='false'
                aria-controls='accordion-flush-body-2'
              >
                <span className='justify-center text-center lg:text-start w-full'>
                  Can I use Fotomate to find photographers as well?
                </span>
                <svg
                  data-accordion-icon=''
                  className='w-3 h-3 rotate-180 shrink-0'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 10 6'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5 5 1 1 5'
                  />
                </svg>
              </button>
            </h2>
            <div
              id='accordion-flush-body-2'
              className='hidden'
              aria-labelledby='accordion-flush-heading-2'
            >
              <div className='py-5 border-b border-gray-200 dark:border-gray-700'>
                <p className='mb-2 text-gray-500 dark:text-gray-400'>
                  While Fotomate's primary focus is connecting photographers
                  with amazing studio spaces, we understand the importance of
                  finding the right photographer for your project. Here's how
                  Fotomate can help:
                </p>
                <ul>
                  <li>
                    Streamlined search for photographers based on specialization
                    and location
                  </li>
                  <li>Portfolio browsing to view previous work and style</li>
                  <li>Direct messaging for inquiries and negotiations</li>
                  <li>Transparent pricing and booking process</li>
                  <li>
                    Secure payment integration for hassle-free transactions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default MainContent
