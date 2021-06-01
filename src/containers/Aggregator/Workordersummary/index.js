import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { Alert } from "react-native";
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import FAIcon from "react-native-vector-icons/FontAwesome";


function Workordersummary() {

  const navigation = useNavigation();
  const route = useRoute();

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }

  useLayoutEffect(() => {
    const title = 'Work Order Summary';
    navigation.setOptions({
      title,
    });
  }, []);

  const delView = () => {
    Alert.alert(
      "Would You Want To Delete ?",
      "",
      [
        {
          text: "Yes",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "No", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  return (

    <View style={Styles.topView}>
      <ScrollView>

        <View style={[AppStyles.flexDir, AppStyles.mt20]}>
          <View style={[AppStyles.ml24, AppStyles.flexpointnine]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>JYD/N/21/019</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>Vijaynanda Krafts pvt ltd</Text>
          </View>
          <View style={[AppStyles.flexpointone, AppStyles.mr10]}>
            <TouchableOpacity 
            activeOpacity = {0.8}
            onPress={() => { delView() }}>
              <FAIcon size={18} name="trash" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[AppStyles.flexDir, AppStyles.mt20]}>
          <View style={[AppStyles.flexpointtwo, AppStyles.ml20]}>
            <Image source={require('../../../assets/Images/Aggregator/Inventory/Group10150.png')} />
          </View>
          <View style={[AppStyles.flexpointsix, AppStyles.ml10]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>Paper</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>Colour record</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11]}>260 Kg |  ₹2.5</Text>
          </View>
          <View style={AppStyles.flexpointtwo}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>₹650</Text>
          </View>
        </View>

        <View style={[AppStyles.w100, Styles.bdrclr]}></View>

      </ScrollView>


    </View>
  );
}
export default Workordersummary;
