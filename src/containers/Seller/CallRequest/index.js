import React, { useState, useLayoutEffect, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import { requestCallBack } from '../Middleware';;

import Styles from './styles';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { Colors, AppStyles } from '../../../theme';
import { UploadDocument } from '../../../components/index';
import CustomText from '../../../components/CustomText';
import { alertBox, RfH, RfW, getSaveData } from '../../../utils/helpers';
import { LOCAL_STORAGE_DATA_KEY } from '../../../utils/constants';

import UserContext from '../../../appContainer/context/user.context';
import { getQuoteData, getImageName, setImageName } from '../../../utils/Global'

const CallRequest = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [imageUpload, setImageUpload] = useState(false);
  const [clickConfirm, setClickConfirm] = useState(false);
  const [timeSlotIndex, setTimeSlotIndex] = useState(0);
  const { setLoader } = useContext(UserContext);
  const [imgData, setImageData] = useState(getImageName);

  const [{ data: callBackData, loading, error }, onRequestCallBack] = requestCallBack();

  const handelCallBackConfirmation = () => {
    navigation.navigate(NavigationRouteNames.CALLBACK_CONFIRMATION);
  };

  useEffect(() => {
    if (error)
      setLoader(false)
  }, [error])

  
  useEffect(() => {
    setLoader(loading);
  }, [callBackData, loading]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>Call Back Request</Text>,
    });
  }, [navigation]);

  const validationSchema = Yup.object().shape({
    contactNumber: Yup.string().required('Please provide valid contact number'),
    contactPerson: Yup.string().required('Please provide contact person'),
  });

  const requestForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      contactNumber: '',
      contactPerson: '',
    },
    validationSchema,
    onSubmit: () => handleSubmit(requestForm.values.contactPerson, requestForm.values.contactNumber),
  });

  const handleConfirm = async () => {
    setClickConfirm(true);
    await requestForm.submitForm();
  };

  const handleSubmit = async (contactPerson, contactNumber) => {
    var param = {
      "userId": getQuoteData().user_id,
      "contactName": contactPerson,
      "contactNumber": contactNumber,
      "uploaded_files": imgData,
      "scheduleDate": timeSlotIndex > 1 ? getAfterDay_Formatted() : getDayAfter_Formatted(),
      "scheduleTime": timeSlotIndex == 0 ? '11:00 AM 1:00 PM'
        : timeSlotIndex == 1 ? '3:00 PM 5:00 PM'
          : timeSlotIndex == 2 ? '11:00 AM 1:00 PM'
            : '3:00 PM 5:00 PM'
    }
    console.log(param)

    if (imgData.length === 0)
      return

    try {
      const { data } = await onRequestCallBack({
        data: param,
      });
      console.log(data);
      if (data.status) {
        handelCallBackConfirmation()
        setImageName([])
      } else {
        alert(data.message);
      }
    }
    catch (e) {
      console.log("Response error", e);
    }
  };

  const getDayAfter = () => {
    const dayAfter = moment(new Date()).add(1, 'days').format('DD-MM-YYYY');
    return dayAfter;
  };

  const getAfterDay = () => {
    const afterDay = moment(new Date()).add(2, 'days').format('DD-MM-YYYY');
    return afterDay;
  };

  const getDayAfter_Formatted = () => {
    const dayAfter = moment(new Date()).add(1, 'days').format('YYYY-MM-DD');
    return dayAfter;
  };

  const getAfterDay_Formatted = () => {
    const afterDay = moment(new Date()).add(2, 'days').format('YYYY-MM-DD');
    return afterDay;
  };

  const ImageData = (data) => {
    if (data) {
      const listData = imgData;
      const data1 = listData.concat(data);
      setImageData([...data1]);
    }
  };

  useEffect(() => {
    async function getUserName() {
      const userName = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_NAME);
      if (userName) {
        requestForm.setFieldValue('contactPerson', userName);
      }
      const phoneNo = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_PHONE);
      if (phoneNo) {
        requestForm.setFieldValue('contactNumber', phoneNo);
      }
    }
    getUserName();
    return () => {
      setLoader(false)
    }
  }, []);

  return (
    <KeyboardAwareScrollView style={Styles.mainContainer}>
      <View style={[AppStyles.w100, AppStyles.alignCenter, AppStyles.mt20]}>
        <Text style={[AppStyles.txtBlackBold, AppStyles.f17]}>Please confirm your details</Text>
      </View>
      <View style={AppStyles.mt30}>
        <View>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Contact person</Text>
          <TextInput
            placeholder="Name..."
            style={AppStyles.inputTxtStyle}
            value={requestForm.values.contactPerson}
            onChangeText={(txt) => requestForm.setFieldValue('contactPerson', txt)}
          />
          {clickConfirm && requestForm.errors.contactPerson ? (
            <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
              {requestForm.errors.contactPerson}
            </CustomText>
          ) : null}
        </View>
        <View>
          <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10, AppStyles.mt20]]}>Contact number</Text>
          <TextInput
            placeholder="Contact number..."
            style={AppStyles.inputTxtStyle}
            value={requestForm.values.contactNumber}
            keyboardType="number-pad"
            onChangeText={(txt) => requestForm.setFieldValue('contactNumber', txt)}
          />
          {clickConfirm && requestForm.errors.contactNumber ? (
            <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
              {requestForm.errors.contactNumber}
            </CustomText>
          ) : null}
        </View>
        <View>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10, AppStyles.mt20]}>Upload File</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[Styles.inputText, Styles.inputIcon, AppStyles.br10]} onPress={() => setImageUpload(!imageUpload)}>
            <Text style={[AppStyles.txtSecandaryRegular, { color: imgData.length > 0 ? Colors.green : Colors.warmGrey }]}>{imgData.length > 0 ? 'File Attached' : 'Attach File'}</Text>
            <MIcon name="attachment" size={25} color={Colors.grayThree} />
          </TouchableOpacity>

          {clickConfirm && imgData.length === 0 ? (
            <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
              Upload Picture
            </CustomText>
          ) : null}

          <UploadDocument handleClose={() => setImageUpload(false)} ImageData={ImageData} isVisible={imageUpload} />
        </View>
      </View>
      <View style={[AppStyles.mv20]}>
        <Text style={[AppStyles.txtBlackRegular, AppStyles.f16]}>Preferred time slot</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setTimeSlotIndex(0)}
          style={[AppStyles.pv15, AppStyles.ph20, AppStyles.mt10, AppStyles.flexRowSpaceBetween, timeSlotIndex == 0 && Styles.active]}>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15]}>{getDayAfter()}</Text>
          <Text style={[AppStyles.txtSecandaryRegular, , AppStyles.f15]}>11:00 AM - 1:00 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setTimeSlotIndex(1)}
          style={[AppStyles.pv15, AppStyles.ph20, AppStyles.mt10, AppStyles.flexRowSpaceBetween, timeSlotIndex == 1 && Styles.active]}>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15]}>{getDayAfter()}</Text>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15]}>3:00 PM - 5:00 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setTimeSlotIndex(2)}
          style={[AppStyles.pv15, AppStyles.ph20, AppStyles.mt10, AppStyles.flexRowSpaceBetween, timeSlotIndex == 2 && Styles.active]}>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15]}>{getAfterDay()}</Text>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15]}>11:00 AM - 1:00 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setTimeSlotIndex(3)}
          style={[AppStyles.pv15, AppStyles.ph20, AppStyles.mt10, AppStyles.flexRowSpaceBetween, timeSlotIndex == 3 && Styles.active]}>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15]}>{getAfterDay()}</Text>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15]}>3:00 PM - 5:00 PM</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv10, AppStyles.alignCenter, AppStyles.mb20]}
        onPress={() => { handleConfirm() }}>
        <Text style={[AppStyles.f18, AppStyles.txtWhiteRegular]}>CONFIRM</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default CallRequest;
