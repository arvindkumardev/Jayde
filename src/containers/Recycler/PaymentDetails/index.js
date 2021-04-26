import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import { Alert } from "react-native";
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import Styles from "./styles";
import CustomText from '../../../components/CustomText';
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles, Colors } from '../../../theme';
import FAIcon from "react-native-vector-icons/FontAwesome";
import DropDown from '../../../components/Picker/index';
import Checkbox from "@react-native-community/checkbox";
import { RfH, RfW } from "../../../utils/helpers";


function PaymentDetails() {

   const navigation = useNavigation();
   const route = useRoute();
   const [unitPickerData, setUnitData] = useState([]);
   const [unit, setUnit] = useState('');
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }

     useLayoutEffect(() => {
      const title='Order';
     navigation.setOptions({
      title,
    });
    }, []);
  
  return (
    
    <View style={Styles.topView}>
       <ScrollView>

          <View style={[AppStyles.mt20, AppStyles.ml24]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>JYD/N/21/019</Text>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>Vijaynanda Krafts pvt ltd</Text>
          </View>

         <View style={[AppStyles.flexDir, AppStyles.mt20]}>
         <View style={[AppStyles.flexpointtwo, AppStyles.ml20]}>
         <Image source={require('../../../assets/Images/Aggregator/Inventory/Group10150.png')}  />
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

        <View>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt35, AppStyles.textalig]}>Payment Details</Text>

          <View style={[AppStyles.mt30, AppStyles.ml24, AppStyles.mr24]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6,]}>Payment Required</Text>
            <View>
            <TextInput placeholder={"650"} style={Styles.inputText} />
            <FAIcon style={Styles.rupee} size={15} name="rupee" />
            </View>
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointseven}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Payment Made</Text>
            </View>
            <View style={AppStyles.flexpointthree}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,  AppStyles.ml24, AppStyles.mt5]}>Enter Value</Text>
            </View>
            </View>
            <TextInput placeholder={"00.000"} style={Styles.inputText} />
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
          <View>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Payment Mode</Text>
          </View>
          <View>
              <DropDown
                items={unitPickerData}
                placeholderText="Select one"
                itemStyle={{ color: '#000' }}
                onValueChange={(val) => setUnit(val)}
                selectedValue={unit}
                containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
              />
          </View>
        </View>

        <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View style={AppStyles.flexDir}>
            <View style={AppStyles.flex1}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Payment Details</Text>
            </View>
            <View style={AppStyles.flex1}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,  AppStyles.ml35, AppStyles.mt5]}>Transaction Number</Text>
            </View>
            </View>
            <TextInput placeholder={"1234512345"} style={Styles.inputText} />
          </View>

          <View>
            <View style={[AppStyles.flexDir, AppStyles.alignCenter, AppStyles.mt14, AppStyles.ml20,]}>
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

          <View style={[Styles.btnContainer, AppStyles.flexDir]}>
         <View style={AppStyles.flex1}>
         <TouchableOpacity
           style={[Styles.aggregatebtn]}>
           <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>CANCEL</Text>
         </TouchableOpacity>
        </View>
        <View style={AppStyles.flex1}>
       <TouchableOpacity
           style={[Styles.confirmbtn, AppStyles.mb20]}>
           <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>CONFIRM</Text>
         </TouchableOpacity>
         </View>
       </View>
        
        </View>


          </ScrollView> 
        
      
    </View>
  );
}
export default PaymentDetails;
