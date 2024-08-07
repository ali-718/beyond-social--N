import moment from 'moment';

// Auth apis
export const LOGIN_USER = 'Login.php';
export const REGISTER_USER = 'Student/Register.php';
export const CREATE_INQUIRIRES = 'CreateInquiries.php';
export const FETCH_INQUIRIES = 'FetchInquiries.php';
export const FETCH_USER_DETAILS = ({ userId }) => `Auth/fetchUser?userId=${userId}`;
export const FETCH_ALL_USERS_FOR_DROPDOWN = ({ search }) => `Auth/fetchAllUsersListFroDropdown?search=${search}`;
export const STORE_VISITS = ({ type, name, date = moment().format('D/M/yyyy') }) =>
  `StoreUserVisits.php?name=${name}&type=${type}&date=${date}`;

// Images upload apis
export const IMAGE_UPLOAD = 'ImageUpload/uploadImage';

// Home Page Apis
export const FETCH_LIST_OF_COURSES = `Student/FetchListOfCourses.php`;

// Student api
export const FETCH_LIST_OF_COURSES_FOR_STUDENT = ({ studentId }) =>
  `Student/FetchListOfCourses.php?studentId=${studentId}`;
export const FETCH_LIST_OF_ENROLLED_COURSES = ({ id }) => `Student/FetchListOfEnrolledCourses.php?studentId=${id}`;
export const ENROLL_IN_COURSE = ({ studentId, courseId, tutorId }) =>
  `Student/EnrollInCourse.php?studentId=${studentId}&courseId=${courseId}&tutorId=${tutorId}`;

// Teacher api
export const FETCH_ALL_STUDENTS = 'Teacher/FetchAllStudents.php';
export const UPDATE_COURSE_DETAILS = 'Teacher/EditCourse.php';
export const FETCH_VISITS = 'Teacher/FetchVisits.php';
export const FETCH_DASHBOARD_DATA = 'Teacher/FetchDashboardData.php';

// invalid apis of student
export const UPDATE_DRIVER_DETAILS = 'Drivers/updateDriverDetails';
export const FETCH_DRIVER_DETAILS = ({ userId }) => `Drivers/fetchDriverDetails?userId=${userId}`;
export const FETCH_DRIVER_ACKNOWLEDGED_DETAILS = ({ userId }) => `Drivers/fetchIsDriverAcknowledged?driverId=${userId}`;
export const UPDATE_DRIVER_ACKNOWLEDGED_DETAILS = ({ userId }) =>
  `Drivers/updateIsDriverAcknowledged?driverId=${userId}`;
export const FETCH_PROFILE_DETAILS = ({ userId }) => `FetchProfile.php?userId=${userId}`;

export const FETCH_ALL_DRIVERS = ({ page, offset, search = '' }) =>
  `Drivers/fetchAllDrivers?page=${page}&offset=${offset}&search=${search}`;

// Trucks apis
export const FETCH_TRUCKS = 'Trucks/fetchAllTrucks';
export const FETCH_TRUCKS_FOR_WINNINGS = 'Trucks/fetchAllTrucksForWinnings';

// Shifts apis
export const ADD_NO_INSTALLATION_FORM = 'ShuttleTruck/addNoInstallationWinningsForm';
export const ADD_EXTRA_WORK_FOR_OFFSIDER = 'ShuttleTruck/addExtraWorkCommentsAnJobForOffsider';
export const DAMAGE_REPORT_FORM_ADD = 'ShuttleTruck/addDamageReportForm';
export const PWF_FORM_ADD = 'ShuttleTruck/addPremiumWaiverForm';
export const PWF_FORM_EDIT = 'ShuttleTruck/editPremiumWaiverForm';
export const IWF_FORM_ADD = 'ShuttleTruck/addIncidentWaiverForm';
export const IWF_FORM_EDIT = 'ShuttleTruck/editIncidentWaiverForm';
export const ADD_SHIFT = 'ShuttleTruck/addTruckShift';
export const EDIT_TRUCK_SHIFT = 'ShuttleTruck/editTruckShift';
export const ADD_SHIFT_FULL_BY_ADMIN_FOR_INVOICE = 'ShuttleTruck/addFullTruckShiftByAdminForInvoice';
export const FETCH_ALL_HELPERS = 'Auth/fetchAllHelpers';
export const END_SHIFT = 'ShuttleTruck/endTruckShift';
export const FETCH_COUNTRIES = 'ShuttleTruck/fetchAllCountries';
export const FETCH_SHIFTS_IN_EXCEL = 'ShuttleTruck/fetchExcel';
export const UPDATE_SHIFT_FINANCE = 'ShuttleTruck/editShiftFinances';
export const FETCH_SHIFT_PAGE_COUNT = (offSet) => `ShuttleTruck/fetchPageCount?offset=${offSet}`;
export const FETCH_ONGOING_SHIFT = (driverId) => `ShuttleTruck/ongoingShift?driverId=${driverId}`;
export const FETCH_PREVIOUS_SHIFT = ({ page, offSet, driverId }) =>
  `ShuttleTruck/shiftsByDriverId?page=${page}&offset=${offSet}&driverId=${driverId}`;
