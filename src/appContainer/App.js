/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable dot-notation */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from "react";
import "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen/index";

import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "../routes";
import Colors from "../theme/Colors";
import { configure } from "axios-hooks";
import Axios from "axios";
import { BASE_URL, LOCAL_STORAGE_DATA_KEY } from "../utils/constants";
import { getSaveData } from "../utils/helpers";
import UserState from "../appContainer/context/user";
import AppLoader from "./AppLoader";
import NavigationRouteNames from "../routes/ScreenNames";
import UserContext from "./context/user.context";

const axios = Axios.create({
  baseURL: BASE_URL,
  headers: { "content-Type": "application/json" },
});

const CancelToken = Axios.CancelToken;
axios.interceptors.request.use(
  async (config) => {
    const source = CancelToken.source();
    config.cancelToken = source.token;
    console.log("Request config", config.data);
    const token = await getSaveData(LOCAL_STORAGE_DATA_KEY.JWT_TOKEN);
    console.log("Token", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (data) => {
    console.log("Response ", data);
    return data;
  },
  (error) => Promise.reject(error),
);

configure({ axios });

function App() {
  const [showTopBar, setShowTopBar] = useState(false);

  const onStateChangeHandle = (state) => {
    const { params } = state.routes[state.index];
    setShowTopBar(params && params.showTopBar);
  };

  return (
    <NavigationContainer onStateChange={onStateChangeHandle}>
      {showTopBar && (
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.white }} />
      )}
      {showTopBar && (
        <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
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
