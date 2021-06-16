/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text, Image, FlatList, ScrollView } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppStyles, Colors } from '../../theme/index';
import { removeData, getGreeting, getSaveData, formatDisplayDate } from '../../utils/helpers';
import { LOCAL_STORAGE_DATA_KEY } from '../../utils/constants';
import UserContext from '../../appContainer/context/user.context';
import { USERS_ROLE_MENU, STATUS_ICON, USER_ROLE } from '../../routes/constants';
import NavigationRouteNames from '../../routes/ScreenNames';

import Styles from './styles';
import { getHomeTopOrder } from "../../services/CommonController";
import { NotificationService } from '../../services/firebase'
import LocalNotificationService from '../../services/firebase/LocalNotificationService'
import { size } from 'lodash';
import { RfH, RfW } from '../../utils/helpers';
import NewOrderItem from '../../containers/Components/NewOrder'
import ScheduledOrderItem from '../../containers/Components/ScheduleOrder'
import WorkOrderItem from '../../containers/Components/WorkOrder'


//Image
import EWasteImg from './../../assets/Images/NewOrderList/Group_10091.png'
import PaperImg from './../../assets/Images/NewOrderList/Group_10089.png'
import PlasticImg from './../../assets/Images/NewOrderList/Group_10090.png'
import MixWasterImg from './../../assets/Images/NewOrderList/Group_10088.png'
import BagImg from '../../assets/Images/Dashboard/Mask.png'
import NoRecordImg from '../../assets/Images/NoRecord/NoRecordFound.png'

const ORDER_IMAGE = {
  'E-Waste': EWasteImg,
  Paper: PaperImg,
  Plastic: PlasticImg,
  'Mix Waste': MixWasterImg,
};

