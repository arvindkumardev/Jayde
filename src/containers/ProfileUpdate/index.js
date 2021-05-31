import React, { useEffect, useState, useLayoutEffect } from 'react';
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

function ProfileUpdate() {
  const navigation = useNavigation();
  const route = useRoute();
  const [clickLogin, setClickLogin] = useState(false);
  const [{ data, loading, error }, onProfileUpdate] = profileUpdate();

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.UPDATE_PROFILE);
  };

  useLayoutEffect(() => {
    const title = 'Update Profile';
    navigation.setOptions({
      title,
    });
  }, []);

  const confirmProfileUpdate = async (name, username, phoneno, password) => {
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
    async function getUserName() {
      const username = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_NAME);
      const phoneno = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_PHONE);
      const email = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_EMAIL);
      loginForm.setFieldValue('name', username);
      loginForm.setFieldValue('phoneno', phoneno);
      loginForm.setFieldValue('username', email);
    }
    getUserName();
  }, []);

  return (
    <KeyboardAwareScrollView>
      <View style={Styles.topView}>
        <ScrollView>
          <View>
            <Text style={[AppStyles.txtBlackBold, AppStyles.f17, Styles.title]}>Please enter the details</Text>
            <View style={[AppStyles.mt30, AppStyles.ml24, AppStyles.mr24]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Name</Text>
              <View>
                <TextInput
                  placeholder="Sahdev Garg"
                  style={AppStyles.inputTxtStyle}
                  value={loginForm.values.name}
                  onChangeText={(txt) => loginForm.setFieldValue('name', txt)}
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
              {/* <TextInput placeholder={"sahdevgarg@gmail.com"} style={Styles.inputText} value={email}/> */}
              <TextInput
                placeholder="sahdevgarg@gmail.com"
                style={AppStyles.inputTxtStyle}
                value={loginForm.values.username}
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
                placeholder="9876543210"
                style={AppStyles.inputTxtStyle}
                value={loginForm.values.phoneno}
                onChangeText={(txt) => loginForm.setFieldValue('phoneno', txt)}
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
                placeholder="**********"
                style={AppStyles.inputTxtStyle}
                value={loginForm.values.password}
                onChangeText={(txt) => loginForm.setFieldValue('password', txt)}
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
                placeholder="**********"
                style={AppStyles.inputTxtStyle}
                value={loginForm.values.confirmpassword}
                onChangeText={(txt) => loginForm.setFieldValue('confirmpassword', txt)}
              />
              {clickLogin && loginForm.errors.confirmpassword ? (
                <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
                  {loginForm.errors.confirmpassword}
                </CustomText>
              ) : null}
            </View>

            <View style={[Styles.btnContainer, AppStyles.flexDir]}>
              <View style={AppStyles.flex1}>
                <TouchableOpacity style={[Styles.aggregatebtn]} onPress={() => screenNavigate()}>
                  <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>
                    CANCEL
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={AppStyles.flex1}>
                <TouchableOpacity style={[Styles.confirmbtn, AppStyles.mb20]} onPress={() => handleProfileUpdate()}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>
                    SAVE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAwareScrollView>
  );
}
export default ProfileUpdate;
