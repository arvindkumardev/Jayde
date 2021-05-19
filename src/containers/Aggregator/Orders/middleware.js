import useAxios from 'axios-hooks';
import { AGGREGATOR_NEWORDER } from '../../../utils/urls';

const aggregatorNeworder = (pageNumber) => {
  return useAxios(
    {
      url: AGGREGATOR_NEWORDER+pageNumber,
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

export { aggregatorNeworder };