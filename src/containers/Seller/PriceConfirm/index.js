import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FAIcon from "react-native-vector-icons/FontAwesome";
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { Fonts, Colors, AppStyles } from '../../../theme';


const PriceConfirm = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>Paper</Text>,
    });
  }, [navigation]);

  const handleSchedulePickup = () => {
    navigation.navigate(NavigationRouteNames.CONFIRM_ADDRESS);
  };
  return (
    <View style={Styles.screenContainer}>
      <View style={[AppStyles.mt20, AppStyles.w100, AppStyles.alignCenter]}>
        <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>Provisional Price</Text>
        <View style={[AppStyles.w100, AppStyles.ph40, AppStyles.mt20]}>
          <View style={AppStyles.flexRowSpaceBetween}>
            <View style={AppStyles.w45}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>Subcategory</Text>
            </View>
            <View style={AppStyles.w45}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>Type 2</Text>
            </View>
          </View>
          <View style={AppStyles.flexRowSpaceBetween}>
            <View style={AppStyles.w45}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>Location</Text>
            </View>
            <View style={AppStyles.w45}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>Hyderabad</Text>
            </View>
          </View>
          <View style={AppStyles.flexRowSpaceBetween}>
            <View style={AppStyles.w45}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>Valume</Text>
            </View>
            <View style={AppStyles.w45}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>5 Tons</Text>
            </View>
          </View>
          <View style={Styles.totalPriceContainer}>
            <View style={AppStyles.w45}>
              <Text style={[AppStyles.txtBlackBold, AppStyles.f16]}>Estimated Price</Text>
            </View>
            <View style={AppStyles.w45}>
              <Text style={[AppStyles.txtBlackBold, AppStyles.f16]}>
                <FAIcon size={14} name="rupee" /> 6000
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={Styles.btnContainer}>
        <TouchableOpacity
          style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv10, AppStyles.alignCenter]}
          onPress={handleSchedulePickup}
        >
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18]}>SCHEDULE PICKUP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PriceConfirm;
