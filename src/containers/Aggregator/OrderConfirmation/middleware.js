import useAxios from 'axios-hooks';
import { CONFIRM_SCHEDULE } from '../../../utils/urls';

const confirmSchedule = () => {
  return useAxios(
    {
      url: CONFIRM_SCHEDULE,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
};

export { confirmSchedule };





