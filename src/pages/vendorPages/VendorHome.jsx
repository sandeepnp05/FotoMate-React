import React, { useEffect } from 'react'
import VendorNavbar from '../../components/vendorComponents/vendorCommon/VendorNavbar'
import VendorHero from '../../components/vendorComponents/home/VendorHero'
import { useLocation } from 'react-router-dom'

function VendorHome() {
  const location = useLocation()
  const {studio} = location.state ?? {};
  useEffect(() => {
    if (studio) {
      localStorage.setItem('studio', JSON.stringify(studio));
    }
  }, [studio]);
  
  return (
    <>
      <VendorNavbar/>
      <VendorHero studio = {studio}/>
    </>
  )
}

export default VendorHome
