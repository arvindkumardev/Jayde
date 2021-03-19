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
import FAIcon from "react-native-vector-icons/FontAwesome";
import Styles from "./styles";
import { Fonts } from '../../theme';

const PriceConfirm = () => {
  const { user, setLogin } = useContext(UserContext);
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={Styles.headerTxt}>Paper</Text>
    })
  }, [navigation]);

  return (
      <View style={Styles.screenContainer}>
          <View style={Styles.quoteContainer}>
            <Text style={Styles.labelTxt}>Provisional Price</Text>
            <View style={Styles.priceContainer}>
                <View style={Styles.itemContainer}>
                    <View style={{width:'45%'}}>
                        <Text style={Styles.itemTxt}>Subcategory</Text>
                    </View>
                    <View style={{width:'45%'}}>
                        <Text style={Styles.itemTxt}>Type 2</Text>
                    </View>
                </View>
                <View style={Styles.itemContainer}>
                    <View style={{width:'45%'}}>
                        <Text style={Styles.itemTxt}>Location</Text>
                    </View>
                    <View style={{width:'45%'}}>
                        <Text style={Styles.itemTxt}>Hyderabad</Text>
                    </View>
                </View>
                <View style={Styles.itemContainer}>
                    <View style={{width:'45%'}}>
                        <Text style={Styles.itemTxt}>Valume</Text>
                    </View>
                    <View style={{width:'45%'}}>
                        <Text style={Styles.itemTxt}>5 Tons</Text>
                    </View>
                </View>
                <View style={Styles.totalPriceContainer}>
                    <View style={{width:'45%'}}>
                        <Text style={Styles.totalTxt}>Estimated Price</Text>
                    </View>
                    <View style={{width:'45%'}}>
                        <Text style={Styles.totalTxt}><FAIcon size={14} name="rupee"/> 6000</Text>
                    </View>
                </View>
            </View>
          </View>
          <View style={Styles.btnContainer}>
            <TouchableOpacity style={Styles.btnPrimary}>
                <Text style={Styles.btnTextWhite}>SCHEDULE PICKUP</Text>
            </TouchableOpacity>
          </View>
      </View>
  );
}

export default PriceConfirm;
