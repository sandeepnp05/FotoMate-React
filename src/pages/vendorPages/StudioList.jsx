import React from 'react'
import Sidebar from '../../components/adminComponents/Sidebar'
import { Button } from '@material-tailwind/react'
function StudioList() {
  return (
    <>
        
      <Sidebar/>
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
               Vendor
              </th>
              <th scope='col' className='px-6 py-3 text-left'>
               City
              </th>
              <th scope='col' className='px-6 py-3 text-left'>
                View Details
              </th>
              <th scope='col' className='px-6 py-3 text-left'>
                Block
              </th>
            </tr>
          </thead>
          <tbody>
              <tr  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  
                </td>
                <td className='px-6 py-4 text-left'></td>
                <td className='px-6 py-4 text-left'></td>
                <td className='px-6 py-4 text-left'></td>
                <td className='px-6 py-4 text-left'></td>
                <td className='px-6 py-4 text-left'>
                  <Button>
                    block
                  </Button>
                </td>
              </tr>
            
          </tbody>
        </table>
        <div className='flex items-center justify-center my-12'>
          {/* <Pagination
            numbers={numbers}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          /> */}
        </div>
      </div>
    
    </>
  )
}

export default StudioList
