import React, { createContext } from 'react';

const UserContext = createContext({
  user: {},
  isLogin: false,
  isLoading: false,
  userRole: '',
  orgData: [],
  setUserObj: (userObj) => {},
  setLogin: (login) => {},
  setLoader: (loading) => {},
  setUserRole: (role) => {},
  setOrgData: (orgData) => {},
});

export default UserContext;
