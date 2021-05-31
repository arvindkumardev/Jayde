import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import Styles from "./styles";
import {AppStyles} from "../../../theme";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import FAIcon from "react-native-vector-icons/FontAwesome";

import FailedImg from '../../../assets/Images/OrderFailed/orderfailed.png'

function OrderFailed() {

  const [item, setItem] = useState({});

  const navigation = useNavigation();
  const route = useRoute();

  const screenNavigate = () => {
    route.params.getActionType()
    navigation.goBack()
  }

  useEffect(() => {
    const { Value } = route.params;
    setItem(Value)
  }, [])

  return (
    <View style={AppStyles.topView}>
      <ScrollView showsVerticalScrollIndicator = {false}>
        <View style={Styles.boxContent}>
          <Image style={Styles.boxImage} source={FailedImg} />
          <Text style={[AppStyles.txtBlackBold, AppStyles.f20, AppStyles.spacing1]}>ORDER FAILED</Text>

          <View style={[AppStyles.w85, AppStyles.borderwidth1, AppStyles.mt20, Styles.bdrclr]}></View>

          <View style={[AppStyles.aligncen]}>
            <Text style={[AppStyles.f11, AppStyles.txtSecandaryRegular, AppStyles.mr20, AppStyles.ml20, AppStyles.mt20, AppStyles.textalig,]}><Text style={[Styles.starText,]}>*</Text> Your Order category does not match with the image uploaded</Text>
          </View>
          <View style={Styles.bxVu}>

            <View style={[AppStyles.flexDir, AppStyles.ml24]}>
              <View style={AppStyles.flex1}>
                <Text style={[AppStyles.f15, AppStyles.mt20, AppStyles.txtSecandaryRegular]}>Category</Text>
              </View>
              <View style={[AppStyles.flex1, AppStyles.alignfend]}>
                <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyles.mt20, AppStyles.mr30]}>{item.category_name}</Text>
              </View>
            </View>

            <View style={[AppStyles.flexDir, AppStyles.ml24]}>
              <View style={AppStyles.flex1}>
                <Text style={[AppStyles.f15, AppStyles.mt10, AppStyles.txtSecandaryRegular]}>Sub Category</Text>
              </View>
              <View style={[AppStyles.flex1, AppStyles.alignfend]}>
                <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyles.mt10, AppStyles.mr30]}>{item.sub_category_name}</Text>
              </View>
            </View>

            <View style={[AppStyles.flexDir, AppStyles.ml24]}>
              <View style={AppStyles.flex1}>
                <Text style={[AppStyles.f15, AppStyles.mt10, AppStyles.txtSecandaryRegular]}>Volume</Text>
              </View>
              <View style={[AppStyles.flex1, AppStyles.alignfend]}>
                <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyles.mt10, AppStyles.mr30]}>{item.qty} {item.unit_name}</Text>
              </View>
            </View>

            <View style={[AppStyles.flexDir, AppStyles.ml24]}>
              <View style={AppStyles.flex1}>
                <Text style={[AppStyles.f15, AppStyles.mt10, AppStyles.txtSecandaryRegular]}>Location</Text>
              </View>
              <View style={[AppStyles.flex1, AppStyles.alignfend]}>
                <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyles.mt10, AppStyles.mr30]}>{item.location}</Text>
              </View>
            </View>

            <View style={[AppStyles.flexDir, AppStyles.ml24]}>
              <View style={AppStyles.flex1}>
                <Text style={[AppStyles.f15, AppStyles.mt10, AppStyles.txtSecandaryRegular]}>Prov. Price</Text>
              </View>
              <View style={[AppStyles.flex1, AppStyles.alignfend]}>
                <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyles.mt10, AppStyles.mr30]}><FAIcon size={14} name="rupee" /> {item.price}</Text>
              </View>
            </View>

            <View>
              <View style={AppStyles.aligncen}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={Styles.homebtn}
                  onPress={() => { screenNavigate() }}>
                  <Text style={[AppStyles.f17, AppStyles.warmgreycolor, AppStyles.textalig, AppStyles.mt10]}>HOME</Text>
                </TouchableOpacity>
              </View>

              <View style={AppStyles.aligncen}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={Styles.recreatebtn}>
                  <Text style={[AppStyles.f17, AppStyles.whitecolor, AppStyles.textalig, AppStyles.mt10]}>RECREATE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
export default OrderFailed;
