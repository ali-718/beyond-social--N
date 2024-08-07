import React, { useRef, useState } from 'react';
import profileImage from '../../assets/images/addProfileImage.png';
import { useApiHook } from 'src/hooks/apiHook';
import { imageSize, imageUploadBlobStorageUrl } from 'src/utils/constants';
import { useDispatch } from 'react-redux';
import { onOpenAlertAction } from 'src/redux/AlertRedux';

export const ProfileImage = () => {
  const [Image, setImage] = useState('');
  const dispatch = useDispatch();
  const imageRef = useRef();

  const onHandle = (e) => {
    const file = e.target.files[0];

    if (file.size > imageSize) {
      dispatch(onOpenAlertAction({ message: 'Image size should not be greater than 5mb', type: 'error' }));
      return;
    }
    let formData = new FormData();

    formData.append('blob', file);
    apiCallForImage(formData).then((res) => {
      setImage(res);
    });
  };

  const { isLoading, apiCall: apiCallForImage } = useApiHook({
    method: 'post',
    call: imageUploadBlobStorageUrl,
  });

  return (
    <div>
      <img onClick={isLoading ? () => null : () => imageRef.current.click()} className="w-[150px]" src={profileImage} />
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
