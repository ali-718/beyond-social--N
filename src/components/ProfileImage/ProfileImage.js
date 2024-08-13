import React, { useRef, useState } from 'react';
import profileImage from '../../assets/images/addProfileImage.png';
import { useApiHook } from 'src/hooks/apiHook';
import { imageSize, imageUploadBlobStorageUrl } from 'src/utils/constants';
import { useDispatch } from 'react-redux';
import { onOpenAlertAction } from 'src/redux/AlertRedux';
import { useEffect } from 'react';
import person from 'src/assets/images/person_placeholder.png';
import { CircularProgress } from '@mui/material';

export const ProfileImage = ({ profileImage = '', setProfileImage }) => {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const dispatch = useDispatch();
  const imageRef = useRef();

  const onHandle = (e) => {
    setIsLoadingImage(true);
    const file = e.target.files[0];

    if (file.size > imageSize) {
      dispatch(onOpenAlertAction({ message: 'Image size should not be greater than 5mb', type: 'error' }));
      return;
    }
    let formData = new FormData();

    formData.append('blob', file);
    apiCallForImage(formData)
      .then((res) => {
        setProfileImage(res);
        setIsLoadingImage(false);
      })
      .catch(() => {
        setIsLoadingImage(false);
      });
  };

  const { isLoading, apiCall: apiCallForImage } = useApiHook({
    method: 'post',
    call: imageUploadBlobStorageUrl,
  });

  return (
    <div>
      {isLoadingImage ? (
        <div class="w-32 h-32 object-cover rounded-full border-2 flex items-center justify-center">
          <CircularProgress color="warning" />
        </div>
      ) : (
        <img
          class="w-32 h-32 object-cover rounded-full border-2"
          src={profileImage || person}
          alt="profile"
          onClick={isLoading ? () => null : () => imageRef.current.click()}
        />
      )}

      <input
        accept={'image/png, image/jpeg'}
        ref={imageRef}
        onChange={(e) => onHandle(e)}
        type={'file'}
        className={'hidden'}
      />
    </div>
  );
};
