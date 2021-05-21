/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */


import React, { useLayoutEffect, useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Checkbox from '@react-native-community/checkbox';
import style from '../../../theme/Styles/container';
import Styles from './styles';
import { getQuoteData } from '../../../utils/Global'

import NavigationRouteNames from '../../../routes/ScreenNames';
import { Colors, AppStyles } from '../../../theme';

import { addSchedule } from './../PricingRequest/middleware';
import UserContext from '../../../appContainer/context/user.context';
import { getSaveData } from '../../../utils/helpers';
import { LOCAL_STORAGE_DATA_KEY } from '../../../utils/constants';

const AddressConfirm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { setLoader } = useContext(UserContext);

  const [addressData, setAddress] = useState('')
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')


  const [timeSlot, setTimeSlot] = useState('')
  const [btnConfirm, setBtnConfirm] = useState(false)

  const [{ data: scheduleData, loading, error }, onAddSchedule] = addSchedule(getQuoteData().category_name);

  const { Address, Landmark, PinCode, City } = addressData
  const { date, time } = timeSlot

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

  const handelTimeSlot = () => {
    navigation.navigate(NavigationRouteNames.PICKUP_DATE, { getTimeSlot: getTimeSlot });
  };

  const getTimeSlot = (item) => {
    console.log(item)
    setTimeSlot(item)
  }
  const handelNewAddress = () => {
    navigation.navigate(NavigationRouteNames.PICKUP_DETAILS, { getReturnAddress: getReturnAddress });
  };

  const getReturnAddress = (item) => {
    console.log(item)
    setAddress(item)
  }

  const _addSchedule = async () => {
    let param = {
      'address': Address,
      'landmark': Landmark,
      'city': City,
      'pinCode': PinCode,
      'contact': userName,
      'mobile': '',
      'scheduleDate': date,
      'scheduleTime': '',
      'timeSlot': time,
      'orderIds': getQuoteData().orderId,
      'aggregator': ''
    }
    console.log(param)
    const { data } = await onAddSchedule({ data: param })
    console.log(data)
    if (data.status) {
      handleConfirm()
    } else {
      alert(data.message)
    }
  };

  const handleConfirm = () => {
    navigation.navigate(NavigationRouteNames.CONFIRMATION,
      { Value: getQuoteData(), businessSubType: getQuoteData().category_name, whereFrom: NavigationRouteNames.CONFIRM_ADDRESS });
  };

  return (
    <View style={[AppStyles.flex1SpaceBetween, AppStyles.pb20, style.whitebackgrnd,]}>
      <View style={[AppStyles.mt20, AppStyles.w100]}>
        <View style={[AppStyles.w100, AppStyles.ph20, AppStyles.txtPrimaryBold]}>
          <View style={[Styles.paperBox, style.btnSecandary,]}>
            <View style={[AppStyles.mt20, AppStyles.ml20,]}>
              <Text style={[AppStyles.txtBlackBold, AppStyles.f16, AppStyles.mb10]}>{getQuoteData().category_name}</Text>
              <View style={AppStyles.flexRowSpaceBetween}>
                <View style={AppStyles.flexpointseven}>
                  <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>Subcategory</Text>
                </View>
                <View style={AppStyles.flexpointthree}>
                  <Text style={[AppStyles.txtBlackRegular, AppStyles.f16]}>{getQuoteData().sub_category_name}</Text>
                </View>
              </View>
              <View style={AppStyles.flexRowSpaceBetween}>
                <View style={AppStyles.flexpointseven}>
                  <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>Volume</Text>
                </View>
                <View style={AppStyles.flexpointthree}>
                  <Text style={[AppStyles.txtBlackRegular, AppStyles.f16]}>{getQuoteData().qty} {getQuoteData().unit_name}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[AppStyles.mt20]}>

            {addressData === '' ?

              <View style={[Styles.addressBox, style.btnSecandary, AppStyles.mt20,]}>
                <View style={[AppStyles.mt20, AppStyles.ml20,]}>
                  <TouchableOpacity
                    onPress={handelNewAddress}
                    style={[AppStyles.flexRowAlignCenter]}>
                    <FAIcon name={'plus'} size={20} color={Colors.mango} />
                    <Text style={[AppStyles.ml10, AppStyles.txtBlackBold, AppStyles.f16]}>Add New Address</Text>
                  </TouchableOpacity>
                </View>
              </View>
              :
              <View style={[AppStyles.mt20]}>
                <View style={[Styles.deliveryBox, style.btnSecandary,]}>
                  <View style={[AppStyles.mt20, AppStyles.ml20,]}>
                    <View style={AppStyles.flexRowSpaceBetween}>
                      <Text style={[AppStyles.txtBlackBold, AppStyles.mb10, AppStyles.f17]}>Delivery Address</Text>
                      <TouchableOpacity
                        onPress={handelNewAddress}
                        style={[AppStyles.mr20]}>
                        <Text style={[AppStyles.txtmangoTwoRegular, AppStyles.f11]}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>{Address}</Text>
                      <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>{Landmark}</Text>
                      <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>{City} {PinCode}</Text>
                    </View>
                  </View>
                </View>
              </View>
            }
          </View>
          {timeSlot === '' ?
            <View style={[Styles.addressBox, style.btnSecandary, AppStyles.mt20,]}>
              <View style={[AppStyles.mt20, AppStyles.ml20,]}>
                <TouchableOpacity
                  onPress={handelTimeSlot}
                  style={[AppStyles.flexRowAlignCenter]}>
                  <FAIcon name={'plus'} size={20} color={Colors.mango} />
                  <Text style={[AppStyles.ml10, AppStyles.txtBlackBold, AppStyles.f16]}>Add Time Slot</Text>
                </TouchableOpacity>
              </View>
            </View>
            :
            <View style={[AppStyles.mt20]}>
              <View style={[Styles.dateBox, style.btnSecandary,]}>
                <View style={[AppStyles.mt20, AppStyles.ml20,]}>
                  <View style={AppStyles.flexRowSpaceBetween}>
                    <Text style={[AppStyles.txtBlackBold, AppStyles.mb10, AppStyles.f17]}>Date & Time</Text>
                    <TouchableOpacity
                      onPress={handelTimeSlot}
                      style={[AppStyles.mr20]}>
                      <Text style={[AppStyles.txtmangoTwoRegular, AppStyles.f11]}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15]}>{date}</Text>
                    <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15]}>{time}</Text>
                  </View>
                </View>
              </View>
            </View>
          }
        </View>
      </View>
      <View style={[AppStyles.flexRowSpaceBetween, AppStyles.w100, AppStyles.ph20, AppStyles.alignCenter]}>
        <View style={AppStyles.ph10}>
          <Text style={[AppStyles.f12, AppStyles.txtPrimaryBold]}>ESTIMATED PRICE</Text>
          <Text style={AppStyles.txtBlackRegular}>
            <FAIcon size={14} name='rupee' /> {getQuoteData().price}</Text>
        </View>
        <View>
          <TouchableOpacity
            disabled={btnConfirm ? false : true}
            onPress={() => _addSchedule()}
            style={[AppStyles.br10, btnConfirm ? AppStyles.btnPrimary : AppStyles.btnSecandary, AppStyles.pv10, AppStyles.alignCenter, AppStyles.ph40]}
          >
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18, { color: btnConfirm ? Colors.white : Colors.black }]}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddressConfirm;
