const LOGIN_URL = `/api/mobile/login`;
const USERS = `/api/mobile/admin/users/`;
const IMAGE_UPLOAD = `/api/mobile/imageUpload`;
const SUB_USER = `/api/mobile/user/subUserList/`;
const ADD_SUB_USER = `/api/mobile/user/addSubUser`;
const FORGOT_PASSWORD = `/api/mobile/forgot/sendForgotMail`;
const SIGN_UP = `/api/mobile/register`;
const PROFILE_UPDATE = `/api/mobile/user/updateProfile`;

// Seller
const GET_UNITS = `/api/mobile/units`;
const GET_CATEGORIES = `/api/mobile/category`;
const GET_SUB_CATEGORY = `/api/mobile/subCategory`;
const ADD_ORDER_PAPER = `/api/mobile/paper/addOrder`;
const ADD_ORDER_PLASTIC = `/api/mobile/plastic/addOrder`;
const ADD_ORDER_MIX_WASTER = `/api/mobile/mix/addOrder`;
const CREATE_QUOTE_PAPER = `/api/mobile/paper/addQuote`;
const CREATE_QUOTE_PLASTIC = `/api/mobile/plastic/addQuote`;
const CREATE_QUOTE_MIX_WASTER = `/api/mobile/mix/addQuote`;
const SELLER_REQUEST_CALLBACK = `/api/mobile/order/requestCallback`;

const ADD_SCHEDULE_PAPER = `/api/mobile/paper/addSchedule`;
const ADD_SCHEDULE_PLASTIC = `/api/mobile/plastic/addSchedule`;
const ADD_SCHEDULE_MIX_WASTE = `/api/mobile/mix/addSchedule`;
const SELLER_MY_ORDER = `/api/mobile/order/`;
const SELLER_CONFIRM_RESCHEDULE = `/api/mobile/order/confirmReschedule`;
const SELLER_CONFIRM_PROPOSED_WEIGHT = `/api/mobile/order/confirmProposedWeight`;
const SELLER_CONFIRM_PAYMENT = `/api/mobile/order/confirmPayment`;


// Admin
const ADMIN_NEW_ORDER = `/api/mobile/admin/newOrders/`;
const ENABLE_USER = `/api/mobile/admin/activateUser`;
const DISABLE_USER = `/api/mobile/admin/deactivateUser`;
const ACCEPT_ORDER = `/api/mobile/admin/confirmOrder`;
const REJECT_ORDER = `/api/mobile/admin/rejectOrder`;

// Aggregators
const GET_AGGREGATOR_INVENTORY = `/api/mobile/aggregator/inventory/`
const ASSIGN_AGGREGATOR = `/api/mobile/admin/assignAggregator`;
const AGGREGATOR_NEWORDER = `/api/mobile/aggregator/newOrders/`;
const CONFIRM_SCHEDULE = `/api/mobile/aggregator/reScheduleConfirm`;
const AGGREGATOR_REJECTORDER = `/api/mobile/aggregator/reject`;
const GET_AGGREGATORS = `/api/mobile/aggregators`;
const CONFIRM_WEIGHT = `/api/mobile/aggregator/confirmWeight`;
const PROPOSE_WEIGHT = `/api/mobile/aggregator/proposeWeight`;
const CONFIRM_PAYMENT = `/api/mobile/aggregator/confirmPayment`;
const CONFIRM_PICKUP =  `/api/mobile/aggregator/confirmPickup`;
const CONFIRM_RECEIPT = `/api/mobile/aggregator/confirmReceipt`;
const AGGREGATOR_SWO_TO_AGGREGATOR = `/api/mobile/aggregator/sendWorkOrderToAggregator`;
const AGGREGATOR_SWO_TO_RECYCLER = `/api/mobile/aggregator/sendWorkOrderToRecycler`;
const AGGREGATOR_WORK_ORDER_LIST = `/api/mobile/aggregator/workOrder/`;
const AGGREGATOR_COMPLETED_ORDER_LIST = `/api/mobile/aggregator/completedOrders/`;
const AGGREGATOR_SCHEDULE_ORDER_LIST = `/api/mobile/aggregator/scheduledOrders/`

// Recyclers
const GET_RECYCLERS = `/api/mobile/recyclers`;
const RECYCLER_NEW_ORDER = `/api/mobile/recycler/newOrders/`;

export {SUB_USER, ADD_SUB_USER, LOGIN_URL, SIGN_UP, PROFILE_UPDATE, FORGOT_PASSWORD, GET_SUB_CATEGORY, GET_UNITS, CREATE_QUOTE_PAPER, CREATE_QUOTE_PLASTIC, CREATE_QUOTE_MIX_WASTER, USERS, GET_CATEGORIES,
     IMAGE_UPLOAD, ENABLE_USER, DISABLE_USER, ADMIN_NEW_ORDER, ACCEPT_ORDER, REJECT_ORDER,
     GET_AGGREGATORS, GET_RECYCLERS, ASSIGN_AGGREGATOR, AGGREGATOR_NEWORDER,
     ADD_SCHEDULE_PAPER, ADD_SCHEDULE_PLASTIC, ADD_SCHEDULE_MIX_WASTE, SELLER_MY_ORDER, RECYCLER_NEW_ORDER, CONFIRM_SCHEDULE, AGGREGATOR_REJECTORDER, 
     CONFIRM_WEIGHT, PROPOSE_WEIGHT, CONFIRM_PAYMENT, CONFIRM_PICKUP, CONFIRM_RECEIPT, 
     SELLER_CONFIRM_RESCHEDULE,SELLER_CONFIRM_PROPOSED_WEIGHT, SELLER_CONFIRM_PAYMENT, ADD_ORDER_PAPER, ADD_ORDER_PLASTIC, ADD_ORDER_MIX_WASTER, SELLER_REQUEST_CALLBACK,
     GET_AGGREGATOR_INVENTORY, AGGREGATOR_SWO_TO_AGGREGATOR, AGGREGATOR_SWO_TO_RECYCLER, AGGREGATOR_WORK_ORDER_LIST,
     AGGREGATOR_COMPLETED_ORDER_LIST, AGGREGATOR_SCHEDULE_ORDER_LIST };
