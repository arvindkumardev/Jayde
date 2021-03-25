import { LOGIN_URL } from "../../utils/urls";
import axios from "axios";
import useAxios from "axios-hooks";

const userLogin = async (userCredentials = {}) => {
    const { data } = await axios.post( LOGIN_URL, userCredentials, {headers: { 'content-type': 'application/json'}});
    return data;
}

const loginWithHooks = () => {
    return useAxios({ url: LOGIN_URL, method: 'POST', headers:{'content-type': 'application/json'} }, {manual: true});
}

export {
    userLogin,
    loginWithHooks
}