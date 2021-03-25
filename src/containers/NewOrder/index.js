import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import UserContext from '../Login/user.context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Styles from "./styles";
import { Colors, AppStyles } from "../../theme";
import NavigationRouteNames from '../../routes/ScreenNames';

const NewOrder = () => {
  // const { user, setLogin } = useContext(UserContext);
  const navigation = useNavigation();

  const handleGetQuote = () => {
    navigation.navigate(NavigationRouteNames.PRICE_REQUEST);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>New Order</Text>,
    });
  }, [navigation]);

  return (
    <View style={Styles.screenContainer}>
      <Text style={[AppStyles.f18, AppStyles.txtBlackRegular]}>What would you want to do?</Text>
      <View style={[AppStyles.w100, AppStyles.ph20]}>
        <TouchableOpacity style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv15, AppStyles.alignCenter]} onPress={handleGetQuote}>
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18]}>GET QUOTE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnSecandary, AppStyles.pv15, AppStyles.alignCenter]}>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f18]}>SCHEDULE PICKUP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewOrder;
