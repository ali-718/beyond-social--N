import { userRoles } from './userRoles';

const { retrieveUser } = require('src/hooks/AuthHooks/AuthHooks');

export const isTeacher = () => {
  const user = retrieveUser();
  return user?.Role === userRoles.Teacher;
};

export const isStudent = () => {
  const user = retrieveUser();
  return user?.Role === userRoles.Student;
};

export const fetchUserTypeForTracking = () => {
  const user = retrieveUser();
  if (user?.Role === userRoles.Student) {
    return 'Student';
  }
  if (user?.Role === userRoles.Teacher) {
    return 'Teacher';
  }
  return 'Other';
};
