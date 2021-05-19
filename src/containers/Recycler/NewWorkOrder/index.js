import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import Styles from "./styles";
import Appstyles from "../../../theme/Styles/texts";
import AppStyle from "../../../theme/Styles/spaces";
import CustomText from '../../../components/CustomText';
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles, Colors } from '../../../theme';
import DropDown from '../../../components/Picker/index';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import { UploadDocument } from '../../../components/index';
import UserContext from '../../../appContainer/context/user.context';
import {alertBox, RfH, RfW, isValidVolume} from '../../../utils/helpers';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Yup from "yup";
import { useFormik } from "formik";

import { getAggregators, getRecyclers} from "../../../services/middleware/user";
import { getCategories, getSubCategories, getUnits} from '../../Seller/PricingRequest/middleware'
function RecyclerNewWorkOrder() {

   const navigation = useNavigation();
   const route = useRoute();

   const [unit, setUnit] = useState('');
   const [aggregate, setAggregate] = useState("");
   const [imageUpload, setImageUpload] = useState(false);

   const { setLoader } = useContext(UserContext);

  const [aggregators, setAggregator] = useState([])
  const [recyclers, setRecyclers] = useState([])
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [unitPickerData, setUnitData] = useState([]);

  const [arrayData, setArrayData] = useState([])
  const [clickConfirm, setClickConfirm] = useState(false);
  const [show, setShow] = useState(false);
  const [date, setDate] =  useState(moment(new Date()).format('YYYY-MM-DD'));
  const [imgData, setImageData] = useState([])


  // ---------------------- Start Api Section ---------------------
  const [{ data: aggregatorsData }, onGetAggregators] = getAggregators();
  const [{ data: recyclersData }, onGetRecyclers] = getRecyclers();
  const [{ data: categoryData }, onGetCategories] = getCategories();
  const [{ data: subCategoryData }, onGetSubCategories] = getSubCategories();
  const [{ data: unitsData }, onGetUnits] = getUnits();
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.WORKORDER_SUMMARY);
  }

  useEffect(() => {
    if (aggregatorsData) {
      const pickerData = aggregatorsData.map((item) => ({ label: item.name, value: item.id }));
      setAggregator(pickerData);
    }
  }, [aggregatorsData]);

  useEffect(() => {
    if (recyclersData) {
      const pickerData = recyclersData.map((item) => ({ label: item.name, value: item.id }));
      setRecyclers(pickerData);
    }
  }, [recyclersData]);

  useEffect(() => {   
    console.log(subCategoryData)
    if (subCategoryData) {
      const pickerData = subCategoryData.map((item) => ({ label: item.sub_category_name, value: item.id }));
      setSubCategories(pickerData);
    }
  }, [subCategoryData]);

  useEffect(() => {
    if (unitsData) {
      const pickderData = unitsData.map((item) => ({ label: item.unit_name, value: item.id }));
      setUnitData(pickderData);
    }
  }, [unitsData]);


  useEffect(() => {
    if (categoryData) {
      const pickderData = categoryData.map((item) => ({ label: item.category_name, value: item.id }));
      setCategories(pickderData);
    }
  }, [categoryData]);

  useLayoutEffect(() => {
    const {status} = route.params;
    setAggregate(status);
    const title='New Work Order';
    navigation.setOptions({title});
    if(status === '1'){
      onGetAggregators();
    } else {
      onGetRecyclers();
    }
    onGetCategories();
    onGetUnits();

  }, []);

  const validationSchema = Yup.object().shape({
    volume: Yup.string().test(
      "volume",
      "Please provide valid volume",
      (value) => isValidVolume(value),
    ),
    recycler : Yup.string().required("Please select Item"),   
    category: Yup.string().required("Please select category"),   
    subCategory: Yup.string().required("Please select sub-category"),  
    unit: Yup.string().required("Please select unit"),
    vehicleNo: Yup.string().required("Please provide vehicle No"),
    price: Yup.string().test(
      "price",
      "Please provide valid price",
      (value) => isValidVolume(value),
    ),
  });

  const requestForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      recycler: '',
      category : '',
      subCategory : '',
      volume: 0,
      unit : '',
      vehicleNo : '',
      price: ''
    },
    validationSchema,
    onSubmit: () => handleConfirm(
    )
  });   

  const onChangeCategory = (id) => {
    // var index = categories.findIndex(v => v.value == id)    
    //  if(index != -1){
    //    setC(subCategories[index].label)
    //  }
   
    onGetSubCategories({ data: { id: id } });
    requestForm.setFieldValue('category', id)

 }

 const onChangeUnit = (id) => {
   var pos = unitPickerData.findIndex(v => v.value == id) 
   if(pos != -1){
     setUnitName(unitPickerData[pos].label)      
   }
  requestForm.setFieldValue('unit', id)
}

