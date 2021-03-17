import { LOGIN_URL } from "../../utils/urls";
import axios from "axios";

const userLogin = async (userCredentials = {}) => {
    const { data } = await axios.post( LOGIN_URL, userCredentials, {headers: { 'content-type': 'application/json'}});
    return data;
}

export {
    userLogin
}