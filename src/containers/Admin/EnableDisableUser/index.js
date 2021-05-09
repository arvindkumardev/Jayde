import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView, ActivityIndicator} from 'react-native';
import Styles from "./styles";
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import AppStyles from "../../../theme/Styles/texts";
import AppStyle from "../../../theme/Styles/spaces";
import style from "../../../theme/Styles/container";
import UserContext from '../../../appContainer/context/user.context';

import { enableUserByAdmin, disableUserByAdmin } from "../../../services/middleware/user";

function EnableDisableUser(props) {
   const navigation = useNavigation();
   const route = useRoute();
   const { setLoader } = useContext(UserContext);
   const [item, setItem] = useState({});


  const [{ data: enableUserData, loading, error }, onEnableUserByAdmin] = enableUserByAdmin();
  const [{ data: disableUserData }, onDisableUserByAdmin] = disableUserByAdmin();


  useEffect(() => {
    const { Item } = route.params;  
    setItem(Item)    
  }, [])

  const handleCloseRefresh = () => {
    route.params.getActionType(route.params.index)
    navigation.goBack()
  }

  const handelClose = () => {   
    navigation.goBack()
  }

  const handelConfirm = async () => {
    setLoader(true);
    if(item.status == 0){
      // Disable User if Enable
      const {data} = await onEnableUserByAdmin({
        data: {userId: item.userId},
      });
      console.log(data)
      if(data.status){
        handleCloseRefresh()
      } else {
        alert(data.message)
      }  
    } else {
      // Enable User if Disable
      const {data} = await onDisableUserByAdmin({
        data: {userId: item.userId},
      });
      console.log(data)
      if(data.status){
        handleCloseRefresh()
      } else {
        alert(data.message)
      }  
    } 
    setLoader(false);   
  }

  return (
    <View style={[style.flex1, style.grayBackground, Styles.boxMainView]}>
     <View style={Styles.boxView}>       
      <View style={[style.flexDir, AppStyle.ml24,]}>
      <View style={style.flexpointseven}>
      <Text style={[AppStyles.f13, AppStyles.txtSecandaryRegular, AppStyle.mt14]}>{item.email}</Text>
      </View>
      <View style={[style.flexpointthree, AppStyle.mt14,]}>
      <TouchableOpacity style={item.status == 1 ? Styles.confirmBtn : Styles.InactiveBtn}>
      <Text style={[AppStyles.txtWhiteRegular, AppStyles.f11, AppStyles.textalig, Styles.activebutton]}>{item.status == 1 ? 'Active' : 'Inactive'}</Text>
      </TouchableOpacity>
      </View>
      </View> 

      <Text style={[AppStyles.f15, AppStyle.ml24,]}>{item.business_name}</Text>
      <Text style={[AppStyles.f15, AppStyle.ml24,]}>{item.name}</Text>

      <View style={[style.flexDir, AppStyle.mt14]}>
      <View style={[style.flexpointone]}>
      <Image style={Styles.lftimga} source={require('../../../assets/Images/Users/noun_Recycle_3673532.png')}  /> 
      </View>
      <View style={[style.flexpointthree]}>
      <Text style={[AppStyle.ml24, AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.business_type}</Text>
      </View>
      <View style={{height: '100%', width: 1, borderLeftColor: '000', borderBottomWidth: 20, }}>
        </View>
        <View>
          <Text style={[AppStyle.ml20, AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.type}</Text>
          </View>
      </View>

      <View style={[style.flexDir, Styles.cancelbutton]}>
        <View style={style.flex1}>
       <TouchableOpacity
          onPress = {() => handelClose()}
           style={[style.br10, style.borderwidth1, style.borderColorLightOlive, style.whitecolor, style.alignCenter, Styles.bittonSize, Styles.cancelButton]}>
           <Text style={[AppStyles.f17, , Styles.txtLightOliveRegular, AppStyle.mt10]}>CANCEL</Text>
         </TouchableOpacity>
         </View>
         <View style={style.flex1}>
         <TouchableOpacity
           onPress = {() => handelConfirm()}
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
