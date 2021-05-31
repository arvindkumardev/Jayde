import useAxios from 'axios-hooks';
import { RECYCLER_NEW_ORDER, RECYCLER_SCHEDULE_ORDER_LIST, RECYCLER_SWO_TO_AGGREGATOR,
   RECYCLER_SWO_TO_RECYCLER, RECYCLER_WORK_ORDER_LIST, RECYCLER_COMPLETED_ORDER_LIST} from '../../../utils/urls';
  
  const Inventory = (pageNumber) => { 
    return useAxios(
      {
        url: RECYCLER_NEW_ORDER + pageNumber,
        method: 'GET',
        headers: { 'content-type': 'application/json'}
      },
      { manual: true }
   )
  };

  const createWorkOrder = (status) => { 
    return useAxios(
      {
        url: status == 1 ? RECYCLER_SWO_TO_AGGREGATOR : RECYCLER_SWO_TO_RECYCLER,
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      },
      { manual: true }
    );
  };

  const recyclerGetScheduleOrder = (pageNumber) => {
    return useAxios(
      {
        url: RECYCLER_SCHEDULE_ORDER_LIST + pageNumber,
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      },
      { manual: true }
    );
  };

  const getWorkOrderList = (pageNumber) => {
    return useAxios(
      {
        url: RECYCLER_WORK_ORDER_LIST + pageNumber,
        method: 'GET',
        headers: { 'content-type': 'application/json' }
      },
      { manual: true }
    )
  };  

  const getCompletedOrder = (pageNumber) => {
    return useAxios(
      {
        url: RECYCLER_COMPLETED_ORDER_LIST + pageNumber,
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      },
      { manual: true }
    );
  };  

  export {Inventory, createWorkOrder, recyclerGetScheduleOrder, getWorkOrderList, getCompletedOrder};