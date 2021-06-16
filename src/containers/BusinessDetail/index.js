import React, { useContext, useEffect, useState, useLayoutEffect, useRef } from 'react';
import { TouchableOpacity, View, Text, TextInput, ScrollView } from 'react-native';
import Styles from './styles';
import CustomText from '../../components/CustomText';
import NavigationRouteNames from '../../routes/ScreenNames';
import { AppStyles, Colors } from '../../theme';
import Checkbox from '@react-native-community/checkbox';
import UserContext from '../../appContainer/context/user.context';
import { RfH, RfW } from '../../utils/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { businessUpdate, getBusinessProfile } from './middleware';
import {listEpr, EprAggregator} from './../Admin/Middleware'
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import DropDown from '../../components/Picker/index';
import {isEmpty, isNumber} from 'lodash';

function BusinessDetail() {
  const navigation = useNavigation();
  const route = useRoute();

  const refBusinessName = useRef(null);
  const refAddress = useRef(null);
  const refCity = useRef(null);
  const refPinCode = useRef(null);
  const refGSTIN = useRef(null);
  const refPAN = useRef(null);

  const [clickLogin, setClickLogin] = useState(false);
  const { setLoader, userRole } = useContext(UserContext);
  const [EPRName, setEPRName] = useState([]);
  const [EPRAggregatorName, setEPRAggregatorName ] = useState([])
  const [{ data, loading, error: updateError }, onBusinessUpdate] = businessUpdate();
  const [{ data: profileData, loading: profileLoading, error: profileError }, onGetBusinessProfile] = getBusinessProfile();
  const [{ data:eprUser, loading:eprLoading, error:eprError }, onListEpr] = listEpr(0);
  const [{ data:eprAggregatorData, loading:eprAggregatorLoading, error:eprAggregatorError }, onEPRAggregator] = EprAggregator();

  const getBusinessData = async () => {
    try {
      const { data } = await onGetBusinessProfile({ data: {} });
      setLoader(false);
      console.log('data', data.data[0]);
      return
      businessForm.setFieldValue('businessname', data.data[0].business_name);
      businessForm.setFieldValue('address', data.data[0].address);
      businessForm.setFieldValue('city', data.data[0].city);
      businessForm.setFieldValue('pincode', data.data[0].pin_code);
      businessForm.setFieldValue('gstin', data.data[0].gst_number);
      businessForm.setFieldValue('pan', data.data[0].pan_number);
     
    } catch (e) {
      console.log('Response error', e);
    }
  };

  useEffect(() => {
    if (updateError || eprError)
      setLoader(false)
  }, [updateError])

  useEffect(() => {
    if (profileError)
      setLoader(false)
  }, [profileError || eprError])

  useEffect(() => {
    setLoader(true);
    getBusinessData();
    return () => {
      setLoader(false)
    }
  }, []);

  useEffect(() => {
    if (eprUser) {
      const itemData = eprUser.data[0].eprs.map((item) => ({ label: item.business_name, value: item.userid }));
      setEPRName(itemData);
    }
  }, [eprUser]);

  const confirmBusinessUpdate = async (businessname, address, city, pincode, gstin, pan) => {
    try {
      setLoader(true)
      const { data } = await onBusinessUpdate({
        data: {
          name: businessname,
          address: address,
          city: city,
          pin: pincode,
          gst: gstin,
          pan: pan,
          erp_partner:"123",
          erp_aggregator:"123"
        },
      });

      console.log(data);
      if (data.status) {
        alert(data.message);
        screenNavigate();
      } else {
        alert(data.message);
      }
      setLoader(false)

    } catch (e) {
      console.log('Response error', e);
    }
  };

  const validationSchema = Yup.object().shape({
    businessname: Yup.string().required('Please provide business name'),
    address: Yup.string().required('Please provide address'),
    city: Yup.string().required('Please provide city'),
    pincode: Yup.string().required('Please provide pincode'),
    gstin: Yup.string().required('Please provide gst details'),
    pan: Yup.string().required('Please provide pan number'),
    checkcondition: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
  });

  const businessForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      businessname: '',
      address: '',
      city: '',
      pincode: '',
      gstin: '',
      pan: '',
      checkcondition: false,
      eprUserID: '',
      eprAggregator: ''
    },
    validationSchema,
    onSubmit: () =>
      confirmBusinessUpdate(
        businessForm.values.businessname,
        businessForm.values.address,
        businessForm.values.city,
        businessForm.values.pincode,
        businessForm.values.gstin,
        businessForm.values.pan
      ),
  });

  const handleBusinessUpdate = async () => {
    setClickLogin(true);
    await businessForm.submitForm();
  };

  useLayoutEffect(() => {
    const title = 'Business Registration';
    navigation.setOptions({
      title,
    });

    onListEpr({ data: {} })
  }, []);

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.UPDATE_PROFILE);
  };

  useEffect(() => {
    setLoader(eprAggregatorLoading)
  }, [eprAggregatorData, eprAggregatorLoading]);

  // useEffect(() => {
  //   if (eprAggregatorData) {
  //     const itemData = eprAggregatorData.map((item) => ({ label: item.sub_category_name, value: item.id }));
  //     setSubCategoryData(itemData);
  //   }
  // }, [eprAggregatorData]);


  const getEPRAggregator = async (userID) => {
    if(isEmpty(userID)){
      return
    }
    try {
      const { data } = await onEPRAggregator({
        data: {
          "eprId": userID,
          "page": 0,
        },
      });
      console.log("aggregator data", data)
      if (data.status) {
        // setPerPage(data.data[0].links.per_page)
        // setTotalCount(data.data[0].links.total_count)
        const itemData = data.data[0].aggregators.map((item) => ({ label: item.business_name, value: item.userid }));
        setEPRAggregatorName(itemData);
       //setEPRAggregatorName(data.data[0].aggregators)
        console.log("response", data.data[0].aggregators)
      } else {
        alert(data.message)
      }
    } catch (e) {
      console.log("Response error", e);
    }
  };

  const onChangeEPRPartner = (id) => {
    businessForm.setFieldValue('eprUserID', id)
    return
    getEPRAggregator(id)
  }

  return (
    <KeyboardAwareScrollView
      contentInsetAdjustmentBehavior='always'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      automaticallyAdjustContentInsets={false}>
      <View style={[Styles.topView, AppStyles.flex1SpaceBetween]}>

        <View style={AppStyles.flex1}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, Styles.title]}>
            Please enter the details for your business registration
            </Text>

          <View style={[AppStyles.mt30, AppStyles.ml24, AppStyles.mr24]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Business Name</Text>
            <View>
              <TextInput
                ref={refBusinessName}
                placeholder={'Business Name'}
                style={AppStyles.inputTxtStyle}
                value={businessForm.values.businessname}
                onChangeText={(txt) => businessForm.setFieldValue('businessname', txt)}
                returnKeyType='next'
                onSubmitEditing={() => refAddress.current?.focus()}
              />
              {clickLogin && businessForm.errors.businessname ? (
                <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
                  {businessForm.errors.businessname}
                </CustomText>
              ) : null}
            </View>
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Address</Text>
            </View>
            <TextInput
              ref={refAddress}
              placeholder={'Address'}
              style={AppStyles.inputTxtStyle}
              value={businessForm.values.address}
              onChangeText={(txt) => businessForm.setFieldValue('address', txt)}
              returnKeyType='next'
              onSubmitEditing={() => refCity.current?.focus()}
            />
            {clickLogin && businessForm.errors.address ? (
              <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
                {businessForm.errors.address}
              </CustomText>
            ) : null}
          </View>

          <View style={[AppStyles.mt20, AppStyles.flexDir, AppStyles.mr24]}>
            <View style={AppStyles.flex1}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.ml24, AppStyles.f15, AppStyles.mb6]}>City</Text>
              <View style={(AppStyles.flex1, AppStyles.ml24)}>
                <TextInput
                  ref={refCity}
                  placeholder={'Hyderabad'}
                  style={AppStyles.inputTxtStyle}
                  value={businessForm.values.city}
                  onChangeText={(txt) => businessForm.setFieldValue('city', txt)}
                  returnKeyType='next'
                  onSubmitEditing={() => refPinCode.current?.focus()}
                />
                {clickLogin && businessForm.errors.city ? (
                  <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
                    {businessForm.errors.city}
                  </CustomText>
                ) : null}
              </View>
            </View>
            <View style={AppStyles.flex1}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.ml10, AppStyles.f15, AppStyles.mb6]}>Pincode</Text>
              <View style={[AppStyles.flex1, AppStyles.ml5]}>
                <TextInput
                  ref={refPinCode}
                  placeholder={'110004'}
                  style={Styles.inputTextcity}
                  keyboardType={'numeric'}
                  maxLength={6}
                  value={businessForm.values.pincode}
                  onChangeText={(txt) => businessForm.setFieldValue('pincode', txt)}
                  returnKeyType='next'
                  onSubmitEditing={() => refGSTIN.current?.focus()}
                />
                {clickLogin && businessForm.errors.pincode ? (
                  <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
                    {businessForm.errors.pincode}
                  </CustomText>
                ) : null}
              </View>
            </View>
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View style={AppStyles.flex1}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>GSTIN</Text>
            </View>
            <TextInput
              ref={refGSTIN}
              placeholder={'GST Details'}
              style={AppStyles.inputTxtStyle}
              value={businessForm.values.gstin}
              onChangeText={(txt) => businessForm.setFieldValue('gstin', txt)}
              returnKeyType='next'
              onSubmitEditing={() => refPAN.current?.focus()}
            />
            {clickLogin && businessForm.errors.gstin ? (
              <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
                {businessForm.errors.gstin}
              </CustomText>
            ) : null}
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View style={AppStyles.flex1}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>PAN</Text>
            </View>
            <TextInput
              ref={refPAN}
              placeholder={'Pan Number'}
              style={AppStyles.inputTxtStyle}
              value={businessForm.values.pan}
              onChangeText={(txt) => businessForm.setFieldValue('pan', txt)}
              returnKeyType='next'
              onSubmitEditing={() => handleBusinessUpdate()}
            />
            {clickLogin && businessForm.errors.pan ? (
              <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
                {businessForm.errors.pan}
              </CustomText>
            ) : null}
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.mb10]}>Select EPR Partner (Optional)</Text>
          <DropDown
            placeholderText="Select one"
            items={EPRName}
            itemStyle={{ color: '#000' }}
            onValueChange={(id) => onChangeEPRPartner(id)}
            selectedValue={businessForm.values.eprUserID}
            containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
          />
          </View>

          {!isEmpty(businessForm.values.eprUserID) && <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.mb10]}>Select EPR Partner's Aggregator</Text>
          <DropDown
            placeholderText="Select one"
            items={EPRAggregatorName}
            itemStyle={{ color: '#000' }}
            onValueChange={(id) => businessForm.setFieldValue('eprAggregator', id)}
            selectedValue={businessForm.values.eprAggregator}
            containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
          />
          </View>}

          <View>
            <View style={[AppStyles.flexDir, AppStyles.alignCenter, AppStyles.mt14, AppStyles.ml20]}>
              <Checkbox
                disabled={false}
                value={businessForm.values.checkcondition}
                tintColors={{ true: Colors.mango, false: '#777' }}
                onValueChange={(newValue) => businessForm.setFieldValue('checkcondition', newValue)}
              />
              <View style={{ marginLeft: RfW(10) }}>
                <CustomText color={Colors.warmGrey} fontSize={15} styling={{ paddingVertical: RfH(4) }}>
                  I agree to the terms and conditions
                  </CustomText>
              </View>
            </View>
            {clickLogin && businessForm.errors.checkcondition ? (
              <CustomText fontSize={15} color={Colors.red} styling={{ marginLeft: 27 }}>
                {businessForm.errors.checkcondition}
              </CustomText>
            ) : null}
          </View>

          

          <View style={[Styles.btnContainer, AppStyles.flexDir]}>
            <View style={AppStyles.flex1}>
              <TouchableOpacity activeOpacity={0.8} style={[Styles.cancelButton, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() => screenNavigate()}>
                <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig]}>
                  CANCEL
                  </Text>
              </TouchableOpacity>
            </View>
            <View style={AppStyles.flex1}>
              <TouchableOpacity activeOpacity={0.8} style={[Styles.saveButton, AppStyles.mb20, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() => handleBusinessUpdate()}>
                <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig]}>
                  SAVE
                  </Text>
              </TouchableOpacity>
            </View>
          </View>


        </View>
    </View>
    </KeyboardAwareScrollView>
  );
}
export default BusinessDetail;
