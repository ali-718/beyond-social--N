import { Light, Lightbulb, SsidChart, Password, ExitToApp } from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CHANGE_PASSWORD_PAGE, HOME_ROUTE, INSIGHTS_PAGE, MY_ACTIVITY_PAGE } from 'src/utils/routeNames';

export const SettingsPage = () => {
  const navigate = useNavigate();

  const onGotoYourActivityPage = () => navigate(MY_ACTIVITY_PAGE);
  const onGotoYourInsightsPage = () => navigate(INSIGHTS_PAGE);
  const onGotoChangePasswordsPage = () => navigate(CHANGE_PASSWORD_PAGE);
  const onLogout = () => {
    localStorage.clear();
    navigate(HOME_ROUTE);
  };

  return (
    <div className="w-full p-4">
      <div onClick={onGotoYourActivityPage} className="flex items-center mt-2">
        <SsidChart fontSize="medium" className="border border-gray-500 rounded" />
        <p className="ml-2">Your Activity</p>
      </div>
      <div onClick={onGotoYourInsightsPage} className="flex items-center mt-4">
        <Lightbulb fontSize="medium" className="border border-gray-500 rounded" />
        <p className="ml-2">Store Insights</p>
      </div>
      <div onClick={onGotoChangePasswordsPage} className="flex items-center mt-4">
        <Password fontSize="medium" className="border border-gray-500 rounded" />
        <p className="ml-2">Change Password</p>
      </div>
      <div onClick={onLogout} className="flex items-center mt-4">
        <ExitToApp fontSize="medium" color="error" className="border border-red-500 rounded" />
        <p className="ml-2 font-bold text-red-500">Logout</p>
      </div>
    </div>
  );
};
