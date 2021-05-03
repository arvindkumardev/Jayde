import React, {useLayoutEffect} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, TouchableOpacity, View, Text, TextInput, ScrollView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles, Colors } from '../../../theme';


function WarehouseOrderConfirmation() {

   const navigation = useNavigation();
   const route = useRoute();
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }

  useLayoutEffect(() => {
    const title='Order Warehouse Details';
   navigation.setOptions({
    title,
  });
  }, []);
  
  return (
    <KeyboardAwareScrollView>
    <View style={Styles.topView}>
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
           <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Purchase amount</Text>
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

       <View style={[AppStyles.ml20, AppStyles.mr20]}>
         <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt35, AppStyles.textalig]}>Confirm the receipt and quantity</Text>
        </View>

      <View style={AppStyles.flexDir}>
        <View style={[AppStyles.flexpointsix, AppStyles.mt20, AppStyles.ml24]}>
            <View>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Sub Category</Text>
            </View>
            <TextInput placeholder={"SWOR"} style={Styles.inputText} />
            <TextInput placeholder={"Pulp Board"} style={[Styles.inputText, AppStyles.mt20]} />
          </View>
        <View style={[AppStyles.flexpointfour, AppStyles.mt20, AppStyles.ml10, AppStyles.mr24]}>
            <View>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Quantity</Text>
            </View>
            <TextInput placeholder={"90 Kg"} style={Styles.inputText} />
            <TextInput placeholder={"05 Kg"} style={[Styles.inputText, AppStyles.mt20]} />
          </View>
      </View>

       <View style={Styles.btnContainer}>
       <TouchableOpacity
           style={Styles.confirmbtn}>
           <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>CONFIRM</Text>
         </TouchableOpacity>
       </View>

          </ScrollView> 
        
      
    </View>
    </KeyboardAwareScrollView>
  );
}
export default WarehouseOrderConfirmation;
