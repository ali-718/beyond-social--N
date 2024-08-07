import { Helmet } from 'react-helmet-async';
import { LoginForm } from '../../sections/auth/login';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useApiHook } from 'src/hooks/apiHook';
import { LOGIN_USER, REGISTER_USER } from 'src/config/Apis';
import { loginUserAction } from 'src/redux/AuthRedux';
import { useNavigate } from 'react-router-dom';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { HOME_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from 'src/utils/routeNames';
import { LoginSvg } from './LoginSvg';
import { Input } from 'src/components/Input/Input';
import { IconButton, InputAdornment } from '@mui/material';
import Iconify from 'src/components/iconify';
import { LoadingButton } from '@mui/lab';
import logoLong from 'src/assets/images/logo-long.png';
import { registerUser } from 'src/Firebase Functions/AddDocument';
import { onOpenAlertAction } from 'src/redux/AlertRedux';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullPageLoading, setFullPageLoading] = useState(true);
  const { isLoading, apiCall } = useApiHook({ method: 'post', call: REGISTER_USER });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = (data) => {};

  useEffect(() => {
    setFullPageLoading(false);
  }, [navigate, dispatch]);

  const onGoToLogin = () => navigate(LOGIN_ROUTE);

  if (fullPageLoading) return <FullLoading />;

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet>
        <title> Signup </title>
      </Helmet>
      <div className="w-full bg-white flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <center>
            <img onClick={() => navigate(MAIN_ROUTE)} className="object-contain w-[200px] h-[100px]" src={logoLong} />
          </center>
          <h1 className="text-3xl font-semibold mb-6 mt-10 text-black text-center">Sign Up</h1>

          {/* form */}
          <div className="space-y-4">
            <Input required register={register} error={errors} name="name" label="Name" />
            <Input
              setValue={setValue}
              type="tel"
              required
              register={register}
              error={errors}
              name="phone"
              label="Phone"
            />
            <Input type="email" required register={register} error={errors} name="email" label="Email" />

            <Input
              required
              name="password"
              label="Password"
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
                className="bg-[#FFB6C1] text-black hover:bg-black hover:text-white"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleSubmit(onLogin)}
              >
                Sign Up
              </LoadingButton>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Do you have an account?{' '}
              <a onClick={onGoToLogin} className="text-black hover:underline">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