function HomeScreen() {
  const navigation = useNavigation();
  const { userRole, setLogin, setLoader } = useContext(UserContext);

  const [name, setName] = useState("");

  const [NewOrder, setNewOrder] = useState([]);
  const [ScheduledOrder, setScheduledOrder] = useState([]);
  const [WorkOrder, setWorkOrder] = useState([]);

  const [status, setStatus] = useState(false)
  const [{ data, loading, error }, onOrderList] = getHomeTopOrder(userRole, 0);

  useEffect(() => {
    async function getUserName() {
      const username = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_NAME);
      setName(username)
    }
    setStatus(false)
    getUserName();
    getHomeOrder();

    // Initialization Notification
    NotificationService.initializeNotification(onNotification, onOpenNotification)
    LocalNotificationService.configure(onOpenNotification)
    return () => {
      NotificationService.unsubscribe() // Unsubscribe on Notification
      LocalNotificationService.unregister()
    }
  }, [userRole]);

  //Handel Background Notification
  const onOpenNotification = (remoteMessage) => {
    console.log("onOpenNotification", JSON.stringify(remoteMessage))
  }

  //Handel Foreground Notification
  const onNotification = (remoteMessage) => {
    console.log("onNotification", JSON.stringify(remoteMessage))
    var notification = remoteMessage.notification
    const options = {
      soundName: 'default',
      playSound: true,
      largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
      smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
    }
    LocalNotificationService.showNotification(
      0,
      notification.title,
      notification.body,
      remoteMessage,
      options
    )
  }

  const getHomeOrder = async () => {
    try {
      const { data } = await onOrderList({ data: {} });
      if (data.status) {
        setNewOrder(data.newOrders)
        setWorkOrder(data.workOrder)
        setScheduledOrder(data.scheduleOrder)
        setStatus(true)
      } else {
        setStatus(false)
      }
    } catch (e) {
      console.log("Response error", e);
    }
  };

  const handleUserLogout = async () => {
    await removeData(LOCAL_STORAGE_DATA_KEY.JWT_TOKEN);
    await removeData(LOCAL_STORAGE_DATA_KEY.USER_ROLE);
    setLogin(false);
  };

  const handleNavigate = (screenName) => {
    if (screenName !== '' && screenName !== 'Logout') {
      navigation.navigate(screenName);
    } else if (screenName === 'Logout') {
      handleUserLogout();
    }
  };

  const getActionType = async () => {

  }

  const navigateNewOrder = (item) => {
    switch (userRole) {
      case USER_ROLE.SELLER:
        navigation.navigate(NavigationRouteNames.SELLER_ORDER_DETAIL, { Item: item, getActionType: getActionType })
        break;
      case USER_ROLE.AGGRATOR:
        navigation.navigate(NavigationRouteNames.ORDER_CONFIRMATION, { Item: item, getActionType: getActionType });
        break;
      case USER_ROLE.RECYCLER:
        navigation.navigate(NavigationRouteNames.ORDER_CONFIRMATION, { Item: item });
        break;
      case USER_ROLE.ADMIN:
        item.is_confirmed == 2 ?
          navigation.navigate(NavigationRouteNames.ORDER_ASSIGN, { Value: item, getActionType: getActionType })
          :
          navigation.navigate(NavigationRouteNames.ADMIN_NEW_ORDER, { Item: item, getActionType: getActionType })
        break;
    }
  }

  const navigateScheduledOrder = (item) => {
    item.assigned_status == '1' &&
      navigation.navigate(NavigationRouteNames.PAYMENT_VERIFICATION,
        {
          'assignedID': item.assigned_id,
          getActionType: getActionType,
          WhereFrom: NavigationRouteNames.HOME_SCREEN
        });
  }

  const navigateWorkOrder = (item) => {
    navigation.navigate(NavigationRouteNames.WORK_ORDER_VERIFICATION,
      {
        item,
        'assignedID': item.assigned_id,
        WhereFrom: NavigationRouteNames.HOME_SCREEN
      });
  }

  const _renderData = (index, item) => {
    return (
      <TouchableOpacity activeOpacity={0.8} key={index} style={[Styles.dataItemContainer, AppStyles.userCardStyle, AppStyles.pv15]}>
        <View style={Styles.dataImage}>
          <Image source={ORDER_IMAGE[item.category_name]} style={AppStyles.imgOrders} />
        </View>
        <View style={[Styles.dataItemContent, AppStyles.ml15]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f17, AppStyles.mt5]}>{item.order_no}</Text>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt2]}>{item.qty} {item.unit_name} {item.category_name}</Text>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, AppStyles.mt2]}>{formatDisplayDate(item.pickup_date)}</Text>
        </View>
        <View style={Styles.statusIcon}>
          <FAIcon name={STATUS_ICON[item.is_confirmed == '3' ? 'Pending' : item.is_confirmed == '4' ? 'Completed' : 'In Transit'].iconName}
            color={STATUS_ICON[item.is_confirmed == '3' ? 'Pending' : item.is_confirmed == '4' ? 'Completed' : 'In Transit'].color} size={18} />
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, { color: item.is_confirmed == '4' ? Colors.lightOlive : Colors.warmGrey }]}>{item.is_confirmed == '3' ? 'Pending' : item.is_confirmed == '4' ? 'Completed' : 'In Transit'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderMenu = (index, item) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => handleNavigate(item.screenName)}>
        <View key={index} style={[Styles.menuContainer, { backgroundColor: index == 0 ? Colors.mangoTwo : index == 1 ? Colors.paleGold : Colors.lightOlive }, { marginLeft: index == 0 ? 24 : index == 1 ? 10 : 10, }, { marginRight: index == 2 ? 10 : null }]}>
          <View style={Styles.menuActionItem}>
            <View style={[AppStyles.mr20, AppStyles.mb10, AppStyles.alignfend, AppStyles.mt20]}>
              <MCIcon name={item.iconName} color={Colors.white} size={25} />
            </View>
            <View style={[AppStyles.mb20, AppStyles.mt20, AppStyles.ml10, AppStyles.mr10]}>
              <Text style={[AppStyles.txtWhiteBold, AppStyles.f17, AppStyles.ml10,]}>{item.menuName}</Text>
              <Text style={[AppStyles.txtWhiteRegular, AppStyles.f13, AppStyles.mt3, AppStyles.ml10,]}>{item.subMenuName}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: Colors.white }}>
      <View style={[AppStyles.flexDir, AppStyles.mt20, AppStyles.mb10]}>
        <View style={[AppStyles.ml24]}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f22]}>{getGreeting()}</Text>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f30, AppStyles.mt10]}>{name}</Text>
        </View>
      </View>

      {/* <FlatList
        data={USERS_ROLE_MENU[userRole]}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ index, item }) => _renderMenu(index, item)}
        keyExtractor={(_, index) => `${index}1`}
      /> */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS_ROLE_MENU[userRole].map((item, index) => _renderMenu(index, item))}
      </ScrollView>

      <View style={[AppStyles.mt35, AppStyles.ml24, AppStyles.mb10]}>
        <Text style={[AppStyles.txtBlackBold, AppStyles.f22]}>Current Orders</Text>
      </View>
      <View style={[AppStyles.flex1]}>

        {NewOrder.map((item, index) => <NewOrderItem item={item}
          index={index}
          screenNavigate={navigateNewOrder}
          userRole={userRole}>
        </NewOrderItem>)}

        {WorkOrder.map((item, index) => <WorkOrderItem item={item}
          index={index}
          screenNavigate={navigateWorkOrder}
          userRole={userRole}>
        </WorkOrderItem>)}

        {ScheduledOrder.map((item, index) => <ScheduledOrderItem item={item}
          index={index}
          screenNavigate={navigateScheduledOrder}
          userRole={userRole}>
        </ScheduledOrderItem>)}
        <View style={AppStyles.mb20}></View>
      </View>

      {/* {size(homeOrder) > 0 ?
        <FlatList data={homeOrder}
          renderItem={({ index, item }) =>
            <NewOrderItem item={item}
              index={index}
              screenNavigate={screenNavigate}
              userRole={userRole}>
            </NewOrderItem>
          }
          ListFooterComponent = {<View style = {AppStyles.mb20}></View>}
          extraData={useState}
          removeClippedSubviews={Platform.OS === 'android' && true}
          numColumns={1}
          keyExtractor={(_, index) => `${index}2`} />
        :
        dataLoaded && <View style={[AppStyles.inCenter, { height: RfH(320) }]}>
          <Image source={NoRecordImg} style={AppStyles.homeImgEmpty} />
          <Text style={[AppStyles.txtBlackRegular, AppStyles.textalig, AppStyles.f18, AppStyles.mt20]}>No Pending Orders</Text>
        </View>
      } */}

    </ScrollView>
  );
}

export default HomeScreen;
