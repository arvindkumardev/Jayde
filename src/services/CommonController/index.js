import useAxios from 'axios-hooks';
import {GET_CATEGORIES, GET_SUB_CATEGORY, GET_UNITS, ADD_SUB_USER, SUB_USER,
  GET_AGGREGATORS, GET_RECYCLERS,
  SELLER_MY_ORDER, AGGREGATOR_NEWORDER, RECYCLER_NEW_ORDER, ADMIN_NEW_ORDER,
  SELLER_TOP_ORDER, AGGREGATOR_TOP_ORDER, RECYCLER_TOP_ORDER,
  ADMIN_TOP_ORDER, BUSINESS_EPR_PARTNER, BUSINESS_EPR_AGGREGATOR, IS_PROFILE_COMPLETE} from '../../utils/urls';

  const USERS_ROLE_MENU = {
    seller: SELLER_MY_ORDER,
    admin: ADMIN_NEW_ORDER,
    aggregate: AGGREGATOR_NEWORDER,
    recycler: RECYCLER_NEW_ORDER
  }

  const USERS_ROLE_MENU_HOME = {
    seller: SELLER_TOP_ORDER,
    admin: ADMIN_TOP_ORDER,
    aggregate: AGGREGATOR_TOP_ORDER,
    recycler: RECYCLER_TOP_ORDER
  }

const getCategories = () => {
    return useAxios(
      {
        url: GET_CATEGORIES,
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      },
      { manual: true }
    );
  };
  
  const getSubCategories = () => {
    return useAxios(
      {
        url: GET_SUB_CATEGORY,
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      },
      { manual: true }
    );
  };

  const getUnits = () => {
    return useAxios(
      {
        url: GET_UNITS,
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      },
      { manual: true }
    );
  };

  const subUser = (pageNumber) => {
    return useAxios(
      {
        url: SUB_USER + pageNumber,
        method: 'GET',
        headers: { 'content-type': 'application/json' },
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

const getNewOrder = (role, pageNumber) => {
  return useAxios(
    {
      url: USERS_ROLE_MENU[role] + pageNumber,
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    },
    { manual: true }
  )
};
  
const getHomeTopOrder = (role) => {
  return useAxios(
    {
      url: USERS_ROLE_MENU_HOME[role],
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    },
    { manual: true }
  )
};


const BusinessEprPartner = () => {
  return useAxios(
    {
      url: BUSINESS_EPR_PARTNER,
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}

const BusinessEprAggregator = () => {
  return useAxios(
    {
      url: BUSINESS_EPR_AGGREGATOR,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}

const isProfileCompleted = () => {
  return useAxios(
    {
      url: IS_PROFILE_COMPLETE,
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}

export { getCategories, getSubCategories, getUnits, subUser, addSubUser, getAggregators, getRecyclers,
  getNewOrder, getHomeTopOrder, BusinessEprPartner, BusinessEprAggregator, isProfileCompleted};