/* eslint-disable no-undef */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {isEmpty, isNumber} from 'lodash';
import * as Yup from "yup";
import { useFormik } from "formik";
import Colors from "../../theme/Colors";
import {
  CustomTextInput,
  GradientButton,
} from "../../components";
import {
  isValidUserName,
  RfH,
  storeData,
  removeData,
} from "../../utils/helpers";
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

function LoginWithEmail() {
  const navigation = useNavigation();
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

  const [{data, loading, error}, emLogin] = userLogin();


  const triggerLogin = async (username, password) => {
    try {
      const { data } = await emLogin({ data: { email: username, password } });
      console.log("Login Response", data);
      if (data.status) {
        await setLogin(data.status);
        await storeData(LOCAL_STORAGE_DATA_KEY.JWT_TOKEN, data.data.token);
        await storeData(LOCAL_STORAGE_DATA_KEY.USER_ROLE, data.data.business_type);
        await setUserRole(data.data.business_type);
        await setUserObj(data.data);
      } else {
        console.log("Login failed");
        alert(data.message);
      }

    } catch (e) {
      console.log("Response error", e);
    }
  };

  useEffect(()=>{
    setLoader(loading)
  },[loading])

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

  return (
    <View style={{ flex: 1, backgroundColor: Colors.mango }}>
      <ScrollView>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.select({ android: "height", ios: "padding" })}
          enabled
        >
          <View style={{ flex: 1 }}>
            <View
              style={[AppStyles.flexpointnine]}
            >
              <View style={[AppStyles.alignCenter, AppStyles.mt40]}>
                <Image style={{ width: 160, height: 55 }}
                  source={require("../../assets/Images/LoginWithEmail/JaydeLogo01.png")}
                />
              </View>
              <View style={[AppStyles.alignCenter, AppStyles.mt40]}>
                <Text style={[AppStyles.txtWhiteBold, AppStyles.f40, AppStyles.pv10]}>
                  Hello!
                </Text>
              </View>
              <View style={styles.formContainer}>
                <View style={{paddingHorizontal: 20}}>
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
                  showClearButton={false}
                  keyboardType={"default"}
                  refKey={"password"}
                  error={clickLogin && loginForm.errors.password}
                />
                </View>
                <View style={{ marginTop: RfH(21) }}>
                  <TouchableOpacity onPress={handleLogin} style={{ paddingLeft: 40, paddingRight: 20, backgroundColor: Colors.green, paddingVertical: 10, borderTopLeftRadius: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, alignItems:'center', alignSelf: 'flex-end', flexDirection:'row' }}>
                    <Text style={[AppStyles.txtWhiteBold, AppStyles.f18]}>Confirm</Text>
                    <FAIcon name="long-arrow-right" color={'#fff'} style={{marginLeft: 10}} size={20}/>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flex: 1 }}>
                <View
                  style={{
                    alignItems: "flex-end",
                    marginTop: 20,
                    marginRight: 25,
                  }}
                >
                  <Text style={{ marginLeft: 5, color: "#fff" }}>Forgot Password?</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{ color: "#fff", marginTop: 30, marginBottom: 30 }}
                  >
                    Dont have an account?
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationRouteNames.SIGNUP)}>
                    <Text
                      style={{ color: "#fff", textDecorationLine: "underline" }}
                    >
                      Create one
                    </Text>
                    </TouchableOpacity>
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
