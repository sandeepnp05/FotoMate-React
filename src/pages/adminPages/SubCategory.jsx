import React from 'react';
import Sidebar from '../../components/adminComponents/Sidebar';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import {subcategories } from '../../api/adminApi';

function SubCategory() {
    const [subCategory,setSubCategories] = useState([])
    const {id} = useParams()
    useEffect(() => {
        const fetchSubCategories = async () => {
          try {
            const res = await subcategories(id);
            console.log(res,'res')
            setSubCategories(res?.data);
          } catch (error) {
            console.log(error.message);
          }
        };
    
        fetchSubCategories();
      }, []);
     
  return (
    <>
      <Sidebar />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-end mb-4">
          <Link to={`/admin/addSubCategory/${id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 mr-12 rounded-md hover:bg-blue-600">
              Add Sub category
            </button>
          </Link>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-center w-full text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th></th>
              <th scope="col" className="px-6 py-3">
                Category name
              </th>
              
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              
              <th scope="col" className="px-6 py-3">
                
              </th>
             
            </tr>
          </thead>
         {subCategory.map(cat=>(       
          <tbody className='text-xs w-full justify-around'>
            <tr className="bg-white border-black text-center dark:bg-gray-800 dark:border-gray-700">
              <td>
              <div className="avatar">
  <div className="w-24 rounded">
    <img src={cat.image} />
  </div>
</div>
              </td>
              <td>{cat.description}</td>
              <td>{cat.name}</td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
              
             
                
                  <button className="text-blue-600 dark:text-blue-500 hover:underline mx-2">
                    Edit
                  </button>
                
                <button className="text-red-600 dark:text-red-500 hover:underline mx-2">
                  Unlist
                </button>
              </td>
            </tr>
          </tbody>
            ))} 
        
        </table>
      </div>
    </>
  );
}

export default SubCategory;
