import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import Styles from "./styles";
import CustomText from '../../../components/CustomText';
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import arraydata from '../../../utils/arraydata2.json';

function Inventory() {

   const navigation = useNavigation();
   const route = useRoute();
   
  
   const screenNavigate = (btnstatus) => {
    navigation.navigate(NavigationRouteNames.NEW_WORKORDER, {status:btnstatus});
  }

     useLayoutEffect(() => {
      const title='Inventory';
     navigation.setOptions({
      title,
    });
    }, []);

    const _RenderItem = (index, item) => {
      return (
        <View>
        <View style={[AppStyles.flexDir, AppStyles.ml20, AppStyles.mt20]}>
        <View style={AppStyles.flexpointtwo}>
        <Image source={require('../../../assets/Images/Aggregator/Inventory/Group10150.png')}  />
        </View>
        <View style={AppStyles.flexpointeight, AppStyles.ml30}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.productname}</Text>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.product}</Text>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11]}>{item.weight}</Text>
        </View>
        </View>

      <View style={[Styles.btnContainer, AppStyles.flexDir]}>
        <View style={AppStyles.flex1}>
        <TouchableOpacity
          style={[Styles.aggregatebtn]} onPress={() => screenNavigate("1")}>
          <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>AGGREGATOR</Text>
        </TouchableOpacity>
       </View>
       <View style={AppStyles.flex1}>
      <TouchableOpacity
          style={[Styles.confirmbtn, AppStyles.mb20]} onPress={() => screenNavigate("0")}>
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>RECYCLER</Text>
        </TouchableOpacity>
        </View>
      </View>

      <View style={[AppStyles.w100, Styles.bdrclr]}></View>
     </View>   
      )
    }
  
  return (
    <View style={Styles.topView}>
       <ScrollView>

      <FlatList
                data={arraydata}
                renderItem={({ index, item }) =>
                  _RenderItem(index, item)
                }
              />

          </ScrollView> 
        
      
    </View>
  );
}
export default Inventory;
