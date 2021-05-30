import {ADD_SUB_USER, SUB_USER, NEW_ORDERS, USERS,
   ENABLE_USER, DISABLE_USER, ADMIN_NEW_ORDER,
   ACCEPT_ORDER, REJECT_ORDER, GET_AGGREGATORS,
   GET_RECYCLERS, GET_AGGREGATOR_INVENTORY, ASSIGN_AGGREGATOR } from "../../utils/urls";
import useAxios from "axios-hooks";
 
const newOrder = () => {
   return useAxios(
     {
       url: NEW_ORDERS,
       method: 'GET',
       headers: { 'content-type': 'application/json'}
     },
     { manual: true }
  )
 };

 const subUser = (pageNumber) => {  
  return useAxios(
    {
      url: SUB_USER + pageNumber,
      method: 'GET',
      headers: { 'content-type': 'application/json'},
    },
    { manual: true }
 )
};

const addSubUser = () => {
  return useAxios(
    {
      url: ADD_SUB_USER,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}

 const users = (pageNumber) => {  
  return useAxios(
    {
      url: USERS + pageNumber,
      method: 'GET',
      headers: { 'content-type': 'application/json'},
    },
    { manual: true }
 )
};

const adminNewOrder = (pageNumber) => {  
  return useAxios(
    {
      url: ADMIN_NEW_ORDER+pageNumber,
      method: 'GET',
      headers: { 'content-type': 'application/json'}
    },
    { manual: true }
 )
};

const enableUserByAdmin = () => {
  return useAxios(
    {
      url: ENABLE_USER,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}

const disableUserByAdmin = () => {
  return useAxios(
    {
      url: DISABLE_USER,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}


const acceptOrder = () => {
  return useAxios(
    {
      url: ACCEPT_ORDER,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}

const rejectOrder = () => {
  return useAxios(
    {
      url: REJECT_ORDER,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}

const getAggregators = () => {
  return useAxios(
    {
      url: GET_AGGREGATORS,
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const getRecyclers = () => {
  return useAxios(
    {
      url: GET_RECYCLERS,
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const getAggregatorInventory = (pageNumber=1) => {
   return useAxios(
     {
       url: GET_AGGREGATOR_INVENTORY+pageNumber,
       method: 'GET',
       headers: { 'content-type': 'application/json' },
     },
     { manual: true }
   );
}

const assignAggregator = () => {
  return useAxios(
    {
      url: ASSIGN_AGGREGATOR,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}


export { newOrder, users, subUser, addSubUser, enableUserByAdmin, disableUserByAdmin, adminNewOrder,
   acceptOrder, rejectOrder, getAggregators, getRecyclers, getAggregatorInventory, assignAggregator };