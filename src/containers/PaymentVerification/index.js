import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, Button} from "react-native";
import { logout, RfH, RfW } from "../../utils/helpers";
import { useNavigation, useRoute } from "@react-navigation/native";
import Styles from './styles';
import { Colors, Fonts, AppStyles } from "../../theme";
import DropDownPicker from 'react-native-dropdown-picker';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Camera from '../../components/Camera';
import { launchImageLibrary } from "react-native-image-picker";
import NavigationRouteNames from '../../routes/ScreenNames';
import Appstyles from "../../theme/Styles/texts";
import AppStyle from "../../theme/Styles/spaces";
import style from "../../theme/Styles/container";
import CustomText from '../../components/CustomText';
import {CheckBoxWrapper, CustomTextInput, GradientButton,} from '../../components';
import Checkbox from "@react-native-community/checkbox";
import moment from 'moment';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UploadDocument } from '../../components/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormik } from "formik";
import * as Yup from "yup";

const PaymentVerification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selected,setSelected]=useState(false);
  const [selected1,setSelected1]=useState(false);
  const [selected2,setSelected2]=useState(false);
  const [selected3,setSelected3]=useState(false);
  const [rememberMe,setRememberMe]=useState(false);
  const [rememberMe1,setRememberMe1]=useState(false);
  const [rememberMe2,setRememberMe2]=useState(false);
  const [rememberMe3,setRememberMe3]=useState(false);
  const [rememberMe4,setRememberMe4]=useState(false);
  const [shouldShow, setShouldShow] = useState(true);
  const [shouldShow1, setShouldShow1] = useState(true);
  const [shouldShow2, setShouldShow2] = useState(true);
  const [shouldShow3, setShouldShow3] = useState(false);
  const [shouldShow4, setShouldShow4] = useState(true);
  const [shouldShow5, setShouldShow5] = useState(true);
  const [shouldShow6, setShouldShow6] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [wasteImage, setWasteImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [slipNumber,setSlipNumber] = useState("");
  const [item, setItem] = useState({});
  const [imageUpload, setImageUpload] = useState(false);

  const [customDate, setCustomDate] = useState(moment(new Date()).add(1, 'days').format('DD-MM-YYYY'));
  const [fromTime, setFromTime] = useState(moment(new Date()).format('hh:mm A'))
  const [toTime, setToTime] = useState(moment(new Date()).add(1, 'hours').format('hh:mm A'))
  const [pickerIndex, setPickerIndex] = useState() 

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const [timeSlotIndex, setTimeSlotIndex] = useState('')
  const [clickConfirm, setClickConfirm] = useState(false);
  const [clickConfirm1, setClickConfirm1] = useState(false);
  const [clickConfirm2, setClickConfirm2] = useState(false);

  useEffect(() => {
    setTimeSlotIndex('')
  }, [isEnabled])

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {  
    setPickerIndex(0) 
    showMode('date');
  };

  const showTimepicker = (index) => {
    setPickerIndex(index) 
    showMode('time');
  };

  const onChange = (event, selectedDate) => {  
    setShow(false);     
    if(selectedDate){
      if(pickerIndex === 0){
        setCustomDate(moment(selectedDate).format('DD-MM-YYYY'));
      } else if(pickerIndex === 1) {
        setFromTime(moment(selectedDate).format('hh:mm A'));
      } else if(pickerIndex === 2) {
        setToTime(moment(selectedDate).format('hh:mm A'));
      }
      //setShow(Platform.OS === 'ios');   
    } else {
    }  
  };

  const validationSchema = Yup.object().shape({
    kantaslipno: Yup.string().required("Please Provide Kanta Slip Number"),
  });
  
  const requestForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      kantaslipno : '',
    },
    validationSchema,
    onSubmit: () => handleConfirm(
      requestForm.values.kantaslipno,
    )
  }); 

  const validationSchema1 = Yup.object().shape({
    Proposekantaslipno: Yup.string().required("Please Provide Kanta Slip Numberdfdfdf"),
  });
  
  const requestForm1 = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      Proposekantaslipno : '',
    },
    validationSchema1,
    onSubmit: () => handleConfirm1(
      requestForm1.values.Proposekantaslipno,
    )
  }); 

  const validationSchema2 = Yup.object().shape({
    PaymentRequired: Yup.string().required("Please Provide Payment"),
    PaymentMade: Yup.string().required("Please Provide Payment Details"),
    PaymentMode: Yup.string().required("Please Provide Payment Mode Details"),
    PaymentDetails: Yup.string().required("Please Provide Payment Details"),
  });
  
  const requestForm2 = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      PaymentRequired : '',
      PaymentMade : '',
      PaymentMode : '',
      PaymentDetails : '',
    },
    validationSchema2,
    onSubmit: () => handleConfirm(
      requestForm2.values.PaymentRequired,
      requestForm2.values.PaymentMade,
      requestForm2.values.PaymentMode,
      requestForm2.values.PaymentDetails,
    )
  }); 

  const submitPayment = async () => {
    setClickConfirm2(true)
    await requestForm2.submitForm();
  }

  const submitproposeweight = async () => {
    // alert("hi");
    setClickConfirm1(true)
    await requestForm1.submitForm();
  }

  const handelSubmitQuote = async () => {
    setClickConfirm(true)
    await requestForm.submitForm();
  }

  const onShowCamera = () => {
    console.log(showCamera);
    setShowCamera(!showCamera);
  };

  const onClose = () => {
    setShowCamera(false);
  };

  const onLibraryOpen = () => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setWasteImage(response);
      }
    });
  };

  const onTakePic = (imageObject) => {
    console.log(imageObject.base64);
    setWasteImage(imageObject);
    setBase64Image(imageObject.base64);
    setShowCamera(false);
  };

  const onRemoveImage = () => {
    setWasteImage(null);
    setBase64Image("");
  };

  useLayoutEffect(() => {
     const { Item } = route.params;  
     setItem(Item)   
    const title='Order Details';
   navigation.setOptions({
    title,
  });
  }, []);

  const handleConfirm = () => {
    // navigation.navigate(NavigationRouteNames.CONFIRMATION);
  };

  const handleConfirm1 = () => {
    // navigation.navigate(NavigationRouteNames.CONFIRMATION);
  };

  const selectedCheckbox = (rememberMe) => {
    if (selected) {
      setRememberMe(rememberMe);
      setSelected(false);
    }  else {
      // alert("Please Fill The Details First");
    }
  }

  const selectedCheckbox1 = (rememberMe1) => {
    if (selected1) {
      setRememberMe1(rememberMe1);
      setSelected1(false);
    }  else {
      // alert("Please Fill The Details First");
    }
  }

  const selectedCheckbox2 = (setRememberMe4) => {
    if (selected3) {
      setRememberMe4(rememberMe4);
      setSelected3(false);
    }  else {
       //alert("Please Fill The Material Pick-up confirmation First");
    }
  }

  const dataSubmit = () => {
    if (rememberMe) {
      setShouldShow1(!shouldShow1)
    }
    else {
      alert("Please Fill The Material Weighted First");
    }
  }

  const dataSubmit1 = () => {
    if (rememberMe1) {
      setShouldShow4(!shouldShow4)
    }
    else {
      alert("Please Fill The Material Pick-up confirmation First");
    }
  }

  const proposeWeight = (shouldShow3,selected2) => {
    setShouldShow3(shouldShow3);
    setSelected2(selected2);
  }
  return (
    <KeyboardAwareScrollView style={{ flex: 1, paddingHorizontal: RfW(20), backgroundColor: '#ffffff', }}>

       <View style={Appstyles.aligncen}>
       <Text style={[Appstyles.txtBlackBold, Appstyles.f17, AppStyle.mt30,]}>Ref No- {item.order_no}</Text>
       </View>
       <View style={Styles.boxView}>

         <View style={[style.flexDir, AppStyle.mt10,]}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Waste type</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>{item.category_name}</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Waste sub category</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>{item.sub_category_name}</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Volume</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>{item.qty} {item.unit_name}</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Purchase Date</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>{moment(item.pickup_date).format('DD-MMM-YY')}</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Purchase amount</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}><FAIcon size={14} name="rupee" /> {item.price}</Text>
           </View>
           </View>

       </View>

      <View style={[style.flexDir, AppStyle.mt35,]}>
      <TouchableOpacity style={[style.flexpointfour]} onPress={() => {setShouldShow(!shouldShow)   
      setShouldShow3(false)
      setSelected2(false)}}>
        <Text style={[Appstyles.txtBlackRegular, Appstyles.f15,]}>Is the material Weighted</Text>
      </TouchableOpacity>
     

      <View style={[style.flexpointsix, AppStyle.mt10, Appstyles.alignfend, AppStyle.mr10]}>
                  <CheckBoxWrapper
                    isChecked={rememberMe}
                    checkBoxHandler={() =>
                      selectedCheckbox((rememberMe) => !rememberMe)
                    }
                  />
                  </View>
             
                  </View>
                  {shouldShow ? (

        // start view
        <View>
         <View style={style.flexDir}>
            <View style={style.flex1}>
            <View>
              <TouchableOpacity style={{ marginTop: 20,
    borderRadius: 10,
    // backgroundColor:Colors.mango,
    backgroundColor: shouldShow3 == true ? Colors.mango : Colors.grayBackground,
    alignItems:'center',
    height: 44,
    width: 154,}} onPress={() => {proposeWeight(true,false)}}>
                {/* <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10,]}>Confirm Weight</Text> */}
                <Text style={{fontSize: 15, marginTop: 10, 
                color: shouldShow3 == true ? Colors.white : Colors.warmGrey, }}>Confirm Weight</Text>
              </TouchableOpacity>
            </View>
            </View>
            <View style={style.flex1}>
            <View>
              <TouchableOpacity style={{  marginTop:20,
    borderRadius: 10,
    backgroundColor: selected2 == true ? Colors.mango : Colors.grayBackground,
    // backgroundColor:Colors.grayBackground,
    height: 44,
    width: 154,
    alignItems:'center',
    marginLeft: 9,}} onPress={() => {proposeWeight(false,true)}}>
                <Text style={{fontSize: 15, marginTop: 10, 
                color: selected2 == true ? Colors.white : Colors.warmGrey, }}>Propose Weight</Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
      </View>
   
        // End View
        ) : null}

             {/* Start Confirm Weight */}
             {shouldShow3 == true ? (
             <View>

                <View style={{ marginTop: 20 }}>
                  <View>
                  <Text style={Styles.inputLabelText}>Kanta Slip Number</Text>
                  </View>
                  {/* <TextInput placeholder={"Slip Number"} style={Styles.inputText} /> */}
                  <View>
            <TextInput
              value={requestForm.values.kantaslipno}
              placeholder="Slip Number"
              onChangeText={(txt) => requestForm.setFieldValue('kantaslipno', txt)}
              style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
            />
             {clickConfirm && requestForm.errors.kantaslipno ? ( 
              <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{marginTop: RfH(10)}}>
                {requestForm.errors.kantaslipno}
                {/* hhfhh */}
              </CustomText>
             ) : null} 
              </View>
                </View>

                <View style={[style.flexDir,, Styles.viewVolume]}>
                <View style={style.flex1}>
                  <Text style={Styles.inputLabelText}>Date</Text>
                  <View style={Styles.viewVolumeInputContainerK}>
                      <TouchableOpacity
                  onPress = {() => showDatepicker()}
                  style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary,AppStyles.br10,AppStyles.mb10, {padding:10}]}>
                <FAIcon size={22} name='calendar-o' color = {Colors.mangoTwo} />
                <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{customDate}</Text>
                </TouchableOpacity>
                {show && ( <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    minimumDate = {new Date(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'))}
                    mode={mode}
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                  />)}
                  </View> 
                  </View>
                  <View style={[style.flex1, AppStyles.ml10]}>
                  <Text style={Styles.inputLabelText}>Upload Documents</Text>
                  <View style={Styles.viewVolumeInputContainerK}>
                  <View style={AppStyles.flexpointfive}>
                    <TouchableOpacity style={[Styles.inputText, Styles.inputIcon, AppStyles.br10]} onPress={() => setImageUpload(!imageUpload)}>
                    <Text style={Styles.txtFileUpload}>Upload file</Text>
                    <MIcon name="attachment" size={25} color={Colors.grayThree} />
                    </TouchableOpacity>
                    <UploadDocument handleClose={() => setImageUpload(false)} 
                    isVisible={imageUpload} />
                    </View>
                  </View> 
                  </View>
                  </View>

                  <View style={style.flexDir}>
                      <View style={style.flex1}>
                      <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
                        <TouchableOpacity style={Styles.confirmButtonn} onPress={handleConfirm}>
                          <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
                        </TouchableOpacity>
                      </View>
                      </View>
                      <View style={style.flex1}>
                      <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
                        <TouchableOpacity style={Styles.confirmButton} onPress={() => {
        setSelected(true)   
        setRememberMe(!rememberMe)
        setSlipNumber("")
       handelSubmitQuote()
      }}>
                          <Text style={Styles.confirmBtnText}>CONFIRM</Text>
                        </TouchableOpacity>
                      </View>
                      </View>
                  </View>
             </View>  
             ) : null || selected2 == true ? ( 
              <View>
                  <View style={Styles.viewVolume}>
                <Text style={Styles.inputLabelText}>Enter New Volume</Text>
                <View style={Styles.viewVolumeInputContainer}>
                  <TextInput
                    placeholder={"Enter Volume"}
                    style={[Styles.inputText, Styles.locationTxt]}
                  />
                  <DropDownPicker
                    items={[
                      { label: "USA", value: "usa", hidden: true },
                      { label: "Units", value: "0" },
                      { label: "France", value: "france" },
                    ]}
                    defaultValue={'0'}
                    globalTextStyle={Styles.dropDownText}
                    containerStyle={{ height: 45, flex: 2 }}
                    style={{ backgroundColor: "#e4e4e4" }}
                    itemStyle={{
                      justifyContent: "flex-start",
                    }}
                    dropDownStyle={{ backgroundColor: "#fafafa" }}
                    onChangeItem={(item) => console.log(item)}
                  />
              </View>
           </View>

              <View style={{ marginTop: 20 }}>
                <View>
        <Text style={Styles.inputLabelText}>Kanta Slip Number</Text>
        </View>
         <View>
            <TextInput
              value={requestForm1.values.Proposekantaslipno}
              placeholder="Slip Number"
              onChangeText={(txt) => requestForm1.setFieldValue('Proposekantaslipno', txt)}
              style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
            />
               {clickConfirm1 && requestForm1.errors.Proposekantaslipno ? (  
              <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{marginTop: RfH(10)}}>
                {requestForm1.errors.Proposekantaslipno}
                {/* hhfhh */}
              </CustomText>
               ) : null}    
              </View>
      </View>

      <View style={[style.flexDir,, Styles.viewVolume]}>
      <View style={style.flex1}>
        <Text style={Styles.inputLabelText}>Date</Text>
        <View style={Styles.viewVolumeInputContainerK}>
          <TouchableOpacity
                  onPress = {() => showDatepicker()}
                  style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary,AppStyles.br10,AppStyles.mb10, {padding:10}]}>
                <FAIcon size={22} name='calendar-o' color = {Colors.mangoTwo} />
                <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{customDate}</Text>
                </TouchableOpacity>
                {show && ( <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    minimumDate = {new Date(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'))}
                    mode={mode}
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                  />)}
        </View> 
        </View>
        <View style={[style.flex1, AppStyles.ml10]}>
        <Text style={Styles.inputLabelText}>Upload Documents</Text>
        <View style={Styles.viewVolumeInputContainerK}>
        <TouchableOpacity style={[Styles.inputText, Styles.inputIcon, AppStyles.br10]} onPress={() => setImageUpload(!imageUpload)}>
                    <Text style={Styles.txtFileUpload}>Upload file</Text>
                    <MIcon name="attachment" size={25} color={Colors.grayThree} />
                    </TouchableOpacity>
                    <UploadDocument handleClose={() => setImageUpload(false)} 
                    isVisible={imageUpload} />
        </View> 
        </View>
        </View>

        <View style={style.flexDir}>
            <View style={style.flex1}>
            <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
              <TouchableOpacity style={Styles.confirmButtonn} onPress={handleConfirm}>
                <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
              </TouchableOpacity>
            </View>
            </View>
            <View style={style.flex1}>
            <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
              <TouchableOpacity style={Styles.confirmButton} onPress={() => {
        setSelected(true)   
        setRememberMe(!rememberMe)
        setSlipNumber("")
       submitproposeweight()
      }}>
                <Text style={Styles.confirmBtnText}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
            </View>
        </View>
   </View>  
             ) : null  } 
             {/* End Confirm Weight */}


             
        
  
         {/* Start Material pickup confirmation */}
        <View style={[style.flexDir, AppStyle.mt20,]}>
      <TouchableOpacity style={[style.flexpointfour]} onPress={() => dataSubmit()}>
        <Text style={[Appstyles.txtBlackRegular, Appstyles.f15,]}>Material Pick-up confirmation</Text>
      </TouchableOpacity>
     

      <View style={[style.flexpointsix, AppStyle.mt10, Appstyles.alignfend, AppStyle.mr10]}>
                  <CheckBoxWrapper
                    isChecked={rememberMe1}
                    checkBoxHandler={() =>
                      selectedCheckbox1((rememberMe1) => !rememberMe1)
                    }
                  />
                  </View>
             
                  </View>
                  {!shouldShow1 ? (
                <View>
                <View style={[AppStyle.mt20,]}>
    <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mb6,]}>Payment Required</Text>
    <View style={{flex: 1, flexDirection: 'row'}}>
    <TextInput placeholder={"25,864"} style={Styles.inputTextf} />
    <FAIcon style={Styles.rupee} size={15} name="rupee" />
    </View>
    </View>

  <View style={[AppStyle.mt20,]}>
    <View style={style.flexDir}>
    <View style={style.flexpointseven}>
    <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mb6]}>Payment Made</Text>
    </View>
    <View style={style.flexpointthree}>
    <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f11,  AppStyle.ml30, AppStyle.mt5]}>enter value</Text>
    </View>
    </View>
    {/* <TextInput placeholder={"25,864"} style={Styles.inputText} /> */}
    <TextInput
              value={requestForm2.values.PaymentMade}
              placeholder="Slip Number"
              onChangeText={(txt) => requestForm2.setFieldValue('PaymentMade', txt)}
              style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
            />
             {clickConfirm2 && requestForm2.errors.PaymentMade ? ( 
              <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{marginTop: RfH(10)}}>
                {requestForm2.errors.PaymentMade}
                {/* hhfhh */}
              </CustomText>
             ) : null} 
  </View>

  <View style={[AppStyle.mt20,]}>
    <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mb6,]}>Payment Mode</Text>
    <TextInput placeholder={"Cash"} style={Styles.inputText} />
  </View>

  <View style={[AppStyle.mt20,]}>
    <View style={style.flexDir}>
    <View style={style.flexpointsix}>
    <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mb6,]}>Payment Details</Text>
    </View>
    <View style={style.flexpointfour}>
    <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f11, AppStyle.mt5, AppStyle.ml20,]}>Transaction number</Text>
    </View>
    </View>
    <TextInput placeholder={"1235567778"} style={Styles.inputText} />
  </View>

  <View>
            <View style={[style.flexDir, style.alignCenter, AppStyle.mt20]}>
            <Checkbox
                        disabled={false}
                        value={true}
                        tintColors={{ true: Colors.mango, false: '#777' }}
                        onValueChange={(newValue) => console.log(newValue)}
                    />
               <View style={{marginLeft: RfW(10)}}>
                <CustomText
                  color={Colors.warmGrey}
                  fontSize={15}
                  styling={{paddingVertical: RfH(4)}}>
                  I agree to the terms and conditions
                </CustomText>
              </View> 
            </View>
          </View>

          <View style={style.flexDir}>
  <View style={style.flex1}>
  <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
    <TouchableOpacity style={Styles.confirmButtonn} onPress={() => setSelected1(true)}>
      <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
    </TouchableOpacity>
  </View>
  </View>
  <View style={style.flex1}>
  <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
    <TouchableOpacity style={Styles.confirmButton} onPress={() => {
      setShouldShow6(!shouldShow6)
      submitPayment()
    }}>
      <Text style={Styles.confirmBtnText}>CONFIRM</Text>
    </TouchableOpacity>
  </View>
  </View>
  </View>
              </View>
                   ) : null} 
                  {/* End Material pickup confirmation */}

                   {/* Start Confirm Pickup */}
             {!shouldShow6 ? (
             <View>
              <TouchableOpacity style={Styles.confirmButtonnabcd} onPress={() => {setSelected1(true)   
       setRememberMe1(!rememberMe1)
      }}>
                <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f17, AppStyle.mt10,]}>Confirm Pickup</Text>
              </TouchableOpacity>
            </View>
            ) : null}
            {/* End Confirm Pickup */}

                  <View style={[style.flexDir, AppStyle.mt20,]}>
      <TouchableOpacity style={[style.flexpointsix]} onPress={() => dataSubmit1()}>
        <Text style={[Appstyles.txtBlackRegular, Appstyles.f15,]}>Has the material reached your warehouse</Text>
      </TouchableOpacity>
     

      <View style={[style.flexpointfour, AppStyle.mt10, Appstyles.alignfend, AppStyle.mr10]}>
                  <CheckBoxWrapper
                   style={{width: 50, height: 50}}
                    isChecked={rememberMe4}
                    checkBoxHandler={() =>
                      // setRememberMe2((setRememberMe2) => !rememberMe2)
                      selectedCheckbox2((setRememberMe4) => !rememberMe4)
                    }
                  />
                  </View>
             
                  </View>

                   {/* Start material reached your warehouse */}
             {!shouldShow4 ? (
             <View>
                        <View style={{ marginTop: 20 }}>
                  <Text style={Styles.inputLabelText}>Vehicle Number</Text>
                  <TextInput placeholder={"Enter Vehicle Number"} style={Styles.inputText} />
                </View>

                <View style={[style.flexDir, Styles.viewVolume]}>
                <View style={style.flex1}>
                  <Text style={Styles.inputLabelText}>Date</Text>
                  <View style={Styles.viewVolumeInputContainerDate}>
                   
                      <TouchableOpacity
                        onPress = {() => showDatepicker()}
                        style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary,AppStyles.br10,AppStyles.mb10, {padding:10}]}>
                      <FAIcon size={22} name='calendar-o' color = {Colors.mangoTwo} />
                      <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{customDate}</Text>
                      </TouchableOpacity>
                      {show && ( <DateTimePicker
                          testID="dateTimePicker"
                          value={new Date()}
                          minimumDate = {new Date(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'))}
                          mode={mode}
                          is24Hour={false}
                          display="default"
                          onChange={onChange}
                        />)}
                  </View> 
                  </View>
                  <View style={[style.flex1, AppStyle.ml10]}>
                  <Text style={Styles.inputLabelText}>Upload Documents</Text>
                  <View style={Styles.viewVolumeInputContainerK}>
                  <TouchableOpacity style={[Styles.inputText, Styles.inputIcon, AppStyles.br10]} onPress={() => setImageUpload(!imageUpload)}>
                    <Text style={Styles.txtFileUpload}>Upload file</Text>
                    <MIcon name="attachment" size={25} color={Colors.grayThree} />
                    </TouchableOpacity>
                    <UploadDocument handleClose={() => setImageUpload(false)} 
                    isVisible={imageUpload} />
                  </View> 
                  </View>
                  </View>

                  <View style={style.flexDir}>
                      <View style={style.flex1}>
                      <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
                        <TouchableOpacity style={Styles.confirmButtonn} onPress={handleConfirm}>
                          <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
                        </TouchableOpacity>
                      </View>
                      </View>
                      <View style={style.flex1}>
                      <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
                        <TouchableOpacity style={Styles.confirmButton} onPress={() => setShouldShow5(!shouldShow5)}>
                          <Text style={Styles.confirmBtnText}>CONFIRM</Text>
                        </TouchableOpacity>
                      </View>
                      </View>
                  </View>
             </View>  
             ) : null}
             {/* End material reached your warehouse */}

             {/* Start Confirm Receipt */}
             {!shouldShow5 ? (
             <View>
              <TouchableOpacity style={Styles.confirmButtonnabcd} onPress={() => {setSelected3(true)   
       setRememberMe4(!rememberMe4)
      }}>
                <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f17, AppStyle.mt10,]}>Confirm Receipt</Text>
              </TouchableOpacity>
            </View>
            ) : null}
            {/* End Confirm Receipt */}

      
     
      <View style={style.flexDir}>
      <View style={style.flex1}>
      <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
        <TouchableOpacity style={Styles.confirmButtonn} onPress={handleConfirm}>
          <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
        </TouchableOpacity>
      </View>
      </View>
      <View style={style.flex1}>
      <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
        <TouchableOpacity style={Styles.confirmButton} onPress={handleConfirm}>
          <Text style={Styles.confirmBtnText}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
      </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PaymentVerification;
