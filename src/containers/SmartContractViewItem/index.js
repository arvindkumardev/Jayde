import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, ScrollView } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles, Colors } from '../../theme';
import DropDown from '../../components/Picker/index';

import checkCircle from '../../assets/Images/AddSubCategory/check-circle.png'
import invoice from '../../assets/Images/SmartContractViewItem/Invoice.png'

function SmartContractViewItem() {
  const navigation = useNavigation();
  const route = useRoute();
  const [value, setValue] = useState('');
  const [label, setLabel] = useState('');

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }

  useLayoutEffect(() => {
    const title = 'View Item';
    const { btnValue, btnLabel } = route.params;
    setValue(btnValue);
    setLabel(btnLabel);
    navigation.setOptions({
      title,
    });
  }, []);

  return (
    <View style={Styles.topView}>
      <ScrollView>
        <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt20, AppStyles.textalig]}>Ref No- JYD/SC/2020/0067</Text>
        <View style={Styles.boxView}>
          <View style={AppStyles.flexDir}>
            <View style={[AppStyles.flexpointone, AppStyles.ml16, AppStyles.mt10]}>
              <Text style={[AppStyles.txtmangoTwoRegular, AppStyles.f15,]}>04</Text>
            </View>
            <View style={[AppStyles.flexpointeight,]}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, AppStyles.mt10]}>{label}</Text>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15,]}>{value}</Text>
            </View>
            <View style={[AppStyles.flexpointone, AppStyles.mt25, AppStyles.mr14]}>
              <Image source={checkCircle} />
            </View>
          </View>
        </View>
        <View style={[AppStyles.mt35, AppStyles.ml20]}>
          <Image source={invoice} />
        </View>
      </ScrollView>
    </View>
  );
}
export default SmartContractViewItem;
