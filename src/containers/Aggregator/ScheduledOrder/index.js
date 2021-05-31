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


function ScheduledOrder() {

  const navigation = useNavigation();
  const route = useRoute();

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }

  useLayoutEffect(() => {
    const title = 'Scheduled Order';
    navigation.setOptions({
      title,
    });
  }, []);

  return (
    <View style={Styles.topView}>
      <ScrollView showsVerticalScrollIndicator = {false}>

        <View style={Appstyles.aligncen}>
          <Text style={[Appstyles.txtBlackBold, Appstyles.f17, AppStyle.mt30,]}>Ref No- JYD/SC/2020/0067</Text>
        </View>
        <View style={Styles.boxView}>

          <View style={[style.flexDir, AppStyle.mt20,]}>
            <View style={style.flexpointsix}>
              <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.ml20]}>Waste type</Text>
            </View>
            <View style={[style.flexpointfour, Appstyles.alignfend]}>
              <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mr20]}>Plastic</Text>
            </View>
          </View>

          <View style={style.flexDir}>
            <View style={style.flexpointsix}>
              <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Waste sub category</Text>
            </View>
            <View style={[style.flexpointfour, Appstyles.alignfend]}>
              <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>Type 1</Text>
            </View>
          </View>

          <View style={style.flexDir}>
            <View style={style.flexpointsix}>
              <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Volume</Text>
            </View>
            <View style={[style.flexpointfour, Appstyles.alignfend]}>
              <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>3 Tons</Text>
            </View>
          </View>

          <View style={style.flexDir}>
            <View style={style.flexpointsix}>
              <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Purchase Date</Text>
            </View>
            <View style={[style.flexpointfour, Appstyles.alignfend]}>
              <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>26/07/2020</Text>
            </View>
          </View>

          <View style={style.flexDir}>
            <View style={style.flexpointsix}>
              <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Purchase amount</Text>
            </View>
            <View style={[style.flexpointfour, Appstyles.alignfend]}>
              <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>₹ 25,864</Text>
            </View>
          </View>

          <View style={style.flexDir}>
            <View style={style.flexpointsix}>
              <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Pickup Address</Text>
            </View>
            <View style={[style.flexpointfour, Appstyles.alignfend]}>
              <Text style={[Appstyles.txtBlackRegular, Appstyles.f11, AppStyle.mt10, AppStyle.mr20]}>1812, building No 2, Banjara Hills. Hyderabad (TN)</Text>
            </View>
          </View>
        </View>

        <View style={[style.flexDir, AppStyle.ml20, AppStyle.mt35]}>
          <View style={style.flexpointseven}>
            <Text style={[Appstyles.txtBlackBold, Appstyles.f17]}>Current Status</Text>
          </View>
          <View style={style.flexpointthree}>
            <Text style={[Appstyles.txtmangoTwoRegular, Appstyles.f11, AppStyle.ml10]}>View Details</Text>
          </View>
        </View>

        <View style={[style.flexDir, AppStyle.ml20, AppStyle.mt20]}>
          <View style={style.flexpointtwo}>
            <Image source={require('../../../assets/Images/Aggregator/ScheduledOrder/confirm.png')} />
          </View>
          <View style={style.flexpointfive}>
            <Text style={[Appstyles.txtBlackRegular, Appstyles.f15]}>Order</Text>
            <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f11]}>26/07/2020</Text>
          </View>
          <View style={[style.flexpointthree, Appstyles.aligncen]}>
            <Image source={require('../../../assets/Images/Aggregator/ScheduledOrder/pending.png')} />
            <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f11]}>Pending</Text>
          </View>
        </View>

        <View style={Styles.btnContainer}>
          <TouchableOpacity
            activeOpacity = {0.8}
            style={[Styles.confirmbtn, AppStyle.mb20]}>
            <Text style={[Appstyles.txtWhiteRegular, Appstyles.f17, Appstyles.textalig, AppStyle.mt10]}>PICKUP ORDER</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
export default ScheduledOrder;
