import React, {useContext, useEffect, useState, useLayoutEffect,useRef} from 'react';
import {TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import CustomText from '../../components/CustomText';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles, Colors } from '../../theme';
import { RfH, RfW } from "../../utils/helpers";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { addSubUser } from './../../services/middleware/user';
import UserContext from '../../appContainer/context/user.context';

function AddUser() {
  const  refEmail  = useRef(null);
  const  refMobile  = useRef(null);
  const  refPassword  = useRef(null);
  const  refConfPassword  = useRef(null);
  
  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader } = useContext(UserContext);
  const [{ data: userData, loading, error }, onAddUser] = addSubUser();

  
    useLayoutEffect(() => {
      const title='Add User';
      navigation.setOptions({title});
    }, []);
  
   const handelNavigate = () => {
      route.params.getActionType()
      navigation.goBack()
    }

    const UserSchema = Yup.object().shape({
      name: Yup.string().min(1, 'Invalid Name').required('Required'),
      email: Yup.string().email('Invalid Email').required('Required'),
      phone: Yup.string().min(10, 'Invalid Phone').required('Required'),
      password: Yup.string().min(3, 'Too Short!').required('Required'),
      confPassword: Yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref("password")],"Both password need to be the same")
      })
    });

    const { handleChange, handleBlur, handleSubmit, values, errors, isValid } = useFormik({     
      initialValues: 
      { 
        name: '',
        email: '',
        phone: '',
        password: '',
        confPassword :''
      },
      validationSchema : UserSchema,
      onSubmit: values => 
      handelSave(values.name, values.email, values.phone, values.password, values.confPassword)        
    });

    const handelSave = async (Name, Email, Phone, Password, ConfPassword) => {
      const {data} = await onAddUser({
        data: {          
          "name": Name,
          "email": Email,
          "phone": Phone,
          "password": Password,
          "password2": ConfPassword
        },
      });
      console.log(data.data)
      if(data.status){
       handelNavigate()
      } else {
        alert(data.message)
      }  
    }

    useEffect(() => {
      setLoader(loading);     
    }, [userData, loading]);

  return (
    <KeyboardAwareScrollView>
      <View style={AppStyles.topView}>       
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.title]}>Please register here system sub user</Text>
          <View style={[AppStyles.mt30, AppStyles.ml24, AppStyles.mr24]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6,]}>Name</Text>
            <View>
              <TextInput 
                placeholder={"Enter Name"} 
                maxLength = {50}
                returnKeyType='next'
                value={values.name}
                onBlur={handleBlur('name')}
                onChangeText={handleChange('name')}
                onSubmitEditing={() => refEmail.current?.focus()}  
                style={AppStyles.inputText} />

                {errors.name && <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{marginTop: RfH(10)}}>
                {errors.name}
              </CustomText> }
            </View>
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Email</Text>
            </View>
            <TextInput  
              ref = {refEmail}           
              placeholder={"Enter Email"} 
              autoCapitalize='none'
              autoCompleteType='email'
              keyboardType='email-address'
              maxLength = {50}
              returnKeyType='next'
              value={values.email}
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
              onSubmitEditing={() => refMobile.current?.focus()}             
              style={AppStyles.inputText} />

              {errors.email && <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{marginTop: RfH(10)}}>
                {errors.email}
              </CustomText> }
          </View>

        <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View style={AppStyles.flex1}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Phone Number</Text>
            </View>
            <TextInput
              ref = {refMobile}
              placeholder={"Enter Phone Number"}
              maxLength = {12} 
              keyboardType = 'number-pad' 
              returnKeyType='next'
              value={values.phone}
              onBlur={handleBlur('phone')}
              onChangeText={handleChange('phone')}
              onSubmitEditing={() => refPassword.current?.focus()}           
              style={AppStyles.inputText} />

              {errors.phone && <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{marginTop: RfH(10)}}>
                {errors.phone}
              </CustomText> }
          </View>
     
          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View style={AppStyles.flex1}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Password</Text>
            </View>
            <TextInput
              ref={refPassword}             
              placeholder={"Password"}
              secureTextEntry
              autoCompleteType='password'
              autoCapitalize='none'
              maxLength = {30}
              returnKeyType='next'
              value={values.password}
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              onSubmitEditing={() => refConfPassword.current?.focus()}  
              style={AppStyles.inputText} />

              {errors.password && <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{marginTop: RfH(10)}}>
                {errors.password}
              </CustomText> }
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View style={AppStyles.flex1}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Confirm Password</Text>
            </View>
            <TextInput 
              ref={refConfPassword}   
              placeholder={"Confirm Password"} 
              secureTextEntry
              autoCompleteType='password'
              autoCapitalize='none'
              maxLength = {30}
              returnKeyType='done'
              value={values.confPassword}
              onBlur={handleBlur('confPassword')}
              onChangeText={handleChange('confPassword')}
              style={AppStyles.inputText} />

                {errors.confPassword && <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{marginTop: RfH(10)}}>
                {errors.confPassword}
              </CustomText> }

          </View>

          <View style={[AppStyles.btnContainer, AppStyles.flexDir]}>
         <View style={AppStyles.flex1}>
         <TouchableOpacity
         onPress = {() => navigation.pop()}
           style={[AppStyles.cancelBtn]}>
           <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>CANCEL</Text>
         </TouchableOpacity>
        </View>
        <View style={AppStyles.flex1}>
       <TouchableOpacity
          disabled={!isValid}
          onPress={handleSubmit}
          style={[AppStyles.confirmBtn, AppStyles.mb20]}>
           <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>SAVE</Text>
         </TouchableOpacity>
         </View>
       </View>
        
    </View>
    </KeyboardAwareScrollView>
  );
}
export default AddUser;
