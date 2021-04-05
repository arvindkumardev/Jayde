import React, {useEffect, useState} from 'react';
import UserContext from './user.context';

const UserState = (props) => {
  
  const [userObj, setUserObject] = useState({});
  const [loginFlag, setLoginFlag] = useState(false);
  const [orgDataObj, setOrgDataObj] = useState({});
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [loggedInUserRole, setLoggedInUserRole] = useState('');

  
  // const [user, setUserObj] = useState({});
  // const [isLogin, setLogin] = useState(false);
  // const [orgData, setOrgData] = useState([]);
  // const [isLoading, setLoader] = useState(false);
  // const [userRole, setUserRole] = useState('');
  return (
    <UserContext.Provider value={{
      user: userObj,
      isLogin: loginFlag,
      orgData: orgDataObj,
      isLoading: loadingFlag,
      userRole: loggedInUserRole,
      setUserObj: (v) => setUserObject(v),
      setLogin: (v) => setLoginFlag(v),
      setUserRole: (v) => setLoggedInUserRole(v),
      setLoader: (v) => setLoadingFlag(v),
      setOrgData: (v) => setOrgDataObj(v)
    }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
