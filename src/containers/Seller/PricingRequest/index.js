import React, { useState, useLayoutEffect, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from "yup";
import { useFormik } from "formik";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { AppStyles, Colors } from '../../../theme';
import NavigationRouteNames from '../../../routes/ScreenNames';
import DropDown from '../../../components/Picker/index';
import { UploadDocument } from '../../../components/index';
import { getSubCategories, getUnits, createQuote } from './middleware';
import UserContext from '../../../appContainer/context/user.context';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../../components/CustomText';
import {alertBox, RfH, RfW, isValidVolume} from '../../../utils/helpers';
import {setQuoteData, setImageName} from '../../../utils/Global'


function PricingRequest() {
  const navigation = useNavigation();
  const { setLoader } = useContext(UserContext);
  const route = useRoute();
  const [category, setCategory] = useState('')
  const [imageUpload, setImageUpload] = useState(false);
  const [subCategories, setSubCategoryes] = useState([]);
  const [unitPickerData, setUnitData] = useState([]);
  const [{ data: subData }, onGetSubCategories] = getSubCategories();
  const [{ data: unitsData }, onGetUnits] = getUnits();
  const [{ data: quoteData, loading, error }, onSubmitQuote] = createQuote(category);

  const [categoryId, setCategoryId] = useState(0);
  const [titleName, setTitleName] = useState('');
  const [quotestatus, setquotestatus] = useState("");
  const [clickConfirm, setClickConfirm] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState('');
  const [unitName, setUnitName] = useState('');
  const [imgData, setImageData] = useState([])


  useEffect(() => {
    // console.log("update",subData);
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

 
  useEffect(() => {
    setLoader(loading);
    if (quoteData && quoteData.status) {
    }
  }, [quoteData, loading]);

  const handleGetQuote = () => {
    navigation.navigate(NavigationRouteNames.PRICE_CONFIRM, { title: titleName,
       status:quotestatus, Location: requestForm.values.location, Unit: unitName,
        Volume: requestForm.values.volume, subCategoryName : subCategoryName});
  };

  useLayoutEffect(() => {
    const { title, categoryId } = route.params;
    const { status } = route.params;
    setquotestatus(status);
    setCategory(title)
    onGetSubCategories({ data: { id: categoryId } });
    onGetUnits();
    setCategoryId(categoryId);
    navigation.setOptions({
      title,
    });
  }, []);

  const handleConfirm = async (subCategoryId, volume, unit, location) => {   

    if(imgData.length === 0)
    return

    const {data} = await onSubmitQuote({
      data: {
        primeId: 0,
        category_id: categoryId,
        sub_category_id: subCategoryId,
        qty: volume,
        unit,
        location,
        uploaded_files: imgData,
      },
    });
    console.log(data.data.quoteDetails)
    // Save Global
    setImageName(imgData);
    setQuoteData(data.data.quoteDetails)

    
    if(data.status){
      handleGetQuote()
    } else {
      alert(data.message)
    }  
  };

  const validationSchema = Yup.object().shape({
    volume: Yup.string().test(
      "volume",
      "Please provide valid volume",
      (value) => isValidVolume(value),
    ),
    category: Yup.string().required("Please select Item"),   
    unit: Yup.string().required("Please select unit"),
    location: Yup.string().required("Please provide location"),
  });

  const requestForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      category : '',
      volume: 0,
      unit : '',
      location : ''
    },
    validationSchema,
    onSubmit: () => handleConfirm(
      requestForm.values.category,
      requestForm.values.volume, 
      requestForm.values.unit,
      requestForm.values.location
    )
  });   

  const handelSubmitQuote = async () => {
    setClickConfirm(true)
    await requestForm.submitForm();
  }

  const onChangeCategory = (id) => {
     var index = subCategories.findIndex(v => v.value == id)    
      if(index != -1){
        setSubCategoryName(subCategories[index].label)
      }
     requestForm.setFieldValue('category', id)
  }

  const onChangeUnit = (id) => {
    var pos = unitPickerData.findIndex(v => v.value == id) 
    if(pos != -1){
      setUnitName(unitPickerData[pos].label)      
    }
   requestForm.setFieldValue('unit', id)
 }

 const ImageData = (data) => {
   if(data){
    let listData = imgData;          
    let data1 = listData.concat(data);
    setImageData([...data1]); 
   }
 }

  return (
    <KeyboardAwareScrollView
      removeClippedSubviews = {true}
      style={[AppStyles.ph20, AppStyles.pv15, { backgroundColor: '#fff' }]}
      contentContainerStyle={AppStyles.flex1SpaceBetween}
      >
      <View>
        <View style={AppStyles.alignCenter}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>Get Quote</Text>
        </View>
        <View style={[AppStyles.mt15]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Please choose a sub category</Text>
          <DropDown
            items={subCategories}
            //itemStyle={{ color: '#000' }}
            onValueChange = {onChangeCategory}                      
            selectedValue={requestForm.values.category}
            containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
          />
          {clickConfirm && requestForm.errors.category? (
              <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{marginTop: RfH(10)}}>
                {requestForm.errors.category}
              </CustomText>
                ) : null}
        </View>
        <View style={[AppStyles.mt15]}>
          <View>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Volume</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 2, paddingRight: 10 }}>
              <TextInput
                placeholder="Enter volume"
                value={requestForm.values.volume}
                keyboardType = {'numeric'}
                onChangeText={(txt) => requestForm.setFieldValue("volume", txt)}
                style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}              
              />
              {clickConfirm && requestForm.errors.volume ? (
                <CustomText
                  fontSize={15}
                  color={Colors.red}
                  styling={{marginTop: RfH(10)}}>
                  {requestForm.errors.volume}
                </CustomText>
                ) : null}
             
            </View>
            <View style={{ flex: 1 }}>
              <DropDown
                items={unitPickerData}
                placeholderText="Units"
                //itemStyle={{ color: '#000' }}
                onValueChange = {onChangeUnit}               
                selectedValue={requestForm.values.unit}
                containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
              />

               {clickConfirm && requestForm.errors.unit ? (
                <CustomText
                  fontSize={15}
                  color={Colors.red}
                  styling={{marginTop: RfH(10)}}>
                  {requestForm.errors.unit}
                </CustomText>
                ) : null}
            </View>
          </View>
        </View>
        <View style={[AppStyles.mt15]}>
          <View>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Add Location</Text>
          </View>
          <View>
            <TextInput
              value={requestForm.values.location}
              placeholder="Enter location"
              onChangeText={(txt) => requestForm.setFieldValue('location', txt)}
              style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
            />
             {clickConfirm && requestForm.errors.location ? (
              <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{marginTop: RfH(10)}}>
                {requestForm.errors.location}
              </CustomText>
                ) : null}
          </View>
        </View>
        <View style={[AppStyles.mt15]}>
          <View>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Add Picture</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setImageUpload(!imageUpload)}
              style={[AppStyles.pv10, { backgroundColor: Colors.grayTwo }, AppStyles.alignCenter, AppStyles.inputIcon,]}>
              {/* <FAIcon name="photo" size={25} /> */}
              <Text style={[AppStyles.txtSecandaryRegular, {color: imgData.length > 0 ?  Colors.green : Colors.warmGrey}]}>{imgData.length > 0 ? 'File Attached' : 'Attach File' }</Text>
              <MIcon name="attachment" size={25} color={Colors.grayThree} />            
            </TouchableOpacity>
            {clickConfirm && imgData.length === 0 ? (
              <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{marginTop: RfH(10)}}>
                Upload Picture
              </CustomText>
                ) : null}
            <UploadDocument handleClose={() => setImageUpload(false)} 
            isVisible={imageUpload}
            ImageData = {ImageData} />
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={[AppStyles.btnPrimary, AppStyles.alignCenter, AppStyles.pv10, AppStyles.br10]}
           //onPress={() => { handleGetQuote()}}
           onPress={() => {handelSubmitQuote()}}
            >
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18]}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PricingRequest;
