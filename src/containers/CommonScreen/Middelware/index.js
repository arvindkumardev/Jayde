import useAxios from 'axios-hooks';
import {
  RECYCLER_COMPLETED_ORDER_LIST, RECYCLER_CONFIRM_WEIGHT, RECYCLER_PROPOSE_WEIGHT, RECYCLER_CONFIRM_PAYMENT,
  RECYCLER_CONFIRM_PICKUP, RECYCLER_CONFIRM_RECEIPT, RECYCLER_SCHEDULE_ORDER_DETAIL, RECYCLER_ADD_RECEIPT_DATA,
  AGGREGATOR_COMPLETED_ORDER_LIST,
  AGGREGATOR_SWO_TO_AGGREGATOR, AGGREGATOR_SWO_TO_RECYCLER,
  AGGREGATOR_REJECTORDER, CONFIRM_SCHEDULE, RECYCLER_CONFIRM_SCHEDULE, RECYCLER_REJECT_ORDER,
  CONFIRM_WEIGHT, PROPOSE_WEIGHT, CONFIRM_PAYMENT, CONFIRM_PICKUP, CONFIRM_RECEIPT, AGGREGATOR_SCHEDULE_ORDER_DETAIL,
  AGGREGATOR_ADD_RECEIPT_DATA
} from '../../../utils/urls';


const getCompletedOrder = (pageNumber, userRole) => {
  return useAxios(
    {
      url: userRole === 'recycler' ? RECYCLER_COMPLETED_ORDER_LIST + pageNumber : AGGREGATOR_COMPLETED_ORDER_LIST + pageNumber,
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};


const rejectOrder = (userRole) => {
  return useAxios(
    {
      url: userRole === 'recycler' ? RECYCLER_REJECT_ORDER : AGGREGATOR_REJECTORDER,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const confirmSchedule = (userRole) => {
  return useAxios(
    {
      url: userRole === 'recycler' ? RECYCLER_CONFIRM_SCHEDULE : CONFIRM_SCHEDULE,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};


const weightConfirm = (userRole) => {
  return useAxios(
    {
      url: userRole === 'recycler' ? RECYCLER_CONFIRM_WEIGHT : CONFIRM_WEIGHT,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const weightPropose = (userRole) => {
  return useAxios(
    {
      url: userRole === 'recycler' ? RECYCLER_PROPOSE_WEIGHT : PROPOSE_WEIGHT,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const paymentConfirm = (userRole) => {
  return useAxios(
    {
      url: userRole === 'recycler' ? RECYCLER_CONFIRM_PAYMENT : CONFIRM_PAYMENT,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const pickupConfirm = (userRole) => {
  return useAxios(
    {
      url: userRole === 'recycler' ? RECYCLER_CONFIRM_PICKUP : CONFIRM_PICKUP,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const receiptConfirm = (userRole) => {
  return useAxios(
    {
      url: userRole === 'recycler' ? RECYCLER_CONFIRM_RECEIPT : CONFIRM_RECEIPT,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const scheduleOrderDetail = (userRole) => {
  return useAxios(
    {
      url: userRole === 'recycler' ? RECYCLER_SCHEDULE_ORDER_DETAIL : AGGREGATOR_SCHEDULE_ORDER_DETAIL,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const addReceiptQuantity = () => {
  return useAxios(
    {
      url: AGGREGATOR_ADD_RECEIPT_DATA,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const createWorkOrder = (status) => {
  return useAxios(
    {
      url: status == 1 ? AGGREGATOR_SWO_TO_AGGREGATOR : AGGREGATOR_SWO_TO_RECYCLER,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};


export {
  createWorkOrder, rejectOrder, confirmSchedule, getCompletedOrder,
  weightConfirm, weightPropose, paymentConfirm, pickupConfirm, receiptConfirm,
   scheduleOrderDetail, addReceiptQuantity
};