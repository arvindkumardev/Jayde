const LOGIN_URL = `/api/mobile/login`;
const USERS = `/api/mobile/admin/users/`;
const IMAGE_UPLOAD = `/api/mobile/imageUpload`;
const SUB_USER = `/api/mobile/user/subUserList/`;
const ADD_SUB_USER = `/api/mobile/user/addSubUser`;
const FORGOT_PASSWORD = `/api/mobile/forgot/sendForgotMail`;
const SIGN_UP = `/api/mobile/register`;
const PROFILE_UPDATE = `/api/mobile/user/updateProfile`;
const BUSINESS_UPDATE = `/api/mobile/business/updateProfile`;
const GETBUSINESS_PROFILE = `/api/mobile/business/viewProfile`;
const OWNED_CONTRACTS = `/api/mobile/smartContracts/ownedContracts/`;

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
const DELETE_QUOTE_PAPER = `/api/mobile/paper/deleteQuote`;
const DELETE_QUOTE_PLASTIC = `/api/mobile/plastic/deleteQuote`;
const DELETE_QUOTE_MIX_WASTER = `/api/mobile/mix/deleteQuote`;
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
const ADD_SUBCATEGORY = `/api/mobile/admin/addSubCategory`;
const LIST_SUBCATEGORY = `/api/mobile/admin/listSubcategory/`;
const DELETE_SUBCATEGORY = `/api/mobile/admin/deleteSubCategory`;
const PROVISIONAL_PRICE_LIST = `/api/mobile/admin/listSpecialPricing/`;
const CUSTOMER = `/api/mobile/customers`;
const ADD_PROVISIONAL_PRICE = `/api/mobile/admin/addSpecialPricing`;
const DELETE_PRICE = `/api/mobile/admin/deleteSpecialPricing`;
const EPR_LIST = `/api/mobile/admin/epr/`;
const EPR_Aggregatorlist = `/api/mobile/admin/eprAggregators`;
const ADDEPR_AGGREGATOR = `/api/mobile/admin/addAggregatorsERP`;
const REMOVEEPR_AGGREGATOR = `/api/mobile/admin/removeAggregatorMapping`;

// Aggregators
const AGGREGATOR_INVENTORY = `/api/mobile/aggregator/inventory/`;
const ASSIGN_AGGREGATOR = `/api/mobile/admin/assignAggregator`;
const AGGREGATOR_NEWORDER = `/api/mobile/aggregator/newOrders/`;
const CONFIRM_SCHEDULE = `/api/mobile/aggregator/reScheduleConfirm`;
const AGGREGATOR_REJECTORDER = `/api/mobile/aggregator/reject`;
const GET_AGGREGATORS = `/api/mobile/aggregators`;
const AGGREGATORS_CONFIRM_NEW_ORDER = `/api/mobile/aggregator/confirm`;
const CONFIRM_WEIGHT = `/api/mobile/aggregator/confirmWeight`;
const PROPOSE_WEIGHT = `/api/mobile/aggregator/proposeWeight`;
const CONFIRM_PAYMENT = `/api/mobile/aggregator/confirmPayment`;
const CONFIRM_PICKUP = `/api/mobile/aggregator/confirmPickup`;
const CONFIRM_RECEIPT = `/api/mobile/aggregator/confirmReceipt`;
const AGGREGATOR_SWO_TO_AGGREGATOR = `/api/mobile/aggregator/sendWorkOrderToAggregator`;
const AGGREGATOR_SWO_TO_RECYCLER = `/api/mobile/aggregator/sendWorkOrderToRecycler`;
const AGGREGATOR_WORK_ORDER_LIST = `/api/mobile/aggregator/workOrder/`;
const AGGREGATOR_COMPLETED_ORDER_LIST = `/api/mobile/aggregator/completedOrders/`;
const AGGREGATOR_SCHEDULE_ORDER_LIST = `/api/mobile/aggregator/scheduledOrders/`;
const AGGREGATOR_SCHEDULE_ORDER_DETAIL = `api/mobile/aggregator/scheduledOrderDetail`;
const AGGREGATOR_ADD_RECEIPT_DATA = `/api/mobile/aggregator/addReceiptData`;
const AGGREGATOR_CONFIRM_PAYMENT_WORK_ORDER = `/api/mobile/aggregator/confirmPaymentWork`;
const AGGREGATOR_CONFIRM_WORK_ORDER_PAYMENT =  `/api/mobile/aggregator/confirmWorkOrderPayment`;

