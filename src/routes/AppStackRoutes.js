/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import React, { useContext } from "react";
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
import Dashboard from "../containers/Dashboard/index";
import { USER_ROLE } from "./constants";
import { AppStyles } from "../theme";

const Stack = createStackNavigator();

const NoHeaderScreen = {headerShown: false};
const CommonHeaderStyle = {headerTitleStyle: [AppStyles.txtBlackBold, AppStyles.f18]};

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
              component={Dashboard}
              options={NoHeaderScreen}
            />
            {/* Screen - 19 */}
            <Stack.Screen
              name={NavigationRouteNames.CONFIRM_ADDRESS}
              component={AddressConfirm}
              options={CommonHeaderStyle}
            />
            {/* Screen - 15 */}
            <Stack.Screen
              name={NavigationRouteNames.PRICE_REQUEST}
              component={PricingRequest}
              initialParams={{ title: "Paper Waste" }}
              options={CommonHeaderStyle}
            />
            {/* Screen - 17 */}
            <Stack.Screen
              name={NavigationRouteNames.PRICE_CONFIRM}
              component={PriceConfirm}
              options={CommonHeaderStyle}
            />
            <Stack.Screen
              component={NewOrderList}
              name={NavigationRouteNames.NEW_ORDER}
              options={CommonHeaderStyle}
            />
            {/* Screen - 16 */}
            <Stack.Screen
              name={NavigationRouteNames.NEW_ORDER_REQUEST}
              component={NewOrder}
              options={CommonHeaderStyle}
            />
            {/* Screen - 18 */}
            <Stack.Screen
              name={NavigationRouteNames.PICKUP_DETAILS}
              component={PickupDetails}
              options={CommonHeaderStyle}
            />
            {/* Call request screen number: 70 */}
            <Stack.Screen
              name={NavigationRouteNames.CALL_REQUEST}
              component={CallRequest}
              options={CommonHeaderStyle}
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
                      options={NoHeaderScreen}
                    />
                    {/* Login SCREEN */}
                    <Stack.Screen
                      name={NavigationRouteNames.LOGIN_WITH_EMAIL}
                      component={LoginWithEmail}
                      options={NoHeaderScreen}
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
            options={NoHeaderScreen}
          />
          {/* Login SCREEN */}
          <Stack.Screen
            name={NavigationRouteNames.LOGIN_WITH_EMAIL}
            component={LoginWithEmail}
            options={NoHeaderScreen}
          />
        </>
      ) : SwitchNavigation(role) }
    </Stack.Navigator>
  );
};
export default AppStack;
