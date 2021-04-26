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
import OrderType from "../containers/Seller/OrderType/index";
import Dashboard from "../containers/Dashboard/index";
import PaymentVerification from "../containers/PaymentVerification";
import ViewNewOrder from "../containers/ViewNewOrder";
import WorkOrderEmail from "../containers/WorkOrderEmail";
import OrderDetails from "../containers/Seller/OrderDetails";
import CallBackConfirmation from "../containers/Seller/CallBackConfirmation";
import PickupDate from "../containers/Seller/PickupDate";
import { USER_ROLE } from "./constants";
import { AppStyles } from "../theme";
import DrawerSideBar from "../containers/DrawerSideBar/index";
import { getSaveData } from "../utils/helpers";
import { LOCAL_STORAGE_DATA_KEY } from "../utils/constants";
import EnableDisableUser from "../containers/Admin/EnableDisableUser";
import Users from "../containers/Admin/Users";
import OrderAssign from "../containers/Admin/OrderAssign";
import OrderFailed from "../containers/Seller/OrderFailed";
import WorkOrderDetails from "../containers/Seller/WorkOrderDetails";
import OrderConfirmation from "../containers/Aggregator/OrderConfirmation";
import WarehouseDetails from "../containers/Aggregator/WarehouseDetails";
import ScheduledOrder from "../containers/Aggregator/ScheduledOrder";
import Inventory from "../containers/Aggregator/Inventory";
import NewWorkOrder from "../containers/Aggregator/NewWorkOrder";
import Workordersummary from "../containers/Aggregator/Workordersummary";
import CompletedOrder from "../containers/Aggregator/CompletedOrder";
import PaymentDetails from "../containers/Recycler/PaymentDetails";
import UpdateProfile from "../containers/UpdateProfile";
import BusinessDetail from "../containers/BusinessDetail";
import ProfileUpdate from "../containers/ProfileUpdate";
import { resolveConfig } from "prettier";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NoHeaderScreen = { headerShown: false };
const NoTitleHeader = {title: null, headerStyle: { borderBottomWidth: 0, elevation: 0 }};
const CommonHeaderStyle = { headerTitleStyle: [AppStyles.txtBlackBold, AppStyles.f18, AppStyles.ml10,], headerStyle: { borderBottomWidth: 0, elevation: 0 } };
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
  const { isLogin, userRole, setLogin, setUserRole } = useContext(UserContext);
  const getToken = async () => {
    const token = await getSaveData(LOCAL_STORAGE_DATA_KEY.JWT_TOKEN);
    const role = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_ROLE);
    if (token) {
      setLogin(true);
      setUserRole(role);
    }
    setTimeout( () => {
      SplashScreen.hide();
    }, 2500);
  };

  useEffect(async () => {
    await getToken();
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
            component={OrderType}
            name={NavigationRouteNames.NEW_ORDER}
            initialParams={{ title: "Paper Waste" }}
            options={NoTitleHeader}
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
           {/* Call back confirmation */}
           <Stack.Screen
            name={NavigationRouteNames.CALLBACK_CONFIRMATION}
            component={CallBackConfirmation}
            options={NoTitleHeader}
          />
          {/* Pickup Date Time Slot Screen */}
          <Stack.Screen
            name={NavigationRouteNames.PICKUP_DATE}
            component={PickupDate}
            options={NoTitleHeader}
          />
           {/* Pickup Date Time Slot Screen */}
           <Stack.Screen
            name={NavigationRouteNames.ORDER_FAILED}
            component={OrderFailed}
            options={NoTitleHeader}
          />
           {/* Work Order Details Screen number: 31 */}
           <Stack.Screen
            name={NavigationRouteNames.WORKORDER_DETAILS}
            component={WorkOrderDetails}
            options={CommonHeaderStyle}
          />
        </>;
        case USER_ROLE.AGGRATOR:
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
              component={OrderType}
              name={NavigationRouteNames.NEW_ORDER}
              options={NoHeaderScreen}
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
             {/* Schedule Order screen number: 25 */}
             <Stack.Screen
              name={NavigationRouteNames.SCHEDULE_ORDER}
              component={ScheduledOrder}
              options={CommonHeaderStyle}
            />
              {/* Inventory screen number: 40 */}
              <Stack.Screen
              name={NavigationRouteNames.INVENTORY}
              component={Inventory}
              options={CommonHeaderStyle}
            />
              {/* Order CONFIRMATION screen number: 27 */}
              <Stack.Screen
              name={NavigationRouteNames.ORDER_CONFIRMATION}
              component={OrderConfirmation}
              options={CommonHeaderStyle}
            />
             {/* Warehouse Details screen number: 32 */}
             <Stack.Screen
              name={NavigationRouteNames.WAREHOUSE_DETAILS}
              component={WarehouseDetails}
              options={CommonHeaderStyle}
            />
            {/* New Work Order screen number: 32 */}
            <Stack.Screen
              name={NavigationRouteNames.NEW_WORKORDER}
              component={NewWorkOrder}
              options={CommonHeaderStyle}
            />
            {/* Work Order Summary screen number: 42 */}
            <Stack.Screen
              name={NavigationRouteNames.WORKORDER_SUMMARY}
              component={Workordersummary}
              options={CommonHeaderStyle}
            />
            {/* Completed Order screen number: 45 */}
            <Stack.Screen
              name={NavigationRouteNames.COMPLETED_ORDER}
              component={CompletedOrder}
              options={CommonHeaderStyle}
            />
          </>;
    case USER_ROLE.RECYCLER:
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
          component={OrderType}
          name={NavigationRouteNames.NEW_ORDER}
          options={NoHeaderScreen}
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
         {/* Payment Details screen number: 44 */}
         <Stack.Screen
          name={NavigationRouteNames.PAYMENT_DETAILS}
          component={PaymentDetails}
          options={CommonHeaderStyle}
        />
      </>;
      case USER_ROLE.ADMIN:
        return <>
         {/* Dashboard SCREEN */}
         <Stack.Screen
          name={NavigationRouteNames.HOME_SCREEN}
          component={DrawerStack}
          options={DrawerMenu}
        />
          {/* Dashboard SCREEN */}
          {/* <Stack.Screen
            name={NavigationRouteNames.HOME_SCREEN}
            component={HomeScreen}
            options={NoHeaderScreen}
          /> */}
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
           {/* User Popup Screen */}
           <Stack.Screen
            name={NavigationRouteNames.ENABLEDISABLE_USER}
            component={EnableDisableUser}
            options={NoTitleHeader}
          />
           {/* Update Profile Screen number: 50 */}
           <Stack.Screen
            name={NavigationRouteNames.UPDATE_PROFILE}
            component={UpdateProfile}
            options={NoTitleHeader}
          />
          {/* Business Detail Screen number: 51 */}
          <Stack.Screen
            name={NavigationRouteNames.BUSINESS_DETAIL}
            component={BusinessDetail}
            options={CommonHeaderStyle}
          />
          {/* Profile Update Screen number: 52 */}
          <Stack.Screen
            name={NavigationRouteNames.PROFILE_UPDATE}
            component={ProfileUpdate}
            options={CommonHeaderStyle}
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
