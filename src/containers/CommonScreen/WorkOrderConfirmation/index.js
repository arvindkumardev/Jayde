import React, {useEffect, useState } from 'react';
import * as Alert from 'react-native';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import Styles from "./styles";
import { AppStyles } from "../../../theme";
import AppStyle from "../../../theme/Styles/spaces";
import style from "../../../theme/Styles/container";
import styles from '../../../components/CustomImage/style';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';

import SuccessImg from '../../../assets/Images/AccountCreate/Group.png'

function WorkOrderConfirmation() {
  const [item, setItem] = useState({});

  const navigation = useNavigation();
  const route = useRoute();

  const screenNavigate = () => {
    navigation.popToTop()
    // if(route.params.whereFrom === NavigationRouteNames.CONFIRM_ADDRESS){
    //   navigation.navigate(NavigationRouteNames.SELLER_MY_ORDER)
    // } else if(route.params.whereFrom === NavigationRouteNames.ORDER_ASSIGN){
    //   navigation.navigate(NavigationRouteNames.ADMIN_NEW_ORDER_LIST)
    // }   
  }

  useEffect(() => {
    const { item } = route.params;
    setItem(item)
  }, [])


  return (
    <View style={[Styles.topView, AppStyles.inCenter]}>

      <View style={Styles.boxContent}>
        <Image style={Styles.boxImage} source={SuccessImg} />
        <Text style={[AppStyles.txtBlackBold, AppStyles.f20, AppStyles.spacing1]}>SUCCESS</Text>

        <View style={[style.w85, style.borderwidth1, AppStyle.mt20, Styles.bdrclr]}></View>

        <View style={styles.alignCenter}>
          <Text style={[AppStyles.f11, AppStyles.txtSecandaryRegular, AppStyle.ml24, AppStyle.mr20, AppStyle.mt20, AppStyles.textalig]}>{`The Order with Ref No- ${item.inventory_id} with the following details has been sent to ${route.params.category_name}`}</Text>
        </View>


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
            <Text style={[AppStyles.f15, AppStyle.mt20, AppStyles.txtSecandaryRegular]}>Sub Category</Text>
          </View>
          <View style={[style.flex1, AppStyles.alignfend]}>
            <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyle.mt20, AppStyle.mr30]}>{item.sub_category_name}</Text>
          </View>
        </View>

        <View style={[style.flexDir, AppStyle.ml24]}>
          <View style={style.flex1}>
            <Text style={[AppStyles.f15, AppStyle.mt20, AppStyles.txtSecandaryRegular]}>Volume</Text>
          </View>
          <View style={[style.flex1, AppStyles.alignfend]}>
            <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyle.mt20, AppStyle.mr30]}>{item.inventory_qty} {item.unit_name}</Text>
          </View>
        </View>



        <View style={[Styles.tbut]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[AppStyle.mt30, AppStyles.inCenter, style.br10, style.btnPrimary, Styles.buttonSize,]}
            onPress={() => { screenNavigate() }}>
            <Text style={[AppStyles.f17, style.whitecolor]}>GO TO HOME</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
}
export default WorkOrderConfirmation;
