import { LOGIN_URL } from "../../utils/urls";
import axios from "axios";
import useAxios from "axios-hooks";

const userLogin = async (userCredentials = {}) => {
    const { data } = await axios.post( LOGIN_URL, userCredentials, {headers: { 'content-type': 'application/json'}});
    return data;
}

// const loginWithHooks = useAxios({ url: LOGIN_URL, method: 'get' }, {manual: true});

export {
    userLogin,
    // loginWithHooks
}