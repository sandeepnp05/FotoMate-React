import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { vendorList as studioList, blockVendor,blockStudio } from '../../api/adminApi.js'
import { Button } from '@material-tailwind/react'
import { toast } from 'react-toastify'
import Pagination from '../../components/common/Pagination.jsx'
import Sidebar from '../../components/adminComponents/Sidebar'
function StudioList () {
  const [studio, setStudio] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [studioData, setStudioData] = useState([]);
  const navigate = useNavigate()
  const dataPerPage = 5

  useEffect(() => {
    studioList()
      .then(res => {
        setStudio(res.data || [])
      })
      .catch(error => {
        toast.error(
          error.response?.data?.message || 'Failed to fetch studio data'
        )
        console.log(error.message)
      })
  }, [studioData])

  const handleBlockStudio = async (studioId, status) => {
    try {
      const res = await blockStudio(studioId, status);
  
      if (res.status === 201 && res.data.message === 'updated') {
        // Assuming studioData is the state holding studio information
        const updatedData = studioData.map((studio) => {
          if (studio.studioInfo._id === studioId) {
            return {
              ...studio,
              isBlocked: !status,
            };
          }
          return studio;
        });
  
        // Assuming setStudioData is a function to update the studio information in the state
        setStudioData(updatedData);
        toast.success(`Studio ${status ? 'unblocked' : 'blocked'} successfully`);
      } else {
        toast.error('Failed to update studio status');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Error updating studio status'
      );
      console.log(error.message);
    }
  };
  
  console.log(studio, 'studio')
  const filteredData = studio

  const lastIndex = currentPage * dataPerPage
  const firstIndex = lastIndex - dataPerPage
  const studioInSinglePage = filteredData.slice(firstIndex, lastIndex)
  const totalPages = Math.ceil(filteredData.length / dataPerPage)
  const numbers = [...Array(totalPages + 1).keys()].slice(1)
  return (
    <>
      <Sidebar />
      <div className={`mx-4 overflow-x-auto `}>
        {' '}
        {/* Adjusted margin from ml-12 to ml-16 */}
        <table className='min-w-full bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3 text-left'>
                Studio Id
              </th>
              <th scope='col' className='px-6 py-3 text-left'>
                Studio Name
              </th>
              <th scope='col' className='px-6 py-3 text-left'>
                City
              </th>
              <th scope='col' className='px-6 py-3 text-left'>
                Rating
              </th>
              <th scope='col' className='px-6 py-3 text-left'>
                About
              </th>
              <th scope='col' className='px-6 py-3 text-left'>
                Block
              </th>
              <th scope='col' className='px-6 py-3 text-left'>
                Cover Image
              </th>
            </tr>
          </thead>
          <tbody>
            {studioInSinglePage.map(studio => (
              <tr
                key={studio._id}
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 group'
              >
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  {studio?._id}
                </td>
                <td className='px-6 py-4 text-left'>
                  {studio.studioInfo.studioName}
                </td>
                <td className='px-6 py-4 text-left'>
                  {studio.studioInfo.city}
                </td>
                <td className='px-6 py-4 text-left'> </td>
                <td className='px-6 py-4 text-left'>
                  {studio.studioInfo.description}
                </td>

                <td className='px-6 py-4 text-left'>
                  {studio.studioInfo.isVerified ? (
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
                    onClick={() =>
                      handleBlockStudio(
                        studio.studioInfo._id,
                        studio.studioInfo.isBlocked
                      )
                    }
                    className={`absolute  group-hover:opacity-100 transition-opacity duration-200 ease-in-out ${
                      studio.studioInfo.isBlocked
                        ? 'bg-red-500 text-white'
                        : 'bg-green-500 text-white'
                    }`}
                  >
                    {studio.studioInfo.isBlocked ? 'Unblock' : 'Block'}
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

export default StudioList
