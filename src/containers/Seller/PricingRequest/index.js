import React, { useState, useLayoutEffect, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { AppStyles, Colors } from '../../../theme';
import NavigationRouteNames from '../../../routes/ScreenNames';
import DropDown from '../../../components/Picker/index';
import { UploadDocument } from '../../../components/index';
import { getSubCategories, getUnits, createQuote } from './middleware';
import UserContext from '../../../appContainer/context/user.context';

const PricingRequest = () => {
  const navigation = useNavigation();
  const { setLoader } = useContext(UserContext);
  const route = useRoute();
  const [imageUpload, setImageUpload] = useState(false);
  const [subCategories, setSubCategoryes] = useState([]);
  const [unitPickerData, setUnitData] = useState([]);
  const [{ data: subData }, onGetSubCategories] = getSubCategories();
  const [{ data: unitsData }, onGetUnits] = getUnits();
  const [{ data: quoteData, loading, error }, onSubmitQuote] = createQuote();

  const [categoryId, setCategoryId] = useState(0);
  const [subCategoryId, setSubCategoryId] = useState('');
  const [volume, setVolume] = useState('');
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('');
  const [titleName, setTitleName] = useState("");
  const [quotestatus, setquotestatus] = useState("");

  useEffect(() => {
    if (subData) {
      const pickerData = subData.map((item) => ({ label: item.sub_category_name, value: item.id }));
      setSubCategoryes(pickerData);
    }
  }, [subData]);

  useEffect(() => {
    if (unitsData) {
      const pickderData = unitsData.map((item) => ({ label: item.unit_name, value: item.id }));
      setUnitData(pickderData);
    }
  }, [unitsData]);

  // useEffect(() => {
  //   setLoader(quoteProgress);
  // }, [quoteProgress]);
  // const handleGetQuote = () => {
  //   navigation.navigate(NavigationRouteNames.PRICE_CONFIRM);
  // };

  useEffect(() => {
    setLoader(loading);
    if(quoteData && quoteData.status){
      alert('Quote');
    }
  }, [quoteData, loading]);

  const handleGetQuote = () => {
    navigation.navigate(NavigationRouteNames.PRICE_CONFIRM,{title:titleName,status:quotestatus});
  };

  useLayoutEffect(() => {
    const { title, categoryId } = route.params;
    const { status } = route.params;
    setquotestatus(status);
    onGetSubCategories({ data: { id: categoryId } });
    onGetUnits();
    setCategoryId(categoryId);
    navigation.setOptions({
      title,
    });
  }, []);

  const handleConfirm = () => {
    onSubmitQuote({
      data: {
        primeId: 0,
        category_id: categoryId,
        sub_category_id: subCategoryId,
        qty: volume,
        unit,
        location,
        uploaded_files: '',
      },
    });
  };

  return (
    <KeyboardAwareScrollView
      style={[AppStyles.ph20, AppStyles.pv15, { backgroundColor: '#fff' }]}
      contentContainerStyle={AppStyles.flex1SpaceBetween}>
      <View>
        <View style={AppStyles.alignCenter}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>Get Quote</Text>
        </View>
        <View style={[AppStyles.mt20]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Please choose a sub category</Text>
          <DropDown
            items={subCategories}
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
        <View style={[AppStyles.mt20]}>
          <View>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Add Location</Text>
          </View>
          <View>
            <TextInput
              value={location}
              placeholder="Enter location"
              onChangeText={(txt) => setLocation(txt)}
              style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
            />
          </View>
        </View>
        <View style={[AppStyles.mt20]}>
          <View>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Add Picture</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setImageUpload(!imageUpload)}
              style={[AppStyles.pv10, { backgroundColor: Colors.grayTwo }, AppStyles.alignCenter]}>
              <FAIcon name="photo" size={25} />
            </TouchableOpacity>
            <UploadDocument handleClose={() => setImageUpload(false)} isVisible={imageUpload} />
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={[AppStyles.btnPrimary, AppStyles.alignCenter, AppStyles.pv10, AppStyles.br10]}
          onPress={handleConfirm, handleGetQuote}>
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18]}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PricingRequest;
