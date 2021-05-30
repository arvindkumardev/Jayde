import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import * as Alert from 'react-native';
import { Platform, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import Styles from "./styles";
import FAIcon from 'react-native-vector-icons/FontAwesome';

import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import moment from 'moment';
import { confirmOrder } from "./../PricingRequest/middleware";
import UserContext from '../../../appContainer/context/user.context';


function SellerOrderDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const [item, setItem] = useState({});
  const { setLoader } = useContext(UserContext);

  const [{ data: rescheduleData, loading, error }, onConfirmOrder] = confirmOrder(item);

  useEffect(() => {
    setLoader(loading)
    return () => {
      setLoader(false)     
    }
  }, [loading, rescheduleData])

  useLayoutEffect(() => {
    const { Item } = route.params;
    setItem(Item)

    const title = 'Order Detail';
    navigation.setOptions({
      title,
    });
  }, []);

  const getActionType = () => {
    route.params.getActionType()
    navigation.goBack()
  };

  const handleConfirm = async () => {
    const { data } = await onConfirmOrder({
      data: { assignedId: item.assigned_id },
    });
    console.log(data)
    if (data.status) {
      getActionType()
    } else {
      alert(data.message)
    }
    setLoader(false);
  }


  return (
    <View style={Styles.mainVu}>
      <ScrollView>

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
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>City</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.city}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Landmark</Text>
            </View>
            <View style={[AppStyles.flexpointsix, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.landmark}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Contact Person</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.contact_name}</Text>
            </View>
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

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Pick Up Schedule</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f11, AppStyles.mt10, AppStyles.mr20]}>{moment(item.pickup_date).format('DD-MMM-YYYY')}</Text>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f11, AppStyles.mt10, AppStyles.mr20]}>{item.time_slot}</Text>

            </View>
          </View>
        </View>


        {item.assigned_status == 2 ?
          <View style={[AppStyles.flex1, Styles.btnContainer]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv10, AppStyles.alignCenter, AppStyles.ph40, AppStyles.mb20,]}
              onPress={handleConfirm}
            >
              <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18]}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
          : item.proposed_weight_confirm == 2 ?
            <View style={[AppStyles.flex1, Styles.btnContainer]}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv10, AppStyles.alignCenter, AppStyles.ph40, AppStyles.mb20,]}
                onPress={handleConfirm}
              >
                <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18]}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
            : item.is_seller_confirmed == 2 &&
            <View style={[AppStyles.flex1, Styles.btnContainer]}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv10, AppStyles.alignCenter, AppStyles.ph40, AppStyles.mb20,]}
                onPress={handleConfirm}
              >
                <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18]}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
        }
      </ScrollView>


    </View>
  );
}
export default SellerOrderDetail;
