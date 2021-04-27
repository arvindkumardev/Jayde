import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import Styles from "./styles";
import AppStyles from "../../theme/Styles/texts";
import AppStyle from "../../theme/Styles/spaces";
import style from "../../theme/Styles/container";
import styles from '../../components/CustomImage/style';
import NavigationRouteNames from '../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';


function Confirmation() {

   const navigation = useNavigation();
   const route = useRoute();
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }
  
  return (
    <View style={Styles.topView}>
       <ScrollView>
       
        
        <View style={Styles.boxContent}>
          <Image style={Styles.boxImage} source={require('../../assets/Images/AccountCreate/Group.png')}  /> 
          <Text style={[AppStyles.txtBlackBold, AppStyles.f20, AppStyles.spacing1]}>SUCCESS</Text>

          <View style={[style.w85, style.borderwidth1, AppStyle.mt20, Styles.bdrclr]}></View>
           
          <View style={styles.alignCenter}>
          <Text style={[AppStyles.f11, AppStyles.txtSecandaryRegular, AppStyle.ml24, AppStyle.mr20, AppStyle.mt20, AppStyles.textalig]}>The Order with Ref No- JYD/SC/2020/0067 with the following details has been sent to EARTHBOX</Text>
          </View>
        <View style={Styles.bxVu}>
        
        <View style={[style.flexDir, AppStyle.ml24]}>
      <View style={style.flex1}>
      <Text style={[AppStyles.f15, AppStyle.mt20, AppStyles.txtSecandaryRegular]}>Category</Text>
      </View>
      <View style={[style.flex1, AppStyles.alignfend]}>
      <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyle.mt20, AppStyle.mr30]}>Paper</Text>
      </View>
      </View> 

      <View style={[style.flexDir, AppStyle.ml24]}>
      <View style={style.flex1}>
      <Text style={[AppStyles.f15, AppStyle.mt20, AppStyles.txtSecandaryRegular]}>Sub Category</Text>
      </View>
      <View style={[style.flex1, AppStyles.alignfend]}>
      <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyle.mt20, AppStyle.mr30]}>Type 2</Text>
      </View>
      </View> 

      <View style={[style.flexDir, AppStyle.ml24]}>
      <View style={style.flex1}>
      <Text style={[AppStyles.f15, AppStyle.mt20, AppStyles.txtSecandaryRegular]}>Volume</Text>
      </View>
      <View style={[style.flex1, AppStyles.alignfend]}>
      <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyle.mt20, AppStyle.mr30]}>2 Tons</Text>
      </View>
      </View> 

      <View style={[style.flexDir, AppStyle.ml24]}>
      <View style={style.flex1}>
      <Text style={[AppStyles.f15, AppStyle.mt20, AppStyles.txtSecandaryRegular]}>Location</Text>
      </View>
      <View style={[style.flex1, AppStyles.alignfend]}>
      <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyle.mt20, AppStyle.mr30]}>Hyderabad</Text>
      </View>
      </View> 

      <View style={[style.flexDir, AppStyle.ml24]}>
      <View style={style.flex1}>
      <Text style={[AppStyles.f15, AppStyle.mt20, AppStyles.txtSecandaryRegular]}>Prov. Price</Text>
      </View>
      <View style={[style.flex1, AppStyles.alignfend]}>
      <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyle.mt20, AppStyle.mr30]}>₹ 25,864</Text>
      </View>
      </View> 

<View style={[style.flex1, Styles.tbut]}>
              <TouchableOpacity style={[AppStyle.mt30, AppStyle.pv11, AppStyles.aligncen, style.br13,  style.btnPrimary]} onPress={() => {screenNavigate()}}>
                  <Text style={[AppStyles.f18, style.whitecolor]}>GO TO HOME</Text>
              </TouchableOpacity>
             </View>
             
       </View>

        </View>

          </ScrollView> 
        
      
    </View>
  );
}
export default Confirmation;
