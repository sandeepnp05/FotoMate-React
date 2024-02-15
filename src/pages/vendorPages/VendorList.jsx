import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { vendorList, blockVendor } from '../../api/adminApi.js'
import { Button } from '@material-tailwind/react'
import { toast } from 'react-toastify'
import Pagination from '../../components/common/Pagination.jsx'
import Sidebar from '../../components/adminComponents/Sidebar'
function VendorList () {
  const [vendors, setVendors] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const dataPerPage = 5

  useEffect(() => {
    vendorList()
      .then(res => {
        setVendors(res.data || [])
      })
      .catch(error => {
        toast.error(
          error.response?.data?.message || 'Failed to fetch vendor data'
        )
        console.log(error.message)
      })
  }, [])

  const handleBlockVendor = async (vendorId, status) => {
    try {
      const res = await blockVendor(vendorId, status)

      if (res.data && res.data.message === 'updated') {
        // If the response has data and the message is 'updated'
        const updatedData = vendors.map(vendor => {
          if (vendor._id === vendorId) {
            // Update only the targeted vendor's isBlocked status
            return {
              ...vendor,
              isBlocked: !status
            }
          }
          return vendor
        })
        setVendors(updatedData)
        toast.success(`Vendor ${status ? 'unblocked' : 'blocked'} successfully`)
      } else {
        toast.error('Failed to update vendor status')
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Error updating vendor status'
      )
      console.log(error.response)
    }
  }

  const filteredData = vendors

  const lastIndex = currentPage * dataPerPage
  const firstIndex = lastIndex - dataPerPage
  const vendorInSinglePage = filteredData.slice(firstIndex, lastIndex)
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
                Vendor Id
              </th>
              <th scope='col' className='px-6 py-3 text-left'>
                Vendor Name
              </th>
              <th scope='col' className='px-6 py-3 text-left'>
                studio
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
            {vendorInSinglePage.map(vendor => (
              <tr
                key={vendor._id}
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 group'
              >
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  {vendor?._id}
                </td>
                <td className='px-6 py-4 text-left'>{vendor.name}</td>
                <td className='px-6 py-4 text-left'>
                  {vendor.studioInfo.studioName}
                </td>
                <td className='px-6 py-4 text-left'>{vendor.mobile}</td>
                <td className='px-6 py-4 text-left'>{vendor.email}</td>

                <td className='px-6 py-4 text-left'>
                  {vendor.isVerified ? (
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
                  <div className='relative'>
                    <Button
                      onClick={() =>
                        handleBlockVendor(vendor._id, vendor.isBlocked)
                      }
                      className={`absolute transition-opacity duration-200 ease-in-out ${
                        vendor.isBlocked
                          ? 'bg-red-500 text-white opacity-100'
                          : 'bg-green-500 text-white opacity-100'
                      }`}
                    >
                      {vendor.isBlocked ? 'Unblock' : 'Block'}
                    </Button>
                  </div>
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

export default VendorList
