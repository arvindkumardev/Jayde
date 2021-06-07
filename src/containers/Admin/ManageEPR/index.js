import React, { useState, useLayoutEffect } from 'react';
import { Alert } from "react-native";
import { KeyboardAvoidingView, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';


function ManageEPR() {

  const navigation = useNavigation();
  const route = useRoute();

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }

  useLayoutEffect(() => {
    const title = 'EPR Users';
    navigation.setOptions({
      title,
    });
  }, []);


  return (

    <View style={AppStyles.topView}>
      <ScrollView>

        <Text style={[AppStyles.txtBlackRegular, AppStyles.f17, AppStyles.ml24, AppStyles.mt35]}>Sahdev Garg</Text>
        <View style={AppStyles.flexDir}>
          <View style={AppStyles.flexpointeight}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.ml24,]}>Aggregator</Text>
          </View>
          <View style={AppStyles.flexpointtwo}>
            <Text style={[AppStyles.txtmangoTwoBold, AppStyles.f20, AppStyles.ml20]}>01</Text>
          </View>
        </View>
        <View style={[Styles.bdrclr]}></View>

      </ScrollView>


    </View>
  );
}
export default ManageEPR;
