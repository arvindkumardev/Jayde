import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import Styles from "./styles";
import Appstyles from "../../../theme/Styles/texts";
import AppStyle from "../../../theme/Styles/spaces";
import style from "../../../theme/Styles/container";
import CustomText from '../../../components/CustomText';
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles, Colors } from '../../../theme';
import moment from 'moment';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import DropDown from '../../../components/Picker/index';


function ProposeTime() {

   const navigation = useNavigation();
   const route = useRoute();
   const [time, setTime] = useState('');
   const [unit, setUnit] = useState('');
   const [unitPickerData, setUnitData] = useState([]);

  useLayoutEffect(() => {   
    const title='Re-Schedule Order';
   navigation.setOptions({
    title,
  });
  }, []);
  
  return (
    <View style={Styles.topView}>
       <ScrollView>
       
        
       <View style={Appstyles.aligncen}>
       <Text style={[Appstyles.txtBlackBold, Appstyles.f17, AppStyle.mt30,]}>Ref No- JYD/SC/2020/0067</Text>
       </View>
       <View style={Styles.boxView}>

         <View style={[style.flexDir, AppStyle.mt20,]}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.ml20]}>Waste type</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mr20]}>Plastic</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Waste sub category</Text>
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
         <View style={style.flex1}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Pickup Time</Text>
           </View>
           <View style={[style.flex1, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>11:00 am - 1:00 pm</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Provisional Pricing</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}><FAIcon size={14} name="rupee" /> 25,864</Text>
           </View>
           </View>

       </View>

       <View style={[AppStyles.ml20, AppStyles.mr20]}>
        <View>
           <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5, AppStyles.mt10]]}>Date</Text>
           <TextInput
             placeholder="dd/mm/yyyy"
             style={[
               AppStyles.txtSecandaryRegular,
               AppStyles.btnSecandary,
               AppStyles.br10,
               AppStyles.mb10,
               AppStyles.pl20,
             ]}
           />
         </View>
         
        <View style={[AppStyles.mt20]}>
           <View>
             <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5]}>Time</Text>
           </View>
           <View style={{ flexDirection: 'row' }}>
             <View style={{ flex: 2, paddingRight: 10 }}>
               <TextInput
                 placeholder="00:00 - 00:00"
                 value={time}
                 onChangeText={(txt) => setTime(txt)}
                 style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
               />
             </View>
             <View style={{ flex: 1 }}>
               <DropDown
                 items={unitPickerData}
                 placeholderText="am"
                 itemStyle={{ color: '#707070' }}
                 onValueChange={(val) => setUnit(val)}
                 selectedValue={unit}
                 containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
               />
             </View>
           </View>
         </View>
       </View>

       <View style={Styles.btnContainer}>
       <TouchableOpacity
           style={Styles.confirmbtn}>
           <Text style={[Appstyles.txtWhiteRegular, Appstyles.f17, Appstyles.textalig, AppStyle.mt10]}>CONFIRM</Text>
         </TouchableOpacity>
       </View>

          </ScrollView> 
        
      
    </View>
  );
}
export default ProposeTime;
