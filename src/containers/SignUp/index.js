import React, { useContext, useEffect, useState } from 'react';
import { Platform, TouchableOpacity, View, Text, Image } from 'react-native';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/core';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Checkbox from '@react-native-community/checkbox';
import Colors from '../../theme/Colors';
import CustomTextInput from '../../components/CustomTextInput';
import { isValidUserName, RfH, RfW, storeData } from '../../utils/helpers';
import CustomText from '../../components/CustomText';
import Images from '../../theme/Images';
import NavigationRouteNames from '../../routes/ScreenNames';
import UserContext from './../../appContainer/context/user.context';
import styles from './styles';
import commonStyles from '../../theme/commonStyles';
import { AppStyles } from "../../theme";
import { signUp } from './middleware';
import DropDown from '../../components/Picker/index';
import DeviceInfo from 'react-native-device-info';

// Image
import leftArrowImg from '../../assets/Images/Common/LeftArrowIcon.png';
import logoImg from '../../assets/Images/Common/JaydeLogo01.png';
import { inputs } from '../../utils/constants';

function SignUp() {
  const navigation = useNavigation();
  const [clickLogin, setClickLogin] = useState(false);

  const { user, setUserObj, setLogin, orgLoading, orgData, setLoader } = useContext(UserContext);
  const [tries, setTries] = useState(2);
  const [selectCompany, setSelectCompany] = useState({});
  const [selectCompanyModal, setSelectCompanyModal] = useState(false);
  const [needHelpModal, setNeedHelpModal] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [value, setValue] = useState(null);
  const [businesstype, setBusinesstype] = useState();
  const [rememberMe, setRememberMe] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorObj, setErrorObj] = useState({
    errorDescription: '',
    errorTitle: 'Oops!',
    errorImage: Images.errorCredential,
  });
  const [{ data, loading, error }, onSignUp] = signUp();

  const confirmSignup = async (name, username, password, phoneno, businesstype) => {
    setLoader(true)
    try {
      const { data } = await onSignUp({
        data: {
          name: name,
          email: username,
          phone: phoneno,
          password: password,
          businessType: businesstype,
          manufacturer: DeviceInfo.getManufacturerSync(),
          model: DeviceInfo.getModel(),
          osVersionRelease: Platform.Version,
          appVersion: DeviceInfo.getVersion(),
          fcmToken: firebaseToken,
          osType: Platform.OS === "ios" ? "Ios" : "Android",
          deviceId: DeviceInfo.getUniqueId()
        },
      });

      console.log(data)
      if (data.status) {
        alert(data.message)
        screenNavigate()
      } else {
        alert(data.message)
      }
      setLoader(false)
    } catch (e) {
      console.log('Response error', e);
    }

  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please provide name'),
    username: Yup.string().test('username', 'Please provide valid email', (value) => isValidUserName(value)),
    password: Yup.string().required('Please provide password'),
    phoneno: Yup.string().required('Please provide phone number'),
    businesstype: Yup.string().required('Please choose user type'),
    checkcondition: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
  });

  const loginForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      name: '',
      username: '',
      password: '',
      phoneno: '',
      businesstype: '',
      checkcondition: false,
    },
    validationSchema,
    onSubmit: () =>
      confirmSignup(
        loginForm.values.name,
        loginForm.values.username,
        loginForm.values.password,
        loginForm.values.phoneno,
        loginForm.values.businesstype,
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4)),
        selectCompany
      ),
  });

  const handleSignup = async () => {
    setClickLogin(true);
    await loginForm.submitForm();
  };

  const onChangeBusinesstype = (value) => {
    setBusinesstype(value);
  };

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.LOGIN_WITH_EMAIL);
  };

  const onSubmitEditing = (id) => {
    inputs[id] ? inputs[id].focus() : null;
  };

  useEffect(() => {
    if (error)
      setLoader(false)
  }, [error])

  useEffect(() => {
    return () => {
      setLoader(false)
    }
  })

  return (
    <View style={{ flex: 1, backgroundColor: Colors.mango }}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        behavior={Platform.select({ android: 'height', ios: 'padding' })}
        enabled>
        <View style={AppStyles.flex1}>
          <View style={[AppStyles.ml20, AppStyles.mt20]}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => screenNavigate()}>
              <Image source={leftArrowImg} />
            </TouchableOpacity>
          </View>

          <View style={[AppStyles.mt40, AppStyles.aligncen]}>
            <Image source={logoImg} resizeMode='contain' />
          </View>

          <View style={[AppStyles.mt20, AppStyles.aligncen]}>
            <Text style={[AppStyles.mt20, AppStyles.f40, AppStyles.txtWhiteBold, AppStyles.mb20]}>Sign Up!</Text>
          </View>

          <View style={[styles.formContainer, AppStyles.mb40]}>
            <CustomTextInput
              label="Name"
              inputLabelStyle={commonStyles.inputLabelStyle}
              placeholder="Please Enter Your Name"
              value={loginForm.values.name}
              onChangeHandler={(value) =>
                loginForm.setFieldValue('name', value)
              }
              returnKeyType={"next"}
              keyboardType='default'
              onSubmitEditing={() => onSubmitEditing("Email")}
              error={clickLogin && loginForm.errors.name}
            />
            <CustomTextInput
              refKey="Email"
              label="Email"
              inputLabelStyle={commonStyles.inputLabelStyle}
              placeholder="Please Enter Your Email"
              value={loginForm.values.username}
              onChangeHandler={(value) =>
                loginForm.setFieldValue('username', value)
              }
              keyboardType='email-address'
              returnKeyType={"next"}
              onSubmitEditing={() => onSubmitEditing("password")}
              error={clickLogin && loginForm.errors.username}
            />
            <CustomTextInput
              label="Password"
              inputLabelStyle={commonStyles.inputLabelStyle}
              placeholder="Please Enter Your Password"
              secureTextEntry={!hidePassword}
              showPasswordField={hidePassword}
              handleShowPassword={(value) => setHidePassword(value)}
              icon={hidePassword ? Images.openEye : Images.closeEye}
              value={loginForm.values.password}
              onChangeHandler={(value) => loginForm.setFieldValue('password', value)}
              returnKeyType="next"
              onSubmitEditing={() => onSubmitEditing('phone')}
              showClearButton={false}
              refKey="password"
              error={clickLogin && loginForm.errors.password}
            />
            <CustomTextInput
              refKey="phone"
              label="Phone Number"
              inputLabelStyle={commonStyles.inputLabelStyle}
              placeholder="Please Enter Your Phone Number"
              value={loginForm.values.phoneno}
              onChangeHandler={(value) => loginForm.setFieldValue('phoneno', value)}
              keyboardType="phone-pad"
              returnKeyType="done"
              error={clickLogin && loginForm.errors.phoneno}
            />

            <View style={{ marginTop: 15 }}>
              <Text style={commonStyles.inputLabelText}>Please choose User Type</Text>
              <DropDown
                items={[
                  { label: 'Seller', value: 'seller' },
                  { label: 'Aggregate', value: 'aggregate' },
                  { label: 'Recycler', value: 'recycler' },
                  { label: 'Epr', value: 'epr' },
                  { label: 'DRCC', value: 'drcc' },
                  { label: 'School', value: 'school' },
                ]}
                onValueChange={
                  (onChangeBusinesstype) => loginForm.setFieldValue('businesstype', onChangeBusinesstype) // {onChangeBusinesstype}
                }
                selectedValue={loginForm.values.businesstype}
                // selectedValue={businesstype}
                containerStyle={AppStyles.inputTxtStyle}
              />
              {clickLogin && loginForm.errors.businesstype ? (
                <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10), marginLeft: 5 }}>
                  {loginForm.errors.businesstype}
                </CustomText>
              ) : null}
            </View>

            <View>
              <View style={styles.checkBoxContainer}>
                <View style={[AppStyles.flexDir, AppStyles.aligncen]}>
                  <Checkbox
                    disabled={false}
                    value={loginForm.values.checkcondition}
                    tintColors={{ true: Colors.mango, false: '#777' }}
                    onValueChange={(newValue) => loginForm.setFieldValue('checkcondition', newValue)}
                  />
                  <View style={{ marginLeft: RfW(10) }}>
                    <CustomText color={Colors.black} fontSize={15} styling={{ paddingVertical: RfH(4) }}>
                      I agree to the Terms and Conditions
                    </CustomText>
                  </View>
                </View>
              </View>
              {clickLogin && loginForm.errors.checkcondition ? (
                <CustomText fontSize={15} color={Colors.red} styling={{ marginLeft: 5 }}>
                  {loginForm.errors.checkcondition}
                </CustomText>
              ) : null}
            </View>

            <View style={{ marginTop: RfH(10) }}>
              <TouchableOpacity activeOpacity={0.8} style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnPrimary, AppStyles.btnHeightwidth, AppStyles.inCenter]}
                onPress={() => handleSignup()}>
                <Text style={[AppStyles.f18, AppStyles.txtWhiteRegular]}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
export default SignUp;
