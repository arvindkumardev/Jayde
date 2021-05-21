import useAxios from 'axios-hooks';
import {
  GET_CATEGORIES, GET_SUB_CATEGORY, GET_UNITS, CREATE_QUOTE_PAPER, CREATE_QUOTE_PLASTIC, CREATE_QUOTE_MIX_WASTER,
  ADD_SCHEDULE_PAPER, ADD_SCHEDULE_PLASTIC, ADD_SCHEDULE_MIX_WASTE,
  SELLER_MY_ORDER, SELLER_CONFIRM_RESCHEDULE, SELLER_CONFIRM_PROPOSED_WEIGHT, SELLER_CONFIRM_PAYMENT, ADD_ORDER_PAPER, ADD_ORDER_PLASTIC, ADD_ORDER_MIX_WASTER,
  SELLER_REQUEST_CALLBACK
} from '../../../utils/urls';

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

const createQuote = (category) => {
  return useAxios(
    {
      url: category === 'Paper' ? CREATE_QUOTE_PAPER : category === 'Plastic' ? CREATE_QUOTE_PLASTIC : category === 'Mix Waste' && CREATE_QUOTE_MIX_WASTER,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}

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
const addOrder = (category) => {
  return useAxios(
    {
      url: category === 'Paper' ? ADD_ORDER_PAPER : category === 'Plastic' ? ADD_ORDER_PLASTIC : category === 'Mix Waste' && ADD_ORDER_MIX_WASTER,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const requestCallBack = () => {
  return useAxios(
    {
      url: SELLER_REQUEST_CALLBACK,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const addSchedule = (category) => {
  return useAxios(
    {
      url: category === 'Paper' ? ADD_SCHEDULE_PAPER : category === 'Plastic' ? ADD_SCHEDULE_PLASTIC : category === 'Mix Waste' && ADD_SCHEDULE_MIX_WASTE,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};


const MyOrder = (pageNumber) => {
  return useAxios(
    {
      url: SELLER_MY_ORDER + pageNumber,
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    },
    { manual: true }
  )
};

const confirmOrder = (item) => {

  return useAxios(
    {
      url: item.assigned_status == 2 ? SELLER_CONFIRM_RESCHEDULE : item.proposed_weight_confirm == 2 ? SELLER_CONFIRM_PROPOSED_WEIGHT : item.is_seller_confirmed == 2 && SELLER_CONFIRM_PAYMENT,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}

export { getCategories, getSubCategories, getUnits, createQuote, addSchedule, MyOrder, confirmOrder, addOrder, requestCallBack };
