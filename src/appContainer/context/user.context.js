import React, {createContext} from 'react';

const UserContext = createContext({
  user: {},
  isLogin: false,
  isLoading: false,
  userRole: '',
  setUserRole: () => {},
  setLogin: () => {},
  setUserObj: () => {},
  setLoader:() => {},
});

export default UserContext;
