import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import UserContext from '../Login/user.context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Styles from "./styles";
import NavigationRouteNames from '../../routes/ScreenNames';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors, Fonts } from '../../theme';
import { Dimensions } from 'react-native';
const PickupDetails = () => {
  const { user, setLogin } = useContext(UserContext);
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={Styles.headerTxt}>New Order</Text>,
    });
  }, [navigation]);

  const handleGetQuote = () => {
    navigation.navigate(NavigationRouteNames.PRICE_REQUEST);
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, paddingBottom: 20, paddingHorizontal: 20 }}
    >
      <View style={{ flex: 3 }}>
        <Image
          source={require('./map.png')}
          style={{ width: Dimensions.get('screen').width, height: 500 }}
        />
      </View>
      <View style={{ flex: 1, width: '100%' }}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
          <TextInput
            style={{ fontFamily: Fonts.regular, fontSize: 16 }}
            placeholder={'Select pickup location'}
          />
        </View>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TextInput
            style={{ flex: 3, fontFamily: Fonts.regular, fontSize: 16 }}
            placeholder={'Your location'}
          />
          <TouchableOpacity style={{ flex: 1 }}>
            <Text style={{ color: Colors.mango, fontSize: 16 }}>CHANGE</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={Styles.btnGetQuote}>
            <Text style={Styles.btnTextWhite}>CONFIRM LOCATION & PROCEED</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PickupDetails;
