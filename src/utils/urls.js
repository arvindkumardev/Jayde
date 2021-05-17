const LOGIN_URL = `/api/mobile/login`;
const USERS = `/api/mobile/admin/users/`;
const IMAGE_UPLOAD = `/api/mobile/imageUpload`;

// Seller
const GET_UNITS = `/api/mobile/units`;
const GET_CATEGORIES = `/api/mobile/category`;
const GET_SUB_CATEGORY = `/api/mobile/subCategory`;
const CREATE_QUOTE_PAPER = `/api/mobile/paper/addQuote`;
const CREATE_QUOTE_PLASTIC = `/api/mobile/plastic/addQuote`;
const CREATE_QUOTE_MIX_WASTER = `/api/mobile/mix/addQuote`;
const ADD_SCHEDULE_PAPER = `/api/mobile/paper/addSchedule`;
const ADD_SCHEDULE_PLASTIC = `/api/mobile/plastic/addSchedule`;
const ADD_SCHEDULE_MIX_WASTE = `/api/mobile/mix/addSchedule`;
const SELLER_MY_ORDER = `/api/mobile/order/`;

// Admin
const ADMIN_NEW_ORDER = `/api/mobile/admin/newOrders/`;
const ENABLE_USER = `/api/mobile/admin/activateUser`;
const DISABLE_USER = `/api/mobile/admin/deactivateUser`;
const ACCEPT_ORDER = `/api/mobile/admin/confirmOrder`;
const REJECT_ORDER = `/api/mobile/admin/rejectOrder`;

// Aggregators
const ASSIGN_AGGREGATOR = `/api/mobile/admin/assignAggregator`;
const AGGREGATOR_NEWORDER = `/api/mobile/aggregator/newOrders/`;
const CONFIRM_SCHEDULE = `/api/mobile/aggregator/reScheduleConfirm`;
const AGGREGATOR_REJECTORDER = `/api/mobile/aggregator/reject`;
const GET_AGGREGATORS = `/api/mobile/aggregators`;

// Recyclers
const GET_RECYCLERS = `/api/mobile/recyclers`;
const RECYCLER_NEW_ORDER = `/api/mobile/recycler/newOrders/1`

export { LOGIN_URL, GET_SUB_CATEGORY, GET_UNITS, CREATE_QUOTE_PAPER, CREATE_QUOTE_PLASTIC, CREATE_QUOTE_MIX_WASTER, USERS, GET_CATEGORIES,
     IMAGE_UPLOAD, ENABLE_USER, DISABLE_USER, ADMIN_NEW_ORDER, ACCEPT_ORDER, REJECT_ORDER,
     GET_AGGREGATORS, GET_RECYCLERS, ASSIGN_AGGREGATOR, AGGREGATOR_NEWORDER,
     ADD_SCHEDULE_PAPER, ADD_SCHEDULE_PLASTIC, ADD_SCHEDULE_MIX_WASTE, SELLER_MY_ORDER, RECYCLER_NEW_ORDER };
