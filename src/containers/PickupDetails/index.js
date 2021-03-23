import React, {useContext, useEffect, useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image
    } from 'react-native';
import UserContext from '../Login/user.context';
import {useNavigation, useRoute} from '@react-navigation/native';
import Styles from "./styles";
import NavigationRouteNames from '../../routes/ScreenNames';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import { Colors, Fonts } from '../../theme';
import { Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "./mapStyle";
const PickupDetails = () => {
  const { user, setLogin } = useContext(UserContext);
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={Styles.headerTxt}>New Order</Text>
    })
  }, [navigation]);

  const handleConfirm = () => {
    navigation.navigate(NavigationRouteNames.CALL_REQUEST);
  }

  return (
      <KeyboardAwareScrollView style={Styles.mainContainer}>

        <View style={{ flex: 3 }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            style={{width:600, height: 500 }}
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
            <TextInput style={Styles.txtInput} placeholder={"Select pickup location"}/>
          </View>
          <View style={[Styles.inputContainer, Styles.twoElementsContainer]}>
            <TextInput style={Styles.firstElement} placeholder={"Your location"}/>
            <TouchableOpacity style={{ flex:1 }}>
              <Text style={Styles.txtPrimary}>CHANGE</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={Styles.btnPrimary} onPress={handleConfirm}>
              <Text style={Styles.btnTextWhite}>CONFIRM LOCATION & PROCEED</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
  );
}

export default PickupDetails;
