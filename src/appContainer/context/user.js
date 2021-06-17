import React, { useEffect, useState } from 'react';
import UserContext from './user.context';

const UserState = (props) => {
  const [userObj, setUserObject] = useState({});
  const [loginFlag, setLoginFlag] = useState(false);
  const [profileFlag, setProfileFlag] = useState(false);
  const [orgDataObj, setOrgDataObj] = useState({});
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [loggedInUserRole, setLoggedInUserRole] = useState('');
  const [firebaseToken, setFirebaseToken] = useState('')

  return (
    <UserContext.Provider
      value={{
        user: userObj,
        isLogin: loginFlag,
        isProfileCompleted: profileFlag,
        orgData: orgDataObj,
        isLoading: loadingFlag,
        userRole: loggedInUserRole,
        fcmToken: firebaseToken,
        setUserObj: (v) => setUserObject(v),
        setLogin: (v) => setLoginFlag(v),
        setProfileCompleted: (v) => setProfileFlag(v),
        setUserRole: (v) => setLoggedInUserRole(v),
        setLoader: (v) => setLoadingFlag(v),
        setOrgData: (v) => setOrgDataObj(v),
        setFcmToken: (v) => setFirebaseToken(v)
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
