import useAxios from 'axios-hooks';
import {GET_CATEGORIES, GET_SUB_CATEGORY, GET_UNITS, ADD_SUB_USER, SUB_USER,
  GET_AGGREGATORS, GET_RECYCLERS,} from '../../utils/urls';

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
  
export { getCategories, getSubCategories, getUnits, subUser, addSubUser, getAggregators, getRecyclers};