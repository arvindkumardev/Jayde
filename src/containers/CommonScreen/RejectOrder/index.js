import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { TouchableOpacity, View, Text, Image, TextInput, ScrollView } from 'react-native';
import Styles from "./styles";
import { AppStyles, Colors } from '../../../theme';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { RfH } from '../../../utils/helpers';
import { rejectOrder } from '../Middelware';
import UserContext from '../../../appContainer/context/user.context';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as yup from "yup";
import { useFormik } from "formik";
import CustomText from '../../../components/CustomText';
import rejectLogo from '../../../assets/Images/Aggregator/RejectOrder/reject.png';

function RejectOrder() {

  const navigation = useNavigation();
  const route = useRoute();
  const [item, setItem] = useState({});

  const { setLoader, userRole } = useContext(UserContext);

  const [clickConfirm, setClickConfirm] = useState(false);

  const [{ data, loading, error }, onRejectOrder] = rejectOrder(userRole);

  const screenNavigateBack = () => {
    navigation.pop()
  }

  useEffect(() => {
    if (error)
      setLoader(false)
  }, [error])

  useEffect(() => {
    return () => {
      setLoader(false)
    }
  })

  useLayoutEffect(() => {
    const { Item } = route.params;
    setItem(Item)
    const title = 'Reject Order';
    navigation.setOptions({ title });
  }, []);

  const handleConfirm = async (reason) => {
    setLoader(true)
    try {
      const { data } = await onRejectOrder({
        data: {
          assignedId: item.assigned_id,
          feedback: reason,
        },
      });
      console.log(data)
      if (data.status) {
        screenNavigate()
      } else {
        alert(data.message)
      }
      setLoader(false)
    } catch (e) {
      console.log("Response error", e);
    }
  };

  const validationSchema = yup.object().shape({
    reason: yup.string().required('Please enter cancellation reason'),
  });

  const requestForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      reason: '',
    },
    validationSchema,
    onSubmit: () => handleConfirm(requestForm.values.reason)
  });

  const handelValidation = async () => {
    setClickConfirm(true)
    await requestForm.submitForm();
  }

  const screenNavigate = () => {
    navigation.popToTop()
    userRole === 'recycler' ? navigation.navigate(NavigationRouteNames.RECYCLER_NEW_ORDER_LIST)
      :
      navigation.navigate(NavigationRouteNames.AGGREGATOR_NEW_ORDERS);
  }

  return (
    <View style={AppStyles.topView}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={Styles.boxContent}>
          <View style={AppStyles.aligncen}>
            <Image style={Styles.rejectImg} source={rejectLogo} />
            <Text style={[AppStyles.txtBlackBold, AppStyles.f20, AppStyles.spacing1]}>REJECT ORDER</Text>
          </View>
          <View style={Styles.border}></View>
          <View style={[AppStyles.mt20, AppStyles.mr14, AppStyles.ml15]}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.textalig]}>You have chosen to reject the order Ref NO - {item.order_no}. Where you were assigned as a preferred partner.</Text>
          </View>

          <View style={[AppStyles.mt20]}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mb10, AppStyles.ml24]}>Please give reason for cancellation</Text>
            <TextInput
              placeholder=""
              value={requestForm.values.reason}
              onChangeText={(txt) => requestForm.setFieldValue('reason', txt)}
              style={Styles.canceltextinput}
              multiline={true}
            />
            {clickConfirm && requestForm.errors.reason ? (
              <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{ marginTop: RfH(10), marginLeft: 25, }}>
                {requestForm.errors.reason}
              </CustomText>
            ) : null}
          </View>

          <View style={[AppStyles.mb30]}>
            <View style={AppStyles.aligncen}>
              <TouchableOpacity activeOpacity={0.8} style={Styles.backbtn}
                onPress={() => screenNavigateBack()}>
                <Text style={[AppStyles.f17, AppStyles.warmgreycolor, AppStyles.textalig, AppStyles.mt10]}>BACK</Text>
              </TouchableOpacity>
            </View>

            <View style={AppStyles.aligncen}>
              <TouchableOpacity activeOpacity={0.8} style={Styles.confirmbtn} onPress={() => handelValidation()}>
                <Text style={[AppStyles.f17, AppStyles.whitecolor, AppStyles.textalig, AppStyles.mt10]}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
export default RejectOrder;
