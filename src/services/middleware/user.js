import { LOGIN_URL, GET_UNITS, NEW_ORDERS, USERS, ENABLE_USER, DISABLE_USER } from "../../utils/urls";
import useAxios from "axios-hooks";
 
const newOrder = () => {
   return useAxios(
     {
       url: NEW_ORDERS,
       method: 'GET',
       headers: { 'content-type': 'application/json', 'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTY3NjI4MDUsImV4cCI6MTYxNzM2NzYwNSwiZGF0YSI6eyJ1c2VyX2lkIjoiODIiLCJuYW1lIjoiVGVzdFVzZXIiLCJlbWFpbCI6InJhdmkrMUByaGF0ZWNobm9sb2d5LmNvbSIsImJ1c2luZXNzX3R5cGUiOiJzZWxsZXIiLCJzdGF0dXMiOiIxIiwidHlwZSI6Im93bmVyIiwiYWRtaW5faWQiOm51bGx9fQ.HnCj-TS3WLLpamKpFqakP-Tik4L8g8f0UE-VWElmuWk' },
     },
     { manual: true }
  )
 };

 const users = (pageNumber) => {  
  return useAxios(
    {
      url: USERS+pageNumber,
      method: 'GET',
      headers: { 'content-type': 'application/json', 'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTY3NjI4MDUsImV4cCI6MTYxNzM2NzYwNSwiZGF0YSI6eyJ1c2VyX2lkIjoiODIiLCJuYW1lIjoiVGVzdFVzZXIiLCJlbWFpbCI6InJhdmkrMUByaGF0ZWNobm9sb2d5LmNvbSIsImJ1c2luZXNzX3R5cGUiOiJzZWxsZXIiLCJzdGF0dXMiOiIxIiwidHlwZSI6Im93bmVyIiwiYWRtaW5faWQiOm51bGx9fQ.HnCj-TS3WLLpamKpFqakP-Tik4L8g8f0UE-VWElmuWk' },
    },
    { manual: true }
 )
};


const enableUserByAdmin = () => {
  return useAxios(
    {
      url: ENABLE_USER,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}

const disableUserByAdmin = () => {
  return useAxios(
    {
      url: DISABLE_USER,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    },
    { manual: true }
  );
}



export { newOrder, users,enableUserByAdmin, disableUserByAdmin };