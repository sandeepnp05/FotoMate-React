import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/adminComponents/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { edit_category, singleCategory } from '../../api/adminApi'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'

function EditCategory () {
  const navigate = useNavigate()
  const [category, setCategory] = useState({})
  const [baseImage, setBaseImage] = useState('')
  const [selectedImage, setSelectedImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { cat_id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await singleCategory(cat_id)
        setCategory(res.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [cat_id])
  async function handleEdit (values) {
    try {
      setIsSubmitting(true); // Start submitting
      const { name, description } = values
      const res = await edit_category(cat_id, name, description,baseImage)
      if (res.status === 201) {
        toast.success(res.data.message)
      }
      navigate('/admin/categoryList')
    } catch (error) {
      console.log(error.message)
      toast.error('Error Editing category')
    } finally {
      setIsSubmitting(false); // Finish submitting
    }
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImageToBase(selectedFile);
    setSelectedImage(URL.createObjectURL(selectedFile));
    setBaseImage(selectedFile)

  };


  const setImageToBase = (selectedFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setBaseImage(reader.result);
    };
  };

  

  const { values, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: category.name || '',
        description: category.description || ''
      },
      onSubmit: handleEdit,
      enableReinitialize: true
    })
  return (
    <>
      <Sidebar />
      <section className='bg-white dark:bg-gray-900'>
        <div className='max-w-2xl px-4 py-8 mx-auto lg:py-16'>
          <h2 className='mb-4 text-xl font-bold text-gray-900 dark:text-white'>
            Edit Category
          </h2>
          <form onSubmit={handleSubmit}>
            <div className='grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5'>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Category Name
                </label>

                <input
                  type='text'
                  name='name'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='name'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='Write category'
                  required=''
                />
              </div>

              <div className='flex items-center space-x-6'>
                <div className='shrink-0'>
                  <img
                    id='preview_img'
                    className='h-16 w-16 object-cover'
                    src={selectedImage||category.image}
                    alt='Current profile photo'
                  />
                </div>
                <label className='block'>
                  <span className='sr-only'>Choose Category photo</span>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='block w-full text-sm text-slate-500
  file:mr-4 file:py-2 file:px-4
  file:rounded-full file:border-0
  file:text-sm file:font-semibold
  file:bg-violet-50 file:text-violet-700
  hover:file:bg-violet-100
'
                  />
                </label>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='description'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Description
                </label>
                <textarea
                  id='description'
                  name='description'
                  rows={8}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='Write category description'
                />
              </div>
            </div>
            <div className='flex items-center space-x-4'>
            <button
  type='submit'
  className={`text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 transition-colors ${
    isSubmitting
      ? 'animate-pulse inline-block relative border-transparent bg-gray-300 text-gray-300 dark:bg-gray-600 dark:text-gray-600 pointer-events-none'
      : ''
  }`}
>
  {isSubmitting ? (
    <>
      <svg
        className='animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900 dark:text-gray-400'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        ></circle>
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014.708 4.22L6.121 5.63a6 6 0 105.249 10.736l1.215 1.215A8.015 8.015 0 016 17.291z'
        ></path>
      </svg>
      Editing..
    </>
  ) : (
    'Edit'
  )}
</button>

            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default EditCategory
