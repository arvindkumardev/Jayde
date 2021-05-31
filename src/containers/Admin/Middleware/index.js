import useAxios from 'axios-hooks';
import {USERS, ENABLE_USER, DISABLE_USER, ADMIN_NEW_ORDER, ACCEPT_ORDER, REJECT_ORDER, ASSIGN_AGGREGATOR} from '../../..//utils/urls';

const users = (pageNumber) => {
    return useAxios(
      {
        url: USERS + pageNumber,
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      },
      { manual: true }
    )
  };
  
  const adminNewOrder = (pageNumber) => {
    return useAxios(
      {
        url: ADMIN_NEW_ORDER + pageNumber,
        method: 'GET',
        headers: { 'content-type': 'application/json' }
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

  const acceptOrder = () => {
    return useAxios(
      {
        url: ACCEPT_ORDER,
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      },
      { manual: true }
    );
  }
  
  const rejectOrder = () => {
    return useAxios(
      {
        url: REJECT_ORDER,
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      },
      { manual: true }
    );
  }
  

  const assignAggregator = () => {
    return useAxios(
      {
        url: ASSIGN_AGGREGATOR,
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      },
      { manual: true }
    );
  }

  export {users,  enableUserByAdmin, disableUserByAdmin, adminNewOrder, acceptOrder, rejectOrder, assignAggregator}
