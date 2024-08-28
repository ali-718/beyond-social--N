import { Light, Lightbulb, SsidChart } from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { INSIGHTS_PAGE, MY_ACTIVITY_PAGE } from 'src/utils/routeNames';

export const SettingsPage = () => {
  const navigate = useNavigate();

  const onGotoYourActivityPage = () => navigate(MY_ACTIVITY_PAGE);
  const onGotoYourInsightsPage = () => navigate(INSIGHTS_PAGE);

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
    </div>
  );
};
