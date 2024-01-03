import React, { useRef, useState ,useEffect} from 'react'
import { UserNavbar } from './UserNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-tailwind/react'
import EditIcon from '@mui/icons-material/Edit'
import { Link, useNavigate } from 'react-router-dom'

function userProfile () {
  const [file, setFile] = useState('')
  const [profileImage, setProfileImage] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fileRef = useRef(null)
  const { user } = useSelector(state => state.userReducer)
  useEffect(() => {
    setProfileImage(user.profileImage);
  }, [user.profileImage]);

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    dispatch(userLogout())
    toast.success('Logout successfully')
    navigate('/login')
  }

  const handleImageError = () => {
    setProfileImage('path/to/https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'); // Provide a fallback image
  };

  return (
    <>
      <UserNavbar></UserNavbar>
      <div className='p-3 max-w-lg max-auto mt-24'>
        <form className='flex flex-col gap-4'>
          <div className='relative self-center mt-2'>
            {' '}
            {/* Add relative position here */}
            <img
              onClick={() => fileRef.current.click()}
              src={user.profileImage}
              alt='Profile'
              className='rounded-full h-24 w-24 object-cover cursor-pointer'
              onError={handleImageError}
            />
            <div className='absolute bottom-1 right-7 cursor-pointer'>
              <EditIcon fontSize='small' style={{ color: 'white' }} />
            </div>
          </div>

          <input type='file' ref={fileRef} hidden accept='image/*' />
          <input
            type='text'
            placeholder='username'
            id='username'
            defaultValue={user.name}
            className='border p-3 rounded-lg'
          />
          <input
            type='text'
            placeholder='email'
            id='email'
            defaultValue={user.email}
            className='border p-3 rounded-lg'
          />
          <input
            type='text'
            placeholder='password'
            id='username'
            className='border p-3 rounded-lg'
          />
          <Button type='button'>Update</Button>
        </form>
        <div className='flex justify-between mt-5'>
          <span className='text-red-700'>Delete Account</span>
          <Link to={handleLogout}>
            <span className='text-red-700'>Sign out</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default userProfile
