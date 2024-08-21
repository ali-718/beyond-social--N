import { AdsClick, Curtains, LaptopChromebook, SsidChart } from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MY_ACTIVITY_PAGE } from 'src/utils/routeNames';

export const SettingsPage = () => {
  const navigate = useNavigate();

  const onGotoYourActivityPage = () => navigate(MY_ACTIVITY_PAGE);
  return (
    <div className="w-full p-4">
      <div onClick={onGotoYourActivityPage} className="flex items-center mt-2">
        <AdsClick fontSize="medium" />
        <p className="ml-2">Your Activity</p>
      </div>
    </div>
  );
};
