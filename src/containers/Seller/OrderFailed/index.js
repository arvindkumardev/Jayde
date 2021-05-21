import React, { useContext, useEffect, useState } from 'react';
import * as Alert from 'react-native';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView } from 'react-native';
import Styles from "./styles";
import AppStyles from "../../../theme/Styles/texts";
import AppStyle from "../../../theme/Styles/spaces";
import style from "../../../theme/Styles/container";
import styles from '../../../components/CustomImage/style';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';

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

  //  const screenNavigate = () => {
  //   navigation.navigate(NavigationRouteNames.HOMESCREEN);
  // }


  return (
    <View style={Styles.topView}>
      <ScrollView>


        <View style={Styles.boxContent}>
          <Image style={Styles.boxImage} source={FailedImg} />
          <Text style={[AppStyles.txtBlackBold, AppStyles.f20, AppStyles.spacing1]}>ORDER FAILED</Text>

          <View style={[style.w85, style.borderwidth1, AppStyle.mt20, Styles.bdrclr]}></View>

          <View style={[AppStyles.aligncen]}>
            <Text style={[AppStyles.f11, AppStyles.txtSecandaryRegular, AppStyle.mr20, AppStyle.ml20, AppStyle.mt20, AppStyles.textalig,]}><Text style={[Styles.starText,]}>*</Text> Your Order category does not match with the image uploaded</Text>
          </View>
          <View style={Styles.bxVu}>

            <View style={[style.flexDir, AppStyle.ml24]}>
              <View style={style.flex1}>
                <Text style={[AppStyles.f15, AppStyle.mt20, AppStyles.txtSecandaryRegular]}>Category</Text>
              </View>
              <View style={[style.flex1, AppStyles.alignfend]}>
                <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyle.mt20, AppStyle.mr30]}>{item.category_name}</Text>
              </View>
            </View>

            <View style={[style.flexDir, AppStyle.ml24]}>
              <View style={style.flex1}>
                <Text style={[AppStyles.f15, AppStyle.mt10, AppStyles.txtSecandaryRegular]}>Sub Category</Text>
              </View>
              <View style={[style.flex1, AppStyles.alignfend]}>
                <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyle.mt10, AppStyle.mr30]}>{item.sub_category_name}</Text>
              </View>
            </View>

            <View style={[style.flexDir, AppStyle.ml24]}>
              <View style={style.flex1}>
                <Text style={[AppStyles.f15, AppStyle.mt10, AppStyles.txtSecandaryRegular]}>Volume</Text>
              </View>
              <View style={[style.flex1, AppStyles.alignfend]}>
                <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyle.mt10, AppStyle.mr30]}>{item.qty} {item.unit_name}</Text>
              </View>
            </View>

            <View style={[style.flexDir, AppStyle.ml24]}>
              <View style={style.flex1}>
                <Text style={[AppStyles.f15, AppStyle.mt10, AppStyles.txtSecandaryRegular]}>Location</Text>
              </View>
              <View style={[style.flex1, AppStyles.alignfend]}>
                <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyle.mt10, AppStyle.mr30]}>{item.location}</Text>
              </View>
            </View>

            <View style={[style.flexDir, AppStyle.ml24]}>
              <View style={style.flex1}>
                <Text style={[AppStyles.f15, AppStyle.mt10, AppStyles.txtSecandaryRegular]}>Prov. Price</Text>
              </View>
              <View style={[style.flex1, AppStyles.alignfend]}>
                <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyle.mt10, AppStyle.mr30]}>₹ {item.price}</Text>
              </View>
            </View>

            <View>
              <View style={AppStyles.aligncen}>
                <TouchableOpacity style={Styles.homebtn}
                  onPress={() => { screenNavigate() }}>
                  <Text style={[AppStyles.f17, style.warmgreycolor, AppStyles.textalig, AppStyle.mt10]}>HOME</Text>
                </TouchableOpacity>
              </View>

              <View style={AppStyles.aligncen}>
                <TouchableOpacity style={Styles.recreatebtn}>
                  <Text style={[AppStyles.f17, style.whitecolor, AppStyles.textalig, AppStyle.mt10]}>RECREATE</Text>
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
