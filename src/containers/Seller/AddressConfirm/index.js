/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */
import React, { useLayoutEffect, useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, TextInput, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import style from '../../../theme/Styles/container';
import Styles from './styles';
import { getQuoteData, setImageName, getEPRName, getAggregator, getEPRAggregatorID } from '../../../utils/Global'

import NavigationRouteNames from '../../../routes/ScreenNames';
import { Colors, AppStyles } from '../../../theme';

import { addSchedule } from '../Middleware';
import UserContext from '../../../appContainer/context/user.context';
import { getSaveData, formatDisplayDate } from '../../../utils/helpers';
import { LOCAL_STORAGE_DATA_KEY } from '../../../utils/constants';
import PickupDate from '../modalTimeSlot'
import DropDown from '../../../components/Picker/index';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { size } from 'lodash';

const AddressConfirm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [clickLogin, setClickLogin] = useState(false);
  const { setLoader } = useContext(UserContext);

  const [addressData, setAddress] = useState('')
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [EPRAggregatorList, setEPRAggregatorList] = useState([])

  const [timeSlot, setTimeSlot] = useState('')
  const [btnConfirm, setBtnConfirm] = useState(false)

  const [{ data: scheduleData, loading, error }, onAddSchedule] = addSchedule(getQuoteData().category_name);

  const { Address, Landmark, PinCode, City } = addressData
  const { date, time } = timeSlot

  const [modalVisible, setModalVisible] = useState(false)


  useEffect(() => {
    if (error)
      setLoader(false)
  }, [error])


  useEffect(() => {
    async function getUserAddress() {
      const userAddress = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_ADDRESS);
      if (userAddress) {
        setAddress(JSON.parse(userAddress))
      }

      const userName = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_NAME);
      if (userName) {
        setUserName(userName)
      }

      const phoneNo = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_PHONE);
      if (phoneNo) {
        setUserPhone(phoneNo)
      }
    }
    getUserAddress();

    var tempList = [];
    if (size(getAggregator()).size > 0) {
      tempList = getAggregator().map((item) => ({ label: item.business_name, value: item.aggregatora_id }));
    }
    tempList.push({label: 'Do Not Send This Order To EPR Partner', value: 'noEPRnoAggregator'})
    setEPRAggregatorName(itemData);

    return () => {
      setLoader(false)
    }
  }, []);

  useEffect(() => {
    addressData !== '' && timeSlot !== '' ? setBtnConfirm(true) : setBtnConfirm(false)
  }, [addressData, timeSlot])

  useEffect(() => {
    setLoader(loading)
  }, [scheduleData, loading])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>Pickup Details</Text>,
    });
  }, [navigation]);


  const handelNewAddress = () => {
    navigation.navigate(NavigationRouteNames.PICKUP_DETAILS, { getReturnAddress: getReturnAddress });
  };

  const getReturnAddress = (item) => {
    console.log(item)
    setAddress(item)
  }

  const validationSchema = Yup.object().shape({
    eprAggregatorId: Yup.string().required('Please Select EPR Aggregators'),
  });

  const businessForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      eprAggregatorId: '',
    },
    validationSchema,
    onSubmit: () =>
      _addSchedule(),
  });

  const handleAddSchedule = async () => {
    setClickLogin(true);
    await businessForm.submitForm();
  };

  const _addSchedule = async () => {
    let param = {
      'address': Address,
      'landmark': Landmark,
      'city': City,
      'pinCode': PinCode,
      'contact': userName,
      'mobile': userPhone,
      'scheduleDate': date,
      'timeSlot': time,
      'orderIds': getQuoteData().orderId,
      'aggregator': businessForm.values.eprAggregatorId,
    }
    console.log(param)
    return;
    try {
      const { data } = await onAddSchedule({ data: param })
      console.log(data)
      if (data.status) {
        setImageName([])
        handleConfirm()
      } else {
        alert(data.message)
      }
    }
    catch (e) {
      console.log("Response error", e);
    }
  };

  const handleConfirm = () => {
    navigation.navigate(NavigationRouteNames.CONFIRMATION,
      { Value: getQuoteData(), businessSubType: getQuoteData().category_name, whereFrom: NavigationRouteNames.CONFIRM_ADDRESS });
  };

  const handelValue = (value) => {
    setTimeSlot(value)
    setModalVisible(false)
    console.log(value)
  }
  return (

    <View style={[AppStyles.flex1SpaceBetween, AppStyles.pb10, style.whitebackgrnd,]}>
      <ScrollView contentContainerStyle={AppStyles.flex1}>

        <View style={[AppStyles.mt20, AppStyles.w100]}>
          <View style={[AppStyles.w100, AppStyles.ph20, AppStyles.txtPrimaryBold]}>

            <View style={[style.btnSecandary, AppStyles.br10]}>
              <View style={[AppStyles.mt20, AppStyles.ml20, AppStyles.mb20]}>
                <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mb10]}>{getQuoteData().category_name}</Text>
                <View style={AppStyles.flexRowSpaceBetween}>
                  <View style={AppStyles.flexpointsix}>
                    <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15]}>Subcategory</Text>
                  </View>
                  <View style={AppStyles.flexpointfour}>
                    <Text style={[AppStyles.txtBlackRegular, AppStyles.f17]}>{getQuoteData().sub_category_name}</Text>
                  </View>
                </View>
                <View style={AppStyles.flexRowSpaceBetween}>
                  <View style={AppStyles.flexpointsix}>
                    <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10]}>Volume</Text>
                  </View>
                  <View style={AppStyles.flexpointfour}>
                    <Text style={[AppStyles.txtBlackRegular, AppStyles.f17, AppStyles.mt10]}>{getQuoteData().qty} {getQuoteData().unit_name}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[AppStyles.mt20]}>

              {addressData === '' ?

                <View style={[Styles.addressBox, style.btnSecandary, AppStyles.mt20,]}>
                  <View style={[AppStyles.mt20, AppStyles.ml20,]}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handelNewAddress}
                      style={[AppStyles.flexRowAlignCenter]}>
                      <FAIcon name={'plus'} size={20} color={Colors.mango} />
                      <Text style={[AppStyles.ml10, AppStyles.txtBlackBold, AppStyles.f17]}>Add New Address</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                :
                <View>
                  <View style={[style.btnSecandary, style.br10]}>
                    <View style={[AppStyles.mt20, AppStyles.ml20, AppStyles.mb20]}>
                      <View style={AppStyles.flexRowSpaceBetween}>
                        <View style={AppStyles.flexpointeight}>
                          <Text style={[AppStyles.txtBlackBold, AppStyles.mb10, AppStyles.f17]}>Delivery Address</Text>
                        </View>
                        <View style={AppStyles.flexpointtwo}>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handelNewAddress}
                            style={[AppStyles.mr20]}>
                            <Text style={[AppStyles.txtmangoTwoRegular, AppStyles.f12, AppStyles.ml20]}>Edit</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View>
                        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt5, AppStyles.mr5]}>{Address}</Text>
                        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt5]}>{Landmark}</Text>
                        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt5]}>{City} {PinCode}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              }
            </View>
            {timeSlot === '' ?
              <View style={[style.btnSecandary, AppStyles.mt20, AppStyles.br10]}>
                <View style={[AppStyles.mt20, AppStyles.ml20, AppStyles.mb20,]}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setModalVisible(true)}
                    style={[AppStyles.flexRowAlignCenter]}>
                    <FAIcon name={'plus'} size={20} color={Colors.mango} />
                    <Text style={[AppStyles.ml10, AppStyles.txtBlackBold, AppStyles.f17]}>Add Time Slot</Text>
                  </TouchableOpacity>
                </View>
              </View>
              :
              <View style={[AppStyles.mt20]}>
                <View style={[style.btnSecandary, { borderRadius: 10 }]}>
                  <View style={[AppStyles.mt20, AppStyles.mb20, AppStyles.ml20,]}>
                    <View style={AppStyles.flexRowSpaceBetween}>
                      <View style={AppStyles.flexpointeight}>
                        <Text style={[AppStyles.txtBlackBold, AppStyles.mb10, AppStyles.f17]}>Date & Time</Text>
                      </View>
                      <View style={AppStyles.flexpointtwo}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => setModalVisible(true)}
                          style={[AppStyles.mr20]}>
                          <Text style={[AppStyles.txtmangoTwoRegular, AppStyles.f11, AppStyles.ml20]}>Edit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View>
                      <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15]}>{formatDisplayDate(date)}</Text>
                      <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10]}>{time}</Text>
                    </View>
                  </View>
                </View>
              </View>
            }

            <View style={[AppStyles.flexDir, AppStyles.mt20, AppStyles.mb6, AppStyles.ml5]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f17]}>Preferred EPR Partner: </Text>
              <Text style={[AppStyles.txtPrimaryBold, AppStyles.f17]}>{getEPRName()}</Text>
            </View>

            <View style={[AppStyles.mt20]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.mb10, AppStyles.ml7, AppStyles.f15]}>EPR Aggregators</Text>
              <DropDown
                placeholderText="Select one"
                items={EPRAggregatorList}
                itemStyle={{ color: '#000' }}
                onValueChange={(id) => businessForm.setFieldValue('eprAggregatorId', id)}
                selectedValue={businessForm.values.eprAggregatorId}
                containerStyle={AppStyles.inputTxtStyle}
              />
              {clickLogin && !isEmpty(businessForm.error.eprPartnerId) ?
                <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>{businessForm.error.eprPartnerId}</CustomText> : null}

            </View>

          </View>
        </View>

        <View style={[AppStyles.flex1, { justifyContent: 'flex-end', alignItems: 'flex-end', }]}>
          <View style={[AppStyles.flexRowSpaceBetween, AppStyles.w100, AppStyles.ph20, AppStyles.alignCenter, AppStyles.mt20]}>
            <View style={[AppStyles.ph10, AppStyles.flexpointfour]}>
              <Text style={[AppStyles.f12, AppStyles.txtPrimaryBold]}>ESTIMATED PRICE</Text>
              <Text style={AppStyles.txtBlackBold, AppStyles.mt3, AppStyles.f15}>
                <FAIcon size={14} name='rupee' /> {getQuoteData().price}</Text>
            </View>
            <View style={[AppStyles.flexpointsix]}>
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={btnConfirm ? false : true}
                onPress={() => handleAddSchedule()}
                style={[AppStyles.br10, btnConfirm ? AppStyles.btnPrimary : AppStyles.btnSecandary, AppStyles.btnHeight44, AppStyles.inCenter, AppStyles.ph40]}>
                <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18, { color: btnConfirm ? Colors.white : Colors.black }]}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <PickupDate
          handleClose={() => setModalVisible(false)}
          isVisible={modalVisible}
          Data={handelValue}
        />
      </ScrollView>
    </View>

  );
};

export default AddressConfirm;
