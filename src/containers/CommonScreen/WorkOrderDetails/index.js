import React, { useContext, useEffect, useState } from 'react';
import * as Alert from 'react-native';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView } from 'react-native';
import Styles from "./styles";
import { logout, RfH, RfW } from "../../../utils/helpers";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { Colors, AppStyles } from '../../../theme';
import Checkbox from "@react-native-community/checkbox";
import CustomText from '../../../components/CustomText';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { formatDisplayDate } from '../../../utils/helpers';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { confirmWorkOrderPayment } from '../Middelware';
import UserContext from '../../../appContainer/context/user.context';

function WorkOrderDetails() {

  const navigation = useNavigation();
  const route = useRoute();
  const { setLoader } = useContext(UserContext);


  const [item, setItem] = useState({});
  const [clickConfirm, setClickConfirm] = useState(false);
  const [{ data, loading, error }, onPaymentConfirm] = confirmWorkOrderPayment();

  const screenNavigate = () => {
    navigation.goBack()
    route.params.getActionType()
  }

  useEffect(() => {
    const { item } = route.params;
    console.log(item)
    setItem(item)
  }, [])

  useEffect(() => {
    if (error)
      setLoader(false)
  }, [error])

  const handelConfirmPayment = async () => {
    try {
      setLoader(true)
      const { data } = await onPaymentConfirm({
        data: {
          workId : item.work_id
        },
      });
      setLoader(false)
      console.log(data)
      if (data.status) {
        //alert(data.message);
        screenNavigate();
      } else {
        alert(data.message);
      }     
    } catch (e) {
      console.log('Response error', e);
    }
  }

  const validationSchema = Yup.object().shape({
    checkCondition: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
  });

  const paymentForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      checkCondition: false,
    },
    validationSchema,
    onSubmit: () => handelConfirmPayment(),
  });

  const handelPayment = async () => {
    setClickConfirm(true);
    await paymentForm.submitForm();
  }

  return (
    <View style={Styles.topView}>
      <ScrollView>
        <View style={AppStyles.aligncen}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt30,]}>Ref No- {item.work_order_no}</Text>
        </View>
        <View style={Styles.boxView}>
          <View style={[AppStyles.flexDir, AppStyles.mt20,]}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.ml20]}>Waste type</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mr20]}>{item.category_name}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Waste sub category</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.sub_category_name}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Volume</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.work_price} {item.price_unit}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Purchase Date</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{formatDisplayDate(item.paid_date)}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Provisional Pricing</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend, AppStyles.mr20]}>
              <View style={[AppStyles.flexRowAlignCenter, AppStyles.mt10]}>
                <FAIcon size={14} name='rupee'></FAIcon>
                <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.ml5]}>{item.work_sub_total}</Text>
              </View>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Payment made</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend, AppStyles.mr20]}>
              <View style={[AppStyles.flexRowAlignCenter, AppStyles.mt10]}>
                <FAIcon size={14} name='rupee'></FAIcon>
                <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.ml5]}>{item.paid_amount}</Text>
              </View>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Payment mode</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.paid_mode}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Payment details</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.paid_details}</Text>
            </View>
          </View>
        </View>

        <View style={[AppStyles.ml20, AppStyles.mr20]}>
          <Text style={[AppStyles.txtSecandaryBold, AppStyles.f11, AppStyles.mt20]}>Please note that the provisional pricing is subject to verification by the authorized by Jayde pickup agent</Text>
        </View>

        <View>
          <View style={[AppStyles.flexDir, AppStyles.alignCenter, AppStyles.mt14, AppStyles.ml20,]}>
            <Checkbox
              disabled={false}
              value={paymentForm.values.checkCondition}
              tintColors={{ true: Colors.mango, false: '#777' }}
              onValueChange={(newValue) => paymentForm.setFieldValue('checkCondition', newValue)}
            />
            <View style={{ marginLeft: RfW(10) }}>
              <CustomText
                color={Colors.warmGrey}
                fontSize={15}
                styling={{ paddingVertical: RfH(4) }}>
                I agree to the terms and conditions
                </CustomText>
            </View>
          </View>
          {clickConfirm && paymentForm.errors.checkCondition ? (
            <CustomText fontSize={15} color={Colors.red} styling={{ marginLeft: 27 }}>
              { paymentForm.errors.checkCondition}
            </CustomText>
          ) : null}
        </View>

        <View style={Styles.btnContainer}>
          <TouchableOpacity
            onPress={() => handelPayment()}
            activeOpacity={0.8}
            style={[Styles.confirmbtn, AppStyles.mb20]}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
export default WorkOrderDetails;
