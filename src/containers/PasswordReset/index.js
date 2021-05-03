/* eslint-disable no-undef */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from "react";
import {View, Text, Image, ScrollView, TouchableOpacity, Dimensions} from "react-native";
import * as Yup from "yup";
import { useFormik } from "formik";
import Colors from "../../theme/Colors";
import {CustomTextInput, GradientButton,} from "../../components";
import {isValidUserName, RfH, storeData, removeData,} from "../../utils/helpers";
import { useNavigation } from "@react-navigation/core";
import UserContext from "../../appContainer/context/user.context";
import styles from "./styles";
import commonStyles from "../../theme/commonStyles";
import { AppStyles } from "../../theme";
import FAIcon from "react-native-vector-icons/FontAwesome";

function PasswordReset() {
  const navigation = useNavigation();
  const [clickLogin, setClickLogin] = useState(false);
  const {isLogin, setUserObj, setLogin, setUserRole, setLoader} = useContext(UserContext);
  const [selectCompany, setSelectCompany] = useState({});
  const [hidePassword, setHidePassword] = useState(false);


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


  return (
      <ScrollView contentContainerStyle={{backgroundColor:Colors.mango, justifyContent:'space-between', height: Dimensions.get('window').height}}>
            <View>
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
                <View style={AppStyles.pv20}>
                  <CustomTextInput
                    label={"Existing Email"}
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
                </View>
                <View style={{ marginTop: RfH(21) }}>
                  <TouchableOpacity style={styles.loginButton}>
                    <Text style={[AppStyles.txtWhiteBold, AppStyles.f18]}>Confirm</Text>
                    <FAIcon name="long-arrow-right" color={'#fff'} style={AppStyles.ml10} size={20}/>
                  </TouchableOpacity>
                </View>
              </View>
              </View>
      </ScrollView>
  );
}

export default PasswordReset;