// Recyclers
const GET_RECYCLERS = `/api/mobile/recyclers`;
const RECYCLER_CONFIRM_NEW_ORDER = `/api/mobile/recycler/confirm`;
const RECYCLER_INVENTORY = `/api/mobile/recycler/inventory/`;
const RECYCLER_NEW_ORDER = `/api/mobile/recycler/newOrders/`;
const RECYCLER_SWO_TO_AGGREGATOR = `/api/mobile/recycler/sendWorkOrderToAggregator`;
const RECYCLER_SWO_TO_RECYCLER = `/api/mobile/recycler/sendWorkOrderToRecycler`;
const RECYCLER_SCHEDULE_ORDER_LIST = `/api/mobile/recycler/scheduledOrders/`;
const RECYCLER_WORK_ORDER_LIST = `/api/mobile/recycler/workOrder/`;
const RECYCLER_COMPLETED_ORDER_LIST = `/api/mobile/recycler/completedOrders/`;
const RECYCLER_REJECT_ORDER = `/api/mobile/recycler/reject`;
const RECYCLER_CONFIRM_RESCHEDULE = `/api/mobile/recycler/reScheduleConfirm`;
const RECYCLER_CONFIRM_WEIGHT = `/api/mobile/recycler/confirmWeight`;
const RECYCLER_PROPOSE_WEIGHT = `/api/mobile/recycler/proposeWeight`;
const RECYCLER_CONFIRM_PAYMENT = `/api/mobile/recycler/confirmPayment`;
const RECYCLER_CONFIRM_PICKUP = `/api/mobile/recycler/confirmPickup`;
const RECYCLER_CONFIRM_RECEIPT = `/api/mobile/recycler/confirmReceipt`;
const RECYCLER_SCHEDULE_ORDER_DETAIL = `api/mobile/recycler/scheduledOrderDetail`;
const RECYCLER_ADD_RECEIPT_DATA = `/api/mobile/recycler/addReceiptData`;
const RECYCLER_CONFIRM_PAYMENT_WORK_ORDER = `/api/mobile/recycler/confirmPaymentWork`;

export {
     SUB_USER, ADD_SUB_USER, LOGIN_URL, SIGN_UP, PROFILE_UPDATE, BUSINESS_UPDATE, GETBUSINESS_PROFILE,
     OWNED_CONTRACTS, FORGOT_PASSWORD, GET_SUB_CATEGORY, GET_UNITS, CREATE_QUOTE_PAPER, CREATE_QUOTE_PLASTIC,
     CREATE_QUOTE_MIX_WASTER, DELETE_QUOTE_MIX_WASTER, DELETE_QUOTE_PLASTIC, DELETE_QUOTE_PAPER, USERS, GET_CATEGORIES,
     IMAGE_UPLOAD, ENABLE_USER, DISABLE_USER, ADMIN_NEW_ORDER, ACCEPT_ORDER, REJECT_ORDER, ADD_SUBCATEGORY, LIST_SUBCATEGORY, DELETE_SUBCATEGORY, EPR_LIST, EPR_Aggregatorlist, ADDEPR_AGGREGATOR, REMOVEEPR_AGGREGATOR,
     GET_AGGREGATORS, AGGREGATORS_CONFIRM_NEW_ORDER, RECYCLER_CONFIRM_NEW_ORDER, GET_RECYCLERS, RECYCLER_SWO_TO_AGGREGATOR, RECYCLER_SWO_TO_RECYCLER,
     RECYCLER_SCHEDULE_ORDER_LIST, RECYCLER_WORK_ORDER_LIST, RECYCLER_COMPLETED_ORDER_LIST,
     ASSIGN_AGGREGATOR, AGGREGATOR_NEWORDER, RECYCLER_REJECT_ORDER, RECYCLER_CONFIRM_RESCHEDULE, RECYCLER_INVENTORY,
     RECYCLER_CONFIRM_WEIGHT, RECYCLER_PROPOSE_WEIGHT, RECYCLER_CONFIRM_PAYMENT, RECYCLER_CONFIRM_PICKUP, RECYCLER_CONFIRM_RECEIPT,
     RECYCLER_SCHEDULE_ORDER_DETAIL, RECYCLER_ADD_RECEIPT_DATA, RECYCLER_CONFIRM_PAYMENT_WORK_ORDER,
     ADD_SCHEDULE_PAPER, ADD_SCHEDULE_PLASTIC, ADD_SCHEDULE_MIX_WASTE, SELLER_MY_ORDER, RECYCLER_NEW_ORDER, CONFIRM_SCHEDULE, AGGREGATOR_REJECTORDER,
     CONFIRM_WEIGHT, PROPOSE_WEIGHT, CONFIRM_PAYMENT, CONFIRM_PICKUP, CONFIRM_RECEIPT,
     SELLER_CONFIRM_RESCHEDULE, SELLER_CONFIRM_PROPOSED_WEIGHT, SELLER_CONFIRM_PAYMENT, ADD_ORDER_PAPER, ADD_ORDER_PLASTIC, ADD_ORDER_MIX_WASTER, SELLER_REQUEST_CALLBACK,
     AGGREGATOR_INVENTORY, AGGREGATOR_SWO_TO_AGGREGATOR, AGGREGATOR_SWO_TO_RECYCLER, AGGREGATOR_WORK_ORDER_LIST,
     AGGREGATOR_COMPLETED_ORDER_LIST, AGGREGATOR_SCHEDULE_ORDER_LIST, AGGREGATOR_SCHEDULE_ORDER_DETAIL, AGGREGATOR_ADD_RECEIPT_DATA,AGGREGATOR_CONFIRM_PAYMENT_WORK_ORDER,
     AGGREGATOR_CONFIRM_WORK_ORDER_PAYMENT,
     PROVISIONAL_PRICE_LIST, CUSTOMER, ADD_PROVISIONAL_PRICE, DELETE_PRICE
};
