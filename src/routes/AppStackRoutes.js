import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationRouteNames from "./ScreenNames";
import HomeScreen from "../containers/Dashboard";
import LoginWithEmail from "../containers/LoginWithEmail";
import PricingRequest from "../containers/PricingRequest";
import SignUp from "../containers/SignUp";
import NewOrder from "../containers/NewOrder/index";
import PriceConfirm from "../containers/PriceConfirm/index";
import BottomTabStack from "./BottomTabStack";
import UserContext from "../appContainer/context/user.context";
import AddressConfirm from "../containers/AddressConfirm/index";
import PickupDetails from "../containers/PickupDetails/index";
import CallRequest from "../containers/CallRequest/index";
import { getSaveData } from "../utils/helpers";
import { LOCAL_STORAGE_DATA_KEY } from "../utils/constants";
import AdminRoutes from "../routes/AdminStack/AdminRoutes";
import SellerRoutes from "../routes/SellerStack/SellerRoutes";

const USER_ROLE= { SELLER: "seller", ADMIN: "admin" };
const Stack = createStackNavigator();

const AppStack = (props) => {
  const { isLogin, userRole } = useContext(UserContext);
  const role = userRole || props.userRole;
  const loginCheck = isLogin || props.isLogin;
  const SwitchNavigation = (role) => {
    console.log("Switch Navigation role is ", role);
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
