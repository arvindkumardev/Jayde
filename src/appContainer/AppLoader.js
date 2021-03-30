import React, {useContext} from 'react';
import {Loader} from '../components';
import UserContext from '../containers/Login/user.context';


function AppLoader(props) {
    const {isLoading} = useContext(UserContext);
    console.log("Loading changed", isLoading);
    return (
        <>
            <Loader isLoading={isLoading} />
            {props.children}
        </>
    );
}

export default AppLoader;