export const FETCH_ALL_SHIFT = ({ page, offSet, search = '' }) =>
  `ShuttleTruck/fetchShifts?page=${page}&offset=${offSet}&search=${search}`;
export const SHIFT_CHECKUP = ({ driverId }) => `ShuttleTruck/shiftCheckup?driverId=${driverId}`;
export const FETCH_OFFSIDER_ONGOING_SHIFT = (offsiderId) =>
  `ShuttleTruck/ongoingShiftForOffsider?offsiderId=${offsiderId}`;
export const START_OFFSIDER_SHIFT = ({ offsiderId, truckId, truckNumber }) =>
  `ShuttleTruck/addTruckShiftForOffsider?truckId=${truckId}&offsiderId=${offsiderId}&truckNumber=${truckNumber}`;
export const PWF_FETCH_LIST = ({ page, offset, search }) =>
  `ShuttleTruck/fetchPremiumWaiverForm?page=${page}&offset=${offset}&search=${search}`;
export const PWF_FETCH_BY_ID = ({ id }) => `ShuttleTruck/fetchPremiumWaiverFormById?id=${id}`;
export const IWF_FETCH_LIST = ({ page, offset, search }) =>
  `ShuttleTruck/fetchIncidentWaiverForm?page=${page}&offset=${offset}&search=${search}`;
export const NIW_FETCH_LIST = ({ page, offset, search }) =>
  `ShuttleTruck/NoInstallationWinningsFormsList?page=${page}&offset=${offset}&search=${search}`;
export const DAMAGE_REPORT_FETCH_LIST = ({ page, offset, search }) =>
  `ShuttleTruck/damageReportFormsList?page=${page}&offset=${offset}&search=${search}`;
export const IWF_FETCH_BY_ID = ({ id }) => `ShuttleTruck/fetchIncidentWaiverFormById?id=${id}`;
export const FETCH_SHIFTS_BY_TRUCK_AND_DRIVER = ({ truckId, driverId }) =>
  `ShuttleTruck/fetchAllTruckShiftsByDriverIdAndTruckId?driverId=${driverId}&truckId=${truckId}`;
export const CLIENT_FORMS_BY_JOB_NO = ({ jobNo }) => `ShuttleTruck/findClientFormByJobNo?jobno=${jobNo}`;
export const TRUCK_SHIFT_BY_ID = ({ id }) => `ShuttleTruck/fetchTruckShiftById?shiftId=${id}`;
export const UPDATE_DT_APP_IMAGE_OFFSIDER = ({ id, image }) => `ShuttleTruck/updateDtAppImage?image=${image}&id=${id}`;

// Tools api
export const ADD_TOOLS = 'Tools/addTool';
export const FETCH_TOOLS = ({ page, offSet, search = '' }) =>
  `Tools/fetchAllTools?page=${page}&offset=${offSet}&search=${search}`;

// Accounts api
export const FETCH_ALL_ACCOUNTS = 'Accounts/fecthAllAccounts';

