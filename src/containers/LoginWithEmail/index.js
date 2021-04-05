/* eslint-disable no-undef */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import Colors from '../../theme/Colors';
import {
  CustomTextInput,
  GradientButton,
} from '../../components';
import {
  isValidUserName,
  RfH,
  storeData,
  removeData
} from '../../utils/helpers';
import Images from '../../theme/Images';
import NavigationRouteNames from '../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import UserContext from "../../appContainer/context/user.context";
import styles from './styles';
import commonStyles from '../../theme/commonStyles';
import { userLogin } from "./user";
import { LOCAL_STORAGE_DATA_KEY } from '../../utils/constants';

function LoginWithEmail() {
  const navigation = useNavigation();
  const [clickLogin, setClickLogin] = useState(false);
  const {
    setUserObj,
    setLogin,
    setUserRole
  } = useContext(UserContext);
  const [selectCompany, setSelectCompany] = useState({});
  const [hidePassword, setHidePassword] = useState(false);

  const [
,
    emLogin,
  ] = userLogin();


  const triggerLogin = async (username, password) => {
    try{
      const { data } = await emLogin({ data: {email: username, password} });
      console.log("Login Response", data);
      if(data.status){
        await setLogin(data.status);
        await storeData(LOCAL_STORAGE_DATA_KEY.JWT_TOKEN, data.data.token);
        await storeData(LOCAL_STORAGE_DATA_KEY.USER_ROLE, data.data.business_type);
        await setUserRole(data.data.business_type);
        await setUserObj(data.data);
      }
      else{
        console.log("Login failed");
        alert(data.message);
      }
      
    }
    catch(e){
      console.log("Response error", e);
    }
  };


  const validationSchema = Yup.object().shape({
    username: Yup.string().test(
      'username',
      'Please provide valid username',
      (value) => isValidUserName(value)
    ),
    password: Yup.string().required('Please provide password'),
  });

  const loginForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
  });

  const handleLogin = () => {
    triggerLogin(
      loginForm.values.username,
      loginForm.values.password,
      selectCompany,
    );
    // setClickLogin(true);
    // if (isEmpty(loginForm.errors)) {
    //   setLoader(true);
    //   console.log("Calling trigger login");
    //   triggerLogin(
    //     loginForm.values.username,
    //     loginForm.values.password,
    //     selectCompany,
    //   );
    // }
  };

  // const onSubmitEditing = (id) => {
  //   return inputs[id] ? inputs[id].focus() : null;
  // };

  // useEffect(() => {
  //   setLoader(emLoginLoading);
  // }, [emLoginLoading]);



  return (
    <View style={{ flex: 1, backgroundColor: Colors.mango }}>
      <ScrollView>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.select({ android: 'height', ios: 'padding' })}
          enabled
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingBottom: RfH(40),
              }}
            >
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <Image
                  style={{ width: 160, height: 55 }}
                  source={require('../../assets/Images/LoginWithEmail/JaydeLogo01.png')}
                />
              </View>
              <View style={{ alignItems: 'center', marginTop: 60 }}>
                <Text
                  style={{
                    color: '#fff',
                    marginBottom: 20,
                    fontSize: 40,
                    lineHeight: 48,
                    fontWeight: 'bold',
                  }}
                >
                  Hello!
                </Text>
              </View>
              <View style={styles.formContainer}>
                <CustomTextInput
                  label={'Email'}
                  inputLabelStyle={commonStyles.inputLabelStyle}
                  placeholder={'Email'}
                  value={loginForm.values.username}
                  onChangeHandler={(value) =>
                    loginForm.setFieldValue('username', value)
                  }
                  returnKeyType={'next'}
                  onSubmitEditing={() => onSubmitEditing('password')}
                  error={clickLogin && loginForm.errors.username}
                />
                <CustomTextInput
                  label={'Password'}
                  inputLabelStyle={commonStyles.inputLabelStyle}
                  placeholder={'Password'}
                  secureTextEntry={!hidePassword}
                  showPasswordField={hidePassword}
                  handleShowPassword={(value) => setHidePassword(value)}
                  icon={hidePassword ? Images.openEye : Images.closeEye}
                  value={loginForm.values.password}
                  onChangeHandler={(value) =>
                    loginForm.setFieldValue('password', value)
                  }
                  showClearButton={false}
                  keyboardType={'default'}
                  refKey={'password'}
                  error={clickLogin && loginForm.errors.password}
                />
                <View style={{ marginTop: RfH(21) }}>
                  <GradientButton title={'Confirm'} onPress={handleLogin} />
                </View>
              </View>

              <View style={{ flex: 1 }}>
                <View
                  style={{
                    alignItems: 'flex-end',
                    marginTop: 20,
                    marginRight: 25,
                  }}
                >
                  <Text style={{ marginLeft: 5, color: '#fff' }}>Forgot Password?</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text
                    style={{ color: '#fff', marginTop: 30, marginBottom: 30 }}
                  >
                    Dont have an account?
                    <Text
                      style={{ color: '#fff', textDecorationLine: 'underline' }}
                      onPress={() => navigation.navigate(NavigationRouteNames.SIGNUP)}
                    >
                      Create one
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
export default LoginWithEmail;
