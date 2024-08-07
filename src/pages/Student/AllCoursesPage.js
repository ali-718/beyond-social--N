import { TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { CourseCard } from 'src/components/HomeComponents/HomeCourses';
import { FETCH_LIST_OF_COURSES_FOR_STUDENT } from 'src/config/Apis';
import { useApiHook } from 'src/hooks/apiHook';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';

export const AllCoursesPage = () => {
  const [search, setsearch] = useState('');
  const user = useSelector((state) => state.user.user);

  const {
    apiCall: apiCallForEnrolledCourses,
    data: courses = [],
    isLoading: coursesLoading,
  } = useApiHook({
    call: FETCH_LIST_OF_COURSES_FOR_STUDENT({ studentId: user?.id }),
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

      <Typography variant="h4">All Courses</Typography>

      <TextField
        value={search}
        onChange={(e) => {
          setsearch(e.target.value);
        }}
        className="max-w-[400px] w-full mb-2 mt-2"
        placeholder={'Search by Course Name'}
        type="search"
      />

      <div className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-2 lg:mt-16 lg:gap-6 lg:grid-cols-4">
        {courses
          ?.filter((item) => item?.Name?.toLowerCase()?.includes(search?.toLowerCase()))
          ?.map((item, i) => (
            <CourseCard
              courseId={item?.uid}
              tutorId={item?.tutor?.id}
              isBuyNow
              tutorName={item?.tutor?.Name}
              name={item?.Name}
              image={item?.Image}
              key={i}
            />
          ))}
      </div>
    </DashboardLayout>
  );
};
