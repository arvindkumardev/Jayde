import React, { useContext, useEffect, useState, useLayoutEffect, useRef } from 'react';
import { TouchableOpacity, View, Text, TextInput, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Styles from './styles';
import CustomText from '../../components/CustomText';
import NavigationRouteNames from '../../routes/ScreenNames';
import { AppStyles, Colors } from '../../theme';
import { RfH, isValidUserName, getSaveData } from '../../utils/helpers';
import { profileUpdate } from './middleware';
import { LOCAL_STORAGE_DATA_KEY } from '../../utils/constants';
import UserContext from '../../appContainer/context/user.context';

function ProfileUpdate() {
  const navigation = useNavigation();
  const route = useRoute();

  const refEmail = useRef(null);
  const refMobile = useRef(null);
  const refPassword = useRef(null);
  const refConfPassword = useRef(null);
  const { setLoader } = useContext(UserContext);

  const [clickLogin, setClickLogin] = useState(false);
  const [{ data, loading, error }, onProfileUpdate] = profileUpdate();

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.UPDATE_PROFILE);
  };

  useLayoutEffect(() => {
    const title = 'Update Profile';
    navigation.setOptions({ title });
  }, []);

  const confirmProfileUpdate = async (name, username, phoneno, password) => {
    setLoader(true)
    try {
      const { data } = await onProfileUpdate({
        data: {
          name,
          email: username,
          phone: phoneno,
          password,
        },
      });

      console.log(data);
      if (data.status) {
        alert(data.message);
        screenNavigate();
      } else {
        alert(data.message);
      }
      setLoader(false)
    } catch (e) {
      console.log('Response error', e);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please provide name'),
    username: Yup.string().test('username', 'Please provide valid email', (txt) => isValidUserName(txt)),
    phoneno: Yup.string().required('Please provide phone number'),
    password: Yup.string().required('Please provide password'),
    confirmpassword: Yup.string()
      .required('Please provide password')
      .when('password', {
        is: (val) => !!(val && val.length > 0),
        then: Yup.string().oneOf([Yup.ref('password')], 'Both password need to be the same'),
      }),
  });

  const loginForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      name: '',
      username: '',
      phoneno: '',
      password: '',
      confirmpassword: '',
    },
    validationSchema,
    onSubmit: () =>
      confirmProfileUpdate(
        loginForm.values.name,
        loginForm.values.username,
        loginForm.values.phoneno,
        loginForm.values.password,
        loginForm.values.confirmpassword
      ),
  });

  const handleProfileUpdate = async () => {
    setClickLogin(true);
    await loginForm.submitForm();
  };

  useEffect(() => {
    if (error)
      setLoader(false)
  }, [error])

  useEffect(() => {
    async function getUserName() {
      const username = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_NAME);
      const phoneno = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_PHONE);
      const email = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_EMAIL);
      loginForm.setFieldValue('name', username);
      loginForm.setFieldValue('phoneno', phoneno);
      loginForm.setFieldValue('username', email);
    }
    getUserName();
    return () => {
      setLoader(false)
    }
  }, []);

  return (
 
      <View style={Styles.topView}>
        <ScrollView>
          <View style={AppStyles.flex1}>
        <Text style={[AppStyles.txtBlackBold, AppStyles.f17, Styles.title]}>Please enter the details</Text>
        <View style={[AppStyles.mt30, AppStyles.ml24, AppStyles.mr24]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Name</Text>
          <View>
            <TextInput
              placeholder="Name"
              style={AppStyles.inputTxtStyle}
              value={loginForm.values.name}
              onChangeText={(txt) => loginForm.setFieldValue('name', txt)}
              maxLength={50}
              returnKeyType='next'
              onSubmitEditing={() => refMobile.current?.focus()}
            />
            {clickLogin && loginForm.errors.name ? (
              <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
                {loginForm.errors.name}
              </CustomText>
            ) : null}
          </View>
        </View>

        <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
          <View>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Email</Text>
          </View>
          <TextInput
            ref={refEmail}
            placeholder="Email"
            style={AppStyles.inputTxtStyle}
            value={loginForm.values.username}
            keyboardType='email-address'
            maxLength={50}
            returnKeyType='next'
            editable={false}
            onChangeText={(txt) => loginForm.setFieldValue('username', txt)}
          />
          {clickLogin && loginForm.errors.username ? (
            <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
              {loginForm.errors.username}
            </CustomText>
          ) : null}
        </View>

        <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
          <View style={AppStyles.flex1}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Phone Number</Text>
          </View>
          <TextInput
            ref={refMobile}
            placeholder="9876543210"
            style={AppStyles.inputTxtStyle}
            value={loginForm.values.phoneno}
            maxLength={12}
            keyboardType='number-pad'
            returnKeyType='next'
            onChangeText={(txt) => loginForm.setFieldValue('phoneno', txt)}
            onSubmitEditing={() => refPassword.current?.focus()}
          />
          {clickLogin && loginForm.errors.phoneno ? (
            <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
              {loginForm.errors.phoneno}
            </CustomText>
          ) : null}
        </View>

        <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
          <View style={AppStyles.flex1}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Password</Text>
          </View>
          <TextInput
            ref={refPassword}
            placeholder="**********"
            style={AppStyles.inputTxtStyle}
            value={loginForm.values.password}
            autoCompleteType='password'
            autoCapitalize='none'
            maxLength={30}
            returnKeyType='next'
            onChangeText={(txt) => loginForm.setFieldValue('password', txt)}
            onSubmitEditing={() => refConfPassword.current?.focus()}
          />
          {clickLogin && loginForm.errors.password ? (
            <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
              {loginForm.errors.password}
            </CustomText>
          ) : null}
        </View>

        <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
          <View style={AppStyles.flex1}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Confirm Password</Text>
          </View>
          {/* <TextInput placeholder={"**********"} style={Styles.inputText} value={confirmpassword}/> */}
          <TextInput
            ref={refConfPassword}
            placeholder="**********"
            style={AppStyles.inputTxtStyle}
            value={loginForm.values.confirmpassword}
            autoCompleteType='password'
            autoCapitalize='none'
            maxLength={30}
            returnKeyType='next'
            onChangeText={(txt) => loginForm.setFieldValue('confirmpassword', txt)}
            onSubmitEditing={() => handleProfileUpdate()}
          />
          {clickLogin && loginForm.errors.confirmpassword ? (
            <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
              {loginForm.errors.confirmpassword}
            </CustomText>
          ) : null}
        </View>
        </View>

        
        <View style={[Styles.btnContainer, AppStyles.flexDir]}>
          <View style={AppStyles.flex1}>
            <TouchableOpacity activeOpacity = {0.8} style={[Styles.cancelButton, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() => screenNavigate()}>
              <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig]}>
                CANCEL
                  </Text>
            </TouchableOpacity>
          </View>
          <View style={AppStyles.flex1}>
            <TouchableOpacity activeOpacity = {0.8} style={[Styles.saveButton, AppStyles.mb20, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() => handleProfileUpdate()}>
              <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig]}>
                SAVE
                  </Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </View>
     
  );
}
export default ProfileUpdate;
