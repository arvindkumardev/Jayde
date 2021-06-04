/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import Loader  from '../components/Loader';
import UserContext from './context/user.context';

function AppLoader(props) {
  const { isLoading } = useContext(UserContext);
  return (
    <>
      <Loader isLoading={isLoading} />
      {props.children}
    </>
  );
}

export default AppLoader;
