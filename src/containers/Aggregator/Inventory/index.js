import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import Styles from "./styles";
import CustomText from '../../../components/CustomText';
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles } from '../../../theme';


function Inventory() {

   const navigation = useNavigation();
   const route = useRoute();
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }

     useLayoutEffect(() => {
      const title='Inventory';
     navigation.setOptions({
      title,
    });
    }, []);
  
  return (
    <View style={Styles.topView}>
       <ScrollView>

        <View>
         <View style={[AppStyles.flexDir, AppStyles.ml20, AppStyles.mt20]}>
         <View style={AppStyles.flexpointtwo}>
         <Image source={require('../../../assets/Images/Aggregator/Inventory/Group10150.png')}  />
         </View>
         <View style={AppStyles.flexpointeight, AppStyles.ml30}>
           <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>Paper</Text>
           <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>MLL Cover</Text>
           <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11]}>15610 Kg</Text>
         </View>
         </View>

       <View style={[Styles.btnContainer, AppStyles.flexDir]}>
         <View style={AppStyles.flex1}>
         <TouchableOpacity
           style={[Styles.aggregatebtn]}>
           <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>AGGREGATOR</Text>
         </TouchableOpacity>
        </View>
        <View style={AppStyles.flex1}>
       <TouchableOpacity
           style={[Styles.confirmbtn, AppStyles.mb20]}>
           <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>RECYCLER</Text>
         </TouchableOpacity>
         </View>
       </View>

       <View style={[AppStyles.w100, Styles.bdrclr]}></View>
      </View>


      <View>
         <View style={[AppStyles.flexDir, AppStyles.ml20, AppStyles.mt20]}>
         <View style={AppStyles.flexpointtwo}>
         <Image source={require('../../../assets/Images/Aggregator/Inventory/Group10150.png')}  />
         </View>
         <View style={AppStyles.flexpointeight, AppStyles.ml30}>
           <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>Paper</Text>
           <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>MLL Cover</Text>
           <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11]}>15610 Kg</Text>
         </View>
         </View>

       <View style={[Styles.btnContainer, AppStyles.flexDir]}>
         <View style={AppStyles.flex1}>
         <TouchableOpacity
           style={[Styles.aggregatebtn]}>
           <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>AGGREGATOR</Text>
         </TouchableOpacity>
        </View>
        <View style={AppStyles.flex1}>
       <TouchableOpacity
           style={[Styles.confirmbtn, AppStyles.mb20]}>
           <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>RECYCLER</Text>
         </TouchableOpacity>
         </View>
       </View>

       <View style={[AppStyles.w100, Styles.bdrclr]}></View>
      </View>


      <View>
         <View style={[AppStyles.flexDir, AppStyles.ml20, AppStyles.mt20]}>
         <View style={AppStyles.flexpointtwo}>
         <Image source={require('../../../assets/Images/Aggregator/Inventory/Group10150.png')}  />
         </View>
         <View style={AppStyles.flexpointeight, AppStyles.ml30}>
           <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>Paper</Text>
           <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>MLL Cover</Text>
           <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11]}>15610 Kg</Text>
         </View>
         </View>

       <View style={[Styles.btnContainer, AppStyles.flexDir]}>
         <View style={AppStyles.flex1}>
         <TouchableOpacity
           style={[Styles.aggregatebtn]}>
           <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>AGGREGATOR</Text>
         </TouchableOpacity>
        </View>
        <View style={AppStyles.flex1}>
       <TouchableOpacity
           style={[Styles.confirmbtn, AppStyles.mb20]}>
           <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>RECYCLER</Text>
         </TouchableOpacity>
         </View>
       </View>

       <View style={[AppStyles.w100, Styles.bdrclr]}></View>
      </View>


      <View>
         <View style={[AppStyles.flexDir, AppStyles.ml20, AppStyles.mt20]}>
         <View style={AppStyles.flexpointtwo}>
         <Image source={require('../../../assets/Images/Aggregator/Inventory/Group10150.png')}  />
         </View>
         <View style={AppStyles.flexpointeight, AppStyles.ml30}>
           <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>Paper</Text>
           <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>MLL Cover</Text>
           <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11]}>15610 Kg</Text>
         </View>
         </View>

       <View style={[Styles.btnContainer, AppStyles.flexDir]}>
         <View style={AppStyles.flex1}>
         <TouchableOpacity
           style={[Styles.aggregatebtn]}>
           <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>AGGREGATOR</Text>
         </TouchableOpacity>
        </View>
        <View style={AppStyles.flex1}>
       <TouchableOpacity
           style={[Styles.confirmbtn, AppStyles.mb20]}>
           <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>RECYCLER</Text>
         </TouchableOpacity>
         </View>
       </View>

       <View style={[AppStyles.w100, Styles.bdrclr]}></View>
      </View>

          </ScrollView> 
        
      
    </View>
  );
}
export default Inventory;
