import { BUSINESS_UPDATE, GETBUSINESS_PROFILE } from "../../utils/urls";
import useAxios from "axios-hooks";

const businessUpdate = () => {
  return useAxios(
    {
      url: BUSINESS_UPDATE,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  )
};

const getBusinessProfile = () => {
    return useAxios(
      {
        url: GETBUSINESS_PROFILE,
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      },
      { manual: true }
    )
  };

export { businessUpdate, getBusinessProfile };