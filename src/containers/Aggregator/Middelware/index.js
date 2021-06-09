import useAxios from 'axios-hooks';
import { AGGREGATOR_WORK_ORDER_LIST, AGGREGATOR_SCHEDULE_ORDER_LIST } from '../../../utils/urls';


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

export {
  getWorkOrderList, aggregatorGetScheduleOrder
};