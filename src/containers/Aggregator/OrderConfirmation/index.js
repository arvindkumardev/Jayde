import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import * as Alert from 'react-native';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView } from 'react-native';
import Styles from "./styles";
import Appstyles from "../../../theme/Styles/texts";
import AppStyle from "../../../theme/Styles/spaces";
import style from "../../../theme/Styles/container";
import CustomText from '../../../components/CustomText';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import moment from 'moment';
import FAIcon from 'react-native-vector-icons/FontAwesome';


function OrderConfirmation() {

  const navigation = useNavigation();
  const route = useRoute();
  const [item, setItem] = useState({});

  const rejectOrder = () => {
    navigation.navigate(NavigationRouteNames.REJECT_ORDER, { Item: item });
  }

  const proposeTime = () => {
    navigation.navigate(NavigationRouteNames.PROPOSE_TIME, { Item: item });
  }

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.PAYMENT_VERIFICATION, { Item: item });
  }

  useLayoutEffect(() => {
    const { Item } = route.params;
    setItem(Item)
    const title = 'New Order';
    navigation.setOptions({title});
  }, []);

  return (
    <View style={Styles.topView}>
      <ScrollView>


        <View style={Appstyles.aligncen}>
          <Text style={[Appstyles.txtBlackBold, Appstyles.f17, AppStyle.mt30,]}>Ref No- {item.order_no}</Text>
        </View>
        <View style={Styles.boxView}>

          <View style={[style.flexDir, AppStyle.mt20,]}>
            <View style={style.flexpointsix}>
              <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.ml20]}>Waste type</Text>
            </View>
            <View style={[style.flexpointfour, Appstyles.alignfend]}>
              <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mr20]}>{item.category_name}</Text>
            </View>
          </View>

          <View style={style.flexDir}>
            <View style={style.flexpointsix}>
              <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Waste sub category</Text>
            </View>
            <View style={[style.flexpointfour, Appstyles.alignfend]}>
              <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>{item.sub_category_name}</Text>
            </View>
          </View>

          <View style={style.flexDir}>
            <View style={style.flexpointsix}>
              <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Volume</Text>
            </View>
            <View style={[style.flexpointfour, Appstyles.alignfend]}>
              <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>{item.qty} {item.unit_name}</Text>
            </View>
          </View>

          <View style={style.flexDir}>
            <View style={style.flexpointsix}>
              <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Purchase Date</Text>
            </View>
            <View style={[style.flexpointfour, Appstyles.alignfend]}>
              <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>{moment(item.pickup_date).format('DD-MMM-YY')}</Text>
            </View>
          </View>

          <View style={style.flexDir}>
            <View style={style.flex1}>
              <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Pickup Time</Text>
            </View>
            <View style={[style.flex1, Appstyles.alignfend]}>
              <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>{item.time_slot}</Text>
            </View>
          </View>

          <View style={style.flexDir}>
            <View style={style.flexpointsix}>
              <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Provisional Pricing</Text>
            </View>
            <View style={[style.flexpointfour, Appstyles.alignfend]}>
              <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}><FAIcon size={14} name="rupee" /> {item.price}</Text>
            </View>
          </View>

        </View>

        <View style={Styles.btnContainer}>
          <TouchableOpacity
            style={Styles.confirmbtn} onPress={() => screenNavigate(item)}>
            <Text style={[Appstyles.txtWhiteRegular, Appstyles.f17, Appstyles.textalig, AppStyle.mt10]}>CONFIRM SCHEDULE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Styles.proposebtn]} onPress={() => proposeTime(item)}>
            <Text style={[Appstyles.txtPrimaryRegular, Appstyles.f17, Appstyles.textalig, AppStyle.mt10]}>PROPOSE NEW TIME</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Styles.proposebtn, AppStyle.mb20]} onPress={() => rejectOrder(item)}>
            <Text style={[Appstyles.txtPrimaryRegular, Appstyles.f17, Appstyles.textalig, AppStyle.mt10]}>REJECT</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

    </View>
  );
}
export default OrderConfirmation;
