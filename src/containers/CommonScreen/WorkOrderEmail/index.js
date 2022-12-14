import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import Styles from "./styles";
import { AppStyles } from "../../../theme";
import AppStyle from "../../../theme/Styles/spaces";
import style from "../../../theme/Styles/container";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { LOCAL_STORAGE_DATA_KEY } from '../../../utils/constants';
import { getSaveData } from '../../../utils/helpers';
import successLogo from '../../../assets/Images/AccountCreate/Group.png'

function WorkOrderEmail() {
  const navigation = useNavigation();
  const route = useRoute();

  const [userName, setUserName] = useState('')

  const screenNavigate = () => {
    navigation.popToTop()
    navigation.navigate(NavigationRouteNames.AGGREGATOR_SCHEDULE_ORDER_LIST);
  }

  useEffect(() => {
    async function getUserName() {
      const userName = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_NAME);
      if (userName) {
        setUserName(userName)
      }
    }
    getUserName();
  }, []);

  return (
    <View style={[Styles.topView, AppStyles.inCenter]}>

      <View style={Styles.boxContent}>
        <Image style={Styles.boxImage} source={successLogo} />
        <Text style={[AppStyles.txtBlackBold, AppStyles.f20, AppStyles.spacing1]}>THANKYOU</Text>
        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyle.mt5,]}>{userName}</Text>

        <View style={[style.w85, style.borderwidth1, AppStyle.mt20, Styles.bdrclr]}></View>

        <View>
          <Text style={[AppStyles.f11, AppStyles.txtSecandaryRegular, AppStyle.ml24, AppStyle.mr20, AppStyle.mt20,]}>Thankyou for confirming quantity received at the warehouse</Text>
          <Text style={[AppStyles.f11, AppStyles.txtSecandaryRegular, AppStyle.ml24, AppStyle.mr20, AppStyle.mt20,]}>The same will be communicated to the customer and will be updated in your inventory.</Text>
          <Text style={[AppStyles.f11, AppStyles.txtSecandaryRegular, AppStyle.ml24, AppStyle.mr20, AppStyle.mt20,]}>For any concern you can send us email at support@jayde.in </Text>
        </View>

        <View style={[AppStyles.inCenter]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[AppStyle.mt50, Styles.buttonsize, AppStyles.aligncen, style.br10, style.btnPrimary]} onPress={() => { screenNavigate() }}>
            <Text style={[AppStyles.f17, style.whitecolor]}>GO TO HOME</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
     
   
  );
}
export default WorkOrderEmail;
