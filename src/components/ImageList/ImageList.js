import React, { useRef } from 'react';
import addIcon from '../../assets/images/addIcon.png';
import redCross from '../../assets/images/redCross.png';
import { CircularProgress } from '@mui/material';
import './style.css';
import Compressor from 'compressorjs';
import { useState } from 'react';
import { FileOpen } from '@mui/icons-material';

export const ImageList = ({
  images,
  onDeleteImage,
  handleFile,
  isLoading,
  isHide = false,
  onlyCamera = false,
  isPdf,
}) => {
  const imageRef = useRef();
  const onHandle = (e) => {
    const file = e.target.files[0];
    if (isPdf) {
      handleFile(file);
      return;
    }
    new Compressor(file, {
      quality: 0.3, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.
        handleFile(compressedResult);
      },
    });
  };

  return (
    <div className="flex flex-wrap gap-6 w-full">
      {images.map((item, i) => (
        <div
          key={i}
          className="w-[100px] h-[100px] rounded border-2 border-slate-800 flex items-center justify-center cursor-pointer"
        >
          <div className="image relative">
            {item?.endsWith('.pdf') ? (
              <FileOpen fontSize="large" className="w-[95px] h-[95px] object-contain" />
            ) : (
              <img src={item} className={'w-[95px] h-[95px] object-contain'} alt={'inspect'} />
            )}
            <div onClick={() => onDeleteImage(i)} className="w-[98px] h-[98px] backDrop">
              <img src={redCross} className={'w-[30px] h-[30px] object-contain'} alt={'close'} />
            </div>
          </div>
        </div>
      ))}
      {!isHide && (
        <div
          onClick={isLoading ? () => null : () => imageRef.current.click()}
          className="w-[100px] h-[100px] rounded border-2 border-slate-800 flex items-center justify-center cursor-pointer"
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <img src={addIcon} className={'w-[30px] h-[30px] object-contain'} alt={'add'} />
          )}
        </div>
      )}
      <input
        accept={isPdf ? 'image/png, image/jpeg, application/pdf' : 'image/png, image/jpeg'}
        ref={imageRef}
        onChange={(e) => onHandle(e)}
        type={'file'}
        className={'hidden'}
        capture={onlyCamera}
      />
    </div>
  );
};
