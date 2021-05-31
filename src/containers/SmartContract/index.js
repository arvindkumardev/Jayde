import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import Styles from "./styles";
import Appstyles from "../../theme/Styles/texts";
import AppStyle from "../../theme/Styles/spaces";
import style from "../../theme/Styles/container";
import CustomText from '../../components/CustomText';
import NavigationRouteNames from '../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles } from '../../theme';

// Image
import contractImg from '../../assets/Images/SmartContract/contract.png';
import auditImg from '../../assets/Images/SmartContract/auditing.png';


function SmartContract() {

   const navigation = useNavigation();
   const route = useRoute();
  
   const ownedContracts = () => {
    navigation.navigate(NavigationRouteNames.OWNED_CONTRACTS);
   }

   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.AUDIT_TRAIL);
   }

  useLayoutEffect(() => {
    const title='Smart Contracts';
   navigation.setOptions({
    title,
  });
  }, []);
  
  return (
    <View style={Styles.topView}>
       <ScrollView>
       
       <TouchableOpacity onPress={() => ownedContracts()}>
       <View style={Styles.boxView}>
           <View style={style.flexDir}>
         <View style={style.flexpointeight}>
           <Text style={[Appstyles.txtWhiteBold, Appstyles.f17, AppStyle.mt20, AppStyle.ml20]}>Owned Contracts</Text>
           <View style={[Styles.bdrclr]}></View>
           </View>
           <View style={[style.flexpointtwo, Appstyles.alignfend, AppStyle.mt20, AppStyles.mr14]}>
           <Image source={contractImg}  />  
           </View>
           </View>
           <Text style={[Appstyles.txtWhiteRegular, Appstyles.f13, AppStyle.mt10, AppStyle.ml20]}>View all the contacts that you own.</Text>
       </View>
       </TouchableOpacity>

       <TouchableOpacity onPress={() => screenNavigate()}>
       <View style={Styles.auditboxView}>
           <View style={style.flexDir}>
         <View style={style.flexpointeight}>
           <Text style={[Appstyles.txtWhiteBold, Appstyles.f17, AppStyle.mt20, AppStyle.ml20]}>Audit Trail</Text>
           <View style={[Styles.bdrclr]}></View>
           </View>
           <View style={[style.flexpointtwo, Appstyles.alignfend, AppStyle.mt20, AppStyles.mr14]}>
           <Image source={auditImg}  />  
           </View>
           </View>
           <Text style={[Appstyles.txtWhiteRegular, Appstyles.f13, AppStyle.mt10, AppStyle.ml20, AppStyles.mr30]}>Check the details of contracts for reference.</Text>
       </View>
       </TouchableOpacity>

          </ScrollView> 
        
      
    </View>
  );
}
export default SmartContract;
