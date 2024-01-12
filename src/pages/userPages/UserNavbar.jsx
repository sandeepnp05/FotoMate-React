import React, { useEffect } from 'react'
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Card
} from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { userLogout } from '../../reduxStore/slices/userSlice'
import { toast } from 'react-toastify'
import { getUserDetails } from '../../api/userApi'

export function UserNavbar ({userImage}) {
  const [openNav, setOpenNav] = useState(false)
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [img,setImage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useSelector(state => state.userReducer)
 

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    dispatch(userLogout())
    toast.success('Logout successfully')
    navigate('/login')
  }
  useEffect(()=>{
    setImage(userImage)
  },[userImage])


  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen)
  }

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
  }, [])

  const navList = (
    <ul className='mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      <Link to='/'>
        <Typography
          as='li'
          variant='small'
          color='blue-gray'
          className='p-1 font-normal'
        >
          HOME
        </Typography>
      </Link>
      <Link to={'/studios'}>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
       STUDIOS
      </Typography>
      </Link>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
          IDEAS
      </Typography>
      <Link to='/contact'>
        <Typography
          as='li'
          variant='small'
          color='blue-gray'
          className='p-1 font-normal'
        >
            CONTACT
        </Typography>
      </Link>

      {user && (
        <div className='flex items-center'>
          <div className='relative'>
            <div className='avatar cursor-pointer' onClick={toggleDropdown}>
              <div className='w-6 mx-2 rounded-full ring ring-danger ring-offset-base-1 ring-offset-1'>
                <img
                  src={img?img:user.profileImage}
                  alt='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                />
              </div>
            </div>

            {isDropdownOpen && (
              <div className='dropdown-top absolute left-0 bg-white p-2 rounded-md shadow-lg w-22'>
                <ul className='space-y-1'>
                  <li className='px-2 py-1 hover:bg-gray-100'>
                    <Link
                      to={'/profile'}
                      className='text-gray-900 text-sm font-medium block'
                    >
                      Profile
                    </Link>
                  </li>
                  <li
                    className='px-2 py-1 hover:bg-gray-100'
                    onClick={() => handleLogout()}
                  >
                    <a
                      href='#'
                      className='text-gray-900 text-sm font-medium block'
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </ul>
  )

  return (
    <div className='px-6'>
      <div className='-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll'>
        <Navbar className='fixed top-0 z-10 w-full h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4'>
          <div className=' flex items-center justify-between text-blue-gray-900'>
            <Link to={'/'}>
              <Typography
                className='mr-4 cursor-pointer px-9 py-1.5 text-2xl font-bold'
              >
                FotoMate
              </Typography>
            </Link>
            <div className='flex items-center gap-4'>
              <div className='mr-4 hidden  lg:block'>{navList}</div>
              {!user && (
                <Link to='/login'>
                  <div className='flex items-center gap-x-1'>
                    <Button
                      variant='gradient'
                      size='sm'
                      className='hidden lg:inline-block'
                    >
                      <span>Sign in</span>
                    </Button>
                  </div>
                </Link>
              )}
              <IconButton
                variant='text'
                className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    className='h-6 w-6'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
          <Collapse open={openNav}>
            {navList}
            {user ? (
              // If the user is logged in, show the "Log Out" button
              <Button
                fullWidth
                variant='gradient'
                size='sm'
                onClick={() => handleLogout()}
              >
                <span>Log Out</span>
              </Button>
            ) : (
              // If the user is not logged in, show the "Log In" and "Sign Up" buttons
              <>
                <Link to='/login'>
                  <Button fullWidth variant='text' size='sm'>
                    <span>Log In</span>
                  </Button>
                </Link>
                <Link to='/signup'>
                  <Button fullWidth variant='gradient' size='sm'>
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </>
            )}
          </Collapse>
        </Navbar>
      </div>
    </div>
  )
}
