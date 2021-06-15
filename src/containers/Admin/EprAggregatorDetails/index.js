import React, { useContext, useLayoutEffect, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import DropDown from '../../../components/Picker/index';
import Styles from "./styles";
import { AppStyles, Colors } from '../../../theme';
import { alertBox, RfH, RfW, getSaveData } from '../../../utils/helpers';
import CustomText from '../../../components/CustomText';
import * as Yup from "yup";
import { useFormik } from "formik";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import UserContext from '../../../appContainer/context/user.context';
import { getAggregators } from "../../../services/CommonController"
import { listEprAggregator } from "../Middleware";

function EprAggregatorDetails() {
  const [item, setItem] = useState({});
  const { setLoader } = useContext(UserContext);
  const [userName, setUserName] = useState('')
  const [loadMore, setLoadMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0)
  const [perPage, setPerPage] = useState(15)
  const [refreshPage, setRefreshPage] = useState(false)

  const [aggregators, setAggregator] = useState([])

  const [arrayData, setArrayData] = useState([])
  const [clickConfirm, setClickConfirm] = useState(false);
  const [aggregatorVendorName, setAggregatorVendorName] = useState('')
  const [eprAggregatorList, setEprAggregatorList] = useState([])

  // ---------------------- Start Api Section ---------------------
  const [{ data: aggregatorsData }, onGetAggregators] = getAggregators();
  const [{ data, loading, error }, onListAggregator] = listEprAggregator();
  // ---------------------- End Api Section ---------------------

  const navigation = useNavigation();
  const route = useRoute();

  // const screenNavigate = () => {
  //   navigation.navigate(NavigationRouteNames.CONFIRMATION);
  // }

  useEffect(() => {
    if (aggregatorsData) {
      const pickerData = aggregatorsData.map((item) => ({ label: item.name, value: item.id }));
      setAggregator(pickerData);
    }
  }, [aggregatorsData]);

  useLayoutEffect(() => {
    const title = 'EPR Aggregator Details';
    navigation.setOptions({ title });
    const { Item } = route.params;
    setItem(Item)
    console.log("abc", Item);
    onGetAggregators();
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

  const validationSchema = Yup.object().shape({
    selectedID: Yup.string().required("Please select Item"),
  });

  const requestForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      selectedID: '',
    },
    validationSchema,
    onSubmit: () => handleConfirm(
      requestForm.values.selectedID,
    )
  });

const handelSubmit = async () => {
  setClickConfirm(true)
  await requestForm.submitForm();
}

const handleConfirm = async () => {
  try {
    const { data } = await onListAggregator({
      data: {
        "eprId": 190,
        "page": 1,
      },
    });
    console.log("aggregator data", data)
    if (data.status) {
      // screenNavigate()
    } else {
      alert(data.message)
    }
  }catch (e) {
    console.log("Response error", e);
  }
};

useEffect(() => {
  handleConfirm();
  return () => {
    setLoader(false)
  }
}, []);

return (
  <View style={AppStyles.topView}>
    <ScrollView contentContainerStyle={AppStyles.flex1}
      removeClippedSubviews={Platform.OS == 'android' && true}
      >
      <View style={AppStyles.topView}>
        <View style={[AppStyles.flexDir]}>
        <View style={[AppStyles.flex1, AppStyles.mt20]}>
        <Text style={[AppStyles.txtBlackRegular, AppStyles.f17, AppStyles.ml24]}>EPR Name</Text>
        </View>
        <View style={[AppStyles.flex1, AppStyles.mt20, AppStyles.alignfend]}>
        <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mr24]}>{item.business_name}</Text>
        </View>
        </View>
        <View style={Styles.slctAggre}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.mb10]}>Select Any Aggregator</Text>
          <DropDown
            placeholderText="Select one"
            items={aggregators}
            itemStyle={{ color: '#000' }}
            onValueChange={(id) => requestForm.setFieldValue('selectedID', id)}
            selectedValue={requestForm.values.selectedID}
            containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
          />
          {clickConfirm && requestForm.values.selectedID ?
            <CustomText
              fontSize={15}
              color={Colors.red}
              styling={{ marginTop: RfH(10) }}>
              {requestForm.errors.selectedID}
            </CustomText>
            : null} 
        </View>

        <View style={Styles.confirmView}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[Styles.confirmBtn, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() => { }}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig]}>ADD</Text>
          </TouchableOpacity>
        </View>




        <View style={[AppStyles.w100, Styles.bdrclr]}></View>
        <View>
        <View style={[AppStyles.flexDir, AppStyles.mt20, AppStyles.mb20]}>
          <View style={[AppStyles.flex1, AppStyles.mt10, AppStyles.ml24]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>Earthbox ventures pvt ltd</Text>
          </View>
          <View style={AppStyles.flex1}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[Styles.deleteBtn, AppStyles.btnHeight44, AppStyles.inCenter, AppStyles.mr24]} onPress={() => {  }}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig]}>Delete</Text>
          </TouchableOpacity>
          </View>
        </View>
        <View style={[AppStyles.w100, Styles.bdrclr]}></View>
      </View>

      <View>
        <View style={[AppStyles.flexDir, AppStyles.mt20, AppStyles.mb20]}>
          <View style={[AppStyles.flex1, AppStyles.mt10, AppStyles.ml24]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>vishwarajaya Enterpprises</Text>
          </View>
          <View style={AppStyles.flex1}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[Styles.deleteBtn, AppStyles.btnHeight44, AppStyles.inCenter, AppStyles.mr24]} onPress={() => {  }}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig]}>Delete</Text>
          </TouchableOpacity>
          </View>
        </View>
        <View style={[AppStyles.w100, Styles.bdrclr]}></View>
      </View>
        

      
      </View>
    
    </ScrollView>
  </View>
);
}
export default EprAggregatorDetails;
