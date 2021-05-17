import useAxios from 'axios-hooks';
import { GET_SUB_CATEGORY, GET_UNITS, CREATE_QUOTE_PAPER, CREATE_QUOTE_PLASTIC, CREATE_QUOTE_MIX_WASTER,
   ADD_SCHEDULE_PAPER, ADD_SCHEDULE_PLASTIC, ADD_SCHEDULE_MIX_WASTE,
   SELLER_MY_ORDER } from '../../../utils/urls';

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
      url: category === 'Paper' ? CREATE_QUOTE_PAPER :  category === 'Plastic' ? CREATE_QUOTE_PLASTIC :  category === 'Mix Waste' && CREATE_QUOTE_MIX_WASTER,
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

const addSchedule = (category) => {
  return useAxios(
    {
      url: category === 'Paper' ? ADD_SCHEDULE_PAPER :  category === 'Plastic' ? ADD_SCHEDULE_PLASTIC :  category === 'Mix Waste' && ADD_SCHEDULE_MIX_WASTE,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

const MyOrder = (pageNumber) => {  
  return useAxios(
    {
      url: SELLER_MY_ORDER+pageNumber,
      method: 'GET',
      headers: { 'content-type': 'application/json'}
    },
    { manual: true }
 )
};

export { getSubCategories, getUnits, createQuote, addSchedule, MyOrder };
