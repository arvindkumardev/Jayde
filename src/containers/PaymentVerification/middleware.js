import useAxios from 'axios-hooks';
import { CONFIRM_WEIGHT, GET_UNITS, PROPOSE_WEIGHT, CONFIRM_PAYMENT, CONFIRM_PICKUP, CONFIRM_RECEIPT, AGGREGATOR_SCHEDULE_ORDER_DETAIL } from '../../utils/urls';

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

export { weightConfirm, weightPropose, paymentConfirm, pickupConfirm, receiptConfirm, scheduleOrderDetail };







