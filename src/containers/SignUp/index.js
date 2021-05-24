import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, ScrollView, } from 'react-native';
import  DropDownPicker from "react-native-dropdown-picker";
import * as Yup from "yup";
import {useFormik} from 'formik';
import Colors from '../../theme/Colors';
import {CheckBoxWrapper, CustomTextInput, GradientButton,} from '../../components';
import {alertBox, comingSoonAlert, getSaveData, isValidUserName, RfH, RfW, storeData} from '../../utils/helpers';
import CustomText from '../../components/CustomText';
import Images from '../../theme/Images';
import NavigationRouteNames from '../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import UserContext from './user.context';
import useAxios from 'axios-hooks';
import styles from './styles';
import { ENDPOINT, LOGIN_URL } from '../../utils/urls';
import commonStyles from '../../theme/commonStyles';
import axios from "axios";
import { AppStyles } from "../../theme";
import { signUp } from './middleware';

//Image
import leftArrowImg from '../../assets/Images/ForgotPassword/LeftArrowIcon.png'


function SignUp() {
  const navigation = useNavigation();
  const [clickLogin, setClickLogin] = useState(false);
  const {user, setUserObj, setLogin, orgLoading, orgData, setLoader} = useContext(UserContext);
  const [tries, setTries] = useState(2);
  const [selectCompany, setSelectCompany] = useState({});
  const [selectCompanyModal, setSelectCompanyModal] = useState(false);
  const [needHelpModal, setNeedHelpModal] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [rememberMe,setRememberMe]=useState(false);
  const [showError, setShowError] = useState(false);
  const [errorObj, setErrorObj] = useState({
    errorDescription: '',
    errorTitle: 'Oops!',
    errorImage: Images.errorCredential,
  });
  const [{ data, loading, error }, onSignUp] = signUp();

  const confirmSignup = async (name, username, password, phoneno) => {

    const { data } = await onSignUp({
      data: {
        name: name,
        email: username,
        phone: phoneno,
        password: password,
      },
    });
 
    console.log(data)
    if (data.status) {
      alert(data.message)
      // screenNavigate()
    } else {
      alert(data.message)
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please provide name"),
    username: Yup.string().test(
      "username",
      "Please provide valid email",
      (value) => isValidUserName(value),
    ),
    password: Yup.string().required("Please provide password"),
    phoneno: Yup.string().required("Please provide phone number"),
  });

  const loginForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      name: "",
      username: "",
      password: "",
      phoneno: "",
    },
    validationSchema,
    onSubmit: () => confirmSignup(
      loginForm.values.name,
      loginForm.values.username,
      loginForm.values.password,
      loginForm.values.phoneno,
      selectCompany,
    )
  });

  const handleSignup = async () => {
    setClickLogin(true);
    await loginForm.submitForm();
  };

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.LOGIN_WITH_EMAIL);
  } 

  return (
    <View style={{flex: 1,backgroundColor:Colors.mango}}>
      <ScrollView>

        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.select({android: 'height', ios: 'padding'})}
          enabled>
              <View style={AppStyles.flex1}>
          <View>

              <View style={[AppStyles.ml20, AppStyles.mt20]}>
              <TouchableOpacity onPress={() => screenNavigate()}>
                  <Image
                    source={require("../../assets/Images/ForgotPassword/LeftArrowIcon.png")}
                  />
                </TouchableOpacity>
                </View>
            
           <View style={[AppStyles.mt40, AppStyles.aligncen]}>
                 <Image style={{width: 160, height: 55}} source={require('../../assets/Images/signupImage/JaydeLogo01.png')}  />    
              </View> 

              <View style={[AppStyles.mt20, AppStyles.aligncen]}>
              <Text 
               style={[AppStyles.mt20, AppStyles.f40, AppStyles.txtWhiteBold, AppStyles.mb20]}>Sign Up!</Text>
              </View>
            <View style={styles.formContainer}>
              <CustomTextInput
                label={'Name'}
                inputLabelStyle={commonStyles.inputLabelStyle}
                placeholder={'Please Enter Your Name'}
                value={loginForm.values.name}
                onChangeHandler={(value) =>
                  loginForm.setFieldValue('name', value)
                }
                 error={clickLogin && loginForm.errors.name}
              />
              <CustomTextInput
                label={'Email'}
                inputLabelStyle={commonStyles.inputLabelStyle}
                placeholder={'Please Enter Your Email'}
                value={loginForm.values.username}
                onChangeHandler={(value) =>
                  loginForm.setFieldValue('username', value)
                }
                error={clickLogin && loginForm.errors.username}
              />
              <CustomTextInput
                 label={'Password'}
                inputLabelStyle={commonStyles.inputLabelStyle}
                placeholder={'Please Enter Your Password'}
                secureTextEntry={!hidePassword}
                showPasswordField={hidePassword}
                handleShowPassword={(value) => setHidePassword(value)}
                 icon={hidePassword ? Images.openEye : Images.closeEye}
                value={loginForm.values.password}
                onChangeHandler={(value) =>
                  loginForm.setFieldValue('password', value)
                }
                returnKeyType={'next'}
                showClearButton={false}
                keyboardType={'password'}
                refKey={'password'}
                error={clickLogin && loginForm.errors.password}
              />
              <CustomTextInput
                label={'Phone Number'}
                inputLabelStyle={commonStyles.inputLabelStyle}
                placeholder={'Please Enter Your Phone Number'}
                value={loginForm.values.phoneno}
                onChangeHandler={(value) =>
                  loginForm.setFieldValue('phoneno', value)
                }
                keyboardType={'numeric'}
                error={clickLogin && loginForm.errors.phoneno}
              />

            <View style={{marginTop: 15}}>
              <Text style={commonStyles.inputLabelText}>Please choose User Type</Text>
              <DropDownPicker
                showArrow={true}
                items={[
                    // {label: 'USA', value: 'usa', hidden: true},
                    {label: 'Seller', value: 'seller'},
                    {label: 'Aggregator', value: 'aggregator'},
                    {label: 'Recycler', value: 'recycler'},
                    {label: 'EPR Partner', value: 'epr partner'},
                ]}
                defaultValue={"seller"}
                globalTextStyle={commonStyles.dropDownText}
                containerStyle={{height: 45}}
                style={{backgroundColor: '#e4e4e4'}}
                itemStyle={{
                    justifyContent: 'flex-start',
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => console.log(item)}
              />
            </View>

              <View style={styles.checkBoxContainer}>
                <View style={[AppStyles.flexDir, AppStyles.aligncen]}>
                  <CheckBoxWrapper
                    isChecked={rememberMe}
                    checkBoxHandler={() =>
                      setRememberMe((rememberMe) => !rememberMe)
                    }
                  />
                   <View style={{marginLeft: RfW(10)}}>
                    <CustomText
                      color={Colors.black}
                      fontSize={15}
                      styling={{paddingVertical: RfH(4)}}>
                      I agree to the Terms and Conditions
                    </CustomText>
                  </View> 
                </View>
              </View>

               <View style={{marginTop: RfH(10)}}>
              <TouchableOpacity style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv15, AppStyles.aligncen]}
                  onPress={() => handleSignup()}>
                  <Text style={[AppStyles.f18, AppStyles.txtWhiteRegular]}>CONFIRM</Text>
              </TouchableOpacity>
             </View>
             
            </View>

            </View>

          
               </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
export default SignUp;
