import { LOGIN_URL, GET_UNITS } from "../../utils/urls";
import useAxios from "axios-hooks";

const userLogin = () => {
  return useAxios(
    {
      url: LOGIN_URL,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  )
};

export { userLogin };
