/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FAIcon from "react-native-vector-icons/FontAwesome";
import EvilIcons from "react-native-vector-icons/EvilIcons";
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
import SellerMyOrder from "../containers/Seller/MyOrder/index";
import SellerOrderDetail from "../containers/Seller/MyOrderDetail/index";

import Dashboard from "../containers/Dashboard/index";
import PaymentVerification from "../containers/CommonScreen/PaymentVerification";
import WorkOrderEmail from "../containers/CommonScreen/WorkOrderEmail";
import OrderDetails from "../containers/Seller/OrderDetails";
import CallBackConfirmation from "../containers/Seller/CallBackConfirmation";
import { USER_ROLE } from "./constants";
import { AppStyles } from "../theme";
import DrawerSideBar from "../containers/DrawerSideBar/index";
import { getSaveData } from "../utils/helpers";
import { LOCAL_STORAGE_DATA_KEY } from "../utils/constants";
import EnableDisableUser from "../containers/Admin/EnableDisableUser";
import Users from "../containers/Admin/Users";
import OrderAssign from "../containers/Admin/OrderAssign";
import DownloadReport from "../containers/Admin/DownloadReport";
import ManageEPR from "../containers/Admin/ManageEPR";
import SubCategoryDetails from "../containers/Admin/SubCategoryDetails";
import AddSubCategory from "../containers/Admin/AddSubCategory";
import ProvisionalPricing from "../containers/Admin/ProvisionalPricing";
import AddProvisionalPricing from "../containers/Admin/AddProvisionalPricing";

import OrderFailed from "../containers/Seller/OrderFailed";
import WorkOrderDetails from "../containers/CommonScreen/WorkOrderDetails";
import Payment from "../containers/Seller/Payment";
import OrderConfirmation from "../containers/CommonScreen/OrderConfirmation";
import WarehouseDetails from "../containers/CommonScreen/WarehouseDetails";
import ScheduledOrder from "../containers/Aggregator/ScheduledOrder";
import AggregatorScheduleOrderList from '../containers/Aggregator/ScheduleOrderList';
import Inventory from "../containers/CommonScreen/Inventory";
import NewWorkOrder from "../containers/CommonScreen/CreateWorkOrder";
import AggregatorWorkOrderList from './../containers/Aggregator/NewWorkOrderList';
import WorkOrderConfirmation from '../containers/CommonScreen/WorkOrderConfirmation';

import RecyclerNewOrderList from "../containers/Recycler/NewOrderList";
import RecyclerScheduleOrderList from "../containers/Recycler/ScheduleOrderList";
import RecyclerWorkOrderList from "../containers/Recycler/NewWorkOrderList";;
import WorkOrderVerification from "../containers/CommonScreen/WorkOrderVerification"

import Workordersummary from "../containers/Aggregator/Workordersummary";
import WorkOrderDetail from "../containers/Aggregator/WorkOrderDetail";
import CompletedOrder from "../containers/CommonScreen/CompletedOrder";
import RejectOrder from "../containers/CommonScreen/RejectOrder";
import ProposeTime from "../containers/CommonScreen/ProposeTime";
import WarehouseOrderConfirmation from "../containers/Aggregator/WarehouseOrderConfirmation";
import PaymentDetails from "../containers/Recycler/PaymentDetails";

import UpdateProfile from "../containers/UpdateProfile";
import BusinessDetail from "../containers/BusinessDetail";
import ProfileUpdate from "../containers/ProfileUpdate";
import Confirmation from "../containers/Confirmation";
import SmartContract from "../containers/SmartContract";
import AuditTrail from "../containers/AuditTrail";
import SmartContractDetail from "../containers/SmartContractDetail";
import SmartContractViewItem from "../containers/SmartContractViewItem";
import OwnedContracts from "../containers/OwnedContracts";
import AddSubUser from "../containers/AddSubUser";
import AddUser from "../containers/AddUser";

