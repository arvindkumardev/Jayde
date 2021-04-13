import useAxios from 'axios-hooks';
import { GET_SUB_CATEGORY, GET_UNITS, CREATE_QUOTE } from '../../../utils/urls';

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

const createQuote = () => {
  return useAxios(
    {
      url: CREATE_QUOTE,
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

export { getSubCategories, getUnits, createQuote };
