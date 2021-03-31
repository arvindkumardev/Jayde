import { LOGIN_URL, GET_UNITS, NEW_ORDERS, USERS } from "../../utils/urls";
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

 const users = () => {
  return useAxios(
    {
      url: USERS,
      method: 'GET',
      headers: { 'content-type': 'application/json', 'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTY3NjI4MDUsImV4cCI6MTYxNzM2NzYwNSwiZGF0YSI6eyJ1c2VyX2lkIjoiODIiLCJuYW1lIjoiVGVzdFVzZXIiLCJlbWFpbCI6InJhdmkrMUByaGF0ZWNobm9sb2d5LmNvbSIsImJ1c2luZXNzX3R5cGUiOiJzZWxsZXIiLCJzdGF0dXMiOiIxIiwidHlwZSI6Im93bmVyIiwiYWRtaW5faWQiOm51bGx9fQ.HnCj-TS3WLLpamKpFqakP-Tik4L8g8f0UE-VWElmuWk' },
    },
    { manual: true }
 )
};
export { newOrder, users };