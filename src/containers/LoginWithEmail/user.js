import { LOGIN_URL } from "../../utils/urls";
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
