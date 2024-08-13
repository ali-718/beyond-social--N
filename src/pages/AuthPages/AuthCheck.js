import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { fetchDocumentsById } from 'src/Firebase Functions/ReadDocument';
import { retrieveUser, retrieveUserAsync } from 'src/hooks/AuthHooks/AuthHooks';
import { logoutUserAction } from 'src/redux/AuthRedux';
import { HOME_ROUTE, ONBOARD_PAGE, POST_LIST_PAGE } from 'src/utils/routeNames';

export const AuthCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const user = await retrieveUserAsync();
        console.log({ user });
        if (user !== '') {
          if (user?.isFirstTime) {
            navigate(ONBOARD_PAGE);
          } else {
            navigate(POST_LIST_PAGE);
          }
        }
      } catch (error) {
        dispatch(logoutUserAction());
        navigate(HOME_ROUTE);
      }
    })();
  }, [navigate, dispatch]);

  return <FullLoading />;
};
