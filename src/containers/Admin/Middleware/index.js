import useAxios from 'axios-hooks';
import {USERS, ENABLE_USER, DISABLE_USER, ACCEPT_ORDER, REJECT_ORDER, ASSIGN_AGGREGATOR, ADD_SUBCATEGORY, 
   LIST_SUBCATEGORY, PROVISIONAL_PRICE_LIST, CUSTOMER, ADD_PROVISIONAL_PRICE, DELETE_PRICE, DELETE_SUBCATEGORY, EPR_LIST, EPR_AGGREGATOR,
   ADDEPR_AGGREGATOR, REMOVEEPR_AGGREGATOR } from '../../..//utils/urls';

const users = (pageNumber) => {
  return useAxios(
    {
      url: USERS + pageNumber,
      method: 'GET',
      headers: { 'content-type': 'application/json' },
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

  const addSubCategory = () => {
    return useAxios(
      {
        url: ADD_SUBCATEGORY,
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      },
      { manual: true }
    );
  }

  const listSubCategory = (pageNumber) => {
    return useAxios(
      {
        url: LIST_SUBCATEGORY + pageNumber,
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      },
      { manual: true }
    );
  }

  const deleteSubCategory = () => {
    return useAxios(
      {
        url: DELETE_SUBCATEGORY,
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

const provisionalPricingList = (pageNumber) => {
  return useAxios(
    {
      url: PROVISIONAL_PRICE_LIST + pageNumber,
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  )
};

const getCustomer = () => {
  return useAxios(
    {
      url: CUSTOMER,
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  )
};

const addProvisionalPrice = () => {
  return useAxios(
    {
      url: ADD_PROVISIONAL_PRICE,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}

const deletePricing = () => {
  return useAxios(
    {
      url: DELETE_PRICE,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}

const listEpr = (pageNumber) => {
  return useAxios(
    {
      url: EPR_LIST + pageNumber,
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}

const EprAggregator = () => {
  return useAxios(
    {
      url: EPR_AGGREGATOR,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}

const addEprAggregator = () => {
  return useAxios(
    {
      url: ADDEPR_AGGREGATOR,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}

const removeEprAggregator = () => {
  return useAxios(
    {
      url: REMOVEEPR_AGGREGATOR,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}

export {users, enableUserByAdmin, disableUserByAdmin, acceptOrder, rejectOrder, assignAggregator,
   addSubCategory, listSubCategory, provisionalPricingList, getCustomer, addProvisionalPrice, deletePricing, deleteSubCategory, listEpr, EprAggregator,
   addEprAggregator, removeEprAggregator}

