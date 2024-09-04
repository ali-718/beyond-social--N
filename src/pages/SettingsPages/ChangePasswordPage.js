import { Helmet } from 'react-helmet-async';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useApiHook } from 'src/hooks/apiHook';
import { LOGIN_USER } from 'src/config/Apis';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE, SIGNUP_ROUTE } from 'src/utils/routeNames';
import { Input } from 'src/components/Input/Input';
import { IconButton, InputAdornment } from '@mui/material';
import Iconify from 'src/components/iconify';
import { LoadingButton } from '@mui/lab';
import logoLong from 'src/assets/images/logo-long.png';
import { changePassword } from 'src/Firebase Functions/ReadDocument';
import { onOpenAlertAction } from 'src/redux/AlertRedux';
import { primaryColor } from 'src/utils/colors';

export const ChangePasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localUser = retrieveUser();

  const onLogin = async (data) => {
    setIsLoading(true);
    changePassword({ ...data, userId: localUser?.id })
      .then((data) => {
        navigate(-1);
        dispatch(onOpenAlertAction({ message: 'Password Changed successfully' }));
        setIsLoading(false);
      })
      .catch((e) => {
        dispatch(onOpenAlertAction({ type: 'error', message: e }));
        setIsLoading(false);
      });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full bg-white flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          {/* form */}
          <div className="space-y-4">
            <Input
              required
              name="oldPassword"
              label="Old Password"
              type={showPassword ? 'text' : 'password'}
              register={register}
              error={errors}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Input
              required
              name="newPassword"
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              register={register}
              error={errors}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div>
              <LoadingButton
                loading={isLoading}
                className={`bg-[${primaryColor}] text-black hover:bg-black hover:text-white`}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleSubmit(onLogin)}
              >
                Submit
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
