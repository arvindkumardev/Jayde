import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView } from 'react-native';
import Styles from "./styles";
import { AppStyles } from "../../../theme";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';


function CallBackConfirmation() {

  const navigation = useNavigation();
  const route = useRoute();

  const screenNavigate = () => {
    navigation.popToTop()
  }

  return (
    <View style={[Styles.topView, AppStyles.inCenter]}>
      <View style={Styles.boxContent}>
        <Text style={[AppStyles.txtBlackBold, AppStyles.f20, AppStyles.spacing1, AppStyles.mt35]}>THANKYOU</Text>
        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt5,]}>For your request for call back!</Text>

        <View style={[AppStyles.w85, AppStyles.borderwidth1, AppStyles.mt20, Styles.bdrclr]}></View>

        <View>
          <Text style={[AppStyles.f11, AppStyles.txtSecandaryRegular, AppStyles.ml24, AppStyles.mr20, AppStyles.mt20,]}>Our Teams will verify the same and come back to you in 2 working days in case of any concerns and upon verification you will get a tick against your name in the main header.</Text>
          <Text style={[AppStyles.f11, AppStyles.txtSecandaryRegular, AppStyles.ml24, AppStyles.mr20, AppStyles.mt20,]}>For any concern you can send us email at support@jayde.in </Text>
        </View>
        <View style={Styles.bxVu}>
          <View style={[AppStyles.inCenter]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[AppStyles.mt50, Styles.buttonsize, AppStyles.inCenter, AppStyles.br10, AppStyles.btnPrimary]}
              onPress={() => { screenNavigate() }}>
              <Text style={[AppStyles.f17, AppStyles.whitecolor]}>BACK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
export default CallBackConfirmation;
