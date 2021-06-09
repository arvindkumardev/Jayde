/* eslint-disable no-undef */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { isEmpty, isNumber } from 'lodash';
import * as Yup from "yup";
import { useFormik } from "formik";
import Colors from "../../theme/Colors";
import CustomTextInput  from "../../components/CustomTextInput";
import { isValidUserName, RfH, storeData, removeData } from "../../utils/helpers";
import Images from "../../theme/Images";
import NavigationRouteNames from "../../routes/ScreenNames";
import { useNavigation } from "@react-navigation/core";
import UserContext from "../../appContainer/context/user.context";
import styles from "./styles";
import commonStyles from "../../theme/commonStyles";
import { userLogin } from "./user";
import { LOCAL_STORAGE_DATA_KEY } from "../../utils/constants";
import { AppStyles } from "../../theme";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { useRoute } from '@react-navigation/native';
import { inputs } from '../../utils/constants';
import { NotificationService } from '../../services/firebase'

import logoImg from '../../assets/Images/Common/JaydeLogo01.png'

function LoginWithEmail() {
  const navigation = useNavigation();
  const route = useRoute();
  const [clickLogin, setClickLogin] = useState(false);
  const {
    isLogin,
    setUserObj,
    setLogin,
    setUserRole,
    setLoader
  } = useContext(UserContext);
  const [selectCompany, setSelectCompany] = useState({});
  const [hidePassword, setHidePassword] = useState(false);

  const [{ data, loading, error }, emLogin] = userLogin();
  const [firebaseToken, setFirebaseToken] = useState('')


  const triggerLogin = async (username, password) => {
    try {
      const { data } = await emLogin({ data: { email: username, password } });
      if (data.status) {
        await setLogin(data.status);
        await storeData(LOCAL_STORAGE_DATA_KEY.JWT_TOKEN, data.data.token);
        await storeData(LOCAL_STORAGE_DATA_KEY.USER_ROLE, data.data.business_type);
        await storeData(LOCAL_STORAGE_DATA_KEY.USER_NAME, data.data.name);
        await storeData(LOCAL_STORAGE_DATA_KEY.USER_PHONE, data.data.phone);
        await storeData(LOCAL_STORAGE_DATA_KEY.USER_EMAIL, data.data.email);

        console.log(data);
        await setUserRole(data.data.business_type);
        await setUserObj(data.data);
      } else {
        alert(data.message);
      }

    } catch (e) {
      console.log("Response error", e);
    }
  };

  useEffect(() => {
    if (error)
      setLoader(false)
  }, [error])

  useEffect(() => {
    setLoader(loading)
    return () => {
      setLoader(false)
    }
  }, [loading])

  const successHandler = (token) => {
    console.log(token)
    setFirebaseToken(token)
  }

  useEffect(() => {
    NotificationService.getFcmToken(successHandler)
  }, [])

  const validationSchema = Yup.object().shape({
    username: Yup.string().test(
      "username",
      "Please provide valid username",
      (value) => isValidUserName(value),
    ),
    password: Yup.string().required("Please provide password"),
  });

  const loginForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: () => triggerLogin(
      loginForm.values.username,
      loginForm.values.password,
      selectCompany,
    )
  });

  const handleLogin = async () => {
    setClickLogin(true);
    await loginForm.submitForm();
  };

  const forgotPassword = () => {
    navigation.navigate(NavigationRouteNames.PASSWORD_RESET);
  }

  const onSubmitEditing = (id) => {
    inputs[id] ? inputs[id].focus() : null;
  };

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: Colors.mango, justifyContent: 'space-between', height: Dimensions.get('window').height }}>
      <View>
        <View style={[AppStyles.alignCenter, AppStyles.mt40]}>
          <Image resizeMode='contain' source={logoImg} />
        </View>
        <View style={[AppStyles.alignCenter, AppStyles.mt40]}>
          <Text style={[AppStyles.txtWhiteBold, AppStyles.f40, AppStyles.pv10]}>
            Hello!
                </Text>
        </View>
        <View style={styles.formContainer}>
          <View style={AppStyles.pv20}>
            <CustomTextInput
              label={"Email"}
              inputLabelStyle={commonStyles.inputLabelStyle}
              placeholder={"Email"}
              value={loginForm.values.username}
              onChangeHandler={(value) =>
                loginForm.setFieldValue("username", value)
              }
              returnKeyType={"next"}
              onSubmitEditing={() => onSubmitEditing("password")}
              error={clickLogin && loginForm.errors.username}
            />
            <CustomTextInput
              label={"Password"}
              inputLabelStyle={commonStyles.inputLabelStyle}
              placeholder={"Password"}
              secureTextEntry={!hidePassword}
              showPasswordField={hidePassword}
              handleShowPassword={(value) => setHidePassword(value)}
              icon={hidePassword ? Images.openEye : Images.closeEye}
              value={loginForm.values.password}
              onChangeHandler={(value) =>
                loginForm.setFieldValue("password", value)
              }
              returnKeyType={"next"}
              onSubmitEditing={() => handleLogin()}
              showClearButton={false}
              keyboardType={"default"}
              refKey={"password"}
              error={clickLogin && loginForm.errors.password}
            />
          </View>
          <View style={{ marginTop: RfH(21) }}>
            <TouchableOpacity activeOpacity={0.8} onPress={handleLogin} style={styles.loginButton}>
              <Text style={[AppStyles.txtWhiteBold, AppStyles.f18]}>Confirm</Text>
              <FAIcon name="long-arrow-right" color={'#fff'} style={AppStyles.ml10} size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={{ alignSelf: 'flex-end', marginRight: 40, marginTop: 20 }}
          onPress={() => forgotPassword()}>
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f15]}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-end', marginBottom: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f15]}>Don't have an account?</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate(NavigationRouteNames.SIGNUP)}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f15, AppStyles.underline]}> Create one</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default LoginWithEmail;
