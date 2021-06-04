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
import { USERS_ROLE_MENU, STATUS_ICON } from '../../routes/constants';
import Styles from './styles';
import { getNewOrder } from "../../services/CommonController";
import { NotificationService } from '../../services/firebase'
import LocalNotificationService from '../../services/firebase/LocalNotificationService'
import { size } from 'lodash';
import { RfH, RfW } from '../../utils/helpers';

//Image
import EWasteImg from './../../assets/Images/NewOrderList/Group_10091.png'
import PaperImg from './../../assets/Images/NewOrderList/Group_10089.png'
import PlasticImg from './../../assets/Images/NewOrderList/Group_10090.png'
import MixWasterImg from './../../assets/Images/NewOrderList/Group_10088.png'

import BagImg from '../../assets/Images/Dashboard/Mask.png'

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
  const [homeOrder, setHomeOrder] = useState([]);
  const [{ data, loading, error }, onOrderList] = getNewOrder(userRole, 0);

  useEffect(() => {
    async function getUserName() {
      const username = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_NAME);
      setName(username)
    }
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
      if (userRole === 'seller') {
        setHomeOrder(data.data[0].orderDetails)
      } else {
        setHomeOrder(data.data[0].newOrders)
      }
      //setLoader(loading)            
    }
    catch (e) {
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
  const _renderData = (index, item) => {
    return (
      <TouchableOpacity activeOpacity = {0.8} key={index} style={Styles.dataItemContainer}>
        <View style={Styles.dataImage}>
          <Image source={ORDER_IMAGE[item.category_name]} />
        </View>
        <View style={[Styles.dataItemContent, AppStyles.ml15]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f17]}>{item.order_no}</Text>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15]}>{item.qty} {item.unit_name} {item.category_name}</Text>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11]}>{formatDisplayDate(item.pickup_date)}</Text>
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
      <View key={index} style={[Styles.menuContainer, { backgroundColor: index == 0 ? Colors.mangoTwo : index == 1 ? Colors.paleGold : Colors.lightOlive, }]}>
        <View>
          <TouchableOpacity activeOpacity = {0.8} style={Styles.menuEllipseContainer}>
            {/* <FAIcon name="ellipsis-v" color={Colors.white} size={20} /> */}
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity = {0.8} onPress={() => handleNavigate(item.screenName)} style={Styles.menuActionItem}>
          <View style={[AppStyles.mr20, AppStyles.mb10, AppStyles.alignfend]}>
            <MCIcon name={item.iconName} color={Colors.white} size={30} />
          </View>
          <View style={[AppStyles.aligncen, AppStyles.mb20]}>
            <Text style={[AppStyles.txtWhiteBold, AppStyles.f17, AppStyles.textalig]}>{item.menuName}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator = {false} style={{ backgroundColor: Colors.white }}>
      <View style={[AppStyles.flexDir, AppStyles.mt10, AppStyles.inCenter]}>
        <View style={[AppStyles.flexpointseven, AppStyles.ml24]}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f20]}>{getGreeting()}</Text>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f30]}>{name}</Text>
        </View>
        <View style={[AppStyles.flexpointthree, {right: -10}]}>
          <Image source={BagImg} style = {[Styles.imgBag]} />
        </View>
      </View>

      <FlatList
        data={USERS_ROLE_MENU[userRole]}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ index, item }) => _renderMenu(index, item)}
        keyExtractor={(_, index) => `${index}1`}
      />
      <View style={[AppStyles.mt35, AppStyles.ml24]}>
        <Text style={[AppStyles.txtBlackBold, AppStyles.f20]}>Current Orders</Text>
      </View>

      {size(homeOrder) > 0 ?
      <FlatList data={homeOrder}
        renderItem={({ index, item }) => _renderData(index, item)}
        extraData={useState}
        removeClippedSubviews={Platform.OS === 'android' && true}
        numColumns={1}
        keyExtractor={(_, index) => `${index}2`} />
        :
        !loading && <View style = {[AppStyles.inCenter, {height:RfH(320)}]}>
        <Text style = {[AppStyles.txtBlackRegular, AppStyles.textalig, AppStyles.f18]}>No Pending Task</Text>
        </View> 
      }

    </ScrollView>
  );
}

export default HomeScreen;
