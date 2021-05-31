import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import * as Alert from 'react-native';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import Styles from "./styles";
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';

import UserContext from '../../../appContainer/context/user.context';

import { enableUserByAdmin, disableUserByAdmin } from "../Middleware";
import recycleLogo from '../../../assets/Images/Users/noun_Recycle_3673532.png'

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
    return () => {
      setLoader(false)
    }
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
    if (item.status == 0) {
      // Disable User if Enable
      const { data } = await onEnableUserByAdmin({
        data: { userId: item.userId },
      });
      console.log(data)
      if (data.status) {
        handleCloseRefresh()
      } else {
        alert(data.message)
      }
    } else {
      // Enable User if Disable
      const { data } = await onDisableUserByAdmin({
        data: { userId: item.userId },
      });
      console.log(data)
      if (data.status) {
        handleCloseRefresh()
      } else {
        alert(data.message)
      }
    }
    setLoader(false);
  }

  return (
    <View style={[AppStyles.flex1, AppStyles.grayBackground, Styles.boxMainView]}>
      <View style={Styles.boxView}>
        <View style={[AppStyles.flexDir, AppStyles.ml24,]}>
          <View style={AppStyles.flexpointseven}>
            <Text style={[AppStyles.f13, AppStyles.txtSecandaryRegular, AppStyles.mt14]}>{item.email}</Text>
          </View>
          <View style={[AppStyles.flexpointthree, AppStyles.mt14,]}>
            <TouchableOpacity 
            activeOpacity = {0.8}
            style={item.status == 1 ? Styles.confirmBtn : Styles.InactiveBtn}>
              <Text style={[AppStyles.txtWhiteRegular, AppStyles.f11, AppStyles.textalig, Styles.activebutton]}>{item.status == 1 ? 'Active' : 'Inactive'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[AppStyles.f15, AppStyles.ml24,]}>{item.business_name}</Text>
        <Text style={[AppStyles.f15, AppStyles.ml24,]}>{item.name}</Text>

        <View style={[AppStyles.flexDir, AppStyles.mt14]}>
          <View style={[AppStyles.flexpointone]}>
            <Image style={Styles.lftimga} source={recycleLogo} />
          </View>
          <View style={[AppStyles.flexpointthree]}>
            <Text style={[AppStyles.ml24, AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.business_type}</Text>
          </View>
          <View style={{ height: '100%', width: 1, borderLeftColor: '000', borderBottomWidth: 20, }}>
          </View>
          <View>
            <Text style={[AppStyles.ml20, AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.type}</Text>
          </View>
        </View>

        <View style={[AppStyles.flexDir, Styles.cancelbutton]}>
          <View style={AppStyles.flex1}>
            <TouchableOpacity
              activeOpacity = {0.8}
              onPress={() => handelClose()}
              style={[AppStyles.br10, AppStyles.borderwidth1, AppStyles.borderColorLightOlive, AppStyles.whitecolor, AppStyles.alignCenter, Styles.bittonSize, Styles.cancelButton]}>
              <Text style={[AppStyles.f17, , Styles.txtLightOliveRegular, AppStyles.mt10]}>CANCEL</Text>
            </TouchableOpacity>
          </View>
          <View style={AppStyles.flex1}>
            <TouchableOpacity
              activeOpacity = {0.8}
              onPress={() => handelConfirm()}
              style={[AppStyles.br10, AppStyles.lightOlive, AppStyles.alignCenter, Styles.bittonSize, Styles.confirmButton]}>
              <Text style={[AppStyles.f17, AppStyles.txtWhiteRegular, AppStyles.mt10]}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>


      </View>

    </View>

  );
}
export default EnableDisableUser;
