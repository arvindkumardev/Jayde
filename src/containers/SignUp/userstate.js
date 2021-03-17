import React, {useEffect, useState} from 'react';
import UserContext from './user.context';
import useAxios from 'axios-hooks';

const UserState = (props) => {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [orgData, setOrgData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUserObj: (val) => setUser(val),
        isLogin,
        setLogin: (val) => setIsLogin(val),
          orgData,
          isLoading,
          setLoader:(val)=>setIsLoading(val)
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;