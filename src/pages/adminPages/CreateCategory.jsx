import React from 'react';
import Sidebar from '../../components/adminComponents/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { addCategory } from '../../api/adminApi';
import { useFormik } from 'formik';

function CreateCategory() {
  const navigate = useNavigate();

  async function onSubmit() {
    try {
      const res = await addCategory(values);
      if (res.data.category) {
        navigate('/admin/categoryList');
      } else {
        
        toast.error(res.data.message);
      }
      
    } catch (error) {
     
      toast.message(res?.data?.message)

    }
  }

  const {
    errors,
    values,
    handleBlur,
    handleChange,
    handleSubmit, 
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    onSubmit,
  });

  return (
    <>
      <Sidebar />
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add Category
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category Name
                </label>

                <input
                  type="text"
                  name="name" 
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Category Name"
                  required=""
                />
                 {errors.name && touched.name && (
                    <p className='text-red-500 '>{errors.name}</p>
                  )}
              </div>
              
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description" // Added name attribute
                  rows={8}
                  value={values.description} // Added value attribute
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write Category description here..."
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
          
              <button
                type="submit" 
                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default CreateCategory;
