import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import { Alert } from "react-native";
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import Styles from "./styles";
import CustomText from '../../components/CustomText';
import NavigationRouteNames from '../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles, Colors } from '../../theme';
import FAIcon from "react-native-vector-icons/FontAwesome";
import DropDown from '../../components/Picker/index';
import Checkbox from "@react-native-community/checkbox";
import { RfH, RfW } from "../../utils/helpers";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


function BusinessDetail() {

   const navigation = useNavigation();
   const route = useRoute();
   const [unitPickerData, setUnitData] = useState([]);
   const [unit, setUnit] = useState('');
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }

     useLayoutEffect(() => {
      const title='Business Registration';
     navigation.setOptions({
      title,
    });
    }, []);
  
  return (
    <KeyboardAwareScrollView>
    <View style={Styles.topView}>
       <ScrollView>

        <View>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, Styles.title]}>Please enter the details for your business registration</Text>

          <View style={[AppStyles.mt30, AppStyles.ml24, AppStyles.mr24]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6,]}>Name</Text>
            <View>
            <TextInput placeholder={"Name"} style={Styles.inputText} />
            </View>
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Lastname</Text>
            </View>
            <TextInput placeholder={"Lastname"} style={Styles.inputText} />
          </View>

          <View style={[AppStyles.mt20, AppStyles.flexDir]}>
          <View style={AppStyles.flex1}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.ml24, AppStyles.f15, AppStyles.mb6]}>City</Text>
          </View>
          <View style={AppStyles.flex1}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.ml24, AppStyles.f15, AppStyles.mb6]}>Pincode</Text>
          </View>
        </View>
        <View style={[AppStyles.flexDir]}>
         <View style={AppStyles.flex1, AppStyles.ml24}>
          <TextInput placeholder={"Hyderabad"} style={Styles.inputTextcity} />
          </View>
          <View style={[AppStyles.flexpointeight, AppStyles.ml10]}>
              <DropDown
                items={unitPickerData}
                placeholderText="500076"
                itemStyle={{ color: '#000' }}
                onValueChange={(val) => setUnit(val)}
                selectedValue={unit}
                containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
              />
              </View>
          </View>

        <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View style={AppStyles.flex1}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>XYZ</Text>
            </View>
            <TextInput placeholder={"hydzs"} style={Styles.inputText} />
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View style={AppStyles.flex1}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>XYZ</Text>
            </View>
            <TextInput placeholder={"zyx"} style={Styles.inputText} />
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View style={AppStyles.flex1}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Select EPR Partner</Text>
            </View>
            <TextInput placeholder={"Partner"} style={Styles.inputText} />
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
           <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>SAVE</Text>
         </TouchableOpacity>
         </View>
       </View>
        
        </View>


          </ScrollView> 
        
      
    </View>
    </KeyboardAwareScrollView>
  );
}
export default BusinessDetail;