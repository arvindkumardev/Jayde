/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-console */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchImageLibrary } from "react-native-image-picker";
import { AppStyles, Colors } from "../../../theme";
import NavigationRouteNames from '../../../routes/ScreenNames';
import DropDown from "../../../components/Picker/index";

const data = [
  {label: 'Test1', value: '1', key: 1, color: Colors.mango, displayValue: true },
  {label: 'Test2', value: '2', key: 2, color: Colors.mango, displayValue: '' },
  {label: 'Test3', value: '3', key: 3, color: Colors.mango, displayValue: '' },
]

const PricingRequest = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showCamera, setShowCamera] = useState(false);
  const [wasteImage, setWasteImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedItem, setSelectedItem ] = useState('')

  const onShowCamera = () => {
    console.log(showCamera);
    setShowCamera(!showCamera);
  };
  useLayoutEffect(() => {
    const { title, categoryId } = route.params;
    console.log("Category Id fetch", categoryId);
    navigation.setOptions({
      title: 'Paper Waste'
    });
  }, []);

  // useEffect(async () => {
  //   const { data } = await getSubCategory(1);
  //   console.log('Getting response from subcategory ', data);
  // }, []);

  const onClose = () => {
    setShowCamera(false);
  };

  const onLibraryOpen = () => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setWasteImage(response);
      }
    });
  };

  const onTakePic = (imageObject) => {
    console.log(imageObject.base64);
    setWasteImage(imageObject);
    setBase64Image(imageObject.base64);
    setShowCamera(false);
  };

  const onRemoveImage = () => {
    setWasteImage(null);
    setBase64Image("");
  };
  const handleDropDownSelection = (val) => {
    setSelectedItem(val);
  }
  const handleConfirm = () => {
    navigation.navigate(NavigationRouteNames.NEW_ORDER_REQUEST);
  };
  return (
    <KeyboardAwareScrollView style={[AppStyles.ph20, AppStyles.pv15,{backgroundColor:'#fff'}]} contentContainerStyle={AppStyles.flex1SpaceBetween}>
      <View>
        <View style={AppStyles.alignCenter}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>Get Quote</Text>
        </View>
        <View style={[AppStyles.mt20]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Please choose a sub category</Text>
        </View>
        <View style={[AppStyles.mt20]}>
              <View>
                <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Add Location</Text>
              </View>
              <View style={{flex: 1}}>
                {/* <DropDown items={data} containerStyle={{ borderRadius: 10, color:'#000'}} itemStyle={{color: '#000' }} onValueChange={handleDropDownSelection} selectedValue={selectedItem} /> */}
              </View>
        </View>
      </View>
      <View>
        <TouchableOpacity style={[AppStyles.btnPrimary, AppStyles.alignCenter, AppStyles.pv10, AppStyles.br10]}>
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18]}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PricingRequest;
