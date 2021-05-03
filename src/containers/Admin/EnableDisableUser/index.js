import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView, ActivityIndicator} from 'react-native';
import Styles from "./styles";
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import AppStyles from "../../../theme/Styles/texts";
import AppStyle from "../../../theme/Styles/spaces";
import style from "../../../theme/Styles/container";

function EnableDisableUser() {
   const navigation = useNavigation();
   const route = useRoute();

  
  return (
    <View style={[style.flex1, style.grayBackground, Styles.boxMainView]}>

     <View style={Styles.boxView}>
        
        
        <View style={[style.flexDir, AppStyle.ml24,]}>
      <View style={style.flexpointseven}>
      <Text style={[AppStyles.f13, AppStyles.txtSecandaryRegular, AppStyle.mt14]}>testuser@@testmail.com</Text>
      </View>
      <View style={[style.flexpointthree, AppStyle.mt14,]}>
      <TouchableOpacity style={Styles.confirmBtn}>
      <Text style={[AppStyles.txtWhiteRegular, AppStyles.f11, AppStyles.textalig, Styles.activebutton]}>Active</Text>
      </TouchableOpacity>
      </View>
      </View> 

      <Text style={[AppStyles.f15, AppStyle.ml24,]}>Business Name</Text>
      <Text style={[AppStyles.f15, AppStyle.ml24,]}>Name</Text>
      

      <View style={[style.flexDir, AppStyle.mt14]}>
      <View style={[style.flexpointone]}>
      <Image style={Styles.lftimga} source={require('../../../assets/Images/Users/noun_Recycle_3673532.png')}  /> 
      </View>
      <View style={[style.flexpointthree]}>
      <Text style={[AppStyle.ml24, AppStyles.txtSecandaryRegular, AppStyles.f13]}>Seller</Text>
      </View>
      <View style={{height: '100%', width: 1, borderLeftColor: '000', borderBottomWidth: 20, }}>
        </View>
        <View>
          <Text style={[AppStyle.ml20, AppStyles.txtSecandaryRegular, AppStyles.f13]}>User</Text>
          </View>
      </View>

      <View style={[style.flexDir, Styles.cancelbutton]}>
        <View style={style.flex1}>
       <TouchableOpacity
           style={[style.br10, style.borderwidth1, style.borderColorLightOlive, style.whitecolor, style.alignCenter, Styles.bittonSize, Styles.cancelButton]}>
           <Text style={[AppStyles.f17, , Styles.txtLightOliveRegular, AppStyle.mt10]}>CANCEL</Text>
         </TouchableOpacity>
         </View>
         <View style={style.flex1}>
         <TouchableOpacity
           style={[style.br10, style.lightOlive, style.alignCenter, Styles.bittonSize, Styles.confirmButton]}>
           <Text style={[AppStyles.f17, AppStyles.txtWhiteRegular, AppStyle.mt10]}>CONFIRM</Text>
         </TouchableOpacity>
         </View>
       </View>


       </View>
    </View>
    
  );
}
export default EnableDisableUser;
