import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import * as Alert from 'react-native';
import { TouchableOpacity, View, Text, Image, TextInput, ScrollView} from 'react-native';
import Styles from "./styles";
import { AppStyles, Colors } from '../../../theme';
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import {alertBox, RfH, RfW, isValidVolume} from '../../../utils/helpers';
import { aggreRejectorder } from '../Middelware';
import UserContext from '../../../appContainer/context/user.context';
import * as yup from "yup";
import { useFormik } from "formik";
import CustomText from '../../../components/CustomText';

function RejectOrder() {

  const navigation = useNavigation();
  const route = useRoute();
  const [item, setItem] = useState({});
  // const [reason, setReason] = useState('');
  const [clickConfirm, setClickConfirm] = useState(false);

  const [{ data: quoteData, loading, error }, onSubmitQuote] = aggreRejectorder();

  const screenNavigateback = () => {
    navigation.navigate(NavigationRouteNames.ORDER_CONFIRMATION);
  }

  useLayoutEffect(() => { 
    const { Item } = route.params;  
    // alert(JSON.stringify(Item));
    // console.log('itemdate', JSON.stringify(item));
    setItem(Item)   
    // alert(JSON.stringify(Item));
    const title='Reject Order';
   navigation.setOptions({
    title,
  });
  }, []);

  const handleConfirm = async (reason) => {   
    // console.log('itemdate', item.assigned_id);
    const {data} = await onSubmitQuote({
      data: {
        assignedId: item.assigned_id,
        feedback: reason,
      },
    });
    
    console.log(data)
    if(data.status){
      alert(data.message)
      screenNavigate()
    } else {
      alert(data.message)
    }  
  };

  const validationSchema = yup.object().shape({
    reason: yup
      .string()
      // .email("Please enter cancellation reason")
      .required('Please enter cancellation reason'),
  })

  const requestForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      reason : '',
    },
    validationSchema,
    onSubmit: () => handleConfirm(
      requestForm.values.reason,
    )
  });

  const handelValidation = async () => {
    setClickConfirm(true)
    await requestForm.submitForm();
  }

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.ORDERS);
  }

  
  return (
    <View style={Styles.topView}>
       <ScrollView>
       
       <View style={Styles.boxContent}>
         <View style={AppStyles.aligncen}>
          <Image style={Styles.rejectImg} source={require('../../../assets/Images/Aggregator/RejectOrder/reject.png')}  /> 
          <Text style={[AppStyles.txtBlackBold, AppStyles.f20, AppStyles.spacing1]}>REJECT ORDER</Text>
         </View>
         <View style={Styles.border}></View>
         <View style={[AppStyles.mt20, AppStyles.mr14, AppStyles.ml15]}>
           <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.textalig]}>You have chosen to reject the order Ref NO - JYD/SC/2020/0067. Where you were assignedas a preferred partner.</Text>
         </View>

         <View style={[AppStyles.mt20]}>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mb10, AppStyles.ml24]}>Please give reason for cancellation</Text>
          <TextInput
                placeholder=""
                value={requestForm.values.reason}
                // onChangeText={(txt) => setReason(txt)}
                onChangeText={(txt) => requestForm.setFieldValue('reason', txt)}
                style={Styles.canceltextinput}
                multiline={true}
              />
              {clickConfirm && requestForm.errors.reason ? (
              <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{marginTop: RfH(10), marginLeft: 25,}}>
                {requestForm.errors.reason}
              </CustomText>
                ) : null}
        </View>

         <View>
            <View style={AppStyles.aligncen}>
              <TouchableOpacity style={Styles.backbtn}
                onPress={() => {screenNavigateback()}}>
                  <Text style={[AppStyles.f17, AppStyles.warmgreycolor, AppStyles.textalig, AppStyles.mt10]}>BACK</Text>
              </TouchableOpacity>
             </View>

             <View style={AppStyles.aligncen}>
              <TouchableOpacity style={Styles.confirmbtn} onPress = {() => {
                // handleConfirm(item)
                handelValidation(item)}}>
                  <Text style={[AppStyles.f17, AppStyles.whitecolor, AppStyles.textalig, AppStyles.mt10]}>CONFIRM</Text>
              </TouchableOpacity>
             </View>
          </View>
       </View>

          </ScrollView> 
        
      
    </View>
  );
}
export default RejectOrder;
