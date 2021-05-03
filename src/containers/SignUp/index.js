import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, ScrollView, } from 'react-native';
import  DropDownPicker from "react-native-dropdown-picker";


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


function SignUp() {
  const navigation = useNavigation();
  const [clickLogin, setClickLogin] = useState(false);
  const {user, setUserObj, setLogin, orgLoading, orgData, setLoader} = useContext(UserContext);
  const [tries, setTries] = useState(2);
  const [selectCompany, setSelectCompany] = useState({});
  const [selectCompanyModal, setSelectCompanyModal] = useState(false);
  const [needHelpModal, setNeedHelpModal] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorObj, setErrorObj] = useState({
    errorDescription: '',
    errorTitle: 'Oops!',
    errorImage: Images.errorCredential,
  });

  const [ { data: emLoginData, loading: emLoginLoading, error: emLoginError}, emLogin ] = useAxios({ url: LOGIN_URL, method:"POST" }, { manual: true});
  
  const triggerLogin = async (username, password, org) => {
    try{
      console.log(response);
      setLoader(false);
      moveToHome()
    }
    catch(e){
      console.log("Error", e);
      setLoader(false);
    }
  };

  const moveToHome = () => {
    navigation.navigate(NavigationRouteNames.HOME, {});
  }


  const loginForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      name: '',
      username: '',
      password: '',
      phone: ''
    },
  });


  const handleLogin = () => {
    setLoader(true);
    triggerLogin(
      loginForm.values.username,
      loginForm.values.password,
      selectCompany,
    );

  };



  useEffect(()=>{
    setLoader(emLoginLoading);
  }, [emLoginLoading]);

  const _SignupFunc = async () => {
    if (rememberMe == true) {
      const URL = "http://ec2-52-91-165-234.compute-1.amazonaws.com/api/user/register"
    // alert(URL)
    // console.log(URL)
    axios.post(URL, {
        name: loginForm.values.name,
        email: loginForm.values.username,
        password: loginForm.values.password,
        phone: loginForm.values.phone,
        businessType: "seller",
        // device_name:device  
        // device_name: 'opppp'
    }).then(function (response) {
            console.log(response)
            alert(JSON.stringify(response))
        }).catch(function (error) {
            console.log(JSON.stringify(error), "hello");
            setLoading(false)
            if (error.response.data.errors) {
                Alert.alert("Error", Object.values(error.response.data.errors)[0][0])

            }
            else {
                Alert.alert("Error", error.response.data.message)
            }
            
        });
    } else { alert('please accept policy') }

}

  const [title,setTitle]=useState('Sign Up!');
  const [title1,setTitle1]=useState('Forgot Password?');
  const [title2,setTitle2]=useState('Dont have an account?');
  const [title3,setTitle3]=useState('Create one');
  const [title4,setTitle4]=useState('Signup');
  const [rememberMe,setRememberMe]=useState(false);

  return (
    <View style={{flex: 1,backgroundColor:Colors.mango}}>
      <ScrollView>

        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.select({android: 'height', ios: 'padding'})}
          enabled>
              <View style={{flex: 1,}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingBottom: RfH(40),
            }}>
            
           <View style={{alignItems: 'center', marginTop: 40,}}>
                 <Image style={{width: 160, height: 55}} source={require('../../assets/Images/signupImage/JaydeLogo01.png')}  />    
              </View> 

              <View style={{alignItems: 'center', marginTop: 20,}}>
              <Text style={{color: '#fff', marginBottom: 20, fontSize : 40, lineHeight: 48, fontWeight: 'bold',}}>{title}{JSON.stringify(emLoginData)}</Text>
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
                returnKeyType={'next'}
                onSubmitEditing={() => onSubmitEditing('name')}
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
                returnKeyType={'next'}
                onSubmitEditing={() => onSubmitEditing('password')}
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
                value={loginForm.values.phone}
                onChangeHandler={(value) =>
                  loginForm.setFieldValue('phone', value)
                }
                // returnKeyType={'next'}
                keyboardType={'numeric'}
                onSubmitEditing={() => onSubmitEditing('phone')}
                error={clickLogin && loginForm.errors.phone}
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
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              <TouchableOpacity style={{marginTop:20,
    borderRadius: 10,
    backgroundColor: 'orange',
    paddingVertical: 15,
    alignItems:'center'}} onPress={() => {_SignupFunc()}}>
                  <Text style={{fontSize: 18, color: 'white'}}>CONFIRM</Text>
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
