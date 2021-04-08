/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FAIcon from "react-native-vector-icons/FontAwesome";
import SplashScreen from "react-native-splash-screen";
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
import PaymentVerification from "../containers/PaymentVerification";
import OrderDetails from "../containers/Seller/OrderDetails";
import { USER_ROLE } from "./constants";
import { AppStyles } from "../theme";
import DrawerSideBar from "../containers/DrawerSideBar/index";
import { getSaveData } from "../utils/helpers";
import { LOCAL_STORAGE_DATA_KEY } from "../utils/constants";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NoHeaderScreen = { headerShown: false };
const CommonHeaderStyle = { headerTitleStyle: [AppStyles.txtBlackBold, AppStyles.f18] };
const DrawerMenu = ({ navigation }) => ({
  title: null,
  headerStyle: { borderBottomWidth: 0, elevation: 0 },
  headerLeft: () => <TouchableOpacity onPress={() => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }} style={{ marginLeft: 10 }}><FAIcon name="navicon" size={25} /></TouchableOpacity>,
});

const DrawerStack = () => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Drawer.Navigator drawerContent={props => <DrawerSideBar {...props} />}>
      <Drawer.Screen
        component={Dashboard}
        name={NavigationRouteNames.HOME_SCREEN}
      />
    </Drawer.Navigator>
  );
};

const AppStack = (props) => {
  // const { isLogin, userRole } = useContext(UserContext);

  // console.log("isLogin, userRole", isLogin, userRole);

  const { isLogin, userRole, setLogin, setUserRole } = useContext(UserContext);

  const getToken = async () => {
    const token = await getSaveData(LOCAL_STORAGE_DATA_KEY.JWT_TOKEN);
    const role = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_ROLE);
    if (token) {
      console.log("Token received", token, role);
      // setIsLogin(true);

      setLogin(true);
      setUserRole(role);
      // setLoadingToken(false);
      // setToken(token);
      // setLoginUserRole(role);

      console.log("User login after setting all the values ", isLogin, userRole, role);

    }
    SplashScreen.hide();
  };

  useEffect(() => {
    // if (!token) {
    getToken().then(() => {
      // setLoadingToken(false);
      console.log("User login after setting all the values 12312312", isLogin, userRole);

    }).catch(() => {
      console.log("User login after setting all the values 3453453453", isLogin, userRole);
      // setLoadingToken(false);
    });
    // } else {
    // setLoadingToken(false);
    // }
  }, []);

  const role = userRole || props.userRole;
  const loginCheck = isLogin || props.isLogin;
  const SwitchNavigation = (role) => {
    switch (role) {
      case USER_ROLE.SELLER:
        return <>
          {/* Dashboard SCREEN */}
          <Stack.Screen
            name={NavigationRouteNames.HOME_SCREEN}
            component={DrawerStack}
            options={DrawerMenu}
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
        </>;
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
        </>;
      default:
        return <>
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
  };
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
      ) : SwitchNavigation(role)}
    </Stack.Navigator>
  );
};
export default AppStack;
