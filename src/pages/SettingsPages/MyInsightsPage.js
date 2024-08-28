import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import {
  fetchAddressVisitors,
  fetchMyProfileVisitsWithUserData,
  getUserLikesWithPosts,
} from 'src/Firebase Functions/ReadDocument';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { AppWidgetSummary } from 'src/sections/@dashboard/app';
import { ALL_LIKES_LIST_PAGE, MY_PROFILE_VISITS_LIST_PAGE, PROFILE_VISITS_LIST_PAGE } from 'src/utils/routeNames';

export const MyInsightsPage = () => {
  const navigate = useNavigate();
  const localUser = retrieveUser();
  const [numberOfActivity, setNumberOfActivity] = useState('');
  const [numberOfAddressVisitors, setnumberOfAddressVisitors] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProfileVisits(), fetchAdVisitors()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  const fetchProfileVisits = () =>
    fetchMyProfileVisitsWithUserData({ userId: localUser?.id }).then((data) => {
      setNumberOfActivity(data.length);
    });

  const fetchAdVisitors = () =>
    fetchAddressVisitors({ myId: localUser?.id }).then((data) => {
      setnumberOfAddressVisitors(data.length);
    });

  const onGoToProfileVisitsPage = () => navigate(MY_PROFILE_VISITS_LIST_PAGE);
  const onGoToAllLikesPage = () => navigate(ALL_LIKES_LIST_PAGE);

  if (isLoading) {
    return <FullLoading />;
  }

  return (
    <div className="w-full p-4">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <AppWidgetSummary
            title="Store Visits"
            total={numberOfActivity}
            color="success"
            icon={'ant-design:usergroup-add-outlined'}
            onClick={onGoToProfileVisitsPage}
          />
        </Grid>
        <Grid item xs={6}>
          <AppWidgetSummary
            title="Address Visits"
            total={numberOfAddressVisitors}
            color="info"
            icon={'ant-design:like-outlined'}
            onClick={onGoToAllLikesPage}
          />
        </Grid>
      </Grid>
    </div>
  );
};
