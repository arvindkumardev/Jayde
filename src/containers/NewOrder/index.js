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

const NewOrder= () => {
  const { user, setLogin } = useContext(UserContext);
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={Styles.headerTxt}>New Order</Text>
    })
  }, [navigation]);

  return (
      <View style={Styles.screenContainer}>
          <Text style={Styles.labelTxt}>What would you want to do?</Text>
          <View style={Styles.btnContainer}>
            <TouchableOpacity style={Styles.btnGetQuote}>
                <Text style={Styles.btnTextWhite}>GET QUOTE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.btnSchedule}>
                <Text style={Styles.btnTextGray}>SCHEDULE PICKUP</Text>
            </TouchableOpacity>
          </View>
      </View>
  );
}

export default NewOrder;
