import { OWNED_CONTRACTS } from "../../utils/urls";
import useAxios from "axios-hooks";

const ownedContracts = (pageNumber) => {
  return useAxios(
    {
      url: OWNED_CONTRACTS + pageNumber,
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  )
};

export { ownedContracts };