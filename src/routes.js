import { Navigate, createHashRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/AuthPages/LoginPage';
import Page404 from './pages/Page404';
import { useSelector } from 'react-redux';
import { AuthCheck } from './pages/AuthPages/AuthCheck';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  MAIN_ROUTE,
  PROFILE_CHECK_PAGE,
  ONBOARD_PAGE,
  POST_LIST_PAGE,
  PROFILE_PAGE,
} from './utils/routeNames';
import { HomePage } from './pages/UnAuthPages/HomePage';
import SignupPage from './pages/AuthPages/SignupPage';
import { ProfileCheckPage } from './pages/FirstTimePages/ProfileCheckPage';
import { AuthHoc } from './hocs/AuthHoc';
import { OnboardingPage } from './pages/FirstTimePages/OnboardingPage';
import { NoAuthHoc } from './hocs/NoAuthHoc';
import { PostListPage } from './pages/PostsPages/PostListPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';

export default function Router() {
  const user = useSelector((state) => state.user.user);

  const routes = createHashRouter([
    {
      path: MAIN_ROUTE,
      element: <AuthCheck />,
      index: true,
    },
    {
      path: HOME_ROUTE,
      element: (
        <NoAuthHoc>
          <HomePage />
        </NoAuthHoc>
      ),
      index: true,
    },
    {
      path: LOGIN_ROUTE,
      element: user?.id ? (
        <Navigate to={HOME_ROUTE} />
      ) : (
        <NoAuthHoc>
          <LoginPage />
        </NoAuthHoc>
      ),
      index: true,
    },
    {
      path: SIGNUP_ROUTE,
      element: user?.id ? (
        <Navigate to={HOME_ROUTE} />
      ) : (
        <NoAuthHoc>
          <SignupPage />
        </NoAuthHoc>
      ),
      index: true,
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return <RouterProvider router={routes} />;
}
