import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import * as Yup from "yup";
import { useFormik } from "formik";
import Colors from "../../theme/Colors";
import { CustomTextInput } from "../../components";
import { isValidUserName, RfH } from "../../utils/helpers";
import { useNavigation } from "@react-navigation/core";
import UserContext from "../../appContainer/context/user.context";
import styles from "./styles";
import commonStyles from "../../theme/commonStyles";
import { AppStyles } from "../../theme";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { forgotPassword } from './middleware';
import { useRoute } from '@react-navigation/native';
import NavigationRouteNames from '../../routes/ScreenNames';

//Image
import leftArrow from '../../assets/Images/ForgotPassword/LeftArrowIcon.png';
import Logo from '../../assets/Images/LoginWithEmail/JaydeLogo01.png';

function PasswordReset() {
  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader } = useContext(UserContext);
  const [clickLogin, setClickLogin] = useState(false);
  const [{ data, loading, error }, onForgotPassword] = forgotPassword();

  const passwordForgot = async (username) => {
    try {
      const { data } = await onForgotPassword({
        data: {
          email: username,
        },
      });
      alert(data);
      console.log(data)
      if (data.status) {
        alert(data.message)
        screenNavigate()
      } else {
        alert(data.message)
      }
    } catch (e) {
      console.log('Response error', e);
    }
  };

  useEffect(() => {
    if (error)
      setLoader(false)
  }, [error])


  useEffect(() => {
    return () => {
      setLoader(false)
    }
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string().test(
      "username",
      "Please provide valid email",
      (value) => isValidUserName(value),
    ),
  });

  const loginForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      username: "",
    },
    validationSchema,
    onSubmit: () => passwordForgot(
      loginForm.values.username,
    )
  });

  const handlePasswordReset = async () => {
    setClickLogin(true);
    await loginForm.submitForm();
  };

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.LOGIN_WITH_EMAIL);
  }

  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: Colors.mango, justifyContent: 'space-between', height: Dimensions.get('window').height }}>
      <View>
        <View style={[AppStyles.ml20, AppStyles.mt20]}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => screenNavigate()}>
            <Image source={leftArrow} />
          </TouchableOpacity>
        </View>
        <View style={[AppStyles.alignCenter, AppStyles.mt40]}>
          <Image style={{ width: 160, height: 55 }} source={Logo} />
        </View>
        <View style={[AppStyles.alignCenter, AppStyles.mt40]}>
          <Text style={[AppStyles.txtWhiteBold, AppStyles.f40, AppStyles.pv10]}>
            Hello!
                </Text>
        </View>
        <View style={styles.formContainer}>
          <View style={AppStyles.pv20}>
            <CustomTextInput
              label={"Existing Email"}
              inputLabelStyle={commonStyles.inputLabelStyle}
              placeholder={"Email"}
              value={loginForm.values.username}
              onChangeHandler={(value) =>
                loginForm.setFieldValue("username", value)
              }
              error={clickLogin && loginForm.errors.username}
            />
          </View>
          <View style={{ marginTop: RfH(21) }}>
            <TouchableOpacity activeOpacity={0.8} style={styles.loginButton} onPress={() => handlePasswordReset()}>
              <Text style={[AppStyles.txtWhiteBold, AppStyles.f18]}>Confirm</Text>
              <FAIcon name="long-arrow-right" color={'#fff'} style={AppStyles.ml10} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export default PasswordReset;
