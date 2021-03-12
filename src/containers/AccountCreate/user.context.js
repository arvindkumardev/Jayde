import React, {createContext} from 'react';

const UserContext = createContext({
  user: {},
  setUserObj: () => {},
  setLoader:() => {},
});

export default UserContext;
