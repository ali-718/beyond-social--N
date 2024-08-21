import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { fetchProfileVisitsProfile, getUserLikesWithPosts } from 'src/Firebase Functions/ReadDocument';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { AppWidgetSummary } from 'src/sections/@dashboard/app';
import { ALL_LIKES_LIST_PAGE, PROFILE_VISITS_LIST_PAGE } from 'src/utils/routeNames';

export const MyActivityPage = () => {
  const navigate = useNavigate();
  const localUser = retrieveUser();
  const [numberOfActivity, setNumberOfActivity] = useState('');
  const [numberOfLikes, setNumberOfLikes] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProfileVisits(), fetchAllLikes()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  const fetchProfileVisits = () =>
    fetchProfileVisitsProfile({ mainId: localUser?.id }).then((data) => {
      setNumberOfActivity(data.length);
    });

  const fetchAllLikes = () =>
    getUserLikesWithPosts({ userId: localUser?.id }).then((data) => {
      setNumberOfLikes(data.length);
    });

  const onGoToProfileVisitsPage = () => navigate(PROFILE_VISITS_LIST_PAGE);
  const onGoToAllLikesPage = () => navigate(ALL_LIKES_LIST_PAGE);

  if (isLoading) {
    return <FullLoading />;
  }

  return (
    <div className="w-full p-4">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <AppWidgetSummary
            title="Profile Visits"
            total={numberOfActivity}
            color="success"
            icon={'ant-design:usergroup-add-outlined'}
            onClick={onGoToProfileVisitsPage}
          />
        </Grid>
        <Grid item xs={6}>
          <AppWidgetSummary
            title="Likes"
            total={numberOfLikes}
            color="info"
            icon={'ant-design:like-outlined'}
            onClick={onGoToAllLikesPage}
          />
        </Grid>
      </Grid>
    </div>
  );
};
