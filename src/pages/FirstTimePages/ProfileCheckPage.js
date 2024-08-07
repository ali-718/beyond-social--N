import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from 'src/components/Input/Input';
import { ArrowButton } from 'src/components/ArrowButton/ArrowButton';
import { ProfileImage } from 'src/components/ProfileImage/ProfileImage';

export const ProfileCheckPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-full flex-col flex-1 flex p-4 h-[100%]">
      <div className="space-y-4 w-full flex flex-col flex-1">
        <div className="my-12">
          <Typography variant="h3" className="text-center">
            Your Profile
          </Typography>
        </div>

        <center>
          <ProfileImage />
        </center>
        <div className="flex flex-col flex-1 items-center justify-center">
          <Input required register={register} error={errors} name="name" label="Name" />
          <div className="mt-4" />
          <Input textarea register={register} error={errors} name="bio" label="Bio" />
        </div>
      </div>
      <div>
        <ArrowButton text="Next" />
      </div>
    </div>
  );
};
