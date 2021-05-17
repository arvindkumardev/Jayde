import useAxios from 'axios-hooks';
import {SELLER_MY_ORDER, ADMIN_NEW_ORDER, AGGREGATOR_NEWORDER, RECYCLER_NEW_ORDER  } from '../../utils/urls';

const USERS_ROLE_MENU = {
    seller : SELLER_MY_ORDER,
    admin : ADMIN_NEW_ORDER,
    aggregate : AGGREGATOR_NEWORDER ,
    recycler : RECYCLER_NEW_ORDER
}

const getOrderList = (role) => {  
 
    return useAxios(
      {
        url: USERS_ROLE_MENU[role]+1,
        method: 'GET',
        headers: { 'content-type': 'application/json'}
      },
      { manual: true }
   )
  };
  export {getOrderList};