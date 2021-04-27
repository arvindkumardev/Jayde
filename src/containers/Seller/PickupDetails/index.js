import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "./mapStyle";
import { Colors, Fonts, AppStyles } from '../../../theme';


const PickupDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>New Order</Text>,
    });
  }, [navigation]);

  const handleConfirm = () => {
    navigation.navigate(NavigationRouteNames.CONFIRMATION);
  }
  // CONFIRMATION

  return (
      <KeyboardAwareScrollView style={Styles.mainContainer}>

        <View style={Styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            style={Styles.mapView}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
        <View style={Styles.userInputContainer}>
          <View style={Styles.inputContainer}>
            <TextInput style={[AppStyles.txtSecandaryRegular, AppStyles.f16]} placeholder={"Select pickup location"}/>
          </View>
          <View style={[Styles.inputContainer, AppStyles.flexRowAlignCenter]}>
            <TextInput style={Styles.firstElement} placeholder={"Your location"}/>
            <TouchableOpacity style={Styles.changeTxtButtonContainer}>
              <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f16]}>CHANGE</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv10, AppStyles.alignCenter]}
            onPress={() => handleConfirm()}>
              <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18]}>CONFIRM LOCATION & PROCEED</Text>
            </TouchableOpacity>
          </View>
        </View>
    </KeyboardAwareScrollView>
  );
};

export default PickupDetails;
