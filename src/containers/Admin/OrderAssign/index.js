import React, { useContext, useLayoutEffect, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import DropDown from '../../../components/Picker/index';

import Styles from "./styles";
import { AppStyles, Colors } from '../../../theme';
import { alertBox, RfH, RfW, getSaveData } from '../../../utils/helpers';
import CustomText from '../../../components/CustomText';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import * as Yup from "yup";
import { useFormik } from "formik";

import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import UserContext from '../../../appContainer/context/user.context';
import { getAggregators, getRecyclers } from "../../../services/CommonController"

import { assignAggregator } from "../Middleware";

import { LOCAL_STORAGE_DATA_KEY } from '../../../utils/constants';

const typeData = [
  { label: 'Aggregator', value: '1' },
  { label: 'Recycler', value: '2' }]

function OrderAssign() {
  const [item, setItem] = useState({});
  const { setLoader } = useContext(UserContext);
  const [userName, setUserName] = useState('')

  const [aggregators, setAggregator] = useState([])
  const [recyclers, setRecyclers] = useState([])

  const [arrayData, setArrayData] = useState([])
  const [clickConfirm, setClickConfirm] = useState(false);
  const [aggregatorVendorName, setAggregatorVendorName] = useState('')

  // ---------------------- Start Api Section ---------------------
  const [{ data: aggregatorsData }, onGetAggregators] = getAggregators();
  const [{ data: recyclersData }, onGetRecyclers] = getRecyclers();
  const [{ data: Aggregator, loading, error }, onAssignAggregator] = assignAggregator();
  // ---------------------- End Api Section ---------------------

  const navigation = useNavigation();
  const route = useRoute();

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.CONFIRMATION,
      { Value: item, businessSubType: aggregatorVendorName, whereFrom: NavigationRouteNames.ORDER_ASSIGN });
  }

  useEffect(() => {
    if (aggregatorsData) {
      //let itemData = aggregatorsData.filter(item => item.name != userName);
      const pickerData = aggregatorsData.map((item) => ({ label: item.name, value: item.id }));
      setAggregator(pickerData);
    }
  }, [aggregatorsData]);

  useEffect(() => {
    if (recyclersData) {
      //let itemData = recyclersData.filter(item => item.name != userName);
      const pickerData = recyclersData.map((item) => ({ label: item.name, value: item.id }));
      setRecyclers(pickerData);
    }
  }, [recyclersData]);

  useLayoutEffect(() => {
    const { Value } = route.params;
    setItem(Value)
    onGetAggregators();
    onGetRecyclers();
  }, []);

  useEffect(() => {
    if (error)
      setLoader(false)
  }, [error])

  useEffect(() => {
    return () => {
      setLoader(false)
    }
  }, []);



  const handelGetAggregators = async () => {
    setLoader(true)
    const { data } = await onGetAggregators({ data: {} })
    setLoader(false)
  }

  const handelGetRecyclers = async () => {
    setLoader(true)
    const { data } = await onGetRecyclers({ data: {} })
    setLoader(false)
  }

  const handelBusinessType = (index) => {
    console.log(index)
    requestForm.setFieldValue('businessType', index)

    if (index == 0) {
      return
    }

    if (index == 1) {
      aggregators.length == 0 ? handelGetAggregators() : setArrayData(aggregators)
    }

    if (index == 2) {
      recyclers.length == 0 ? handelGetRecyclers() : setArrayData(recyclers)
    }

  }

  const onChangeAggregator = (id) => {
    console.log(id)
    if (requestForm.values.businessType == 1) {
      var index = aggregators.findIndex(v => v.value == id)
      if (index != -1) {
        setAggregatorVendorName(aggregators[index].label)
      }
    } else if (requestForm.values.businessType == 2) {
      var index = recyclers.findIndex(v => v.value == id)
      if (index != -1) {
        setAggregatorVendorName(recyclers[index].label)
      }
    }
    requestForm.setFieldValue('selectedID', id)
  }

  const validationSchema = Yup.object().shape({
    businessType: Yup.string().required("Please select Type"),
    selectedID: Yup.string().required("Please select Item"),
  });

  const requestForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      businessType: '',
      selectedID: '',
    },
    validationSchema,
    onSubmit: () => handleConfirm(
      requestForm.values.selectedID,
    )
  });

  const handleConfirm = async (aggregatorID) => {
    try {
      const { data } = await onAssignAggregator({
        data: {
          "orderId": item.orderId,
          "vendor": requestForm.values.businessType == 1 ? aggregatorID : '',
          "recycler": requestForm.values.businessType == 2 ? aggregatorID : ''
        },
      });
      console.log(data)
      if (data.status) {
        screenNavigate()
      } else {
        alert(data.message)
      }
    }catch (e) {
      console.log("Response error", e);
    }
};

const handelSubmit = async () => {
  setClickConfirm(true)
  await requestForm.submitForm();
}

useEffect(() => {
  setLoader(loading);
}, [Aggregator, loading]);

return (
  <View style={AppStyles.topView}>
    <ScrollView contentContainerStyle={AppStyles.flex1}
      removeClippedSubviews={Platform.OS == 'android' && true}
      >
      <View style={AppStyles.topView}>

        <View style={Styles.refView}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17]}>Ref No- {item.order_no}</Text>
        </View>

        <View style={[AppStyles.boxxView, AppStyles.mt35]}>
          <View style={[AppStyles.flexDir, AppStyles.mt20,]}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.ml20]}>Waste Type</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mr20]}>{item.category_name}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Waste Sub Category</Text>
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
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.qty} {item.unit_name}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Purchase Date</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{moment(item.pickup_date).format('DD/MM/YYYY')}</Text>
            </View>
          </View>

          <View style={[AppStyles.flexDir, AppStyles.mb20]}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Purchase Amount</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <View style={[AppStyles.flexRowAlignCenter, AppStyles.mt10, AppStyles.mr20]}>
                <FAIcon size={14} name='rupee'></FAIcon>
                <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.ml5]}>{item.price}</Text>
              </View>
            </View>
          </View>

        </View>


        <View style={Styles.businessType}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.mb10]}>Select business type</Text>
          <DropDown
            placeholderText="Select one"
            items={typeData}
            itemStyle={{ color: '#000' }}
            onValueChange={handelBusinessType}
            selectedValue={requestForm.values.businessType}
            containerStyle={AppStyles.inputTxtStyle}
          />
          {clickConfirm && requestForm.errors.businessType ?
            <CustomText
              fontSize={15}
              color={Colors.red}
              styling={{ marginTop: RfH(10) }}>
              {(requestForm.errors.businessType).toString()}
            </CustomText>
            : null}
        </View>

        { requestForm.values.businessType != '' && <View style={Styles.slctAggre}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.mb10]}>Select {requestForm.values.businessType == '1' ? 'Aggregator' : requestForm.values.businessType == '2' && 'Recycler'}</Text>
          <DropDown
            placeholderText="Select one"
            items={arrayData}
            itemStyle={{ color: '#000' }}
            onValueChange={onChangeAggregator}
            selectedValue={requestForm.values.selectedID}
            containerStyle={AppStyles.inputTxtStyle}
          />
          {clickConfirm && requestForm.values.selectedID == '' ?
            <CustomText
              fontSize={15}
              color={Colors.red}
              styling={{ marginTop: RfH(10) }}>
              {(requestForm.errors.selectedID).toString()}
            </CustomText>
            : null}
        </View>}

      
      </View>
      <View style={Styles.confirmView}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[Styles.confirmBtn, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() => { handelSubmit() }}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig]}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  </View>
);
}
export default OrderAssign;
