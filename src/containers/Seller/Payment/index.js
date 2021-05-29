import React, { useContext, useEffect, useState } from 'react';
import * as Alert from 'react-native';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, } from 'react-native';
import Styles from "./styles";
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import NavigationRouteNames from '../../../routes/ScreenNames';

function Payment() {
  const navigation = useNavigation();
  const route = useRoute();

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOME_SCREEN);
  }

  return (
    <View style={[AppStyles.flex1, AppStyles.grayBackground, Styles.boxMainView]}>

      <View style={Styles.boxView}>
        <Text style={[AppStyles.txtBlackBold, AppStyles.f20, AppStyles.textalig, AppStyles.mt50]}>₹650/- PAID</Text>
        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.textalig,]}>waiting for confirmation</Text>

        <View style={[AppStyles.aligncen, AppStyles.mt50]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[Styles.homeButton]} onPress={() => screenNavigate()}>
            <Text style={[AppStyles.f17, AppStyles.txtWhiteRegular, AppStyles.mt10]}>GO TO HOME</Text>
          </TouchableOpacity>
        </View>


      </View>
    </View>

  );
}
export default Payment;
