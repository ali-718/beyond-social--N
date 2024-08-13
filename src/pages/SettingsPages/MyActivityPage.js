import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { fetchProfileVisitsProfile } from 'src/Firebase Functions/ReadDocument';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { AppWidgetSummary } from 'src/sections/@dashboard/app';
import { PROFILE_VISITS_LIST_PAGE } from 'src/utils/routeNames';

export const MyActivityPage = () => {
  const navigate = useNavigate();
  const localUser = retrieveUser();
  const [numberOfActivity, setNumberOfActivity] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProfileVisits()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  const fetchProfileVisits = () =>
    fetchProfileVisitsProfile({ mainId: localUser?.id }).then((data) => {
      setNumberOfActivity(data.length);
    });

  const onGoToProfileVisitsPage = () => navigate(PROFILE_VISITS_LIST_PAGE);

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
      </Grid>
    </div>
  );
};
