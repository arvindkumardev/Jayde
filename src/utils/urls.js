const LOGIN_URL = `/api/mobile/login`;
const GET_UNITS = `/api/mobile/units`;
const GET_CATEGORIES = `/api/mobile/category`;
const GET_SUB_CATEGORY = `/api/mobile/subCategory`;
const CREATE_QUOTE = `/api/mobile/paper/addQuote`;
const ADD_SCHEDULE = `/api/mobile/paper/addSchedule`;
const USERS = `/api/mobile/admin/users/`;
const IMAGE_UPLOAD = `/api/mobile/imageUpload`;
const ENABLE_USER = `/api/mobile/admin/activateUser`;
const DISABLE_USER = `/api/mobile/admin/deactivateUser`;
const ADMIN_NEW_ORDER = `/api/mobile/admin/newOrders/`;
const ACCEPT_ORDER = `/api/mobile/admin/confirmOrder`;
const REJECT_ORDER = `/api/mobile/admin/rejectOrder`;
const GET_AGGREGATORS = `api/mobile/aggregators`;
const GET_RECYCLERS = `/api/mobile/recyclers`;
const ASSIGN_AGGREGATOR = `api/mobile/admin/assignAggregator`;
const AGGREGATOR_NEWORDER = `api/mobile/aggregator/newOrders`;
const CONFIRM_SCHEDULE = `api/mobile/aggregator/reScheduleConfirm`;
const AGGREGATOR_REJECTORDER = `api/mobile/aggregator/reject`;


export { LOGIN_URL, GET_SUB_CATEGORY, GET_UNITS, CREATE_QUOTE, USERS, GET_CATEGORIES,
     IMAGE_UPLOAD, ENABLE_USER, DISABLE_USER, ADMIN_NEW_ORDER, ACCEPT_ORDER, REJECT_ORDER,
     GET_AGGREGATORS, GET_RECYCLERS, ASSIGN_AGGREGATOR, AGGREGATOR_NEWORDER, ADD_SCHEDULE };
