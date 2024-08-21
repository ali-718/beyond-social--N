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
  POST_PAGE,
  PROFILE_EDIT_PAGE,
  SEARCH_PAGE,
  SEARCH_PROFILE_PAGE,
  PROFILE_FOLLOWERS_PAGE,
  SETTINGS_PAGE,
  MY_ACTIVITY_PAGE,
  PROFILE_VISITS_LIST_PAGE,
  MESSAGE_LIST,
  MESSAGE_USER,
  SINGLE_POST_PAGE,
  ALL_LIKES_LIST_PAGE,
  NOTIFICATIONS_LIST,
} from './utils/routeNames';
import { HomePage } from './pages/UnAuthPages/HomePage';
import SignupPage from './pages/AuthPages/SignupPage';
import { ProfileCheckPage } from './pages/FirstTimePages/ProfileCheckPage';
import { AuthHoc } from './hocs/AuthHoc';
import { OnboardingPage } from './pages/FirstTimePages/OnboardingPage';
import { NoAuthHoc } from './hocs/NoAuthHoc';
import { PostListPage } from './pages/PostsPages/PostListPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { CreatePost } from './pages/PostsPages/CreatePost';
import { ProfileEditPage } from './pages/ProfilePage/ProfileEditPage';
import { SearchPage } from './pages/SearchPages/SearchPage';
import { SearchProfilePage } from './pages/SearchPages/SearchProfilePage';
import { SearchFollowersListPage } from './pages/SearchPages/SearchFollowersListPage';
import { SettingsPage } from './pages/SettingsPages/SettingsPage';
import { MyActivityPage } from './pages/SettingsPages/MyActivityPage';
import { ProfileVisitsListPage } from './pages/SettingsPages/ProfileVisitsListPage';

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
      path: PROFILE_CHECK_PAGE,
      element: (
        <AuthHoc>
          <ProfileCheckPage />
        </AuthHoc>
      ),
      index: true,
    },
    {
      path: ONBOARD_PAGE,
      element: (
        <AuthHoc noNav noHeader>
          <OnboardingPage />
        </AuthHoc>
      ),
      index: true,
    },
    {
      path: POST_LIST_PAGE,
      element: (
        <AuthHoc pageValue={0}>
          <PostListPage />
        </AuthHoc>
      ),
      index: true,
    },
    {
      path: `${SINGLE_POST_PAGE}/:postId`,
      element: (
        <AuthHoc noNav noHeader backHeader>
          <PostListPage singlePost />
        </AuthHoc>
      ),
      index: true,
    },
    {
      path: POST_PAGE,
      element: (
        <AuthHoc pageValue={2}>
          <CreatePost />
        </AuthHoc>
      ),
      index: true,
    },
    {
      path: PROFILE_PAGE,
      element: (
        <AuthHoc pageValue={4} rightIcon={'settings'}>
          <ProfilePage />
        </AuthHoc>
      ),
      index: true,
    },
    {
      path: PROFILE_EDIT_PAGE,
      element: (
        <AuthHoc noNav noHeader backHeader={'Edit Profile'}>
          <ProfileEditPage />
        </AuthHoc>
      ),
      index: true,
    },
    {
      path: SEARCH_PAGE,
      element: (
        <AuthHoc pageValue={1} noHeader>
          <SearchPage />
        </AuthHoc>
      ),
      index: true,
    },
    {
      path: `${SEARCH_PROFILE_PAGE}/:userId`,
      element: (
        <AuthHoc noNav noHeader backHeader>
          <SearchProfilePage />
        </AuthHoc>
      ),
      index: true,
    },
    {
      path: `${PROFILE_FOLLOWERS_PAGE}/:userId`,
      element: (
        <AuthHoc noNav noHeader>
          <SearchFollowersListPage />
        </AuthHoc>
      ),
      index: true,
    },
    {
      path: SETTINGS_PAGE,
      element: (
        <AuthHoc noNav noHeader backHeader={'Settings'}>
          <SettingsPage />
        </AuthHoc>
      ),
      index: true,
    },
    {
      path: MY_ACTIVITY_PAGE,
      element: (
        <AuthHoc noNav noHeader backHeader={'Your Activity'}>
          <MyActivityPage />
        </AuthHoc>
      ),
      index: true,
    },
    {
      path: PROFILE_VISITS_LIST_PAGE,
      element: (
        <AuthHoc noNav noHeader backHeader={'Profile Visits'}>
          <ProfileVisitsListPage />
        </AuthHoc>
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