// Loading/Unloading apis
export const EDIT_LABOUR_SHIFT = 'Loading/editLabourShift';
export const END_CW_SHIFT = 'Loading/endLoadingShiftForCW';
export const REMOVE_LABOURS_FROM_CONTAINER_SHIFT = 'Loading/removeLaboursFromContainerShift';
export const ADD_MORE_LABOURS_TO_LOADING_SHIFT = 'Loading/addMoreLaboursToLoadingShift';
export const START_CONTAINER_WORK_SHIFT = 'Loading/startContainerWorkShift';
export const START_LOADING_SHIFT = 'Loading/startLoadingShift';
export const UPDATE_LOADING_SHIFT_FINANCES = 'Loading/updateLoadingShiftFinance';
export const FETCH_LOADING_SHIFTS_BY_DRIVER_ID = ({ driverId, offset, page }) =>
  `Loading/fetchAllLoadingShiftsByDriverId?page=${page}&offset=${offset}&driverId=${driverId}`;
export const FETCH_ONGOING_LOADING_SHIFT = ({ driverId }) => `Loading/fetchOngoingLoadingShift?driverId=${driverId}`;
export const END_LOADING_SHIFT = 'Loading/endLoadingShift';
export const FETCH_ALL_LOADING_SHIFT = ({ page, offSet, search = '' }) =>
  `Loading/fetchAllLoadingShifts?page=${page}&offset=${offSet}&search=${search}`;
export const FETCH_ALL_LOADING_SHIFT_CW = ({ page, offSet, search = '' }) =>
  `Loading/fetchAllLoadingShiftsCW?page=${page}&offset=${offSet}&search=${search}`;
export const FETCH_LOADING_CONTAINERS = ({ date = '' }) => `Loading/fetchAllLoadingContainerForToday?date=${date}`;
export const UPDATE_SHIFT_TIME = ({ id, startTime = '', endTime = '' }) =>
  `Loading/updateTimeOfShift?id=${id}&startTime=${startTime}&endTime=${endTime}`;

// Inovice api
export const FETCH_SHIFTS_FOR_DRIVERS_INVOICE = ({ userId }) => `ShuttleTruck/shiftsForInvoice?driverId=${userId}`;
export const FETCH_SHIFTS_FOR_LOADERS_INVOICE = ({ userId }) =>
  `Loading/fetchAllLoadingShiftsForInvoice?driverId=${userId}`;
export const FETCH_DRIVERS_INVOICES = ({ userId, page, offset }) =>
  `Invoice/fetchUserInvoices?userId=${userId}&page=${page}&offset=${offset}`;
export const FETCH_All_INVOICES = ({ search, page, offset, lastGen }) =>
  `Invoice/fetchAllInvoices?page=${page}&offset=${offset}&search=${search}&lastGenerated=${lastGen}`;
export const FETCH_DRIVER_EARNINGS = ({ userId }) => `Invoice/fetchTotalEarnedByDriverId?userId=${userId}`;
export const FETCH_INVOICE_BY_ID = ({ invoiceId }) => `Invoice/fetchInvoiceById?id=${invoiceId}`;
export const INVOICE_CHECKUP = ({ userId }) => `Invoice/invoiceCheckup?driverId=${userId}`;
export const ADD_OR_REMOVE_GST = ({ invoiceId, type }) =>
  `Invoice/addOrRemoveGstToInvoice?invoiceId=${invoiceId}&type=${type}`;
export const GENERATE_INVOICE = '/Invoice/generateInvoice';
export const UPDATE_INVOICE = '/Invoice/updateInvoice';

// Expenses api
export const FETCH_ALL_EXPENSES = ({ page, offset, search = '', misc = false }) =>
  `Expense/fetchAllExpense?page=${page}&offset=${offset}&search=${search}&misc=${misc}`;
export const DELETE_EXPENSE_BY_ID = ({ Id }) => `Expense/deleteExpenseById?Id=${Id}`;
export const ADD_NEW_EXPENSE = '/Expense/addExpense';
export const EDIT_EXPENSE = '/Expense/EditExpense';

// PNL apis
export const FETCH_PROFIT_SHIFTS_BY_DATE = ({ fromDate, toDate }) =>
  `Pnl/fetchProfitOfShifts?fromDate=${fromDate}&toDate=${toDate}`;

// Task Reminder apis
export const REMIND_ASSIGNEES_ABOUT_TASK = ({ taskId }) =>
  `Reminders/sendMessageToTaskAssigneesByTaskId?taskId=${taskId}`;
export const FETCH_TASKS_BY_ID = ({ taskId }) => `Tasks/fetchTaskById?taskId=${taskId}`;
export const FETCH_TASKS_BY_DATE = ({ fromDate, toDate }) =>
  `Tasks/fetchAllTasksByDate?startDate=${fromDate}&endDate=${toDate}`;
