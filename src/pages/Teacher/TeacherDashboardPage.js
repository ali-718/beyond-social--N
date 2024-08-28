import { useTheme } from '@emotion/react';
import { faker } from '@faker-js/faker';
import { Grid } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Iconify from 'src/components/iconify/Iconify';
import { FETCH_DASHBOARD_DATA, FETCH_VISITS, STORE_VISITS } from 'src/config/Apis';
import { useApiHook } from 'src/hooks/apiHook';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import {
  AppConversionRates,
  AppCurrentSubject,
  AppCurrentVisits,
  AppNewsUpdate,
  AppOrderTimeline,
  AppTasks,
  AppTrafficBySite,
  AppWebsiteVisits,
  AppWidgetSummary,
} from 'src/sections/@dashboard/app';
import { fetchUserTypeForTracking } from 'src/utils/CurrentRoles';
import { fetchUserDevice } from 'src/utils/functions';

export const TeacherDashboardPage = () => {
  const theme = useTheme();

  const { apiCall: apiCallForStoreVisit } = useApiHook({
    method: 'post',
  });

  const { apiCall: apiCallForFetchVisits, data: visitData = [] } = useApiHook({
    method: 'get',
    call: FETCH_VISITS,
  });

  const { apiCall: apiCallForFetchDashboard, data: dashboardData = {} } = useApiHook({
    method: 'get',
    call: FETCH_DASHBOARD_DATA,
  });

  useEffect(() => {
    apiCallForStoreVisit({}, STORE_VISITS({ name: fetchUserDevice(), type: fetchUserTypeForTracking() }));
    Promise.all([apiCallForFetchVisits(), apiCallForFetchDashboard()]);
  }, []);

  return (
    <DashboardLayout>
      <Helmet>
        <meta name="robots" content="noindex"></meta>
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Total Students"
            total={dashboardData?.total_students}
            icon={'ant-design:user-outlined'}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Students Enrolled"
            total={dashboardData?.enrolled_students}
            color="info"
            icon={'ant-design:login-outlined'}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Total Courses"
            total={dashboardData?.total_courses}
            color="error"
            icon={'ant-design:book-outlined'}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          {visitData !== null && visitData?.length > 0 && (
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2024',
                '02/01/2024',
                '03/01/2024',
                '04/01/2024',
                '05/01/2024',
                '06/01/2024',
                '07/01/2024',
                '08/01/2024',
                '09/01/2024',
                '10/01/2024',
                '11/01/2024',
              ]}
              chartData={[
                {
                  name: 'Student',
                  type: 'column',
                  fill: 'solid',
                  data: Array.from({ length: 10 }, (_, i) => i + 1).map(
                    (item, i) => visitData?.filter((item) => item.type === 'Student')?.length + i * 10
                  ),
                },
                {
                  name: 'Teacher',
                  type: 'area',
                  fill: 'gradient',
                  data: Array.from({ length: 10 }, (_, i) => i + 1).map(
                    (item, i) => visitData?.filter((item) => item.type === 'Teacher')?.length + i * 10
                  ),
                },
                {
                  name: 'Other',
                  type: 'line',
                  fill: 'solid',
                  data: Array.from({ length: 10 }, (_, i) => i + 1).map(
                    (item, i) => visitData?.filter((item) => item.type === 'Other')?.length + i * 10
                  ),
                },
              ]}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {visitData !== null && visitData?.length > 0 && (
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'Teacher', value: visitData?.filter((item) => item.type === 'Teacher')?.length },
                { label: 'Student', value: visitData?.filter((item) => item.type === 'Student')?.length },
                { label: 'Other', value: visitData?.filter((item) => item.type === 'Other')?.length },
              ]}
              chartColors={[theme.palette.primary.main, theme.palette.warning.main, theme.palette.error.main]}
            />
          )}
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
