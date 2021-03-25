import React, { useContext, useEffect, useState } from 'react';
import * as Alert from 'react-native';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import Colors from '../../theme/Colors';
import {
  CheckBoxWrapper,
  CustomTextInput,
  GradientButton,
} from '../../components';
import {
  alertBox,
  comingSoonAlert,
  getSaveData,
  isValidUserName,
  RfH,
  RfW,
  storeData,
} from '../../utils/helpers';
import CustomText from '../../components/CustomText';
import { isEmpty } from 'lodash';
import Images from '../../theme/Images';
import NavigationRouteNames from '../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import UserContext from './user.context';
import useAxios from 'axios-hooks';
import styles from './styles';
import { LOGIN_URL } from '../../utils/urls';
import commonStyles from '../../theme/commonStyles';
import axios from "axios";
import { useRoute } from '@react-navigation/native';
import { userLogin } from "../../services/middleware/user";

function LoginWithEmail() {
  const navigation = useNavigation();
  const [clickLogin, setClickLogin] = useState(false);
  const {
    user,
    setUserObj,
    setLogin,
    orgLoading,
    orgData,
    setLoader,
  } = useContext(UserContext);
  const [tries, setTries] = useState(2);
  const [selectCompany, setSelectCompany] = useState({});
  const [selectCompanyModal, setSelectCompanyModal] = useState(false);
  const [needHelpModal, setNeedHelpModal] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorObj, setErrorObj] = useState({
    errorDescription: '',
    errorTitle: 'Oops!',
    errorImage: Images.errorCredential,
  });

  const [
    { data: emLoginData, loading: emLoginLoading, error: emLoginError },
    emLogin,
  ] = userLogin();


  const triggerLogin = async (username, password, org) => {
    try{
      const { data } = await emLogin({ data: {email: username, password: password} });
      console.log("Response from login ", data)
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
      selectCompany
    );
    // setClickLogin(true);
    // if (isEmpty(loginForm.errors)) {
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

  useEffect(() => {
    setLoader(emLoginLoading);
  }, [emLoginLoading]);

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOME_SCREEN);
  };

  const route = useRoute();

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
                      onPress={() => Linking.openURL('#')}
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
