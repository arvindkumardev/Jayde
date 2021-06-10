import useAxios from 'axios-hooks';
import {USERS, ENABLE_USER, DISABLE_USER, ADMIN_NEW_ORDER, ACCEPT_ORDER, REJECT_ORDER, ASSIGN_AGGREGATOR, ADD_SUBCATEGORY, LIST_SUBCATEGORY, PROVISIONAL_PRICE_LIST, CUSTOMER, ADD_PROVISIONAL_PRICE,} from '../../..//utils/urls';

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

export {users, enableUserByAdmin, disableUserByAdmin, acceptOrder, rejectOrder, assignAggregator, addSubCategory, listSubCategory, provisionalPricingList, getCustomer, addProvisionalPrice}

