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
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UploadDocument } from '../../../components/index';


function NewWorkOrder() {

   const navigation = useNavigation();
   const route = useRoute();
   const [subCategories, setSubCategoryes] = useState([]);
   const [subCategoryId, setSubCategoryId] = useState('');
   const [volume, setVolume] = useState('');
   const [unitPickerData, setUnitData] = useState([]);
   const [unit, setUnit] = useState('');
   const [aggregate, setAggregate] = useState("");
   const [imageUpload, setImageUpload] = useState(false);
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.WORKORDER_SUMMARY);
  }

  useLayoutEffect(() => {
    const {status} = route.params;
    setAggregate(status);
    const title='New Work Order';
   navigation.setOptions({
    title,
  });
  }, []);
  
  return (
    <View style={Styles.topView}>
       <ScrollView>

       <View style={[AppStyle.ml20, AppStyle.mr20]}>
         <Text style={[Appstyles.txtBlackBold, Appstyles.f17, AppStyle.mt30, Appstyles.textalig]}>Create New Order Here</Text>
         {aggregate == "1" ? 
      <View style={[AppStyles.mt20]}>
      <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Aggregator</Text>
      <DropDown
        items={subCategories}
        placeholderText="Select Aggregator"
        itemStyle={{ color: '#000' }}
        onValueChange={(val) => setSubCategoryId(val)}
        selectedValue={subCategoryId}
        containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
      />
    </View>
         :
         <View style={[AppStyles.mt20]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Recycler</Text>
          <DropDown
            items={subCategories}
            placeholderText="Select recycler"
            itemStyle={{ color: '#000' }}
            onValueChange={(val) => setSubCategoryId(val)}
            selectedValue={subCategoryId}
            containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
          />
        </View> }

        <View style={[AppStyles.mt20]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Category</Text>
          <DropDown
            items={subCategories}
            placeholderText="Paper"
            itemStyle={{ color: '#000' }}
            onValueChange={(val) => setSubCategoryId(val)}
            selectedValue={subCategoryId}
            containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
          />
        </View>

        <View style={[AppStyles.mt20]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Company</Text>
          <DropDown
            items={subCategories}
            placeholderText="Colour Record"
            itemStyle={{ color: '#000' }}
            onValueChange={(val) => setSubCategoryId(val)}
            selectedValue={subCategoryId}
            containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
          />
        </View>

        <View style={[AppStyles.mt20]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Vehicle Number</Text>
          <TextInput
                placeholder="Enter Vehicle Number"
                value={volume}
                onChangeText={(txt) => setVolume(txt)}
                style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
              />
        </View>


        <View style={[AppStyles.mt20]}>
          <View style={{ flexDirection: 'row' }}>
          <View style={AppStyles.flexpointfive}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Date</Text>
            </View>
            <View style={AppStyles.flexpointfive}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10, AppStyles.ml5]}>Add Vehicle Image</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: .5, paddingRight: 10 }}>
              <TextInput
                placeholder="dd/mm/yyyy"
                value={volume}
                onChangeText={(txt) => setVolume(txt)}
                style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
              />
            </View>
            <View style={AppStyles.flexpointfive}>
            <TouchableOpacity style={[Styles.inputText, Styles.inputIcon, AppStyles.br10]} onPress={() => setImageUpload(!imageUpload)}>
            <Text style={Styles.txtFileUpload}>Upload file</Text>
            <MIcon name="attachment" size={25} color={Colors.grayThree} />
          </TouchableOpacity>
          <UploadDocument handleClose={() => setImageUpload(false)} 
          isVisible={imageUpload} />
            </View>
          </View>
        </View>
        
        <View style={[AppStyles.mt20]}>
          <View>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Volume</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: .6, paddingRight: 10 }}>
              <TextInput
                placeholder="Enter volume"
                value={volume}
                onChangeText={(txt) => setVolume(txt)}
                style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
              />
            </View>
            <View style={AppStyles.flexpointfour}>
              <DropDown
                items={unitPickerData}
                placeholderText="Kg"
                itemStyle={{ color: '#000' }}
                onValueChange={(val) => setUnit(val)}
                selectedValue={unit}
                containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
              />
            </View>
          </View>
        </View>

        <View style={[AppStyles.mt20]}>
          <View>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Price</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: .6, paddingRight: 10 }}>
              <TextInput
                placeholder="Enter Price"
                value={volume}
                onChangeText={(txt) => setVolume(txt)}
                style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
              />
            </View>
            <View style={AppStyles.flexpointfour}>
              <DropDown
                items={unitPickerData}
                placeholderText="Per Kg"
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
           style={Styles.confirmbtn} onPress={() => screenNavigate()}>
           <Text style={[Appstyles.txtWhiteRegular, Appstyles.f17, Appstyles.textalig, AppStyle.mt10]}>SAVE</Text>
         </TouchableOpacity>
       </View>

          </ScrollView> 
        
      
    </View>
  );
}
export default NewWorkOrder;
