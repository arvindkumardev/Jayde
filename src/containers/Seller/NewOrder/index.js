import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Styles from './styles';
import { AppStyles } from '../../../theme';
import NavigationRouteNames from '../../../routes/ScreenNames';

const NewOrder = () => {
  const [categoryId, setCategoryId] = useState('')
  const navigation = useNavigation();
  const route = useRoute();

  const handleGetQuote = (btnstatus) => {
    navigation.pop()
    navigation.navigate(NavigationRouteNames.PRICE_REQUEST, {
      title: route.params.title,
      status: btnstatus,
      categoryId: categoryId
    });
  };

  useLayoutEffect(() => {
    const { categoryId } = route.params;
    setCategoryId(categoryId)
  }, [])

  return (
    <View style={Styles.screenContainer}>
      <Text style={[AppStyles.f18, AppStyles.txtBlackRegular]}>What would you want to do?</Text>
      <View style={[AppStyles.w100, AppStyles.ph20]}>
        <TouchableOpacity
          activeOpacity = {0.8}
          style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv10, AppStyles.alignCenter]}
          onPress={() => { handleGetQuote("0") }}>
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18]}>GET QUOTE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity = {0.8}
          style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnSecandary, AppStyles.pv10, AppStyles.alignCenter]}
          onPress={() => { handleGetQuote("1") }}>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f18]}>SCHEDULE PICKUP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewOrder;
