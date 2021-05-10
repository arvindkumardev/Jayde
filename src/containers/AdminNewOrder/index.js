import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import * as Alert from 'react-native';
import {Platform, TouchableOpacity, View, Text, ScrollView} from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles } from '../../theme';

function ViewNewOrder() {
  const navigation = useNavigation();
  const route = useRoute();

   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.ASSIGN_ORDER);
  }

  useLayoutEffect(() => {
    const title='New Order';
   navigation.setOptions({
    title,
  });
  }, []);
 
  
  return (
    <View style={Styles.mainVu}>
       <ScrollView>

      <View style={AppStyles.aligncen}>
       <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt30,]}>Ref No- JYD/SC/2020/0067</Text>
      </View>

      <View style={Styles.boxView}>

      <View style={[AppStyles.flexDir, AppStyles.mt20,]}>
      <View style={AppStyles.flexpointsix}>
        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.ml20]}>Waste type</Text>
        </View>
        <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
        <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mr20]}>Plastic</Text>
        </View>
        </View>

        <View style={AppStyles.flexDir}>
      <View style={AppStyles.flexpointsix}>
        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Waste sub category</Text>
        </View>
        <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
        <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>Type 1</Text>
        </View>
        </View>

        <View style={AppStyles.flexDir}>
      <View style={AppStyles.flexpointsix}>
        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Volume</Text>
        </View>
        <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
        <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>3 Tons</Text>
        </View>
        </View>

        <View style={AppStyles.flexDir}>
      <View style={AppStyles.flexpointsix}>
        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Purchase Date</Text>
        </View>
        <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
        <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>26/07/2020</Text>
        </View>
        </View>

        <View style={AppStyles.flexDir}>
      <View style={AppStyles.flexpointsix}>
        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Purchase Amount</Text>
        </View>
        <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
        <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>₹ 25,864</Text>
        </View>
        </View>

        <View style={AppStyles.flexDir}>
      <View style={AppStyles.flexpointsix}>
        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Pickup Address</Text>
        </View>
        <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
        <Text style={[AppStyles.txtBlackRegular, AppStyles.f11, AppStyles.mt10, AppStyles.mr20]}>1812, building No 2, Banjara Hills. Hyderabad (TN)</Text>
        </View>
        </View> 
      </View>
        

      <View style={[Styles.btnContainer, AppStyles.flexDir]}>
        <View style={AppStyles.flex1}>
        <TouchableOpacity
          style={[Styles.aggregatebtn]} onPress={() => screenNavigate()}>
          <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>REJECT</Text>
        </TouchableOpacity>
       </View>
       <View style={AppStyles.flex1}>
      <TouchableOpacity
          style={[Styles.confirmbtn, AppStyles.mb20]} onPress={() => screenNavigate()}>
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>ACCEPT</Text>
        </TouchableOpacity>
        </View>
      </View>

        

          </ScrollView> 
        
      
    </View>
  );
}
export default ViewNewOrder;
