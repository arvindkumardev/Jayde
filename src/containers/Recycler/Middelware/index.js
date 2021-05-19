import useAxios from 'axios-hooks';
import { RECYCLER_NEW_ORDER } from '../../../utils/urls';

const getWorkOrder = (pageNumber) => { 
    return useAxios(
      {
        url: RECYCLER_NEW_ORDER + pageNumber,
        method: 'GET',
        headers: { 'content-type': 'application/json'}
      },
      { manual: true }
   )
  };
  
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

  export {getWorkOrder, Inventory};