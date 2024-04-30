import React from 'react'
import { UserNavbar } from './UserNavbar'
import UserFooter from '../../components/userComponents/UserFooter'
import UserHeader from '../../components/userComponents/UserHeader'
import Gallery from '../../components/userComponents/Gallery'
import { useEffect, useState } from 'react'
import { initFlowbite } from 'flowbite'
import { filterCategories, getCategories } from '../../api/userApi'
import { useQuery } from '@tanstack/react-query'
import MainContent from '../../components/userComponents/MainContent'




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
    setSearchTerm(event.target.value);
  };
  return (
    <>
    <div className="fixed inset-0 z-0 min-h-screen w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_2px)] [background-size:16px_16px]"></div>
    <div className="relative z-10">
      <UserNavbar />
      {/* <UserHeader /> */}

      <MainContent category={category}/>

   
      <div className=" bottom-0 left-0 w-full z-50">
   
  <UserFooter />
</div>

    </div>
    </>
  )
}

export default UserHome 
