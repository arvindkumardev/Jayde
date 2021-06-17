import React, { createContext } from 'react';

const UserContext = createContext({
  user: {},
  isLogin: false,
  isLoading: false,
  userRole: '',
  fcmToken: '',
  orgData: [],
  isProfileCompleted: false,
  setUserObj: (userObj) => { },
  setLogin: (login) => { },
  setProfileCompleted: (value) => { },
  setLoader: (loading) => { },
  setUserRole: (role) => { },
  setOrgData: (orgData) => { },
  setFcmToken: (token) => { }
});

export default UserContext;
