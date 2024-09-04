import { LoadingButton } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { Input } from 'src/components/Input/Input';
import { ProfileImage } from 'src/components/ProfileImage/ProfileImage';
import { SelectComponent } from 'src/components/Select/Select';
import { useFetchDocumentsById } from 'src/Firebase Functions/ReadDocument';
import { useUpdateDocument } from 'src/Firebase Functions/UpdateDocument';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { onOpenAlertAction } from 'src/redux/AlertRedux';
import { primaryColor } from 'src/utils/colors';
import { countries, storeCategories } from 'src/utils/constants';
import { PROFILE_PAGE } from 'src/utils/routeNames';

export const ProfileEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { invoke } = useUpdateDocument({ collectionName: 'users' });
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const [profileImage, setProfileImage] = useState('');
  const localUser = retrieveUser();
  const user = useFetchDocumentsById({ collectionName: 'users', id: localUser?.id, where: '' });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onNavigateProfilePage = () => navigate(PROFILE_PAGE);

  useEffect(() => {
    user.then((data) => {
      setUserProfile(data);
      console.log({ data });
      setIsLoading(false);
      reset(data);
      setProfileImage(data?.profileImage || '');
    });
  }, []);

  const onSubmit = (data) => {
    const apiData = {
      name: data?.name,
      phone: data?.phone,
      storeName: data?.storeName,
      storeCategory: data?.storeCategory,
      storeCountry: data?.storeCountry,
      bio: data?.bio,
      storeAddress: data?.storeAddress,
      storeUrl: data?.storeUrl,
      profileImage,
    };
    invoke({ index: data?.id, upData: apiData }).then(() => {
      dispatch(onOpenAlertAction({ message: 'Profile updated successfully' }));
      onNavigateProfilePage();
    });
  };

  if (isLoading) {
    return <FullLoading />;
  }

  return (
    <div className="w-full bg-white flex items-center justify-center">
      <div className="max-w-md w-full p-6">
        <center>
          <ProfileImage setProfileImage={setProfileImage} profileImage={profileImage} />
        </center>

        <div className="space-y-6 mt-12 w-full">
          <Input required register={register} error={errors} name="name" label="Name" />
          <Input required register={register} error={errors} name="storeName" label="Store Name" />
          <Input disabled type="email" required register={register} error={errors} name="email" label="Email" />
          <SelectComponent
            required
            register={register}
            name={'storeCategory'}
            label={'Category'}
            list={storeCategories}
            error={errors}
            className="w-full"
            defaultValue={userProfile?.storeCategory}
          />
          <SelectComponent
            required
            register={register}
            name={'storeCountry'}
            label={'Store Location'}
            list={countries}
            error={errors}
            className="w-full"
            defaultValue={userProfile?.storeCountry}
          />
          <Input required textarea register={register} error={errors} name="bio" label="Store Description" />
          <Input register={register} error={errors} name="storeAddress" label="Store Address" />
          <Input register={register} error={errors} name="storeUrl" label="Store Url" />
          <LoadingButton
            loading={isLoading}
            className={`bg-[${primaryColor}] text-black hover:bg-black hover:text-white`}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};
