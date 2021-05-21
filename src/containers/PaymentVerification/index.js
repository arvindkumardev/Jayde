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
import * as yup from "yup";
import { weightConfirm, getUnits, weightPropose, paymentConfirm, pickupConfirm, receiptConfirm } from './middleware';
import UserContext from '../../appContainer/context/user.context';
import DropDown from '../../components/Picker/index';

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
  const [unitName, setUnitName] = useState('');

  const [customDate, setCustomDate] = useState(moment(new Date()).add(1, 'days').format('DD-MM-YYYY'));
  const [customDate1, setCustomDate1] = useState(moment(new Date()).add(1, 'days').format('DD-MM-YYYY'));
  const [customDate2, setCustomDate2] = useState(moment(new Date()).add(1, 'days').format('DD-MM-YYYY'));
  const [fromTime, setFromTime] = useState(moment(new Date()).format('hh:mm A'))
  const [toTime, setToTime] = useState(moment(new Date()).add(1, 'hours').format('hh:mm A'))
  const [pickerIndex, setPickerIndex] = useState() 

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [payment, setPayment] = useState(true);

  const [isEnabled, setIsEnabled] = useState(false);
  const [timeSlotIndex, setTimeSlotIndex] = useState('')
  const [clickConfirm, setClickConfirm] = useState(false);
  const [clickConfirm1, setClickConfirm1] = useState(false);
  const [clickConfirm2, setClickConfirm2] = useState(false);
  const [{ data: quoteData, loading, error }, onSubmitQuote] = weightConfirm();
  const [{ data: proposeData, loading1, error1 }, onSubmitProposeweight] = weightPropose();
  const [{ data: paymentData, loading2, error2 }, onSubmitPaymentconfirm] = paymentConfirm();
  const [{ data: pickupData, loading3, error3 }, onSubmitPickupconfirm] = pickupConfirm();
  const [{ data: receiptData, loading4, error4 }, onSubmitReceiptconfirm] = receiptConfirm();
  const [unitPickerData, setUnitData] = useState([]);
  const [{ data: unitsData }, onGetUnits] = getUnits();
  const [imgData, setImageData] = useState([])
  const [imgData1, setImageData1] = useState([])
  const [imgData2, setImageData2] = useState([])
  const [paymentmode, setPaymentmode] = useState('');
  const [detail, setDetail] = useState('');
  const [vehno, setVehno] = useState('');

  const handleConfirmweight = async (kantaslipno) => {   

    const {data} = await onSubmitQuote({
      data: {
        assignedId: item.assigned_id,
         kanta_slip_number: kantaslipno,
         kanta_slip_date:   customDate,
         uploaded_files: imgData,
      },
    });
    
    console.log(data)
    if(data.status){
       alert(data.message)
      // screenNavigate()
    } else {
       alert(data.message)
    }  
  };

  const handleProposemweight = async (Proposekantaslipno) => {   

    const {data} = await onSubmitProposeweight({
      data: {
        assignedId: item.assigned_id,
        newWeight: requestForm.values.volume,
        unit: requestForm.values.unit,
         kanta_slip_number: Proposekantaslipno,
         kanta_slip_date:   customDate1,
         uploaded_files: imgData1,
      },
    });
    
    console.log(data)
    if(data.status){
       alert(data.message)
    } else {
       alert(data.message)
    }  
  };

  const handlePaymentconfirm = async (paymentmade) => {   
    // console.log(paymentmade);
    // return
    const {data} = await onSubmitPaymentconfirm({
      data: {
         assignedId: item.assigned_id,
         paymentRequired: item.price,
         paymentMade: paymentmade,
         paymentMode: paymentmode,
         paymentDetails: detail,
      },
    });
    
    console.log(data)
    if(data.status){
      alert(data.message)
    } else {
      alert(data.message)
    }  
  };

  const handlePickupconfirm = async (item) => {   

    const {data} = await onSubmitPickupconfirm({
      data: {
         assignedId: item.assigned_id,
      },
    });
    
    console.log(data)
    if(data.status){
      alert(data.message)
    } else {
      alert(data.message)
    }  
  };

  const handleReceiptconfirm = async (item) => {   

    const {data} = await onSubmitReceiptconfirm({
      data: {
         assignedId: item.assigned_id,
         vehicleNumber: vehno,
         pickUpDate: customDate2,
         uploaded_files: imgData2,
      },
    });
    
    console.log(data)
    if(data.status){
      alert(data.message)
    } else {
      alert(data.message)
    }  
  };

  const onChangeUnit = (id) => {
    var pos = unitPickerData.findIndex(v => v.value == id) 
    if(pos != -1){
      setUnitName(unitPickerData[pos].label)      
    }
   requestForm.setFieldValue('unit', id)
 }

 useEffect(() => {
  if (unitsData) {
    const pickderData = unitsData.map((item) => ({ label: item.unit_name, value: item.id }));
    setUnitData(pickderData);
  }
}, [unitsData]);

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

  const onChange1 = (event, selectedDate) => {  
    setShow(false);     
    if(selectedDate){
      if(pickerIndex === 0){
        setCustomDate1(moment(selectedDate).format('DD-MM-YYYY'));
      } else if(pickerIndex === 1) {
        setFromTime(moment(selectedDate).format('hh:mm A'));
      } else if(pickerIndex === 2) {
        setToTime(moment(selectedDate).format('hh:mm A'));
      } 
    } else {
    }  
  };

  const onChange2 = (event, selectedDate) => {  
    setShow(false);     
    if(selectedDate){
      if(pickerIndex === 0){
        setCustomDate2(moment(selectedDate).format('DD-MM-YYYY'));
      } else if(pickerIndex === 1) {
        setFromTime(moment(selectedDate).format('hh:mm A'));
      } else if(pickerIndex === 2) {
        setToTime(moment(selectedDate).format('hh:mm A'));
      }  
    } else {
    }  
  };

  const validationSchema = yup.object().shape({
    kantaslipno: yup.string().required("Please Provide Kanta Slip Number"),
  });
  
  const requestForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      kantaslipno : '',
    },
    validationSchema,
    onSubmit: () => handleConfirmweight(
      requestForm.values.kantaslipno,
    )
  }); 

  const handelSubmitQuote = async () => {
    setClickConfirm(true)
    await requestForm.submitForm();
  }

  const validationSchema1 = yup.object().shape({
    Proposekantaslipno: yup.string().required("Please Provide Kanta Slip Number"),
  });
  
  const requestForm1 = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      Proposekantaslipno : '',
    },
    validationSchema1,
    onSubmit: () => handleProposemweight(
      requestForm1.values.Proposekantaslipno,
    )
  }); 

  const submitproposeweight = async () => {
    setClickConfirm1(true)
    await requestForm1.submitForm();
  }

  const validationSchema2 = yup.object().shape({
    // PaymentRequired: yup.string().required("Please Provide Payment"),
     paymentmade: yup
     .string()
    //  .min(1, 'Invalid Name').required('Required'),
    // .min(1, 'Invalid Name')
      .required('Please Provide Payment Details'),
    // PaymentMode: yup.string().required("Please Provide Payment Mode Details"),
    // PaymentDetails: yup.string().required("Please Provide Payment Details"),
  })
  
  const requestForm2 = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      // PaymentRequired : '',
        paymentmade : '',
      // PaymentMode : '',
      // PaymentDetails : '',
    },
    validationSchema2,
    onSubmit: () => handlePaymentconfirm(
      // requestForm2.values.PaymentRequired,
      requestForm2.values.paymentmade,
      // requestForm2.values.PaymentMode,
      // requestForm2.values.PaymentDetails,
    )
  }); 

  const handlesubmitPayment = async () => {
    setClickConfirm2(true)
    await requestForm2.submitForm();
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
      // setPrice(item.price)
    const title='Order Details';
    onGetUnits();
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

  const ImageData = (data) => {
    if(data){
     let listData = imgData;          
     let data1 = listData.concat(data);
     setImageData([...data1]); 
    }
  }

  const ImageData1 = (data) => {
    if(data){
     let listData1 = imgData1;          
     let data2 = listData1.concat(data);
     setImageData1([...data2]); 
    }
  }

  const ImageData2 = (data) => {
    if(data){
     let listData2 = imgData2;          
     let data3 = listData2.concat(data);
     setImageData2([...data3]); 
    }
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
                    <Text style={[AppStyles.txtSecandaryRegular, {color: imgData.length > 0 ?  Colors.green : Colors.warmGrey}]}>{imgData.length > 0 ? 'File Attached' : 'Attach File' }</Text>
                    <MIcon name="attachment" size={25} color={Colors.grayThree} />
                    </TouchableOpacity>
                    {clickConfirm && imgData.length === 0 ? (
                    <CustomText
                      fontSize={15}
                      color={Colors.red}
                      styling={{marginTop: RfH(10)}}>
                      Upload Picture
                    </CustomText>
                      ) : null}
                    <UploadDocument handleClose={() => setImageUpload(false)} 
                    isVisible={imageUpload}
                    ImageData = {ImageData} />
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
        handelSubmitQuote(item)
        setSelected(true)   
        setRememberMe(!rememberMe)
        setSlipNumber("")
      //  handleConfirmweight(item)
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
                <View>
                       <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 2, paddingRight: 10 }}>
              <TextInput
                placeholder="Enter volume"
                value={requestForm.values.volume}
                keyboardType = {'numeric'}
                onChangeText={(txt) => requestForm.setFieldValue("volume", txt)}
                style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}              
              />
              {clickConfirm && requestForm.errors.volume ? (
                <CustomText
                  fontSize={15}
                  color={Colors.red}
                  styling={{marginTop: RfH(10)}}>
                  {requestForm.errors.volume}
                </CustomText>
                ) : null}
             
            </View>
            <View style={{ flex: 1 }}>
              <DropDown
                items={unitPickerData}
                placeholderText="Units"
                //itemStyle={{ color: '#000' }}
                onValueChange = {onChangeUnit}               
                selectedValue={requestForm.values.unit}
                containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
              />

               {clickConfirm && requestForm.errors.unit ? (
                <CustomText
                  fontSize={15}
                  color={Colors.red}
                  styling={{marginTop: RfH(10)}}>
                  {requestForm.errors.unit}
                </CustomText>
                ) : null}
            </View>
          </View>

              </View>
           </View>

              <View style={{ marginTop: 20 }}>
                <View>
        <Text style={[Styles.inputLabelText, AppStyles.mt20]}>Kanta Slip Number</Text>
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
                <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{customDate1}</Text>
                </TouchableOpacity>
                {show && ( <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    minimumDate = {new Date(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'))}
                    mode={mode}
                    is24Hour={false}
                    display="default"
                    onChange={onChange1}
                  />)}
        </View> 
        </View>
        <View style={[style.flex1, AppStyles.ml10]}>
        <Text style={Styles.inputLabelText}>Upload Documents</Text>
        <View style={Styles.viewVolumeInputContainerK}>
        <TouchableOpacity style={[Styles.inputText, Styles.inputIcon, AppStyles.br10]} onPress={() => setImageUpload(!imageUpload)}>
                    {/* <Text style={Styles.txtFileUpload}>Upload file</Text> */}
                    <Text style={[AppStyles.txtSecandaryRegular, {color: imgData1.length > 0 ?  Colors.green : Colors.warmGrey}]}>{imgData1.length > 0 ? 'File Attached' : 'Attach File' }</Text>
                    <MIcon name="attachment" size={25} color={Colors.grayThree} />
                    </TouchableOpacity>
                    {clickConfirm && imgData1.length === 0 ? (
                    <CustomText
                      fontSize={15}
                      color={Colors.red}
                      styling={{marginTop: RfH(10)}}>
                      Upload Picture
                    </CustomText>
                      ) : null}
                    <UploadDocument handleClose={() => setImageUpload(false)} 
                    isVisible={imageUpload}
                    ImageData = {ImageData1} />
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
      //  submitproposeweight()
      //  handleProposemweight(item)
      submitproposeweight(item)
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
    <TextInput placeholder={"25,864"} editable={false} value={item.price} style={[Styles.inputTextf, Styles.Requiredprice]} />
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
              placeholder="Slip Number"
              value={requestForm2.values.paymentmade}
              onChangeText={(txt) => requestForm2.setFieldValue('paymentmade', txt)}
              style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
            />
             {clickConfirm2 && requestForm2.errors.paymentmade ? ( 
              <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{marginTop: RfH(10)}}>
                {requestForm2.errors.paymentmade}
                {/* hhfhh */}
              </CustomText>
             ) : null} 
  </View>

  <View style={[AppStyle.mt20,]}>
    <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mb6,]}>Payment Mode</Text>
    <TextInput placeholder={"Cash"} value={paymentmode} onChangeText={(txt) => setPaymentmode(txt)} style={Styles.inputText} />
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
    <TextInput placeholder={"1235567778"} value={detail} onChangeText={(txt) => setDetail(txt)} style={Styles.inputText} />
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

         {/* { payment == true ?  */}
          <View style={style.flexDir}>
  <View style={style.flex1}>
  <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
    <TouchableOpacity style={Styles.confirmButtonn} onPress={() => {setSelected1(true) 
      // setPayment(false) 
      }}>
      <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
    </TouchableOpacity>
  </View>
  </View>
  <View style={style.flex1}>
  <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
    <TouchableOpacity style={Styles.confirmButton} onPress={() => {
      setShouldShow6(!shouldShow6)
      // submitPayment()
      // handlePaymentconfirm(item)
      handlesubmitPayment(item)
    }}>
      <Text style={Styles.confirmBtnText}>CONFIRM</Text>
    </TouchableOpacity>
  </View>
  </View>
  </View>
  {/* : null} */}
              </View>
                   ) : null} 
                  {/* End Material pickup confirmation */}

                   {/* Start Confirm Pickup */}
             {!shouldShow6 ? (
             <View>
              <TouchableOpacity style={Styles.confirmButtonnabcd} onPress={() => {setSelected1(true)   
       setRememberMe1(!rememberMe1)
       handlePickupconfirm(item)
      }}>
                <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f17, AppStyle.mt10,]}>Confirm Pickup</Text>
              </TouchableOpacity>
            </View>
            ) : null}
            {/* End Confirm Pickup */}

                  <View style={[style.flexDir, AppStyle.mt20]}>
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
                  <TextInput placeholder={"Enter Vehicle Number"} value={vehno} onChangeText={(txt) => setVehno(txt)} style={Styles.inputText} />
                </View>

                <View style={[style.flexDir, Styles.viewVolume]}>
                <View style={style.flex1}>
                  <Text style={Styles.inputLabelText}>Date</Text>
                  <View style={Styles.viewVolumeInputContainerK}>
                   
                      <TouchableOpacity
                        onPress = {() => showDatepicker()}
                        style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary,AppStyles.br10,AppStyles.mb10, {padding:10}]}>
                      <FAIcon size={22} name='calendar-o' color = {Colors.mangoTwo} />
                      <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{customDate2}</Text>
                      </TouchableOpacity>
                      {show && ( <DateTimePicker
                          testID="dateTimePicker"
                          value={new Date()}
                          minimumDate = {new Date(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'))}
                          mode={mode}
                          is24Hour={false}
                          display="default"
                          onChange={onChange2}
                        />)}
                  </View> 
                  </View>
                  <View style={[style.flex1, AppStyle.ml10]}>
                  <Text style={Styles.inputLabelText}>Upload Documents</Text>
                  <View style={Styles.viewVolumeInputContainerK}>
                  <TouchableOpacity style={[Styles.inputText, Styles.inputIcon, AppStyles.br10]} onPress={() => setImageUpload(!imageUpload)}>
                    {/* <Text style={Styles.txtFileUpload}>Upload file</Text> */}
                    <Text style={[AppStyles.txtSecandaryRegular, {color: imgData2.length > 0 ?  Colors.green : Colors.warmGrey}]}>{imgData2.length > 0 ? 'File Attached' : 'Attach File' }</Text>
                    <MIcon name="attachment" size={25} color={Colors.grayThree} />
                    </TouchableOpacity>
                    {clickConfirm && imgData2.length === 0 ? (
                    <CustomText
                      fontSize={15}
                      color={Colors.red}
                      styling={{marginTop: RfH(10)}}>
                      Upload Picture
                    </CustomText>
                      ) : null}
                    <UploadDocument handleClose={() => setImageUpload(false)} 
                    isVisible={imageUpload}
                    ImageData = {ImageData2} />
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
                          setShouldShow5(!shouldShow5)
                          handleReceiptconfirm(item)}}>
                          <Text style={Styles.confirmBtnText}>CONFIRM</Text>
                        </TouchableOpacity>
                      </View>
                      </View>
                  </View>
             </View>  
             ) : null}
             {/* End material reached your warehouse */}

             {/* Start Confirm Receipt */}
             {/* {!shouldShow5 ? (
             <View>
              <TouchableOpacity style={Styles.confirmButtonnabcd} onPress={() => {setSelected3(true)   
       setRememberMe4(!rememberMe4)
      }}>
                <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f17, AppStyle.mt10,]}>Confirm Receipt</Text>
              </TouchableOpacity>
            </View>
            ) : null} */}
            {/* End Confirm Receipt */}

      
     
      {/* <View style={style.flexDir}>
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
      </View> */}
    </KeyboardAwareScrollView>
  );
};

export default PaymentVerification;
