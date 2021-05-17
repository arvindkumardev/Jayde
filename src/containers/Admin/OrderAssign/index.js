import React, {useContext, useLayoutEffect, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, ScrollView} from 'react-native';
import  DropDownPicker from "react-native-dropdown-picker";
import DropDown from '../../../components/Picker/index';

import Styles from "./styles";
import { AppStyles, Colors } from '../../../theme';
import {alertBox, RfH, RfW} from '../../../utils/helpers';
import CustomText from '../../../components/CustomText';

import * as Yup from "yup";
import { useFormik } from "formik";

import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import UserContext from '../../../appContainer/context/user.context';
import { getAggregators, getRecyclers, assignAggregator } from "../../../services/middleware/user";

const typeData = [
  {label: 'Aggregator', value: '1'},
  {label: 'Recycler', value: '2'}]

function OrderAssign() {
  const [item, setItem] = useState({});
  const { setLoader } = useContext(UserContext);

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
       {Value: item, businessSubType: aggregatorVendorName,  whereFrom : NavigationRouteNames.ORDER_ASSIGN });
  }

  useEffect(() => {
    if (aggregatorsData) {
      const pickerData = aggregatorsData.map((item) => ({ label: item.name, value: item.id }));
      setAggregator(pickerData);
    }
  }, [aggregatorsData]);

  useEffect(() => {
    if (recyclersData) {
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

const handelGetAggregators = async () => {
 setLoader(true)
 const {data} = await onGetAggregators({data:{}})
 setLoader(false)
}

const handelGetRecyclers = async () => {
  setLoader(true)
  const {data} = await onGetRecyclers({data:{}})
  setLoader(false)
}

  const handelBusinessType = (index) => {
    console.log(index)
    requestForm.setFieldValue('businessType', index)

    if(index == 0){
      return
    }

    if(index == 1){     
      aggregators.length == 0 ?  handelGetAggregators() : setArrayData(aggregators)
    }

    if(index == 2){    
      recyclers.length == 0 ? handelGetRecyclers() : setArrayData(recyclers)
    }
    
  }

  const onChangeAggregator = (id) => {
    console.log(id)
    if(requestForm.values.businessType == 1 ){
      var index = aggregators.findIndex(v => v.value == id)    
      if(index != -1){
        setAggregatorVendorName(aggregators[index].label)
      }
    } else if(requestForm.values.businessType == 2 ){
      var index = recyclers.findIndex(v => v.value == id)    
      if(index != -1){
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
      selectedID : '',
    },
    validationSchema,
    onSubmit: () => handleConfirm(
      requestForm.values.selectedID,
    )
  }); 

  const handleConfirm = async (aggregatorID) => {   
    const {data} = await onAssignAggregator({
      data: {
        "orderId" : item.orderId,
        "vendor"  : requestForm.values.businessType == 1 ? aggregatorID : '',
        "recycler": requestForm.values.businessType == 2 ? aggregatorID : ''
      },
    });
    console.log(data)
    if(data.status){
      screenNavigate()
    } else {
      alert(data.message)
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
    <View style={Styles.mainView}>
       <ScrollView  style={Styles.mainView}
       removeClippedSubviews = {Platform.OS == 'android' && true}>
       <View style={Styles.mainView}>
          
          <View style={Styles.refView}>
            <Text style={Styles.refText}>Ref No- {item.order_no}</Text>
          </View>
        
          <View style={Styles.boxView}>
        
          <View style={Styles.boxText}>
        <View style={Styles.flx}>
        <Text style={Styles.boxtxtt}>Waste type</Text>
        </View>
        <View style={Styles.boxTxtView}>
        <Text style={Styles.boxTextt1}>{item.category_name}</Text>
        </View>
        </View> 

          <View style={Styles.boxText}>
        <View style={Styles.flx}>
        <Text style={Styles.boxtxtt}>Waste Sub Category</Text>
        </View>
        <View style={Styles.boxTxtView}>
        <Text style={Styles.boxTextt1}>{item.sub_category_name}</Text>
        </View>
        </View> 

          <View style={Styles.boxText}>
        <View style={Styles.flx}>
        <Text style={Styles.boxtxtt}>Volume</Text>
        </View>
        <View style={Styles.boxTxtView}>
        <Text style={Styles.boxTextt1}>{item.qty} {item.unit_name}</Text>
        </View>
        </View> 

          <View style={Styles.boxText}>
        <View style={Styles.flx}>
        <Text style={Styles.boxtxtt}>Purchase Date</Text>
        </View>
        <View style={Styles.boxTxtView}>
        <Text style={Styles.boxTextt1}>{moment(item.pickup_date).format('DD/MM/YYYY')}</Text>
        </View>
        </View> 

          <View style={Styles.boxText}>
            <View style={Styles.flx}>
            <Text style={Styles.boxtxtt}>Purchase Amount</Text>
            </View>
            <View style={Styles.boxTxtView}>
            <Text style={Styles.boxTextt1}>₹ {item.price}</Text>
            </View>
          </View> 
       </View>
      

           <View style={Styles.businessType}>
              <Text>Select business type</Text>              
              <DropDown
                placeholderText="Select one"
                items={typeData}
                itemStyle={{ color: '#000' }}
                onValueChange = {handelBusinessType}                      
                selectedValue={requestForm.values.businessType}
                containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
              />
               {clickConfirm && requestForm.errors.businessType? 
              <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{marginTop: RfH(10)}}>
                {(requestForm.errors.businessType).toString()}
              </CustomText>
                 : null}
            </View>

            <View style={Styles.slctAggre}>
              <Text>Select Aggregator</Text>
              <DropDown
                placeholderText="Select one"
                items={arrayData}
                itemStyle={{ color: '#000' }}
                onValueChange = {onChangeAggregator}                      
                selectedValue={requestForm.values.selectedID}
                containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
              />
               {clickConfirm && requestForm.values.selectedID == '' ? 
              <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{marginTop: RfH(10)}}>
                {(requestForm.errors.selectedID).toString()}
              </CustomText>
                 : null}
            </View>
      
              <View style={Styles.confirmView}>
              <TouchableOpacity style={Styles.confirmBtn} onPress={() => {handelSubmit()}}>
                  <Text style={Styles.confirm}>CONFIRM</Text>
              </TouchableOpacity>
             </View>
    </View>
  </ScrollView>  
</View>
  );
}
export default OrderAssign;
