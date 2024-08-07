import { FormLabel, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from 'src/components/Button/Button';
import { ImageList } from 'src/components/ImageList/ImageList';
import { Input } from 'src/components/Input/Input';
import { ModalComponent } from 'src/components/ModalComponent/ModalComponent';
import { UPDATE_COURSE_DETAILS } from 'src/config/Apis';
import { useApiHook } from 'src/hooks/apiHook';
import { onOpenAlertAction } from 'src/redux/AlertRedux';
import { imageSize, imageUploadBlobStorageUrl } from 'src/utils/constants';

export const EditCourseModal = ({ open, onClose, data, refetchCourses }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [imageList, setImageList] = useState([]);
  const dispatch = useDispatch();

  const { isLoading: imageLoading, apiCall: apiCallForImage } = useApiHook({
    method: 'post',
    call: imageUploadBlobStorageUrl,
  });

  const { isLoading: updateLoading, apiCall: apiCallForUpdateCourse } = useApiHook({
    method: 'post',
    call: UPDATE_COURSE_DETAILS,
  });

  const handleFile = (e) => {
    const file = e;

    if (file.size > imageSize) {
      dispatch(onOpenAlertAction({ message: 'Image size should not be greater than 5mb', type: 'error' }));
      return;
    }
    let formData = new FormData();

    formData.append('blob', file);
    apiCallForImage(formData).then((res) => {
      onInsertImage(res);
    });
  };

  const onInsertImage = (image) => {
    const list = [image];
    setImageList(list);
  };

  const onDeleteImage = (index) => {
    const list = [];
    setImageList(list);
  };

  useEffect(() => {
    if (data?.id) {
      reset({
        ...data,
      });
      if (data?.image) {
        setImageList([data?.image]);
      }
    }
  }, [data]);

  const onSubmit = (vals) => {
    if (imageList.length === 0) {
      dispatch(onOpenAlertAction({ message: 'Upload course image please', type: 'error' }));
      return;
    }
    const apiData = {
      ...vals,
      uid: data?.id,
      Image: imageList?.[0],
    };

    apiCallForUpdateCourse(apiData).then(() => {
      dispatch(onOpenAlertAction({ message: 'Course updated successfully' }));
      onClose();
      refetchCourses();
    });
  };

  return (
    <ModalComponent open={open} onClose={onClose}>
      <Stack rowGap={'1rem'} className="w-full mt-4">
        <Typography variant="h5" component="h2">
          Edit Course
        </Typography>
        <Input required register={register} error={errors} name="Name" label="Course Name" />
        <Input textarea required register={register} error={errors} name="Description" label="Course Description" />
        <div>
          <FormLabel>Course Image</FormLabel>
          <div className="mb-2" />
          <ImageList
            isLoading={imageLoading}
            images={imageList}
            onDeleteImage={onDeleteImage}
            handleFile={handleFile}
            isHide={imageList.length > 0}
          />
        </div>
        <Button
          disabled={updateLoading}
          isLoading={updateLoading}
          text={'Submit'}
          handleSubmit={handleSubmit(onSubmit)}
        />
      </Stack>
    </ModalComponent>
  );
};
