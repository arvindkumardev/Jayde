import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationRouteNames from "./ScreenNames";
import HomeScreen from "../containers/Dashboard";
import LoginWithEmail from "../containers/LoginWithEmail";
import PricingRequest from "../containers/PricingRequest";
import SignUp from "../containers/SignUp";
import NewOrder from "../containers/NewOrder/index";
import PriceConfirm from "../containers/PriceConfirm/index";
import BottomTabStack from "./BottomTabStack";
import UserContext from "../containers/Login/user.context";
import AddressConfirm from "../containers/AddressConfirm/index";
import PickupDetails from "../containers/PickupDetails/index";
import CallRequest from "../containers/CallRequest/index";

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
    <Stack.Navigator
      headerMode="screen"
      initialRouteName={
        isLogin
          ? NavigationRouteNames.HOME
          : NavigationRouteNames.LOGIN_WITH_EMAIL
      }
    >
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
            name={NavigationRouteNames.HOME_SCREEN}
            component={HomeScreen}
            options={{ headerShown: false }}
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
