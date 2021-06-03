import React, {useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {TouchableOpacity, View, Text, Image, ScrollView} from 'react-native';
import Styles from "./styles";
import {AppStyles} from "../../theme";
import styles from '../../components/CustomImage/style';
import NavigationRouteNames from '../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import FAIcon from "react-native-vector-icons/FontAwesome";

import SuccessImg from '../../assets/Images/AccountCreate/Group.png'

function Confirmation() {
  const [item, setItem] = useState({});

   const navigation = useNavigation();
   const route = useRoute();
  
   const screenNavigate = () => {
    navigation.popToTop()
    if(route.params.whereFrom === NavigationRouteNames.CONFIRM_ADDRESS){
      navigation.navigate(NavigationRouteNames.SELLER_MY_ORDER)
    } else if(route.params.whereFrom === NavigationRouteNames.ORDER_ASSIGN){
      navigation.navigate(NavigationRouteNames.ADMIN_NEW_ORDER_LIST)
    }   
  }

  useEffect(() => {
    const { Value } = route.params;  
    setItem(Value)    
  }, [])

  
  return (
    <View style={[Styles.topView, AppStyles.inCenter]}>
       
        <View style={Styles.boxContent}>
          <Image style={Styles.boxImage} source={SuccessImg}  /> 
          <Text style={[AppStyles.txtBlackBold, AppStyles.f20, AppStyles.spacing1]}>SUCCESS</Text>

          <View style={[AppStyles.w85, AppStyles.borderwidth1, AppStyles.mt20, Styles.bdrclr]}></View>
           
          <View style={styles.alignCenter}>
          <Text style={[AppStyles.f11, AppStyles.txtSecandaryRegular, AppStyles.ml24, AppStyles.mr20, AppStyles.mt20, AppStyles.textalig]}>{`The Order with Ref No- ${item.order_no} with the following details has been sent to ${route.params.businessSubType}`}</Text>
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
          <Text style={[AppStyles.f15, AppStyles.mt20, AppStyles.txtSecandaryRegular]}>Sub Category</Text>
        </View>
          <View style={[AppStyles.flex1, AppStyles.alignfend]}>
          <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyles.mt20, AppStyles.mr30]}>{item.sub_category_name}</Text>
          </View>
      </View> 

      <View style={[AppStyles.flexDir, AppStyles.ml24]}>
        <View style={AppStyles.flex1}>
          <Text style={[AppStyles.f15, AppStyles.mt20, AppStyles.txtSecandaryRegular]}>Volume</Text>
        </View>
        <View style={[AppStyles.flex1, AppStyles.alignfend]}>
          <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyles.mt20, AppStyles.mr30]}>{item.qty} {item.unit_name}</Text>
        </View>
      </View> 

      <View style={[AppStyles.flexDir, AppStyles.ml24]}>
        <View style={AppStyles.flex1}>
          <Text style={[AppStyles.f15, AppStyles.mt20, AppStyles.txtSecandaryRegular]}>Location</Text>
        </View>
        <View style={[AppStyles.flex1, AppStyles.alignfend]}>
         <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyles.mt20, AppStyles.mr30, AppStyles.textAlignRight]}>{item.location}</Text>
        </View>
      </View> 

      <View style={[AppStyles.flexDir, AppStyles.ml24]}>
        <View style={AppStyles.flex1}>
          <Text style={[AppStyles.f15, AppStyles.mt20, AppStyles.txtSecandaryRegular]}>Prov. Price</Text>
        </View>
        <View style={[AppStyles.flex1, AppStyles.alignfend]}>
          <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyles.mt20, AppStyles.mr30]}><FAIcon size={14} name="rupee" /> {item.price}</Text>
        </View>
      </View> 

        <View style={[AppStyles.flex1, Styles.tbut]}>
            <TouchableOpacity activeOpacity = {0.8} style={[AppStyles.mt30, AppStyles.pv11, AppStyles.aligncen, AppStyles.br13,  AppStyles.btnPrimary]} 
              onPress={() => {screenNavigate()}}>
                <Text style={[AppStyles.f18, AppStyles.whitecolor]}>GO TO HOME</Text>
              </TouchableOpacity>
        </View>  
       </View>
    </View>

</View>
  );
}
export default Confirmation;
