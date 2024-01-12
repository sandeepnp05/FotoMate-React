import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { vendorLogout } from '../../../reduxStore/slices/vendorSlice';
import { toast } from 'react-toastify';

function VendorNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.vendorReducer.vendor);
  const vendorId = _id;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('vendorToken');
    localStorage.removeItem('studio');
    dispatch(vendorLogout());
    toast.success('Vendor logout successfully');
    navigate('/vendor/login');
  };

  return (
    <div className={`navbar bg-base-100 ${isMobile ? 'mobile-view' : ''}`}>
      <div className='navbar-start justify-between'>
        {isMobile ? (
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h7' />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm  dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <Link to={'/vendor'}>Homepage</Link>
              </li>
              <li>
                <Link to={`/vendor/studio/${vendorId}`}>Studio</Link>
              </li>
              {/* <li style={{ cursor:'pointer' }}>
                <Link to={'/about'}> About</Link>
              </li>
              <li  onClick={() => handleLogout()}>
               <Link>Logout </Link>
              </li> */}
            </ul>
          </div>
        ) : (
          <div className='flex items-center justify-end'>
            <div className='navbar-item p-3'>
              <Link to={'/vendor'}>Home</Link>
            </div>
            <div className='navbar-item p-3'>
              <Link to={`/vendor/studio/${vendorId}`}>Studio</Link>
            </div>
            <div className='navbar-item p-3'>
              <Link >About</Link>
            </div>
            
            <div className='navbar-item p-3' onClick={() => handleLogout()}>
              <Link >Logout</Link>
              </div>
          </div>
        )}
      </div>
      <div className='navbar-center'>
        <a className='btn btn-ghost text-xl'>FotoMate</a>
      </div>
      <div className='navbar-end'>
        <button className='btn btn-ghost btn-circle'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
        </button>
        <button className='btn btn-ghost btn-circle'>
          <div className='indicator'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
              />
            </svg>
            <span className='badge badge-xs badge-primary indicator-item'></span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default VendorNavbar;
