import React from 'react'
import Sidebar from '../../components/adminComponents/Sidebar'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { adminCategoryList, unlistCategory } from '../../api/adminApi'

function CategoryList () {
  const [category, setCategories] = useState([])
  const [list,setUnlist] = useState(false)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await adminCategoryList()
        setCategories(res?.data)
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchCategories()
  }, [])

  async function handleUnlist (cat_id,status) {
    try {
      console.log('working')
      const response = await unlistCategory(cat_id,status)
      
      if (response.status === 200) {
        setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat._id === cat_id ? { ...cat, unlist: !status } : cat
        )
      );
        console.log('Category unlisted successfully')
      } else {
        console.error('Unsuccessful response status:', response.status)
      }
    } catch (error) {
      console.error('handle axiose', error)
    }
  }

  return (
    <>
      <Sidebar />
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <div className='flex justify-end mb-4'>
          <Link to='/admin/addCategory'>
            <button className='bg-blue-500 text-white px-4 py-2 mr-12 rounded-md hover:bg-blue-600'>
              Add Category
            </button>
          </Link>
        </div>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs w-full text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Category name
              </th>

              <th scope='col' className='px-6 py-3'>
                Description
              </th>
              <th scope='col' className='px-6 py-3'>
                Sub Categoryies
              </th>
            </tr>
          </thead>
          {category.map(cat => (
            <tbody key={cat._id}>
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <td
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {cat.name}
                </td>
                <td className='px-6 py-4'> {cat.description}</td>
                <td className='px-6 py-4'>
                  {' '}
                  <Link to={`/admin/subcategory/${cat._id}`}>
                    <button className='text-blue-600 dark:text-blue-500 hover:underline mx-2'>
                      view
                    </button>
                  </Link>
                </td>
                <td className='px-6 py-4 text-right'>
                  <Link to={`/admin/editCategory/${cat._id}`}>
                    <button className='text-blue-600 dark:text-blue-500 hover:underline mx-2'>
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleUnlist(cat._id,cat.unlist)}
                    className={
                      !cat.unlist
                        ? 'text-red-600 dark:text-red-500 hover:underline mx-7'
                        : 'text-green-600 hover:uncerline mx-9'
                    }
                  >
                    {!cat.unlist ? 'Unlist' : 'List'}
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  )
}

export default CategoryList