const onChange = (event, selectedDate) => {  
  setShow(false);     
  if(selectedDate){  
    setDate(moment(selectedDate).format('YYYY-MM-DD'));
    //setShow(Platform.OS === 'ios');   
  } else {
  }  
};

const ImageData = (data) => {
  if(data){
   let listData = imgData;          
   let data1 = listData.concat(data);
   setImageData([...data1]); 
  }
}
  
const handelSave = async () => {
  setClickConfirm(true)
  await requestForm.submitForm();
}

  return (
    <View style={Styles.topView}>
       <ScrollView>
       <View style={[AppStyle.ml20, AppStyle.mr20]}>
         <Text style={[Appstyles.txtBlackBold, Appstyles.f17, AppStyle.mt30, Appstyles.textalig]}>Create New Order Here</Text>
         {aggregate == "1" ? 
      <View style={[AppStyles.mt20]}>
      <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Aggregator</Text>
      <DropDown
        items={aggregators}
        placeholderText="Select Aggregator"
        itemStyle={{ color: '#000' }}
        onValueChange={(val) => requestForm.setFieldValue('recycler', val)}
        selectedValue={requestForm.values.recycler}
        containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
      />
    </View>
         :
         <View style={[AppStyles.mt20]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Recycler</Text>
          <DropDown
            items={recyclers}
            placeholderText="Select recycler"
            itemStyle={{ color: '#000' }}
            onValueChange={(val) => requestForm.setFieldValue('recycler', val)}
            selectedValue={requestForm.values.recycler}
            containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
          />
        </View> }

        <View style={[AppStyles.mt20]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Category</Text>
          <DropDown
            items={categories}
            placeholderText="Pick Category"
            itemStyle={{ color: '#000' }}
            onValueChange={onChangeCategory}
            selectedValue={requestForm.values.category}
            containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
          />
        </View>

        <View style={[AppStyles.mt20]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Company</Text>
          <DropDown
            items={subCategories}
            placeholderText="Pick Sub Category"
            itemStyle={{ color: '#000' }}
            onValueChange={(val) => requestForm.setFieldValue('subCategory', val)}
            selectedValue={requestForm.values.subCategory}
            containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
          />
        </View>

        <View style={[AppStyles.mt20]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Vehicle Number</Text>
          <TextInput
                placeholder="Enter Vehicle Number"
                value={requestForm.values.vehicleNo}
                onChangeText={(txt) => requestForm.setFieldValue('vehicleNo', txt)}
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
            <View style={[AppStyles.flexpointfive, AppStyles.pr10]}>
            <TouchableOpacity
            onPress = {() => setShow(!show)}
            style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary,AppStyles.br10, AppStyles.pv10, AppStyles.ph10]}>
              <FAIcon size={22} name='calendar-o' color = {Colors.mangoTwo} />
              <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{moment(date).format('DD-MMM-YYYY')}</Text>
           </TouchableOpacity>
            {show && ( <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              minimumDate = {new Date(moment(new Date()).format('YYYY-MM-DD'))}
              mode={'date'}
              is24Hour={false}
              display="default"
              onChange={onChange}
            />)}
            </View>
            <View style={AppStyles.flexpointfive}>
            <TouchableOpacity style={[Styles.inputIcon, AppStyles.br10]} onPress={() => setImageUpload(!imageUpload)}>
            <Text style={[AppStyles.txtSecandaryRegular, {color: imgData.length > 0 ?  Colors.green : Colors.warmGrey}]}>{imgData.length > 0 ? 'File Attached' : 'Upload file' }</Text>
            
            <MIcon name="attachment" size={25} color={Colors.grayThree} />
          </TouchableOpacity>
          <UploadDocument handleClose={() => setImageUpload(false)} 
            isVisible={imageUpload}
            ImageData = {ImageData}  />
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
                value={requestForm.values.volume}
                keyboardType = {'number-pad'}
                onChangeText={(txt) => requestForm.setFieldValue('volume', txt)}
                style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
              />
            </View>
            <View style={AppStyles.flexpointfour}>
              <DropDown
                items={unitPickerData}
                placeholderText="Select Unit"
                itemStyle={{ color: '#000' }}
                onValueChange={(val) => requestForm.setFieldValue('unit', val)}
                selectedValue={requestForm.values.unit}
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
                value={requestForm.values.price}
                keyboardType = {'number-pad'}
                onChangeText={(txt) => requestForm.setFieldValue('price', txt)}
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
           style={Styles.confirmbtn} onPress={() => handelSave()}>
           <Text style={[Appstyles.txtWhiteRegular, Appstyles.f17, Appstyles.textalig, AppStyle.mt10]}>SAVE</Text>
         </TouchableOpacity>
       </View>
  </ScrollView>        
      
    </View>
  );
}
export default RecyclerNewWorkOrder;
