import { TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { CourseCard } from 'src/components/HomeComponents/HomeCourses';
import { FETCH_LIST_OF_ENROLLED_COURSES, STORE_VISITS } from 'src/config/Apis';
import { useApiHook } from 'src/hooks/apiHook';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { fetchUserTypeForTracking } from 'src/utils/CurrentRoles';
import { fetchUserDevice } from 'src/utils/functions';

export const StudentHomePage = () => {
  const [search, setsearch] = useState('');
  const user = useSelector((state) => state.user.user);

  const { apiCall: apiCallForFetchStudents } = useApiHook({
    method: 'post',
  });

  useEffect(() => {
    apiCallForFetchStudents({}, STORE_VISITS({ name: fetchUserDevice(), type: fetchUserTypeForTracking() }));
  }, []);

  const {
    apiCall: apiCallForEnrolledCourses,
    data: courses = [],
    isLoading: coursesLoading,
  } = useApiHook({
    call: FETCH_LIST_OF_ENROLLED_COURSES({ id: user?.id }),
  });

  useEffect(() => {
    apiCallForEnrolledCourses();
  }, []);

  if (coursesLoading) {
    return <FullLoading />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title>Dashboard</title>
        <meta name="robots" content="noindex"></meta>
      </Helmet>

      <Typography variant="h4">My Learning</Typography>

      <TextField
        value={search}
        onChange={(e) => {
          setsearch(e.target.value);
        }}
        className="max-w-[400px] w-full mb-2 mt-2"
        placeholder={'Search by Course Name'}
        type="search"
      />

      <div className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-2 lg:mt-16 lg:gap-4 lg:grid-cols-4">
        {courses?.length > 0 &&
          courses
            ?.filter((item) => item?.course_name?.toLowerCase()?.includes(search?.toLowerCase()))
            ?.map((item, i) => (
              <CourseCard
                tutorName={item?.tutor?.tutor_name}
                name={item?.course_name}
                image={item?.course_image}
                key={i}
              />
            ))}
      </div>
      {courses?.length === 0 && <p>Looks like you dont have any enrolled course</p>}
    </DashboardLayout>
  );
};
