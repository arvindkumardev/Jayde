import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, ScrollView} from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles, Colors } from '../../../theme';
import DropDown from '../../../components/Picker/index';


function AddSubCategory() {

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
    const title='Send to Recycler';
   navigation.setOptions({
    title,
  });
  }, []);
  
  return (
    <View style={Styles.topView}>
       <ScrollView>
       
       <View style={Styles.boxView}>
          <View style={AppStyles.flexDir}>
             <View style={[AppStyles.flexpointtwo, AppStyles.ml20, AppStyles.mt12]}>
                <Image source={require('../../../assets/Images/AddSubCategory/Paper.png')} />
             </View>
             <View style={[AppStyles.flexpointsix, AppStyles.aligncen]}>
               <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt30]}>Paper Waste</Text>
             </View>
             <View style={[AppStyles.flexpointtwo, AppStyles.mt30, AppStyles.ml30]}>
             <Image source={require('../../../assets/Images/AddSubCategory/check-circle.png')} />
             </View>
          </View>
       </View>

       <View style={[AppStyles.ml20, AppStyles.mr20]}>

       <View style={[AppStyles.mt35]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Please Choose a sub category</Text>
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
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Volume</Text>
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
           <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>CONFIRM</Text>
         </TouchableOpacity>
       </View>

          </ScrollView> 
        
      
    </View>
  );
}
export default AddSubCategory;