export const FETCH_TASKS_BY_DATE_AND_ID = ({ fromDate, toDate, userId }) =>
  `Tasks/fetchAllTasksByDriverId?startDate=${fromDate}&endDate=${toDate}&userId=${userId}`;
export const FETCH_TASKS_BY_DATE_AND_ACCOUNT = ({ fromDate, toDate, accountId = 0, isDt = false }) =>
  `Tasks/fetchAllTasksByAccountId?startDate=${fromDate}&endDate=${toDate}&accountId=${accountId}&isDt=${isDt}`;
export const DELETE_TASK_FILE_BY_ID = ({ taskId, fileId }) =>
  `Tasks/deleteTaskFileById?taskId=${taskId}&fileId=${fileId}`;
export const DELETE_TASK_BY_ID = ({ taskId }) => `Tasks/deleteTaskById?taskId=${taskId}`;
export const UPLOAD_TASK_FILES_BY_OWNER = 'Tasks/uploadFilesToTaskByOwner';
export const UPLOAD_TASK_FILES_BY_CLIENT = 'Tasks/uploadFilesToTaskByClient';
export const UPDATE_TASK = 'Tasks/updateTaskById';
export const CREATE_TASK = 'Tasks/createTasks';
export const CREATE_BULK_TASKS = 'Tasks/uploadBulkTasks';

// fuel cross check apis
export const FUEL_CROSS_CHECK_FETCH = 'ShuttleTruck/fetchShiftsForFuelCrossCheck';
export const FETCH_ALL_USERS_WITH_FUEL_CARDS = 'ShuttleTruck/fetchAllUsersWithFuelCards';
export const FUEL_CROSS_CHECK_MANUAL_FETCH = 'ShuttleTruck/fetchShiftsForFuelsForManualCheck';

// Deductions Apis
export const FETCH_ALL_DEDUCTIONS = ({ page, offset, search = '' }) =>
  `Deductions/fetchListOfMoney?page=${page}&offset=${offset}&search=${search}`;
export const DELETE_DEDUCTIONS = ({ accountId, page, offset, userId }) =>
  `Deductions/accoutMoneyDeletion?accountId=${accountId}&page=${page}&offset=${offset}&userId=${userId}`;
export const EDIT_DEDUCTIONS = 'Deductions/accoutMoneyEdit';

export const ADD_DEDUCTIONS = 'Deductions/accountMoneyAddition';
export const FETCH_ALL_DEDUCTIONS_BY_USER = 'Deductions/fetchListOfMoneyByUser';
export const FETCH_ALL_DEDUCTIONS_BY_DRIVER_ID = ({ page, offset, search = '', userId }) =>
  `Deductions/fetchListOfMoneyByUserId?page=${page}&offset=${offset}&search=${search}&userId=${userId}`;
export const FETCH_PAYBACK_LIST_BY_DRIVER_ID = ({ page, offset, userId }) =>
  `Deductions/fetchListOfPaybackByUserId?page=${page}&offset=${offset}&userId=${userId}`;
export const FETCH_DEDUCTIONS_LIST_BY_DRIVER_ID = ({ page, offset, userId }) =>
  `Deductions/fetchListOfDeductionByUserId?page=${page}&offset=${offset}&userId=${userId}`;
export const FETCH_MONEY_DETAILS_BY_DRIVER_ID = ({ userId }) =>
  `Deductions/fetchDetailsOfMoneyByUserId?userId=${userId}`;

// Report Apis
export const FETCH_DAILY_REPORT = ({ date }) => `Reports/fetchDailyReport?date=${date}`;
export const FETCH_PROFIT_BY_TRUCK_REPORT = ({ fromDate, toDate }) =>
  `Reports/fetchProfitsReportByTrucks?fromDate=${fromDate}&toDate=${toDate}`;
export const FETCH_WINNING_TIMESHEET_REPORT = ({ fromDate, toDate }) =>
  `Reports/fetchWinningsTimeSheet?fromDate=${fromDate}&toDate=${toDate}`;

// Repair History Apis
export const ADD_REPAIR_HISTORY = 'RepairHistory/AddVehicleRepairHistory';
