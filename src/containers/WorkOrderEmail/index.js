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


function WorkOrderEmail() {

   const navigation = useNavigation();
   const route = useRoute();
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }
  const [emailId,setEmailId]=useState("@Earthbox ventures pvt. ltd.");
  
  return (
    <View style={Styles.topView}>
       <ScrollView>
       
        
        <View style={Styles.boxContent}>
          <Image style={Styles.boxImage} source={require('../../assets/Images/WorkOrderEmail/Group.png')}  /> 
          <Text style={[AppStyles.txtBlackBold, AppStyles.f20, AppStyles.spacing1]}>THANKYOU</Text>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyle.mt5,]}>{emailId}</Text>

          <View style={[style.w85, style.borderwidth1, AppStyle.mt20, Styles.bdrclr]}></View>
           
          <View>
          <Text style={[AppStyles.f11, AppStyles.txtSecandaryRegular, AppStyle.ml24, AppStyle.mr20, AppStyle.mt20,]}>Thankyou for confirming quantity received at the warehouse</Text>
          <Text style={[AppStyles.f11, AppStyles.txtSecandaryRegular, AppStyle.ml24, AppStyle.mr20, AppStyle.mt20,]}>The same will be communicated to the customer and will be updated in your inventory.</Text>
          <Text style={[AppStyles.f11, AppStyles.txtSecandaryRegular, AppStyle.ml24, AppStyle.mr20, AppStyle.mt20,]}>For any concern you can send us email at support@jayde.in </Text>
          </View>
        <View style={Styles.bxVu}>
      

             <View style={[style.flex1, AppStyles.aligncen]}>
              <TouchableOpacity style={[AppStyle.mt50, Styles.buttonsize, AppStyles.aligncen, style.br10,  style.btnPrimary]} onPress={() => {screenNavigate()}}>
                  <Text style={[AppStyles.f17, style.whitecolor, AppStyle.mt10,]}>GO TO HOME</Text>
              </TouchableOpacity>
             </View>
             
       </View>

        </View>

          </ScrollView> 
        
      
    </View>
  );
}
export default WorkOrderEmail;