import PasswordReset from "../containers/PasswordReset";
import ThankYou from "../containers/ThankYou";
import AdminNewOrderList from "../containers/Admin/NewOrderList";
import AdminNewOrder from "../containers/Admin/OrderDetails";
import EprAggregatorDetails from "../containers/Admin/EprAggregatorDetails";
import AggregatorNewOrder from "../containers/Aggregator/NewOrders";
import { resolveConfig } from "prettier";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NoHeaderScreen = { headerShown: false };
const NoTitleHeader = { title: null, headerStyle: { borderBottomWidth: 0, elevation: 0 } };
const CommonHeaderStyle = { headerTitleStyle: [AppStyles.txtBlackBold, AppStyles.f20], headerStyle: { borderBottomWidth: 0, elevation: 0 } };
const DrawerMenu = ({ navigation }) => ({
  title: null,
  headerStyle: { borderBottomWidth: 0, elevation: 0 },
  headerLeft: () => <TouchableOpacity activeOpacity={0.8} onPress={() => {
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

  useEffect(() => {
    async function getToken() {
      const token = await getSaveData(LOCAL_STORAGE_DATA_KEY.JWT_TOKEN);
      const role = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_ROLE);     
      if (token) {
        setLogin(true);
        setUserRole(role);
      }     
      setTimeout(() => {
        SplashScreen.hide();
      }, 2500);
    };
    getToken();
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
            options={({ navigation }) => ({
              title: null,
              headerStyle: { borderBottomWidth: 0, elevation: 0 },
              headerLeft: () => <TouchableOpacity activeOpacity={0.6} onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }} style={AppStyles.ml14}><EvilIcons name="navicon" size={30} /></TouchableOpacity>,
              headerRight: () => <Text style={[AppStyles.txtBlackBold, AppStyles.mr14, AppStyles.f20, { textTransform: 'capitalize' }]}>{role}</Text>,
            })
            }
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

          {/* Order List Screen number: 21*/}
          <Stack.Screen
            name={NavigationRouteNames.SELLER_MY_ORDER}
            component={SellerMyOrder}
            options={CommonHeaderStyle}
          />

          {/* View Order Screen number: 20*/}
          <Stack.Screen
            name={NavigationRouteNames.SELLER_ORDER_DETAIL}
            component={SellerOrderDetail}
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
          {/* Call back confirmation */}
          <Stack.Screen
            name={NavigationRouteNames.CALLBACK_CONFIRMATION}
            component={CallBackConfirmation}
            options={NoHeaderScreen}
          />

          {/* Order Failed Screen */}
          <Stack.Screen
            name={NavigationRouteNames.ORDER_FAILED}
            component={OrderFailed}
            options={NoTitleHeader}
          />

          {/* Confirmation Screen */}
          <Stack.Screen
            name={NavigationRouteNames.CONFIRMATION}
            component={Confirmation}
            options={NoHeaderScreen}
          />
          {/* Smart Contract Screen number: 70*/}
          <Stack.Screen
            name={NavigationRouteNames.SMART_CONTRACT}
            component={SmartContract}
            options={CommonHeaderStyle}
          />
          {/* Audit Trail Screen number: 72*/}
          <Stack.Screen
            name={NavigationRouteNames.AUDIT_TRAIL}
            component={AuditTrail}
            options={CommonHeaderStyle}
          />
          {/* Smart Contract Detail Screen number: 73*/}
          <Stack.Screen
            name={NavigationRouteNames.SMARTCONTRACT_DETAIL}
            component={SmartContractDetail}
            options={CommonHeaderStyle}
          />
          {/* Owned Contracts Screen number: 71*/}
          <Stack.Screen
            name={NavigationRouteNames.OWNED_CONTRACTS}
            component={OwnedContracts}
            options={CommonHeaderStyle}
          />
          {/* Sub User Screen number: 81*/}
          <Stack.Screen
            name={NavigationRouteNames.ADD_SUBUSER}
            component={AddSubUser}
            options={CommonHeaderStyle}
          />

          {/* Sub User Screen number: 82*/}
          <Stack.Screen
            name={NavigationRouteNames.ADD_USER}
            component={AddUser}
            options={CommonHeaderStyle}
          />

          {/* Payment Screen*/}
          <Stack.Screen
            name={NavigationRouteNames.PAYMENT}
            component={Payment}
            options={NoHeaderScreen}
          />

          {/* Smart Contract View Item Screen*/}
          <Stack.Screen
            name={NavigationRouteNames.SMARTCONTRACT_VIEWITEM}
            component={SmartContractViewItem}
            options={CommonHeaderStyle}
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
           {/* Thank You Screen */}
           <Stack.Screen
            name={NavigationRouteNames.THANKYOU}
            component={ThankYou}
            options={NoHeaderScreen}
          />
        </>;

      case USER_ROLE.SCHOOL:
        return <>
          {/* Dashboard SCREEN */}
          <Stack.Screen
            name={NavigationRouteNames.HOME_SCREEN}
            component={DrawerStack}
            options={({ navigation }) => ({
              title: null,
              headerStyle: { borderBottomWidth: 0, elevation: 0 },
              headerLeft: () => <TouchableOpacity activeOpacity={0.6} onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }} style={AppStyles.ml14}><EvilIcons name="navicon" size={30} /></TouchableOpacity>,
              headerRight: () => <Text style={[AppStyles.txtBlackBold, AppStyles.mr14, AppStyles.f20, { textTransform: 'capitalize' }]}>{role}</Text>,
            })
            }
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

          {/* Order List Screen number: 21*/}
          <Stack.Screen
            name={NavigationRouteNames.SELLER_MY_ORDER}
            component={SellerMyOrder}
            options={CommonHeaderStyle}
          />

          {/* View Order Screen number: 20*/}
          <Stack.Screen
            name={NavigationRouteNames.SELLER_ORDER_DETAIL}
            component={SellerOrderDetail}
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
          {/* Call back confirmation */}
          <Stack.Screen
            name={NavigationRouteNames.CALLBACK_CONFIRMATION}
            component={CallBackConfirmation}
            options={NoHeaderScreen}
          />

          {/* Order Failed Screen */}
          <Stack.Screen
            name={NavigationRouteNames.ORDER_FAILED}
            component={OrderFailed}
            options={NoTitleHeader}
          />

          {/* Confirmation Screen */}
          <Stack.Screen
            name={NavigationRouteNames.CONFIRMATION}
            component={Confirmation}
            options={NoHeaderScreen}
          />
          {/* Smart Contract Screen number: 70*/}
          <Stack.Screen
            name={NavigationRouteNames.SMART_CONTRACT}
            component={SmartContract}
            options={CommonHeaderStyle}
          />
          {/* Audit Trail Screen number: 72*/}
          <Stack.Screen
            name={NavigationRouteNames.AUDIT_TRAIL}
            component={AuditTrail}
            options={CommonHeaderStyle}
          />
          {/* Smart Contract Detail Screen number: 73*/}
          <Stack.Screen
            name={NavigationRouteNames.SMARTCONTRACT_DETAIL}
            component={SmartContractDetail}
            options={CommonHeaderStyle}
          />
          {/* Owned Contracts Screen number: 71*/}
          <Stack.Screen
            name={NavigationRouteNames.OWNED_CONTRACTS}
            component={OwnedContracts}
            options={CommonHeaderStyle}
          />
          {/* Sub User Screen number: 81*/}
          <Stack.Screen
            name={NavigationRouteNames.ADD_SUBUSER}
            component={AddSubUser}
            options={CommonHeaderStyle}
          />

          {/* Sub User Screen number: 82*/}
          <Stack.Screen
            name={NavigationRouteNames.ADD_USER}
            component={AddUser}
            options={CommonHeaderStyle}
          />

          {/* Payment Screen*/}
          <Stack.Screen
            name={NavigationRouteNames.PAYMENT}
            component={Payment}
            options={NoHeaderScreen}
          />

          {/* Smart Contract View Item Screen*/}
          <Stack.Screen
            name={NavigationRouteNames.SMARTCONTRACT_VIEWITEM}
            component={SmartContractViewItem}
            options={CommonHeaderStyle}
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
          {/* Thank You Screen */}
          <Stack.Screen
            name={NavigationRouteNames.THANKYOU}
            component={ThankYou}
            options={NoHeaderScreen}
          />
        </>;

      case USER_ROLE.AGGRATOR:
        return <>
          <Stack.Screen
            name={NavigationRouteNames.HOME_SCREEN}
            component={DrawerStack}
            options={({ navigation }) => ({
              title: null,
              headerStyle: { borderBottomWidth: 0, elevation: 0 },
              headerLeft: () => <TouchableOpacity activeOpacity={0.6} onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }} style={AppStyles.ml14}><EvilIcons name="navicon" size={30} /></TouchableOpacity>,
              headerRight: () => <Text style={[AppStyles.txtBlackBold, AppStyles.mr14, AppStyles.f20, { textTransform: 'capitalize' }]}>{role}</Text>,
            })
            }
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

          {/* Schedule Order screen number: 21 */}
          <Stack.Screen
            name={NavigationRouteNames.AGGREGATOR_SCHEDULE_ORDER_LIST}
            component={AggregatorScheduleOrderList}
            options={CommonHeaderStyle}
          />

          {/* Completed Order screen number: 45 */}
          <Stack.Screen
            name={NavigationRouteNames.COMPLETED_ORDER}
            component={CompletedOrder}
            options={CommonHeaderStyle}
          />

          {/* Work Order Details Screen number: 31 */}
          <Stack.Screen
            name={NavigationRouteNames.WORKORDER_DETAILS}
            component={WorkOrderDetails}
            options={CommonHeaderStyle}
          />

          {/* Order Screen number: 21*/}
          <Stack.Screen
            name={NavigationRouteNames.WORK_ORDER_VERIFICATION}
            component={WorkOrderVerification}
            options={CommonHeaderStyle}
          />

          {/* Smart Contract Screen number: 70*/}
          <Stack.Screen
            name={NavigationRouteNames.SMART_CONTRACT}
            component={SmartContract}
            options={CommonHeaderStyle}
          />
          {/* Audit Trail Screen number: 72*/}
          <Stack.Screen
            name={NavigationRouteNames.AUDIT_TRAIL}
            component={AuditTrail}
            options={CommonHeaderStyle}
          />
          {/* Smart Contract Detail Screen number: 73*/}
          <Stack.Screen
            name={NavigationRouteNames.SMARTCONTRACT_DETAIL}
            component={SmartContractDetail}
            options={CommonHeaderStyle}
          />
          {/* Owned Contracts Screen number: 71*/}
          <Stack.Screen
            name={NavigationRouteNames.OWNED_CONTRACTS}
            component={OwnedContracts}
            options={CommonHeaderStyle}
          />
          {/* Warehouse Order Confirmation Screen*/}
          <Stack.Screen
            name={NavigationRouteNames.WAREHOUSEORDER_CONFIRMATION}
            component={WarehouseOrderConfirmation}
            options={CommonHeaderStyle}
          />
          {/* Sub User Screen number: 81*/}
          <Stack.Screen
            name={NavigationRouteNames.ADD_SUBUSER}
            component={AddSubUser}
            options={CommonHeaderStyle}
          />

          {/* Sub User Screen number: 82*/}
          <Stack.Screen
            name={NavigationRouteNames.ADD_USER}
            component={AddUser}
            options={CommonHeaderStyle}
          />

          {/* New Work Order List Screen number: 21*/}
          <Stack.Screen
            name={NavigationRouteNames.AGGREGATOR_WORK_ORDER_LIST}
            component={AggregatorWorkOrderList}
            options={CommonHeaderStyle}
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
          {/* Smart Contract View Item Screen*/}
          <Stack.Screen
            name={NavigationRouteNames.SMARTCONTRACT_VIEWITEM}
            component={SmartContractViewItem}
            options={CommonHeaderStyle}
          />

          {/* Order Screen number: 21*/}
          <Stack.Screen
            name={NavigationRouteNames.AGGREGATOR_NEW_ORDERS}
            component={AggregatorNewOrder}
            options={CommonHeaderStyle}
          />
          {/* Order Screen number: 21*/}
          <Stack.Screen
            name={NavigationRouteNames.PAYMENT_VERIFICATION}
            component={PaymentVerification}
            options={CommonHeaderStyle}
          />

          {/* Warehouse Details screen number: 32 */}
          <Stack.Screen
            name={NavigationRouteNames.WAREHOUSE_DETAILS}
            component={WarehouseDetails}
            options={CommonHeaderStyle}
          />

          {/* Warehouse Details screen number: 33 */}
          <Stack.Screen
            name={NavigationRouteNames.WORKORDER_EMAIL}
            component={WorkOrderEmail}
            options={NoHeaderScreen}
          />

          {/* Confirmation Screen */}
          <Stack.Screen
            name={NavigationRouteNames.CONFIRMATION}
            component={Confirmation}
            options={NoHeaderScreen}
          />

          {/* Work Order Confirmation Screen */}
          <Stack.Screen
            name={NavigationRouteNames.WORK_ORDER_CONFIRMATION}
            component={WorkOrderConfirmation}
            options={NoHeaderScreen}
          />

          {/* Reject Order Screen */}
          <Stack.Screen
            name={NavigationRouteNames.REJECT_ORDER}
            component={RejectOrder}
            options={NoHeaderScreen}
          />
          {/* Propose Time Screen */}
          <Stack.Screen
            name={NavigationRouteNames.PROPOSE_TIME}
            component={ProposeTime}
            options={CommonHeaderStyle}
          />
          {/* Work Order Detail Screen */}
          <Stack.Screen
            name={NavigationRouteNames.WORK_ORDERDETAIL}
            component={WorkOrderDetail}
            options={CommonHeaderStyle}
          />
          {/* Thank You Screen */}
          <Stack.Screen
            name={NavigationRouteNames.THANKYOU}
            component={ThankYou}
            options={NoHeaderScreen}
          />
        </>;

      case USER_ROLE.DRCC:
        return <>
          <Stack.Screen
            name={NavigationRouteNames.HOME_SCREEN}
            component={DrawerStack}
            options={({ navigation }) => ({
              title: null,
              headerStyle: { borderBottomWidth: 0, elevation: 0 },
              headerLeft: () => <TouchableOpacity activeOpacity={0.6} onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }} style={AppStyles.ml14}><EvilIcons name="navicon" size={30} /></TouchableOpacity>,
              headerRight: () => <Text style={[AppStyles.txtBlackBold, AppStyles.mr14, AppStyles.f20, { textTransform: 'capitalize' }]}>{role}</Text>,
            })
            }
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

          {/* Schedule Order screen number: 21 */}
          <Stack.Screen
            name={NavigationRouteNames.AGGREGATOR_SCHEDULE_ORDER_LIST}
            component={AggregatorScheduleOrderList}
            options={CommonHeaderStyle}
          />

          {/* Completed Order screen number: 45 */}
          <Stack.Screen
            name={NavigationRouteNames.COMPLETED_ORDER}
            component={CompletedOrder}
            options={CommonHeaderStyle}
          />

          {/* Work Order Details Screen number: 31 */}
          <Stack.Screen
            name={NavigationRouteNames.WORKORDER_DETAILS}
            component={WorkOrderDetails}
            options={CommonHeaderStyle}
          />

          {/* Order Screen number: 21*/}
          <Stack.Screen
            name={NavigationRouteNames.WORK_ORDER_VERIFICATION}
            component={WorkOrderVerification}
            options={CommonHeaderStyle}
          />

          {/* Smart Contract Screen number: 70*/}
          <Stack.Screen
            name={NavigationRouteNames.SMART_CONTRACT}
            component={SmartContract}
            options={CommonHeaderStyle}
          />
          {/* Audit Trail Screen number: 72*/}
          <Stack.Screen
            name={NavigationRouteNames.AUDIT_TRAIL}
            component={AuditTrail}
            options={CommonHeaderStyle}
          />
          {/* Smart Contract Detail Screen number: 73*/}
          <Stack.Screen
            name={NavigationRouteNames.SMARTCONTRACT_DETAIL}
            component={SmartContractDetail}
            options={CommonHeaderStyle}
          />
          {/* Owned Contracts Screen number: 71*/}
          <Stack.Screen
            name={NavigationRouteNames.OWNED_CONTRACTS}
            component={OwnedContracts}
            options={CommonHeaderStyle}
          />
          {/* Warehouse Order Confirmation Screen*/}
          <Stack.Screen
            name={NavigationRouteNames.WAREHOUSEORDER_CONFIRMATION}
            component={WarehouseOrderConfirmation}
            options={CommonHeaderStyle}
          />
          {/* Sub User Screen number: 81*/}
          <Stack.Screen
            name={NavigationRouteNames.ADD_SUBUSER}
            component={AddSubUser}
            options={CommonHeaderStyle}
          />

          {/* Sub User Screen number: 82*/}
          <Stack.Screen
            name={NavigationRouteNames.ADD_USER}
            component={AddUser}
            options={CommonHeaderStyle}
          />

          {/* New Work Order List Screen number: 21*/}
          <Stack.Screen
            name={NavigationRouteNames.AGGREGATOR_WORK_ORDER_LIST}
            component={AggregatorWorkOrderList}
            options={CommonHeaderStyle}
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
          {/* Smart Contract View Item Screen*/}
          <Stack.Screen
            name={NavigationRouteNames.SMARTCONTRACT_VIEWITEM}
            component={SmartContractViewItem}
            options={CommonHeaderStyle}
          />

          {/* Order Screen number: 21*/}
          <Stack.Screen
            name={NavigationRouteNames.AGGREGATOR_NEW_ORDERS}
            component={AggregatorNewOrder}
            options={CommonHeaderStyle}
          />
          {/* Order Screen number: 21*/}
          <Stack.Screen
            name={NavigationRouteNames.PAYMENT_VERIFICATION}
            component={PaymentVerification}
            options={CommonHeaderStyle}
          />

          {/* Warehouse Details screen number: 32 */}
          <Stack.Screen
            name={NavigationRouteNames.WAREHOUSE_DETAILS}
            component={WarehouseDetails}
            options={CommonHeaderStyle}
          />

          {/* Warehouse Details screen number: 33 */}
          <Stack.Screen
            name={NavigationRouteNames.WORKORDER_EMAIL}
            component={WorkOrderEmail}
            options={NoHeaderScreen}
          />

          {/* Confirmation Screen */}
          <Stack.Screen
            name={NavigationRouteNames.CONFIRMATION}
            component={Confirmation}
            options={NoHeaderScreen}
          />

          {/* Work Order Confirmation Screen */}
          <Stack.Screen
            name={NavigationRouteNames.WORK_ORDER_CONFIRMATION}
            component={WorkOrderConfirmation}
            options={NoHeaderScreen}
          />

          {/* Reject Order Screen */}
          <Stack.Screen
            name={NavigationRouteNames.REJECT_ORDER}
            component={RejectOrder}
            options={NoHeaderScreen}
          />
          {/* Propose Time Screen */}
          <Stack.Screen
            name={NavigationRouteNames.PROPOSE_TIME}
            component={ProposeTime}
            options={CommonHeaderStyle}
          />
          {/* Work Order Detail Screen */}
          <Stack.Screen
            name={NavigationRouteNames.WORK_ORDERDETAIL}
            component={WorkOrderDetail}
            options={CommonHeaderStyle}
          />
          {/* Thank You Screen */}
          <Stack.Screen
            name={NavigationRouteNames.THANKYOU}
            component={ThankYou}
            options={NoHeaderScreen}
          />
        </>;

      case USER_ROLE.RECYCLER:
        return <>
          <Stack.Screen
            name={NavigationRouteNames.HOME_SCREEN}
            component={DrawerStack}
            options={({ navigation }) => ({
              title: null,
              headerStyle: { borderBottomWidth: 0, elevation: 0 },
              headerLeft: () => <TouchableOpacity activeOpacity={0.6} onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }} style={AppStyles.ml14}><EvilIcons name="navicon" size={30} /></TouchableOpacity>,
              headerRight: () => <Text style={[AppStyles.txtBlackBold, AppStyles.mr14, AppStyles.f20, { textTransform: 'capitalize' }]}>{role}</Text>,
            })
            }
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
          {/* Inventory screen number: 40 */}
          <Stack.Screen
            name={NavigationRouteNames.INVENTORY}
            component={Inventory}
            options={CommonHeaderStyle}
          />
          {/* New Work Order screen number: 32 */}
          <Stack.Screen
            name={NavigationRouteNames.NEW_WORKORDER}
            component={NewWorkOrder}
            options={CommonHeaderStyle}
          />

          {/* Schedule Order screen number: 21 */}
          <Stack.Screen
            name={NavigationRouteNames.RECYCLER_SCHEDULED_ORDER_LIST}
            component={RecyclerScheduleOrderList}
            options={CommonHeaderStyle}
          />

          {/* New Work Order List Screen number: 21*/}
          <Stack.Screen
            name={NavigationRouteNames.RECYCLER_WORK_ORDER_LIST}
            component={RecyclerWorkOrderList}
            options={CommonHeaderStyle}
          />

          {/* Completed Order screen number: 45 */}
          <Stack.Screen
            name={NavigationRouteNames.COMPLETED_ORDER}
            component={CompletedOrder}
            options={CommonHeaderStyle}
          />

          {/* Warehouse Details screen number: 33 */}
          <Stack.Screen
            name={NavigationRouteNames.WORKORDER_EMAIL}
            component={WorkOrderEmail}
            options={NoHeaderScreen}
          />

          {/* Confirmation Screen */}
          <Stack.Screen
            name={NavigationRouteNames.ORDER_CONFIRMATION}
            component={OrderConfirmation}
            options={CommonHeaderStyle}
          />

          {/* Work Order Confirmation Screen */}
          <Stack.Screen
            name={NavigationRouteNames.WORK_ORDER_CONFIRMATION}
            component={WorkOrderConfirmation}
            options={NoHeaderScreen}
          />

          {/* Reject Order Screen */}
          <Stack.Screen
            name={NavigationRouteNames.REJECT_ORDER}
            component={RejectOrder}
            options={NoHeaderScreen}
          />
          {/* Propose Time Screen */}
          <Stack.Screen
            name={NavigationRouteNames.PROPOSE_TIME}
            component={ProposeTime}
            options={CommonHeaderStyle}
          />

          {/* Order Screen number: 21*/}
          <Stack.Screen
            name={NavigationRouteNames.PAYMENT_VERIFICATION}
            component={PaymentVerification}
            options={CommonHeaderStyle}
          />

          {/* Warehouse Details screen number: 32 */}
          <Stack.Screen
            name={NavigationRouteNames.WAREHOUSE_DETAILS}
            component={WarehouseDetails}
            options={CommonHeaderStyle}
          />

          {/* Order Screen number: 21*/}
          <Stack.Screen
            name={NavigationRouteNames.WORK_ORDER_VERIFICATION}
            component={WorkOrderVerification}
            options={CommonHeaderStyle}
          />

          {/* Work Order Summary screen number: 42 */}
          <Stack.Screen
            name={NavigationRouteNames.WORKORDER_SUMMARY}
            component={Workordersummary}
            options={CommonHeaderStyle}
          />
          {/* Smart Contract Screen number: 70*/}
          <Stack.Screen
            name={NavigationRouteNames.SMART_CONTRACT}
            component={SmartContract}
            options={CommonHeaderStyle}
          />
          {/* Audit Trail Screen number: 72*/}
          <Stack.Screen
            name={NavigationRouteNames.AUDIT_TRAIL}
            component={AuditTrail}
            options={CommonHeaderStyle}
          />
          {/* Smart Contract Detail Screen number: 73*/}
          <Stack.Screen
            name={NavigationRouteNames.SMARTCONTRACT_DETAIL}
            component={SmartContractDetail}
            options={CommonHeaderStyle}
          />
          {/* Owned Contracts Screen number: 71*/}
          <Stack.Screen
            name={NavigationRouteNames.OWNED_CONTRACTS}
            component={OwnedContracts}
            options={CommonHeaderStyle}
          />
          {/* New Work Order List Screen number: 21*/}
          <Stack.Screen
            name={NavigationRouteNames.RECYCLER_NEW_ORDER_LIST}
            component={RecyclerNewOrderList}
            options={CommonHeaderStyle}
          />
          {/* Sub User Screen number: 81*/}
          <Stack.Screen
            name={NavigationRouteNames.ADD_SUBUSER}
            component={AddSubUser}
            options={CommonHeaderStyle}
          />

          {/* Sub User Screen number: 82*/}
          <Stack.Screen
            name={NavigationRouteNames.ADD_USER}
            component={AddUser}
            options={CommonHeaderStyle}
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
          {/* Smart Contract View Item Screen*/}
          <Stack.Screen
            name={NavigationRouteNames.SMARTCONTRACT_VIEWITEM}
            component={SmartContractViewItem}
            options={CommonHeaderStyle}
          />
          {/* Thank You Screen */}
          <Stack.Screen
            name={NavigationRouteNames.THANKYOU}
            component={ThankYou}
            options={NoHeaderScreen}
          />
        </>;

      case USER_ROLE.ADMIN:
        return <>
          {/* Dashboard SCREEN */}
          <Stack.Screen
            name={NavigationRouteNames.HOME_SCREEN}
            component={DrawerStack}
            options={({ navigation }) => ({
              title: null,
              headerStyle: { borderBottomWidth: 0, elevation: 0 },
              headerLeft: () => <TouchableOpacity activeOpacity={0.6} onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }} style={AppStyles.ml14}><EvilIcons name="navicon" size={30} /></TouchableOpacity>,
              headerRight: () => <Text style={[AppStyles.txtBlackBold, AppStyles.mr14, AppStyles.f20, { textTransform: 'capitalize' }]}>{role}</Text>,
            })
            }
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

          {/* New Work Order List Screen number: 21*/}
          <Stack.Screen
            name={NavigationRouteNames.ADMIN_NEW_ORDER_LIST}
            component={AdminNewOrderList}
            options={CommonHeaderStyle}
          />
          {/* View Order Screen number: 20*/}
          <Stack.Screen
            name={NavigationRouteNames.ADMIN_NEW_ORDER}
            component={AdminNewOrder}
            options={CommonHeaderStyle}
          />

          {/* View Order Screen number: 20*/}
          <Stack.Screen
            name={NavigationRouteNames.ASSIGN_ORDER}
            component={OrderAssign}
            options={CommonHeaderStyle}
          />


          {/* Confirmation Screen */}
          <Stack.Screen
            name={NavigationRouteNames.CONFIRMATION}
            component={Confirmation}
            options={NoHeaderScreen}
          />

          {/* Failed Screen */}
          <Stack.Screen
            name={NavigationRouteNames.ORDER_FAILED}
            component={OrderFailed}
            options={NoHeaderScreen}
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
            options={NoHeaderScreen}
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
          {/* User List Screen */}
          <Stack.Screen
            name={NavigationRouteNames.USERS}
            component={Users}
            options={CommonHeaderStyle}
          />
          {/* Download Report Screen number: 91*/}
          <Stack.Screen
            name={NavigationRouteNames.DOWNLOAD_REPORT}
            component={DownloadReport}
            options={CommonHeaderStyle}
          />
          {/* ManageEPR Screen number: 92*/}
          <Stack.Screen
            name={NavigationRouteNames.MANAGE_EPR}
            component={ManageEPR}
            options={CommonHeaderStyle}
          />
          {/* Sub Category Details Screen number: 93*/}
          <Stack.Screen
            name={NavigationRouteNames.SUBCATEGORY_DETAILS}
            component={SubCategoryDetails}
            options={CommonHeaderStyle}
          />
          {/* Provisional Pricing Screen number: 94*/}
          <Stack.Screen
            name={NavigationRouteNames.PROVISIONAL_PRICING}
            component={ProvisionalPricing}
            options={CommonHeaderStyle}
          />

          {/* ADD Provisional Pricing Screen number: 94*/}
          <Stack.Screen
            name={NavigationRouteNames.ADD_PROVISIONAL_PRICING}
            component={AddProvisionalPricing}
            options={CommonHeaderStyle}
          />
          {/* Password Reset Screen number: 53*/}
          <Stack.Screen
            name={NavigationRouteNames.PASSWORD_RESET}
            component={PasswordReset}
            options={NoHeaderScreen}
          />
          {/* Sub User Screen number: 81*/}
          <Stack.Screen
            name={NavigationRouteNames.ADD_SUBUSER}
            component={AddSubUser}
            options={CommonHeaderStyle}
          />

          {/* Sub User Screen number: 82*/}
          <Stack.Screen
            name={NavigationRouteNames.ADD_USER}
            component={AddUser}
            options={CommonHeaderStyle}
          />

          {/* Sub Category Screen*/}
          <Stack.Screen
            name={NavigationRouteNames.ADD_SUBCATEGORY}
            component={AddSubCategory}
            options={CommonHeaderStyle}
          />

          {/* EPR Aggregator Details Screen*/}
          <Stack.Screen
            name={NavigationRouteNames.EPR_AGGREGATORDETAILS}
            component={EprAggregatorDetails}
            options={CommonHeaderStyle}
          />

        </>;

      case USER_ROLE.EPR:
        return <>
          {/* Dashboard SCREEN */}
          <Stack.Screen
            name={NavigationRouteNames.HOME_SCREEN}
            component={DrawerStack}
            options={({ navigation }) => ({
              title: null,
              headerStyle: { borderBottomWidth: 0, elevation: 0 },
              headerLeft: () => <TouchableOpacity activeOpacity={0.6} onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }} style={AppStyles.ml14}><EvilIcons name="navicon" size={30} /></TouchableOpacity>,
              headerRight: () => <Text style={[AppStyles.txtBlackBold, AppStyles.mr14, AppStyles.f20, { textTransform: 'capitalize' }]}>{role}</Text>,
            })
            }
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
          {/* Thank You Screen */}
          <Stack.Screen
            name={NavigationRouteNames.THANKYOU}
            component={ThankYou}
            options={NoHeaderScreen}
          />

        </>;

      default:
        return <>
          {/* Login SCREEN */}
          <Stack.Screen
            name={NavigationRouteNames.LOGIN_WITH_EMAIL}
            component={LoginWithEmail}
            options={NoHeaderScreen}
          />

          <Stack.Screen
            name={NavigationRouteNames.SIGNUP}
            component={SignUp}
            options={NoHeaderScreen}
          />

          <Stack.Screen
            name={NavigationRouteNames.PASSWORD_RESET}
            component={PasswordReset}
            options={NoHeaderScreen}
          />
        </>;
    }
  };

  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName={
        !isLogin ? NavigationRouteNames.LOGIN_WITH_EMAIL :         
         NavigationRouteNames.HOME_SCREEN
      }
    >
      {!loginCheck ? (
        <>
          {/* Login SCREEN */}
          <Stack.Screen
            name={NavigationRouteNames.LOGIN_WITH_EMAIL}
            component={LoginWithEmail}
            options={NoHeaderScreen}
          />

          <Stack.Screen
            name={NavigationRouteNames.SIGNUP}
            component={SignUp}
            options={NoHeaderScreen}
          />

          {/* Password Reset SCREEN */}
          <Stack.Screen
            name={NavigationRouteNames.PASSWORD_RESET}
            component={PasswordReset}
            options={NoHeaderScreen}
          />
        </>
      ) :
        SwitchNavigation(role)}
    </Stack.Navigator>
  );
};
export default AppStack;
