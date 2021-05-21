import useAxios from 'axios-hooks';
import {
  AGGREGATOR_NEWORDER, AGGREGATOR_CREATE_ORDER, AGGREGATOR_WORK_ORDER_LIST,
  AGGREGATOR_SCHEDULE_ORDER_LIST, AGGREGATOR_COMPLETED_ORDER_LIST
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

const createWorkOrder = () => {
  return useAxios(
    {
      url: AGGREGATOR_CREATE_ORDER,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

export { aggregatorNewOrder, createWorkOrder, getWorkOrderList, aggregatorGetCompletedOrder, aggregatorGetScheduleOrder };