import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import * as Alert from 'react-native';
import { TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView } from 'react-native';
import Styles from "./styles";
import Appstyles from "../../../theme/Styles/texts";
import AppStyle from "../../../theme/Styles/spaces";
import CustomText from '../../../components/CustomText';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles, Colors } from '../../../theme';
import DropDown from '../../../components/Picker/index';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from '@react-native-community/datetimepicker';

import { UploadDocument } from '../../../components/index';
import UserContext from '../../../appContainer/context/user.context';
import { alertBox, RfH, RfW, isValidVolume, getSaveData } from '../../../utils/helpers';
import moment from 'moment';
import * as Yup from "yup";
import { useFormik } from "formik";
import { LOCAL_STORAGE_DATA_KEY } from '../../../utils/constants';

import { getAggregators, getRecyclers } from "../../../services/middleware/user";
import { getUnits } from '../../Seller/PricingRequest/middleware'
import { createWorkOrder } from '../Middelware'

function NewWorkOrder() {

  const navigation = useNavigation();
  const route = useRoute();

  const [userName, setUserName] = useState('')
  const [item, setItem] = useState('');
  const [viewType, setViewType] = useState(1);
  const [imageUpload, setImageUpload] = useState(false);

  const { setLoader } = useContext(UserContext);

  const [aggregators, setAggregator] = useState([])
  const [recyclers, setRecyclers] = useState([])
  const [unitPickerData, setUnitData] = useState([]);

  const [clickConfirm, setClickConfirm] = useState(false);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [imgData, setImageData] = useState([])

  // ---------------------- Start Api Section ---------------------
  const [{ data: aggregatorsData }, onGetAggregators] = getAggregators();
  const [{ data: recyclersData }, onGetRecyclers] = getRecyclers();
  const [{ data: unitsData }, onGetUnits] = getUnits();
  const [{ data: workOrderData, loading, error }, onCreateWorkOrder] = createWorkOrder(viewType)

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.WORKORDER_SUMMARY);
  }

   useEffect(() => {
    async function getUserName() {     
      const userName = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_NAME);
      if (userName) {
        setUserName(userName)
      }
    }
    getUserName();
  }, []);

  useEffect(() => {
    if (aggregatorsData) {
       let itemData = aggregatorsData.filter(item => item.name != userName);
      const pickerData = itemData.map((item) => ({ label: item.name, value: item.id }));
      setAggregator(pickerData);
    }
  }, [aggregatorsData]);

  useEffect(() => {
    if (recyclersData) {
      let itemData = recyclersData.filter(item => item.name != userName);
      const pickerData = itemData.map((item) => ({ label: item.name, value: item.id }));
      setRecyclers(pickerData);
    }
  }, [recyclersData]);

  useEffect(() => {
    if (unitsData) {
      const pickderData = unitsData.map((item) => ({ label: item.unit_name, value: item.id }));
      setUnitData(pickderData);
    }
  }, [unitsData]);

  useEffect(() => {
    setLoader(loading);
  }, [workOrderData, loading]);

  useLayoutEffect(() => {
    const { status } = route.params;
    const { item } = route.params;
    setItem(item)
    setViewType(status);
    const title = 'New Work Order';
    navigation.setOptions({ title });

    status == 1 ? onGetAggregators() : onGetRecyclers()
    onGetUnits();
  }, []);

  const validationSchema = Yup.object().shape({
    volume: Yup.string().test(
      "volume",
      "Please provide valid volume",
      (value) => isValidVolume(value),
    ),
    assignTo: Yup.string().required("Please select Item"),
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
      assignTo: '',
      volume: 0,
      unit: '',
      vehicleNo: '',
      price: '',
      priceUnit: ''
    },
    validationSchema,
    onSubmit: () => handleConfirm()
  });

  const handleConfirm = async () => {
    let param = {
      "aggregator": viewType == 1 ? requestForm.values.assignTo : '',
      "recycler": viewType == 0 ? requestForm.values.assignTo : '',
      "category": item.inventory_category_id,
      "subcategory": item.inventory_sub_category_id,
      "qty": requestForm.values.volume,
      "unit": requestForm.values.unit,
      "ewasteSubcategory": "",
      "ewastesubcategory_name": "",
      "price": requestForm.values.price,
      "priceUnit": requestForm.values.priceUnit,
      "inventoryId": item.inventory_id,
      "vehicleImage": imgData,
      "vehicleNumber": requestForm.values.vehicleNo,
      "date": date
    }
    console.log(param)

    if (imgData.length == 0)
      return

    const { data } = await onCreateWorkOrder({
      data: param
    });

    console.log(data)
    if (data.status) {
     // alert(data.message)
     navigation.popToTop()     
    } else {      
      alert(data.message)
      //navigation.navigate(NavigationRouteNames.WAREHOUSEORDER_CONFIRMATION)
    }
  }
  
  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(moment(selectedDate).format('YYYY-MM-DD'));
      //setShow(Platform.OS === 'ios');   
    } else {
    }
  };

  const ImageData = (data) => {
    if (data) {
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
    <KeyboardAwareScrollView>
      <View style={Styles.topView}>

        <View style={[AppStyle.ml20, AppStyle.mr20]}>
          <Text style={[Appstyles.txtBlackBold, Appstyles.f17, AppStyle.mt30, Appstyles.textalig]}>Create New Order Here</Text>
          {viewType == 1 ?
            <View style={[AppStyles.mt20]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Aggregator</Text>
              <DropDown
                items={aggregators}
                placeholderText="Select Aggregator"
                itemStyle={{ color: '#000' }}
                onValueChange={(val) => requestForm.setFieldValue('assignTo', val)}
                selectedValue={requestForm.values.assignTo}
                containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayBackground, paddingLeft: 10 }}
              />
              {clickConfirm && requestForm.errors.assignTo && <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{ marginTop: RfH(10) }}>
                {requestForm.errors.assignTo}
              </CustomText>}
            </View>
            :
            <View style={[AppStyles.mt20]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Recycler</Text>
              <DropDown
                items={recyclers}
                placeholderText="Select Recycler"
                itemStyle={{ color: '#000' }}
                onValueChange={(val) => requestForm.setFieldValue('assignTo', val)}
                selectedValue={requestForm.values.assignTo}
                containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayBackground, paddingLeft: 10 }}
              />

              {clickConfirm && requestForm.errors.assignTo && <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{ marginTop: RfH(10) }}>
                {requestForm.errors.assignTo}
              </CustomText>}
            </View>}

          <View style={[AppStyles.mt20]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Category</Text>
            <View style={[Styles.inputIcon, AppStyles.br10]}>
              <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pv4]]}>{item.category_name}</Text>
            </View>
          </View>

          <View style={[AppStyles.mt20]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Sub Category</Text>
            <View style={[Styles.inputIcon, AppStyles.br10]}>
              <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pv4]]}>{item.sub_category_name}</Text>
            </View>
          </View>

          <View style={[AppStyles.mt20]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Vehicle Number</Text>
            <TextInput
              placeholder="Enter Vehicle Number"
              value={requestForm.values.vehicleNo}
              onChangeText={(txt) => requestForm.setFieldValue('vehicleNo', txt)}
              style={{ backgroundColor: Colors.grayBackground, borderRadius: 10, paddingLeft: 10 }}
            />
            {clickConfirm && requestForm.errors.vehicleNo && <CustomText
              fontSize={15}
              color={Colors.red}
              styling={{ marginTop: RfH(10) }}>
              {requestForm.errors.vehicleNo}
            </CustomText>}
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
                  onPress={() => setShow(!show)}
                  style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary, AppStyles.br10, AppStyles.pv10, AppStyles.ph10]}>
                  <FAIcon size={22} name='calendar-o' color={Colors.mangoTwo} />
                  <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{moment(date).format('DD-MMM-YYYY')}</Text>
                </TouchableOpacity>
                {show && (<DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  minimumDate={new Date(moment(new Date()).format('YYYY-MM-DD'))}
                  mode={'date'}
                  is24Hour={false}
                  display="default"
                  onChange={onChange}
                />)}
              </View>
              <View style={AppStyles.flexpointfive}>
                <TouchableOpacity style={[Styles.inputIcon, AppStyles.br10]} onPress={() => setImageUpload(!imageUpload)}>
                  <Text style={[AppStyles.txtSecandaryRegular, { color: imgData.length > 0 ? Colors.green : Colors.warmGrey }]}>{imgData.length > 0 ? 'File Attached' : 'Upload file'}</Text>

                  <MIcon name="attachment" size={25} color={Colors.grayThree} />
                </TouchableOpacity>
                {clickConfirm && imgData.length == 0 && <CustomText
                  fontSize={15}
                  color={Colors.red}
                  styling={{ marginTop: RfH(10) }}>
                  {'Upload Image'}
                </CustomText>}

                <UploadDocument handleClose={() => setImageUpload(false)}
                  isVisible={imageUpload}
                  ImageData={ImageData} />
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
                  keyboardType={'number-pad'}
                  onChangeText={(txt) => requestForm.setFieldValue('volume', txt)}
                  style={{ backgroundColor: Colors.grayBackground, borderRadius: 10, paddingLeft: 10 }}
                />
                {clickConfirm && requestForm.errors.volume && <CustomText
                  fontSize={15}
                  color={Colors.red}
                  styling={{ marginTop: RfH(10) }}>
                  {requestForm.errors.volume}
                </CustomText>}
              </View>
              <View style={AppStyles.flexpointfour}>
                <DropDown
                  items={unitPickerData}
                  placeholderText="Select Unit"
                  itemStyle={{ color: '#000' }}
                  onValueChange={(val) => requestForm.setFieldValue('unit', val)}
                  selectedValue={requestForm.values.unit}
                  containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayBackground, paddingLeft: 10 }}
                />
                {clickConfirm && requestForm.errors.unit && <CustomText
                  fontSize={15}
                  color={Colors.red}
                  styling={{ marginTop: RfH(10) }}>
                  {requestForm.errors.unit}
                </CustomText>}
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
                  keyboardType={'number-pad'}
                  onChangeText={(txt) => requestForm.setFieldValue('price', txt)}
                  style={{ backgroundColor: Colors.grayBackground, borderRadius: 10, paddingLeft: 10 }}
                />
                {clickConfirm && requestForm.errors.price && <CustomText
                  fontSize={15}
                  color={Colors.red}
                  styling={{ marginTop: RfH(10) }}>
                  {requestForm.errors.price}
                </CustomText>}
              </View>
              <View style={AppStyles.flexpointfour}>
                <DropDown
                  items={unitPickerData}
                  placeholderText="Select Unit"
                  itemStyle={{ color: '#000' }}
                  onValueChange={(val) => requestForm.setFieldValue('priceUnit', val)}
                  selectedValue={requestForm.values.priceUnit}
                  containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayBackground, paddingLeft: 10 }}
                />
                {clickConfirm && requestForm.errors.priceUnit && <CustomText
                  fontSize={15}
                  color={Colors.red}
                  styling={{ marginTop: RfH(10) }}>
                  {requestForm.errors.priceUnit}
                </CustomText>}
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

      </View>
    </KeyboardAwareScrollView>
  );
}
export default NewWorkOrder;
