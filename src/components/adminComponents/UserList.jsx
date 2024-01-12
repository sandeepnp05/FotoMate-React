import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { blockUser, userList } from '../../api/adminApi'
import { Button } from '@material-tailwind/react'
import { toast } from 'react-toastify'
import Pagination from '../common/Pagination.jsx'

function UserList () {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const dataPerPage = 5

  useEffect(() => {
    userList()
      .then(res => {
        setUsers(res.data || [])
      })
      .catch(error => {
        toast.error(
          error.response?.data?.message || 'Failed to fetch user data'
          
        )
        console.log(error.message)
      })
  }, [])

  const handleBlockUser = async (userId, status) => {
    try {
      const res = await blockUser(userId, status)
      if (res.data.message === 'updated') {
        let updatedData = users.map(user => {
          let userData = { ...user }
          if (userData._id === userId) {
            userData.isBlocked = !status
          }
          return userData
        })
        setUsers(updatedData)
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
      console.log(error.message)
    }
  }
  const filteredData = users

  const lastIndex = currentPage * dataPerPage
  const firstIndex = lastIndex - dataPerPage
  const userInSinglePage = filteredData.slice(firstIndex, lastIndex)
  const totalPages = Math.ceil(filteredData.length / dataPerPage)
  const numbers = [...Array(totalPages + 1).keys()].slice(1)
  console.log(numbers,'numbers')
    console.log(totalPages,'totalPages')
    console.log(userInSinglePage,'userInSinglePage')
  return (
    <>
      <div className={`mx-4 overflow-x-auto `}>
        {' '}
        {/* Adjusted margin from ml-12 to ml-16 */}
        <table className='min-w-full bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3 text-left'>
                User Id
              </th>
              <th scope='col' className='px-6 py-3 text-left'>
                Name
              </th>
              <th scope='col' className='px-6 py-3 text-left'>
                Mobile
              </th>
              <th scope='col' className='px-6 py-3 text-left'>
                Email
              </th>
              <th scope='col' className='px-6 py-3 text-left'>
                Email Verified
              </th>
              <th scope='col' className='px-6 py-3 text-left'>
                Block
              </th>
            </tr>
          </thead>
          <tbody>
            {userInSinglePage.map(user => (
              <tr key={user._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  {user?._id}
                </td>
                <td className='px-6 py-4 text-left'>{user.name}</td>
                <td className='px-6 py-4 text-left'>{user.mobile}</td>
                <td className='px-6 py-4 text-left'>{user.email}</td>

                <td className='px-6 py-4 text-left'>
                  {user.isEmailVerified ? (
                    <div className='flex items-center'>
                      <div className='h-2.5 w-2.5 rounded-full bg-green-700 mr-2' />{' '}
                      Verified
                    </div>
                  ) : (
                    <div className='flex items-center'>
                      <div className='h-2.5 w-2.5 rounded-full bg-red-700 mr-2' />{' '}
                      Not Verified
                    </div>
                  )}
                </td>
                <td className='px-6 py-4 text-left'>
                  <Button
                    onClick={() => handleBlockUser(user._id, user.isBlocked)} 
                    className={
                      user.isBlocked
                        ? 'bg-red-500 text-white'
                        : 'bg-green-500 text-white'
                    }
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex items-center justify-center my-12'>
          <Pagination
            numbers={numbers}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  )
}

export default UserList
