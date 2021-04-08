import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { logout, RfH, RfW } from "../../../utils/helpers";
import { useNavigation, useRoute } from "@react-navigation/native";
import Styles from './styles';
import { Colors, Fonts, AppStyles } from "../../../theme";
import DropDownPicker from 'react-native-dropdown-picker';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Camera from '../../../components/Camera';
import { launchImageLibrary } from "react-native-image-picker";
import NavigationRouteNames from '../../../routes/ScreenNames';
import Appstyles from "../../../theme/Styles/texts";
import AppStyle from "../../../theme/Styles/spaces";
import style from "../../../theme/Styles/container";
import Checkbox from "@react-native-community/checkbox";
import CustomText from '../../../components/CustomText';



const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();


  const handleConfirm = () => {
    navigation.navigate(NavigationRouteNames.NEW_ORDER_REQUEST);
  };
  return (
    <KeyboardAwareScrollView style={{ flex: 1, paddingHorizontal: RfW(20), backgroundColor: '#ffffff', }}>
      <View style={[style.flexDir, AppStyle.mt20,]}>
        <View style={style.flexpointthree}>
        <Image style={Styles.lftimg} source={require('../../../assets/Images/AdminNewOrder/Group10055.png')}  />
          </View>
        <View style={style.flexpointseven}>
          <Text style={[Appstyles.txtBlackBold, Appstyles.f20,]}>Order Details</Text>
          </View>
        </View>

       <View style={Appstyles.aligncen}>
       <Text style={[Appstyles.txtBlackBold, Appstyles.f17, AppStyle.mt30,]}>Ref No- JYD/SC/2020/0067</Text>
       </View>
       <View style={Styles.boxView}>

         <View style={[style.flexDir, AppStyle.mt20,]}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Waste Type</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>Plastic</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Waste Sub Category</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>Type 1</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Volume</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>3 Tons</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Purchase Date</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>26/07/2020</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Provisional Pricing</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>₹ 25,864</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Payment Made</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>₹ 25,864</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Payment Mode</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>Cash</Text>
           </View>
           </View>

           
           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Payment Details</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>1235567778</Text>
           </View>
           </View>

       </View>

       <View>
         <Text style={[Appstyles.txtSecandaryBold, Appstyles.f11, Styles.mt22, AppStyle.mr10]}>Please note that the provisional pricing is subject to verify-cation by the authorized by Jayde pickup agent</Text>
         </View>

         <View>
            <View style={[style.flexDir, style.alignCenter, AppStyle.mt20]}>
            <Checkbox
                        disabled={false}
                        value={true}
                        tintColors={{ true: Colors.mango, false: '#777' }}
                        onValueChange={(newValue) => console.log(newValue)}
                    />
               <View style={{marginLeft: RfW(10)}}>
                <CustomText
                  color={Colors.warmGrey}
                  fontSize={15}
                  styling={{paddingVertical: RfH(4)}}>
                  I agree to the terms and conditions
                </CustomText>
              </View> 
            </View>
          </View>

      
      <View style={{ marginTop: RfH(10), marginTop: 25, marginBottom: 25 }}>
        <TouchableOpacity style={Styles.confirmButton}>
          <Text style={Styles.confirmBtnText}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default OrderDetails;
