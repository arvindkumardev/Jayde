import useAxios from 'axios-hooks';
import {
  AGGREGATOR_NEWORDER, AGGREGATOR_SWO_TO_AGGREGATOR, AGGREGATOR_SWO_TO_RECYCLER, AGGREGATOR_WORK_ORDER_LIST,
  AGGREGATOR_SCHEDULE_ORDER_LIST, AGGREGATOR_COMPLETED_ORDER_LIST, AGGREGATOR_REJECTORDER, CONFIRM_SCHEDULE,
  CONFIRM_WEIGHT, PROPOSE_WEIGHT, CONFIRM_PAYMENT, CONFIRM_PICKUP, CONFIRM_RECEIPT, AGGREGATOR_SCHEDULE_ORDER_DETAIL,
  AGGREGATOR_ADD_RECEIPT_DATA
} from '../../../utils/urls';


const getWorkOrderList = (pageNumber) => {
  return useAxios(
    {
      url: AGGREGATOR_WORK_ORDER_LIST + pageNumber,
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    },
    { manual: true }
  )
};

const aggregatorNewOrder = (pageNumber) => {
  return useAxios(
    {
      url: AGGREGATOR_NEWORDER + pageNumber,
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const aggregatorGetCompletedOrder = (pageNumber) => {
  return useAxios(
    {
      url: AGGREGATOR_COMPLETED_ORDER_LIST + pageNumber,
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const aggregatorGetScheduleOrder = (pageNumber) => {
  return useAxios(
    {
      url: AGGREGATOR_SCHEDULE_ORDER_LIST + pageNumber,
      method: 'GET',
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

const aggreRejectorder = () => {
  return useAxios(
    {
      url: AGGREGATOR_REJECTORDER,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const confirmSchedule = () => {
  return useAxios(
    {
      url: CONFIRM_SCHEDULE,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};


const weightConfirm = () => {
  return useAxios(
    {
      url: CONFIRM_WEIGHT,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const weightPropose = () => {
  return useAxios(
    {
      url: PROPOSE_WEIGHT,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const paymentConfirm = () => {
  return useAxios(
    {
      url: CONFIRM_PAYMENT,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const pickupConfirm = () => {
  return useAxios(
    {
      url: CONFIRM_PICKUP,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const receiptConfirm = () => {
  return useAxios(
    {
      url: CONFIRM_RECEIPT,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const scheduleOrderDetail = () => {
  return useAxios(
    {
      url: AGGREGATOR_SCHEDULE_ORDER_DETAIL,
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

export {
  aggregatorNewOrder, createWorkOrder, getWorkOrderList, aggregatorGetCompletedOrder,
  aggregatorGetScheduleOrder, aggreRejectorder, confirmSchedule, 
  weightConfirm, weightPropose, paymentConfirm, pickupConfirm, receiptConfirm, scheduleOrderDetail, addReceiptQuantity
};