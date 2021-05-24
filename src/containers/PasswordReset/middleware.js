import { FORGOT_PASSWORD } from "../../utils/urls";
import useAxios from "axios-hooks";

const forgotPassword = () => {
  return useAxios(
    {
      url: FORGOT_PASSWORD,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  )
};

export { forgotPassword };