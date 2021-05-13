import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import * as Alert from 'react-native';
import { TouchableOpacity, View, Text, Image, TextInput, ScrollView} from 'react-native';
import Styles from "./styles";
import { AppStyles } from '../../../theme';
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';

function RejectOrder() {

  const navigation = useNavigation();
  const route = useRoute();

   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }

  useLayoutEffect(() => {
    const title='Reject Order';
   navigation.setOptions({
    title,
  });
  }, []);

  
  return (
    <View style={Styles.topView}>
       <ScrollView>
       
       <View style={Styles.boxContent}>
         <View style={AppStyles.aligncen}>
          <Image style={Styles.rejectImg} source={require('../../../assets/Images/Aggregator/RejectOrder/reject.png')}  /> 
          <Text style={[AppStyles.txtBlackBold, AppStyles.f20, AppStyles.spacing1]}>REJECT ORDER</Text>
         </View>
         <View style={Styles.border}></View>
         <View style={[AppStyles.mt20, AppStyles.mr14, AppStyles.ml15]}>
           <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.textalig]}>You have chosen to reject the order Ref NO - JYD/SC/2020/0067. Where you were assignedas a preferred partner.</Text>
         </View>

         <View style={[AppStyles.mt20]}>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mb10, AppStyles.ml24]}>Please give reason for cancellation</Text>
          <TextInput
                placeholder=""
                style={Styles.canceltextinput}
                multiline={true}
              />
        </View>

         <View>
            <View style={AppStyles.aligncen}>
              <TouchableOpacity style={Styles.backbtn}
                onPress={() => {screenNavigate()}}>
                  <Text style={[AppStyles.f17, AppStyles.warmgreycolor, AppStyles.textalig, AppStyles.mt10]}>BACK</Text>
              </TouchableOpacity>
             </View>

             <View style={AppStyles.aligncen}>
              <TouchableOpacity style={Styles.confirmbtn}>
                  <Text style={[AppStyles.f17, AppStyles.whitecolor, AppStyles.textalig, AppStyles.mt10]}>CONFIRM</Text>
              </TouchableOpacity>
             </View>
          </View>
       </View>

          </ScrollView> 
        
      
    </View>
  );
}
export default RejectOrder;
