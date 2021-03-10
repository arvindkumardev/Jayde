import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationRouteNames from './ScreenNames';
import Login from '../containers/Login';
import HomeScreen from '../containers/Dashboard';
//import Loginn from '../containers/Login/Loginn';
import BottomTabStack from './BottomTabStack';
import UserContext from '../containers/Login/user.context';

const Stack = createStackNavigator();

const AppStack = () => {
  const { isLogin } = useContext(UserContext);
  return (
    <Stack.Navigator headerMode="screen">
      {!isLogin ? (
        <Stack.Screen
          name={NavigationRouteNames.LOGIN}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name={NavigationRouteNames.HOME}
          component={BottomTabStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};
export default AppStack;
