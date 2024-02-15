import React, { useEffect, useRef } from 'react';
import { userImage } from '../../api/userApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';

function UploadWidget({ onImageUpload, isImage }) {
  const cloudinary = useRef();
  const widget = useRef();

  const upload =async(data)=>{
    try {
       await userImage(data)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    cloudinary.current = window.cloudinary;
    widget.current = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dti7ahrb6',
        uploadPreset: 'hioivxkt',
      },
      function (error, result) {
        switch (result.event) {
          case 'success':
            onImageUpload(result.info.secure_url);
            break;
          // Handle other events if needed
          default:
            break;
        }
      }
      
    );
  }, [onImageUpload]);
  
  

  return (
    <div className='flex justify-center items-center gap-2'>
      <button className='font-semibold' onClick={() => widget.current.open()}>{isImage ? "Edit Image" : "Upload Image"}</button>
      <FontAwesomeIcon icon={faCloudUpload}/>
    </div>
  );
}

export default UploadWidget;
