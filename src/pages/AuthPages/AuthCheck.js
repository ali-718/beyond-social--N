import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { logoutUserAction } from 'src/redux/AuthRedux';
import { HOME_ROUTE, ONBOARD_PAGE, POST_LIST_PAGE } from 'src/utils/routeNames';

export const AuthCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    navigate(HOME_ROUTE);
  }, [navigate, dispatch]);

  return <FullLoading />;
};
