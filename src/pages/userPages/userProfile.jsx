import React, { useRef, useState, useEffect } from 'react'
import { UserNavbar } from './UserNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-tailwind/react'
import EditIcon from '@mui/icons-material/Edit' // Import EditIcon from @mui/icons-material
import { Link, useNavigate } from 'react-router-dom'
import { getUserDetails, updateProfileImage } from '../../api/userApi.js'
import { userLogout, updateUserImage } from '../../reduxStore/slices/userSlice'
import { toast } from 'react-toastify'
import { initFlowbite } from 'flowbite'
initFlowbite()

function UserProfile () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.userReducer)
  const { _id } = user
  const [img, setImg] = useState('')
  const [render, setRender] = useState(false)
  const [userImage, setUserImage] = useState(null)

  const handlePhotoChange = e => {
    const selectedPhoto = e.target.files[0]
    setPhotoToBase(selectedPhoto)
  }

  const setPhotoToBase = file => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImg(reader.result)
    }
  }
  useEffect(() => {})
  const handleImageUpdate = async () => {
    try {
      if (img) {
        const res = await updateProfileImage({ _id, img })
        const user = res.data
        console.log(res.data)
        setRender(true)
      }
    } catch (error) {
      console.error('Error editing photo:', error)
    }
  }

  useEffect(() => {
    handleImageUpdate()
  }, [img])

  useEffect(() => {
    setRender(false)
    getUserDetails(_id).then(response => {
      console.log(response, 'reds')
      setUserImage(response?.data?.userData?.profileImage)
      dispatch(updateUserImage(response?.data?.userData?.profileImage))
    })
  }, [render, dispatch])

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    dispatch(userLogout())
    toast.success('Logout successfully')
    navigate('/login')
  }

  return (
    <>
      <UserNavbar userImage={userImage} />
      <div className='flex flex-row w-full mx-auto mt-36 justify-center'>
        <div className='p-6 w-full  md:w-1/2 max-auto w-ful'>
          <form className='flex flex-col gap-4'>
            <div className='relative self-center mt-2'>
              <>
                <div className='h-24 w-24 bg-blue-500 rounded-full overflow-hidden border mb-4 md:mb-0 md:mr-4'>
                  <label htmlFor='fileInput'>
                    <input
                      type='file'
                      id='fileInput'
                      accept='image/*'
                      style={{ display: 'none' }}
                      onChange={handlePhotoChange}
                    />
                    <img
                      className='h-full w-full object-cover'
                      src={
                        userImage ||
                        'https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1'
                      }
                      alt='Profile'
                    />
                  </label>
                </div>
                <div className='absolute bottom-1 right-7 cursor-pointer'>
                  <EditIcon fontSize='small' style={{ color: 'white' }} />
                </div>
              </>
            </div>
            <input
              type='text'
              placeholder='username'
              value={user.name}
              id='username'
              className='border p-3 rounded-lg'
            />
            {/* <input
            type='email'
            placeholder='email'
            value={user.email}
            id='email'
            className='border p-3 rounded-lg'
          /> */}
            <input
              type='number'
              placeholder='phone'
              value={user.mobile}
              id='mobile'
              className='border p-3 rounded-lg'
            />
            {/* <input
            type='text'
            placeholder='password'
            id='username'
            className='border p-3 rounded-lg'
          /> */}
            <Button type='button'>Update</Button>
          </form>
          <div className='flex justify-between mt-5'>
            <Link to={'/viewProfile'}>
              <span className='text-red-700'>View Profile</span>
            </Link>
            <Link to='/login'>
              <span className='text-red-700' onClick={handleLogout}>
                Sign out
              </span>
            </Link>
          </div>
        </div>
       
      </div>
    </>
  )
}

export default UserProfile
