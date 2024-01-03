import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { showVendorStudio } from '../../api/vendorApi';
import VendorNavbar from '../../components/vendorComponents/vendorCommon/VendorNavbar';

function VendorStudio() {
  const { _id } = useSelector((state) => state.vendorReducer.vendor);
  const vendorId = _id;
  const [studio, setStudio] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchStudio = async () => {
      try {
        const studioData = await showVendorStudio(vendorId);
        setLoading(false);
        setStudio(studioData.data.studio);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.error('Error fetching studio:', error);
      }
    };

    fetchStudio();
  }, [vendorId]);

  return (
    // <div>
    //  
    //   {studio && (
    //     <>
    //       <p>Studio Name: {studio.studioName}</p>
    //       <img src={studio.coverImage} alt="Studio Cover" />
    //     </>
    //   )}
    //   {error && <p>Error fetching studio information</p>}
    // </div>
    <>
<VendorNavbar></VendorNavbar>
{studio && (
  <>
    <div className='relative w-screen h-screen'>
      <img className='object-cover w-screen h-screen' src={studio.coverImage} alt="Studio Cover" />
      <div className="absolute bottom-0 left-0 p-5">
        <h2 className="text-5xl font-bold mb-5 text-white">{studio.studioName}</h2>
        <p className="mb-2 font-semibold text-white">City: {studio.city}</p>
        <p className="mb-2 text-white">{studio.description}</p>
        <div className="flex justify-end mt-5">
          <button className="btn btn-primary">Edit cover image</button>
        </div>
      </div>
    </div>
    <p className='text-3xl font-bold mb-4 mt-20 lg:ml-36 xl:ml-12' >Gallery Images</p>
    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
    <div className="-m-1 flex flex-wrap md:-m-2">
      <div className="flex w-1/2 flex-wrap">
        <div className="w-1/2 p-1 md:p-2">
          <img
            alt="gallery"
            className="block h-full w-full rounded-lg object-cover object-center"
            src={studio.galleryImages[0]}
          />
        </div>
        <div className="w-1/2 p-1 md:p-2">
          <img
            alt="gallery"
            className="block h-full w-full rounded-lg object-cover object-center"
            src={studio.galleryImages[2]}
          />
        </div>
        <div className="w-full p-1 md:p-2">
          <img
            alt="gallery"
            className="block h-full w-full rounded-lg object-cover object-center"
            src={studio.galleryImages[3]}
          />
        </div>
      </div>
      <div className="flex w-1/2 flex-wrap">
        <div className="w-full p-1 md:p-2">
          <img
            alt="gallery"
            className="block h-full w-full rounded-lg object-cover object-center"
            src={studio.galleryImages[0]}
          />
        </div>
        <div className="w-1/2 p-1 md:p-2">
          <img
            alt="gallery"
            className="block h-full w-full rounded-lg object-cover object-center"
            src={studio.galleryImages[1]}
          />
        </div>
        <div className="w-1/2 p-1 md:p-2">
          <img
            alt="gallery"
            className="block h-full w-full rounded-lg object-cover object-center"
            src={studio.galleryImages[3]}
          />
        </div>
      </div>
    </div>
  </div>
  </>
)}

 {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
 {error && <p>Error fetching studio information</p>}

</>

  );
}

export default VendorStudio;
