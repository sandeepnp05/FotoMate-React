import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { showVendorStudio } from '../../api/vendorApi';
import VendorNavbar from '../../components/vendorComponents/vendorCommon/VendorNavbar';
import Loading from '../../components/common/Loading';

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
    console.log(studio,'studio')
  return (
    
    <>
<VendorNavbar></VendorNavbar>
{studio && (
  <>
  <div className='relative w-screen h-screen'>
      <div className='absolute top-0 left-0 w-full h-full'>
        <img className='object-cover w-full h-full' src={studio.coverImage} alt="Studio Cover" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-9 text-white">
          <h2 className="text-5xl font-bold mb-5">{studio.studioName}</h2>
          <p className="mb-2 font-semibold">City: {studio.city}</p>
          <p className="mb-2">{studio.description}</p>
          <div className="flex justify-end mt-5">
            {/* <button className="btn btn-primary">Edit cover image</button> */}
          </div>
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
            src={studio.galleryImages[1]}
          />
        </div>
        <div className="w-full p-1 md:p-2">
          <img
            alt="gallery"
            className="block h-full w-full rounded-lg object-cover object-center"
            src={studio.galleryImages[2]}
          />
        </div>
      </div>
      <div className="flex w-1/2 flex-wrap">
        <div className="w-full p-1 md:p-2">
          <img
            alt="gallery"
            className="block h-full w-full rounded-lg object-cover object-center"
            src={studio.galleryImages[3]}
          />
        </div>
        <div className="w-1/2 p-1 md:p-2">
          <img
            alt="gallery"
            className="block h-full w-full rounded-lg object-cover object-center"
            src={studio.galleryImages[4]}
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

 {loading &&  <div className="flex items-center justify-center h-screen">
        <Loading/>
      </div>}
 {error && <p>Error fetching studio information</p>}

</>

  );
}

export default VendorStudio;
