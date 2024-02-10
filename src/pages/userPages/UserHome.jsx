import React from 'react'
import { UserNavbar } from './UserNavbar'
import UserFooter from '../../components/userComponents/UserFooter'
import UserHeader from '../../components/userComponents/UserHeader'
import Gallery from '../../components/userComponents/Gallery'
import { useEffect, useState } from 'react'
import { initFlowbite } from 'flowbite'
import { filterCategories, getCategories } from '../../api/userApi'
import { useQuery } from '@tanstack/react-query'




function UserHome () {
  const [catFilter, setCatFilter] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    initFlowbite();
  }, []);
  
  const {
    data: category,
    isLoading,
    error
  } = useQuery({ queryKey: ['categories'], queryFn: getCategories })
  console.log(category, 'category')

  const {
    data: filteredStudios,
    isLoading: studiosLoading,
    error: studiosError,
  } = useQuery({
    queryKey: ['studios', name, debouncedSearchTerm],
    queryFn: () => filterCategories(name, debouncedSearchTerm),
    enabled: !!name || !!debouncedSearchTerm,
  });
  useEffect(() => {
    if (!studiosLoading && !studiosError && filteredStudios) {
      const catId = filteredStudios.map((studio) => studio._id);
      setCatFilter(catId);
    }
  }, [studiosLoading, studiosError, filteredStudios]);

  const handleCatFilter = (name) => {
    setName(name);
    setSelectedCategory(name);
  };

  const handleSearchTerm = (event) => {
    console.log('Search Term:', event.target.value);
    setSearchTerm(event.target.value);
  };
  console.log(catFilter, 'catfilter')
  return (
    <div>
      <UserNavbar />
      <UserHeader />

      <form className='mt-20 px-14'>
        <div className='flex'>
          <button
            id='dropdown-button'
            data-dropdown-toggle='dropdown'
            className='flex-shrink-0 z-0 inline-flex items-center py-2.5 px-12   text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600'
            type='button'
          >
          {selectedCategory} {' '}
            <svg
              className='w-2.5 h-2.5 ms-2.5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 10 6'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='m1 1 4 4 4-4'
              />
            </svg>
          </button>
          <div
            id='dropdown'
            className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700'
          >
            {category &&
              category.map(cat => (
                <ul
                  className='py-2 text-sm text-gray-700 dark:text-gray-200'
                  aria-labelledby='dropdown-button'
                  key={cat._id}
                >
                  <li>
                    <button
                      onClick={() => handleCatFilter(cat.name)}
                      type='button'
                      className='inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                    >
                      {cat.name}
                    </button>
                  </li>
                </ul>
              ))}
          </div>
          <div className='relative w-full'>
            <input
              type='search'
              onChange={handleSearchTerm}
              id='search-dropdown'
              className='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-red-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500'
              placeholder='Search studios...'
              required=''
            />
            <button
              type='submit'
              className='absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-red-700 rounded-e-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              <svg
                className='w-4 h-4'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
              <span className='sr-only'>Search</span>
            </button>
          </div>
        </div>
      </form>

      <div className='mt-12'>
        <Gallery catId={catFilter} />
      </div>
      <UserFooter />
    </div>
  )
}

export default UserHome
