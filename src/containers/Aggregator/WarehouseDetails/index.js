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
import DropDown from '../../../components/Picker/index';


function WarehouseDetails() {

   const navigation = useNavigation();
   const route = useRoute();
   const [subCategories, setSubCategoryes] = useState([]);
   const [subCategoryId, setSubCategoryId] = useState('');
   const [volume, setVolume] = useState('');
   const [unitPickerData, setUnitData] = useState([]);
   const [unit, setUnit] = useState('');
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }

  useLayoutEffect(() => {
    const title='Order Warehouse details';
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
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Purchase amount</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>₹ 25,864</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Pickup Address</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f11, AppStyle.mt10, AppStyle.mr20]}>1812, building No 2, Banjara Hills. Hyderabad (TN)</Text>
           </View>
           </View>
       </View>

       <View style={[AppStyle.ml20, AppStyle.mr20]}>
         <Text style={[Appstyles.txtBlackBold, Appstyles.f17, AppStyle.mt35, Appstyles.textalig]}>Confirm the receipt and quantity</Text>
       <View style={[AppStyles.mt20]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Category</Text>
          <DropDown
            items={subCategories}
            placeholderText="Select category"
            itemStyle={{ color: '#000' }}
            onValueChange={(val) => setSubCategoryId(val)}
            selectedValue={subCategoryId}
            containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
          />
        </View>
        <View style={[AppStyles.mt20]}>
          <View>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Enter the Weight</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 2, paddingRight: 10 }}>
              <TextInput
                placeholder="Enter volume"
                value={volume}
                onChangeText={(txt) => setVolume(txt)}
                style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <DropDown
                items={unitPickerData}
                placeholderText="Units"
                itemStyle={{ color: '#000' }}
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
export default WarehouseDetails;
