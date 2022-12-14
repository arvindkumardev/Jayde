import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import * as Alert from 'react-native';
import { Platform, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import moment from 'moment';
import { acceptOrder, rejectOrder } from "../Middleware";
import UserContext from '../../../appContainer/context/user.context';

function ViewNewOrder() {
  const navigation = useNavigation();
  const route = useRoute();
  const [item, setItem] = useState({});
  const { setLoader } = useContext(UserContext);

  const [{ data: acceptData, loading: acceptLoading, error: acceptError }, onAcceptOrder] = acceptOrder();
  const [{ data: rejectData, loading: rejectLoading, error: rejectError }, onRejectOrder] = rejectOrder();

  useLayoutEffect(() => {
    const { Item } = route.params;
    setItem(Item)

    const title = 'New Order';
    navigation.setOptions({
      title,
    });
  }, []);

  useEffect(() => {
    if (acceptError)
      setLoader(false)
  }, [acceptError])

  useEffect(() => {
    if (rejectError)
      setLoader(false)
  }, [rejectError])

  useEffect(() => {
    return () => {
      setLoader(false)
    }
  }, [])

  const getActionType = () => {
    route.params.getActionType()
    navigation.goBack()
  };

  const handelReject = async () => {
    setLoader(true);
    try {
      const { data } = await onRejectOrder({
        data: { orderId: item.orderId },
      });
      console.log(data)
      if (data.status) {
        navigation.navigate(NavigationRouteNames.ORDER_FAILED, { Value: item, getActionType: getActionType })
      } else {
        alert(data.message)
      }
      setLoader(false);
    } catch (e) {
      console.log("Response error", e);
    }
  }

  const handelAccept = async () => {
    setLoader(true);
    try {
      const { data } = await onAcceptOrder({
        data: { orderId: item.orderId },
      });
      console.log(data)
      if (data.status) {
        navigation.navigate(NavigationRouteNames.ORDER_ASSIGN, { Value: item })
      } else {
        alert(data.message)
      }
      setLoader(false);
    } catch (e) {
      console.log("Response error", e);
    }
  }

  return (
    <View style={AppStyles.topView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={AppStyles.aligncen}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt30,]}>Ref No- {item.order_no}</Text>
        </View>

        <View style={[AppStyles.boxxView, AppStyles.mt35]}>
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
            {/* <View style={AppStyles.flexpointsix}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Purchase Date</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{moment(item.pickup_date).format('DD/MM/YYYY')}</Text>
            </View>*/}
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Purchase Amount</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <View style={[AppStyles.flexRowAlignCenter, AppStyles.mt10, AppStyles.mr20]}>
                <FAIcon size={14} name='rupee'></FAIcon>
                <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.ml5]}>{item.price}</Text>
              </View>
            </View>
          </View>

          <View style={[AppStyles.flexDir, AppStyles.mb10]}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Pick Up Schedule</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f11, AppStyles.mt10, AppStyles.mr20]}>{moment(item.pickup_date).format('DD-MMM-YYYY')}</Text>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f11, AppStyles.mt10, AppStyles.mr20]}>{item.time_slot}</Text>
            </View>
          </View>
        </View>

        {item.is_confirmed == 2 && <View style={[Styles.btnContainer, AppStyles.flexDir]}>
          <View style={AppStyles.flex1}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[Styles.aggregatebtn]}
              onPress={() => { handelReject() }}>
              <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig]}>REJECT</Text>
            </TouchableOpacity>
          </View>
          <View style={AppStyles.flex1}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[Styles.confirmbtn, AppStyles.mb20]}
              onPress={() => { handelAccept() }}>
              <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig]}>ACCEPT</Text>
            </TouchableOpacity>
          </View>
        </View>
        }
      </ScrollView>
    </View>
  );
}
export default ViewNewOrder;
