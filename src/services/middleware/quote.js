import { GET_SUB_CATEGORY } from "../../utils/urls";
import axios from "axios";

const getSubCategory = async (categoryId) => {
    const { data } = await axios.post( GET_SUB_CATEGORY, categoryId, {headers: { 'content-type': 'application/json'}});
    return data;
}

export {
    getSubCategory
}