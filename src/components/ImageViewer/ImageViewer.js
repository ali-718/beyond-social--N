import React, { useState } from 'react';
import ImageViewer from 'react-simple-image-viewer';

export const ImageViewerComponent = ({ src, alt, className }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  return (
    <div className={`w-[150px] h-[150px] ${className}`}>
      <img src={src} alt={alt} onClick={() => setIsViewerOpen(true)} className="w-[150px] h-[150px]" />
      {isViewerOpen && (
        <div onClick={closeImageViewer} className="absolute z-20">
          <ImageViewer
            src={[src]}
            currentIndex={0}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
          />
        </div>
      )}
    </div>
  );
};
