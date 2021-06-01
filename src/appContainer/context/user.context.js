import React, { createContext } from 'react';

const UserContext = createContext({
  user: {},
  isLogin: false,
  isLoading: false,
  userRole: '',
  fcmToken: '',
  orgData: [],
  setUserObj: (userObj) => {},
  setLogin: (login) => {},
  setLoader: (loading) => {},
  setUserRole: (role) => {},
  setOrgData: (orgData) => {},
  setFcmToken: (token) => {}
});

export default UserContext;
