import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationRouteNames from './ScreenNames';
import Login from '../containers/Login';
import HomeScreen from '../containers/Dashboard';
import LoginWithEmail from '../containers/LoginWithEmail';
import AdminNewOrder from '../containers/AdminNewOrder';
import PricingRequest from "../containers/PricingRequest";
import NewOrderList from '../containers/NewOrderList';
import AccountCreate from '../containers/AccountCreate';
import SignUp from '../containers/SignUp';
import BottomTabStack from './BottomTabStack';
import UserContext from '../containers/Login/user.context';
import Order from '../containers/Order';
import ChooseAggregator from '../containers/ChooseAggregator';
import OrderAssign from '../containers/OrderAssign';


const Stack = createStackNavigator();

const AppStack = () => {
  const { isLogin } = useContext(UserContext);
  return (
    // <Stack.Navigator headerMode="screen">
    //   {!isLogin ? (
    //     <Stack.Screen
    //       name={NavigationRouteNames.LOGIN}
    //       component={SignUp}
    //       options={{ headerShown: false }}
    //       // options={{ title: 'Paper Waste' }}
    //     />
    <Stack.Navigator headerMode="screen" initialRouteName={isLogin ? NavigationRouteNames.HOME : NavigationRouteNames.LOGIN_WITH_EMAIL }>
      {!isLogin ? (
        <>
        <Stack.Screen
          name={NavigationRouteNames.SIGNUP}
          component={SignUp}
          options={{ headerShown: false }}
        />
         {/* Login SCREEN */}
         <Stack.Screen
          name={NavigationRouteNames.LOGIN_WITH_EMAIL}
          component={LoginWithEmail}
          options={{ headerShown: false }}
        />
        {/* Dashboard SCREEN */}
        <Stack.Screen
          name={NavigationRouteNames.HOMESCREEN}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        </>
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
