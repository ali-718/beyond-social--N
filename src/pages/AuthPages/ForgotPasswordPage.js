import { Helmet } from 'react-helmet-async';
import { LoginForm } from '../../sections/auth/login';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useApiHook } from 'src/hooks/apiHook';
import { LOGIN_USER } from 'src/config/Apis';
import { loginUserAction } from 'src/redux/AuthRedux';
import { useNavigate } from 'react-router-dom';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { HOME_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, SIGNUP_ROUTE } from 'src/utils/routeNames';
import { LoginSvg } from './LoginSvg';
import { Input } from 'src/components/Input/Input';
import { IconButton, InputAdornment } from '@mui/material';
import Iconify from 'src/components/iconify';
import { LoadingButton } from '@mui/lab';
import logoLong from 'src/assets/images/logo-long.png';
import { db } from 'src/config';
import {
  FetchUserByEmail,
  FetchUserByUsernameAndMatchPassword,
  useFetchUserByUsernameAndMatchPassword,
} from 'src/Firebase Functions/ReadDocument';
import { onOpenAlertAction } from 'src/redux/AlertRedux';
import { primaryColor } from 'src/utils/colors';

export const ForgotPasswordPage = () => {
  const [fullPageLoading, setFullPageLoading] = useState(true);
  const { isLoading, apiCall } = useApiHook({ method: 'post', call: LOGIN_USER });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async (data) => {
    const queryUser = FetchUserByEmail(data)
      .then((data) => {
        dispatch(onOpenAlertAction({ message: 'Email has been sent' }));
      })
      .catch((e) => {
        dispatch(onOpenAlertAction({ type: 'error', message: e }));
      });
  };

  useEffect(() => {
    setFullPageLoading(true);
    const user = retrieveUser();
    if (user !== '') {
      dispatch(loginUserAction(user));
      navigate(MAIN_ROUTE);
      return;
    }
    setFullPageLoading(false);
  }, [navigate, dispatch]);

  const onGoToLogin = () => navigate(LOGIN_ROUTE);

  if (fullPageLoading) return <FullLoading />;

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet>
        <title> Forgot Pasword </title>
      </Helmet>
      <div className="w-full bg-white flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <center>
            <img onClick={() => navigate(MAIN_ROUTE)} className="object-contain w-[200px] h-[100px]" src={logoLong} />
          </center>
          <h1 className="text-xl font-semibold mb-6 mt-10 text-black text-center">Please enter your email</h1>
          {/* form */}
          <div className="space-y-4">
            <Input type="email" required register={register} error={errors} name="email" label="Email" />

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
};
