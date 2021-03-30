import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationRouteNames from "./ScreenNames";
import HomeScreen from "../containers/Dashboard";
import LoginWithEmail from "../containers/LoginWithEmail";
import PricingRequest from "../containers/Seller/PricingRequest";
import SignUp from "../containers/SignUp";
import NewOrder from "../containers/Seller/NewOrder/index";
import PriceConfirm from "../containers/Seller/PriceConfirm/index";
import UserContext from "../appContainer/context/user.context";
import AddressConfirm from "../containers/Seller/AddressConfirm/index";
import PickupDetails from "../containers/Seller/PickupDetails/index";
import CallRequest from "../containers/Seller/CallRequest/index";
import NewOrderList from "../containers/NewOrderList/index";
import { USER_ROLE } from "./constants";

const Stack = createStackNavigator();

const AppStack = (props) => {
  const { isLogin, userRole } = useContext(UserContext);
  const role = userRole || props.userRole;
  const loginCheck = isLogin || props.isLogin;
  const SwitchNavigation = (role) => {
    switch(role){
      case USER_ROLE.SELLER:
        return <>
          {/* Dashboard SCREEN */}
            <Stack.Screen
              name={NavigationRouteNames.HOME_SCREEN}
              component={HomeScreen}
            />
            {/* Screen - 19 */}
            <Stack.Screen
              name={NavigationRouteNames.CONFIRM_ADDRESS}
              component={AddressConfirm}
            />
            {/* Screen - 15 */}
            <Stack.Screen
              name={NavigationRouteNames.PRICE_REQUEST}
              component={PricingRequest}
              initialParams={{ title: "Paper Waste" }}
            />
            {/* Screen - 17 */}
            <Stack.Screen
              name={NavigationRouteNames.PRICE_CONFIRM}
              component={PriceConfirm}
            />
            <Stack.Screen
              component={NewOrderList}
              name={NavigationRouteNames.NEW_ORDER}
            />
            {/* Screen - 16 */}
            <Stack.Screen
              name={NavigationRouteNames.NEW_ORDER_REQUEST}
              component={NewOrder}
            />
            {/* Screen - 18 */}
            <Stack.Screen
              name={NavigationRouteNames.PICKUP_DETAILS}
              component={PickupDetails}
            />
            {/* Call request screen number: 70 */}
            <Stack.Screen
              name={NavigationRouteNames.CALL_REQUEST}
              component={CallRequest}
            />
        </>
      case USER_ROLE.ADMIN:
        return <>
          {/* Dashboard SCREEN */}
          <Stack.Screen
            name={NavigationRouteNames.HOME_SCREEN}
            component={HomeScreen}
          />
          {/* Screen - 19 */}
          <Stack.Screen
            name={NavigationRouteNames.CONFIRM_ADDRESS}
            component={AddressConfirm}
          />
          {/* Screen - 15 */}
          <Stack.Screen
            name={NavigationRouteNames.PRICE_REQUEST}
            component={PricingRequest}
            initialParams={{ title: "Paper Waste" }}
          />
          {/* Screen - 17 */}
          <Stack.Screen
            name={NavigationRouteNames.PRICE_CONFIRM}
            component={PriceConfirm}
          />
          {/* Screen - 16 */}
          <Stack.Screen
            name={NavigationRouteNames.NEW_ORDER_REQUEST}
            component={NewOrder}
          />
          {/* Screen - 18 */}
          <Stack.Screen
            name={NavigationRouteNames.PICKUP_DETAILS}
            component={PickupDetails}
          />
          {/* Call request screen number: 70 */}
          <Stack.Screen
            name={NavigationRouteNames.CALL_REQUEST}
            component={CallRequest}
          />
        </>
      default:
          return  <>
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
                  </>;
    }
  }
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName={
        props.isLogin
          ? props.homePage
          : NavigationRouteNames.LOGIN_WITH_EMAIL
      }
    >
      {!loginCheck ? (
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
        </>
      ) : SwitchNavigation(role) }
    </Stack.Navigator>
  );
};
export default AppStack;
