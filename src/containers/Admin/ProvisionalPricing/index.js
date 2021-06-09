import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import { Alert } from "react-native";
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import arraydata from '../../../utils/arraydata5.json';

//Image
import PaperImg from '../../../assets/Images/NewOrderList/Group_10089.png'


function ProvisionalPricing() {

   const navigation = useNavigation();
   const route = useRoute();
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }

     useLayoutEffect(() => {
      const title='Provisional Pricing';
     navigation.setOptions({
      title,
    });
    }, []);

    const _RenderItem = (index, item) => {
      return (
        <TouchableOpacity>

         <View style={[AppStyles.flexDir, AppStyles.mt20]}>
         <View style={[AppStyles.flexpointtwo, AppStyles.ml20]}>
         <Image source={PaperImg}  />
         </View>
         <View style={[AppStyles.flexpointsix, AppStyles.ml20]}>
           <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.company}</Text>
           <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.productname}</Text>
           <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.type}</Text>
         </View>
         <View style={AppStyles.flexpointtwo}>
         <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.price}</Text>
         </View>
         </View>

         <View style={[Styles.btnContainer, AppStyles.flexDir]}>
        <View style={AppStyles.flex1}>
        <TouchableOpacity
          style={[Styles.aggregatebtn, AppStyles.btnHeight44, AppStyles.inCenter]}>
          <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig]}>EDIT</Text>
        </TouchableOpacity>
       </View>
       <View style={AppStyles.flex1}>
      <TouchableOpacity
          style={[Styles.confirmbtn, AppStyles.mb20, AppStyles.btnHeight44, AppStyles.inCenter]}>
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig]}>DELETE</Text>
        </TouchableOpacity>
        </View>
      </View>

        <View style={[AppStyles.w100, Styles.bdrclr]}></View>
        </TouchableOpacity>     
      )
    }

  
  return (
    
    <View style={AppStyles.topView}>
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
export default ProvisionalPricing;
