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


function ProfileUpdate() {

   const navigation = useNavigation();
   const route = useRoute();
   const [unitPickerData, setUnitData] = useState([]);
   const [unit, setUnit] = useState('');
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }

     useLayoutEffect(() => {
      const title='Update Profile';
     navigation.setOptions({
      title,
    });
    }, []);
  
  return (
    <KeyboardAwareScrollView>
    <View style={Styles.topView}>
       <ScrollView>

        <View>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, Styles.title]}>Please enter the details</Text>

          <View style={[AppStyles.mt30, AppStyles.ml24, AppStyles.mr24]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6,]}>Name</Text>
            <View>
            <TextInput placeholder={"Sahdev Garg"} style={Styles.inputText} />
            </View>
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Email</Text>
            </View>
            <TextInput placeholder={"sahdevgarg@gmail.com"} style={Styles.inputText} />
          </View>

        <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View style={AppStyles.flex1}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Phone Number</Text>
            </View>
            <TextInput placeholder={"9876543210"} style={Styles.inputText} />
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View style={AppStyles.flex1}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Password</Text>
            </View>
            <TextInput placeholder={"**********"} style={Styles.inputText} />
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View style={AppStyles.flex1}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Confirm Password</Text>
            </View>
            <TextInput placeholder={"**********"} style={Styles.inputText} />
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
export default ProfileUpdate;
