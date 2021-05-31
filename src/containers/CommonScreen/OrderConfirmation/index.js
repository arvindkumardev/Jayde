import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import moment from 'moment';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { confirmSchedule } from '../Middelware';
import UserContext from '../../../appContainer/context/user.context';

function OrderConfirmation() {

  const navigation = useNavigation();
  const route = useRoute();
  const [item, setItem] = useState({});
  const { setLoader, userRole } = useContext(UserContext);

  const [{ data: confirmData, loading, error }, onConfirmSchedule] = confirmSchedule(userRole);

  const rejectOrder = () => {
    navigation.navigate(NavigationRouteNames.REJECT_ORDER, { Item: item });
  }

  const proposeTime = () => {
    navigation.navigate(NavigationRouteNames.PROPOSE_TIME, { Item: item });
  }

  const screenNavigate = () => {
    navigation.popToTop()
    navigation.navigate(NavigationRouteNames.PAYMENT_VERIFICATION,
      { assignedID: item.assigned_id, WhereFrom: NavigationRouteNames.ORDER_CONFIRMATION });
  }

  useLayoutEffect(() => {
    const { Item } = route.params;
    setItem(Item)
    const title = 'New Order';
    navigation.setOptions({ title });
  }, []);

  useEffect(() => {
    return () => {
      setLoader(false)
    }
  }, [])

  useEffect(() => {
    setLoader(loading)
  }, [confirmData, loading])

  const confirmOrder = async () => {
    try {
      const { data } = await onConfirmSchedule({ data: { 'assignedId': item.assigned_id } });
      if (data.status) {
        screenNavigate()
      } else {
        alert(data.message)
      }
    } catch (e) {
      console.log("Response error", e);
    }
  }

  return (
    <View style={Styles.topView}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={AppStyles.aligncen}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt30,]}>Ref No- {item.order_no}</Text>
        </View>
        <View style={Styles.boxView}>

          <View style={[AppStyles.flexDir, AppStyles.mt20,]}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.ml20]}>Waste type</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mr20]}>{item.category_name}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Waste sub category</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.sub_category_name}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Volume</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.qty} {item.unit_name}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Purchase Date</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{moment(item.pickup_date).format('DD-MMM-YY')}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flex1}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Pickup Time</Text>
            </View>
            <View style={[AppStyles.flex1, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.time_slot}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Provisional Pricing</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}><FAIcon size={14} name="rupee" /> {item.price}</Text>
            </View>
          </View>
        </View>

        <View style={Styles.btnContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={Styles.confirmbtn} onPress={() => confirmOrder()}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>CONFIRM SCHEDULE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[Styles.proposebtn]} onPress={() => proposeTime(item)}>
            <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>PROPOSE NEW TIME</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[Styles.proposebtn, AppStyles.mb20]} onPress={() => rejectOrder(item)}>
            <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>REJECT</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

    </View>
  );
}
export default OrderConfirmation;
