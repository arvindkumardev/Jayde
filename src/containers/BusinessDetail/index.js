import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { Alert } from 'react-native';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, TextInput, ScrollView } from 'react-native';
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
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';

function BusinessDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const [unitPickerData, setUnitData] = useState([]);
  const [unit, setUnit] = useState('');
  const [item, setItem] = useState({});
  const [clickLogin, setClickLogin] = useState(false);
  const [businessData, setBusinessData] = useState();
  const { setLoader } = useContext(UserContext);
  const [{ data, loading, error }, onBusinessUpdate] = businessUpdate();
  const [{ getdata, getloading, geterror }, onGetBusinessProfile] = getBusinessProfile();

  const getBusinessData = async () => {
    try {
      const { data } = await onGetBusinessProfile({ data: {} });
      setLoader(false);
      businessForm.setFieldValue('businessname', data.data[0].business_name);
      businessForm.setFieldValue('address', data.data[0].address);
      businessForm.setFieldValue('city', data.data[0].city);
      businessForm.setFieldValue('pincode', data.data[0].pin_code);
      businessForm.setFieldValue('gstin', data.data[0].gst_number);
      businessForm.setFieldValue('pan', data.data[0].pan_number);
      console.log('data', data.data[0]);
    } catch (e) {
      console.log('Response error', e);
    }
  };

  useEffect(() => {
    setLoader(true);
    getBusinessData();
  }, []);

  const confirmBusinessUpdate = async (businessname, address, city, pincode, gstin, pan) => {
    const { data } = await onBusinessUpdate({
      data: {
        name: businessname,
        address: address,
        city: city,
        pin: pincode,
        gst: gstin,
        pan: pan,
      },
    });

    console.log(data);
    if (data.status) {
      alert(data.message);
      screenNavigate();
    } else {
      alert(data.message);
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
  }, []);

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.UPDATE_PROFILE);
  };

  return (
    <KeyboardAwareScrollView>
      <View style={Styles.topView}>
        <ScrollView>
          <View>
            <Text style={[AppStyles.txtBlackBold, AppStyles.f17, Styles.title]}>
              Please enter the details for your business registration
            </Text>

            <View style={[AppStyles.mt30, AppStyles.ml24, AppStyles.mr24]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Name</Text>
              <View>
                <TextInput placeholder="Name" style={AppStyles.inputTxtStyle} />
              </View>
            </View>

            <View style={[AppStyles.mt30, AppStyles.ml24, AppStyles.mr24]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Business Name</Text>
              <View>
                <TextInput
                  placeholder={'Business Name'}
                  style={Styles.inputText}
                  value={businessForm.values.businessname}
                  // value={item.business_name}
                  onChangeText={(txt) => businessForm.setFieldValue('businessname', txt)}
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
                placeholder={'Address'}
                style={Styles.inputText}
                value={businessForm.values.address}
                onChangeText={(txt) => businessForm.setFieldValue('address', txt)}
              />
              {clickLogin && businessForm.errors.address ? (
                <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
                  {businessForm.errors.address}
                </CustomText>
              ) : null}
            </View>

            <View style={[AppStyles.mt20, AppStyles.flexDir]}>
              <View style={AppStyles.flex1}>
                <Text style={[AppStyles.txtBlackRegular, AppStyles.ml24, AppStyles.f15, AppStyles.mb6]}>City</Text>
                <View style={(AppStyles.flex1, AppStyles.ml24)}>
                  <TextInput
                    placeholder={'Hyderabad'}
                    style={Styles.inputTextcity}
                    value={businessForm.values.city}
                    onChangeText={(txt) => businessForm.setFieldValue('city', txt)}
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
                    placeholder={'110004'}
                    style={Styles.inputTextcity}
                    keyboardType={'numeric'}
                    value={businessForm.values.pincode}
                    onChangeText={(txt) => businessForm.setFieldValue('pincode', txt)}
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
                placeholder={'GST Details'}
                style={Styles.inputText}
                value={businessForm.values.gstin}
                onChangeText={(txt) => businessForm.setFieldValue('gstin', txt)}
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
                placeholder={'Pan Number'}
                style={Styles.inputText}
                value={businessForm.values.pan}
                onChangeText={(txt) => businessForm.setFieldValue('pan', txt)}
              />
              {clickLogin && businessForm.errors.pan ? (
                <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
                  {businessForm.errors.pan}
                </CustomText>
              ) : null}
            </View>

            <View>
              <View style={[AppStyles.flexDir, AppStyles.alignCenter, AppStyles.mt14, AppStyles.ml20]}>
                <Checkbox
                  disabled={false}
                  value={businessForm.values.checkcondition}
                  tintColors={{ true: Colors.mango, false: '#777' }}
                  // onValueChange={(newValue) => console.log(newValue)}
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
                <TouchableOpacity style={[Styles.aggregatebtn]} onPress={() => screenNavigate()}>
                  <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>
                    CANCEL
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={AppStyles.flex1}>
                <TouchableOpacity style={[Styles.confirmbtn, AppStyles.mb20]} onPress={() => handleBusinessUpdate()}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>
                    SAVE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAwareScrollView>
  );
}
export default BusinessDetail;
