// component
import { isTeacher, isStudent } from 'src/utils/CurrentRoles';
import SvgColor from '../../../components/svg-color';
import {
  ADMIN_ALL_DRIVERS,
  ADMIN_ALL_EXPENSES,
  ADMIN_ALL_INVOICES,
  ADMIN_LOADING_UNLOADING_SHIFTS,
  ADMIN_SHIFTS_ROUTE,
  ADMIN_TOOLS_ROUTE,
  STUDENT_HOME_PAGE,
  LOADER_NEW_ONGOING_SHIFT,
  LOADER_PROFILE_EDIT,
  ADMIN_TRUCK_TRACKING,
  LOADER_OUTSIDER_NEW_SHIFT_ROUTE,
  ADMIN_FINANCES,
  TASK_REMINDER_HOME,
  ADMIN_FUEL_CROSS_CHECK,
  PREMIUM_WAIVER_FORM_LIST,
  INCIDENT_WAIVER_FORM_LIST,
  DAMAGE_REPORT_FORM_LIST,
  DEDUCTIONS_LIST,
  DEDUCTIONS_LIST_BY_OFFSIDER_ID,
  ADMIN_LABOUR_SHIFTS,
  NO_INSTALLATION_WINNINGS_FORM_LIST_ADMIN,
  REPORTS_WINNINGS_TIMESHEET,
  STUDENT_COURSE_PAGE,
  TEACHERS_HOME_PAGE,
  TEACHERS_COURSE_PAGE,
  TEACHERS_INQUIRIES_PAGE,
  TEACHERS_DASHBOARD_PAGE,
} from 'src/utils/routeNames';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = isTeacher()
  ? [
      {
        title: 'Dashboard',
        path: TEACHERS_DASHBOARD_PAGE,
        icon: icon('ic_analytics'),
      },
      {
        title: 'All Students',
        path: TEACHERS_HOME_PAGE,
        icon: icon('ic_analytics'),
      },
      {
        title: 'All Courses',
        path: TEACHERS_COURSE_PAGE,
        icon: icon('ic_loadingBox'),
      },
      {
        title: 'All Inquiries',
        path: TEACHERS_INQUIRIES_PAGE,
        icon: icon('ic_user'),
      },
    ]
  : isStudent()
  ? [
      {
        title: 'My Learning',
        path: STUDENT_HOME_PAGE,
        icon: icon('ic_analytics'),
      },
      {
        title: 'All Courses',
        path: STUDENT_COURSE_PAGE,
        icon: icon('ic_loadingBox'),
      },

      // {
      //   title: 'Offsider Shift',
      //   path: LOADER_OUTSIDER_NEW_SHIFT_ROUTE,
      //   icon: icon('ic_clock'),
      //   heading: 'Offsider',
      // },
      // {
      //   title: 'New Invoice',
      //   path: LOADER_NEW_INVOICE,
      //   icon: icon('ic_invoice'),
      //   heading: 'Invoice',
      // },
      // {
      //   title: 'Previous Invoice',
      //   path: LOADER_PREVIOUS_INVOICE,
      //   icon: icon('ic_invoice'),
      //   heading: 'Invoice',
      // },
      // {
      //   title: 'My Profile',
      //   path: LOADER_PROFILE_EDIT,
      //   icon: icon('ic_person'),
      //   divider: true,
      // },
      // {
      //   title: 'Track My Deductions',
      //   path: DEDUCTIONS_LIST_BY_OFFSIDER_ID,
      //   icon: icon('ic_deduction'),
      //   divider: true,
      // },
    ]
  : [];

// [
//   {
//     title: 'dashboard',
//     path: '/dashboard/app',
//     icon: icon('ic_analytics'),
//   },
//   {
//     title: 'user',
//     path: '/dashboard/user',
//     icon: icon('ic_user'),
//   },
//   {
//     title: 'product',
//     path: '/dashboard/products',
//     icon: icon('ic_cart'),
//   },
//   {
//     title: 'blog',
//     path: '/dashboard/blog',
//     icon: icon('ic_blog'),
//   },
//   {
//     title: 'login',
//     path: '/login',
//     icon: icon('ic_lock'),
//   },
//   {
//     title: 'Not found',
//     path: '/404',
//     icon: icon('ic_disabled'),
//   },
// ];

export default navConfig;
