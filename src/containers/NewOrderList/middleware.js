import useAxios from 'axios-hooks';
import { GET_CATEGORIES } from '../../utils/urls';

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

export { getCategories };
