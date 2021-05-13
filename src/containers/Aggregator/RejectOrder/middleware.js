import useAxios from 'axios-hooks';
import { AGGREGATOR_REJECTORDER } from '../../../utils/urls';

const aggreRejectorder = () => {
  return useAxios(
    {
      url: AGGREGATOR_REJECTORDER,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

export { aggreRejectorder };







