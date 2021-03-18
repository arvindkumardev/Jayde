import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen/index';

import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from '../routes';
import Colors from '../theme/Colors';
import {configure} from 'axios-hooks';
import Axios from 'axios';
import {BASE_URL, LOCAL_STORAGE_DATA_KEY} from '../utils/constants';
import {getSaveData} from '../utils/helpers';
import UserState from '../containers/Login/userstate';
import AppLoader from "./AppLoader";

const axios = Axios.create({
  baseURL: BASE_URL,
  headers: {'content-Type': 'application/json'},
});

axios.interceptors.request.use(
  async (config) => {
    console.log('Request config', config);
    const token = await getSaveData(LOCAL_STORAGE_DATA_KEY.JWT_TOKEN);
    console.log("Token", token);
    if (token) {
      config.headers['jwt-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (data) => {
    console.log('Response ', data);
    return data;
  },
  (error) => Promise.reject(error),
);

configure({axios});

function App() {
  const [showTopBar, setShowTopBar] = useState(false);

  const onStateChangeHandle = (state) => {
    const {params} = state.routes[state.index];
    setShowTopBar(params && params.showTopBar);
  };


  useEffect(() => {
      SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer onStateChange={onStateChangeHandle}>
      {showTopBar && (
        <SafeAreaView style={{flex: 0, backgroundColor: Colors.white}} />
      )}
      {showTopBar && (
        <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      )}
      <UserState>
              <AppLoader>
                <AppStack />
              </AppLoader>
      </UserState>
    </NavigationContainer>
  );
}

export default App;
