import React, {createContext} from 'react';

const UserContext = createContext({
  user: {},
  isLogin: false,
  setLogin: () => {},
  setUserObj: () => {},
  setLoader:() => {},
});

export default UserContext;
