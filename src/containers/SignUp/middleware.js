import { SIGN_UP } from "../../utils/urls";
import useAxios from "axios-hooks";

const signUp = () => {
  return useAxios(
    {
      url: SIGN_UP,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  )
};

export { signUp };