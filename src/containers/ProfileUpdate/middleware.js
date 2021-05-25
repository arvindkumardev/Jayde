import { PROFILE_UPDATE } from "../../utils/urls";
import useAxios from "axios-hooks";

const profileUpdate = () => {
  return useAxios(
    {
      url: PROFILE_UPDATE,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  )
};

export { profileUpdate };