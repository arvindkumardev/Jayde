import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, Button } from "react-native";
import { RfH, RfW } from "../../utils/helpers";
import { useNavigation, useRoute } from "@react-navigation/native";
import Styles from './styles';
import { Colors, Fonts, AppStyles } from "../../theme";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationRouteNames from '../../routes/ScreenNames';
import CustomText from '../../components/CustomText';
import { CheckBoxWrapper, CustomTextInput, GradientButton, } from '../../components';
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
  const [selected, setSelected] = useState(false);
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [rememberMe1, setRememberMe1] = useState(false);

  const [rememberMe4, setRememberMe4] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);
  const [shouldShow1, setShouldShow1] = useState(true);
  const [shouldShow3, setShouldShow3] = useState(false);
  const [shouldShow4, setShouldShow4] = useState(true);
  const [shouldShow5, setShouldShow5] = useState(true);
  const [shouldShow6, setShouldShow6] = useState(true);

  const [item, setItem] = useState({});
  const [imageUpload, setImageUpload] = useState(false);
  const [imageUpload1, setImageUpload1] = useState(false);
  const [warehouseimageUpload, setWarehouseimageUpload] = useState(false);
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
  const [conweight, setConweight] = useState(true);
  const [proposeweight, setProposeweight] = useState(true);
  const [conpayment, setConpayment] = useState(true);
  const [reachedwarehouse, setReachedwarehouse] = useState(true);
  const [checkcondition, setCheckcondition] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const [timeSlotIndex, setTimeSlotIndex] = useState('')
  const [clickWeightConfirm, setWeightClickConfirm] = useState(false);
  const [proposeClickConfirm, setProposeClickConfirm] = useState(false);
  const [paymentClickConfirm, setPaymentClickConfirm] = useState(false);
  const [receiptClickConfirm, setReceiptClickConfirm] = useState(false);

  // ---------------------- Start Api Section ---------------------
  const [{ data: quoteData, loading, error }, onSubmitQuote] = weightConfirm();
  const [{ data: proposeData, loading1, error1 }, onSubmitProposeWeight] = weightPropose();
  const [{ data: paymentData, loading2, error2 }, onSubmitPaymentConfirm] = paymentConfirm();
  const [{ data: pickupData, loading3, error3 }, onSubmitPickupConfirm] = pickupConfirm();
  const [{ data: receiptData, loading4, error4 }, onSubmitReceiptConfirm] = receiptConfirm();
  // ---------------------- End Api Section ---------------------

  const [unitPickerData, setUnitData] = useState([]);
  const [{ data: unitsData }, onGetUnits] = getUnits();
  const [imgData, setImageData] = useState([])
  const [imgData1, setImageData1] = useState([])
  const [imgData2, setImageData2] = useState([])
  const [paymentmode, setPaymentmode] = useState('');
  const [detail, setDetail] = useState('');
  const [vehno, setVehno] = useState('');

  const handleConfirmWeight = async (kantaSlipNo) => {
    if (imgData.length == 0)
      return
    const { data } = await onSubmitQuote({
      data: {
        assignedId: item.assigned_id,
        kanta_slip_number: kantaSlipNo,
        kanta_slip_date: customDate,
        uploaded_files: imgData,
      },
    });

    console.log(data)
    if (data.status) {
      setSelected(false)
      setConweight(false)
      setRememberMe(!rememberMe)
      alert(data.message)
      // screenNavigate()
    } else {
      alert(data.message)
    }
  };

  const handleProposeWeight = async (volume, unit, Proposekantaslipno) => {
    if (imgData1.length === 0)
      return

    const { data } = await onSubmitProposeWeight({
      data: {
        assignedId: item.assigned_id,
        newWeight: volume,
        unit: unit,
        kanta_slip_number: Proposekantaslipno,
        kanta_slip_date: customDate1,
        uploaded_files: imgData1,
      },
    });

    console.log(data)
    if (data.status) {
      setSelected(false)
      setProposeweight(false)
      setRememberMe(!rememberMe)
      alert(data.message)
    } else {
      alert(data.message)
    }
  };

  const handlePaymentConfirm = async (paymentmade, paymentmode, paymentdetails) => {
    const { data } = await onSubmitPaymentConfirm({
      data: {
        assignedId: item.assigned_id,
        paymentRequired: item.price,
        paymentMade: paymentmade,
        paymentMode: paymentmode,
        paymentDetails: paymentdetails,
      },
    });

    console.log(data)
    if (data.status) {
      setConpayment(false)
      setShouldShow6(!shouldShow6)
      // setRememberMe1(!rememberMe1)
      alert(data.message)
    } else {
      alert(data.message)
    }
  };

  const handlePickupconfirm = async (item) => {

    const { data } = await onSubmitPickupConfirm({
      data: {
        assignedId: item.assigned_id,
      },
    });

    console.log(data)
    if (data.status) {
      setRememberMe1(!rememberMe1)
      alert(data.message)
    } else {
      alert(data.message)
    }
  };

  const handleReceiptConfirm = async (vechileNo) => {
    if (imgData2.length == 0)
      return

    const { data } = await onSubmitReceiptConfirm({
      data: {
        assignedId: item.assigned_id,
        vehicleNumber: vechileNo,
        pickUpDate: customDate2,
        uploaded_files: imgData2,
      },
    });

    console.log(data)
    if (data.status) {
      setSelected1(true)
      setReachedwarehouse(false)
      setRememberMe4(!rememberMe4)
      alert(data.message)
    } else {
      alert(data.message)
    }
  };

  const onChangeUnit = (id) => {
    var pos = unitPickerData.findIndex(v => v.value == id)
    if (pos != -1) {
      setUnitName(unitPickerData[pos].label)
    }
    proposeRequestForm.setFieldValue('unit', id)
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
    if (selectedDate) {
      if (pickerIndex === 0) {
        setCustomDate(moment(selectedDate).format('DD-MM-YYYY'));
      } else if (pickerIndex === 1) {
        setFromTime(moment(selectedDate).format('hh:mm A'));
      } else if (pickerIndex === 2) {
        setToTime(moment(selectedDate).format('hh:mm A'));
      }
      //setShow(Platform.OS === 'ios');   
    } else {
    }
  };

  const onChange1 = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      if (pickerIndex === 0) {
        setCustomDate1(moment(selectedDate).format('DD-MM-YYYY'));
      } else if (pickerIndex === 1) {
        setFromTime(moment(selectedDate).format('hh:mm A'));
      } else if (pickerIndex === 2) {
        setToTime(moment(selectedDate).format('hh:mm A'));
      }
    } else {
    }
  };

  const onChange2 = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      if (pickerIndex === 0) {
        setCustomDate2(moment(selectedDate).format('DD-MM-YYYY'));
      } else if (pickerIndex === 1) {
        setFromTime(moment(selectedDate).format('hh:mm A'));
      } else if (pickerIndex === 2) {
        setToTime(moment(selectedDate).format('hh:mm A'));
      }
    } else {
    }
  };

  const WeightValidationSchema = yup.object().shape({
    kantaSlipNo: yup.string().required("Please Provide Kanta Slip Number"),
  });

  const weightRequestForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      kantaSlipNo: '',
    },
    validationSchema : WeightValidationSchema,
    onSubmit: () => handleConfirmWeight(
      weightRequestForm.values.kantaSlipNo,
    )
  });

  const handelWeightConfirm = async () => {
    setWeightClickConfirm(true)
    await weightRequestForm.submitForm();
  }

  const proposeValidationSchema = yup.object().shape({
    volume: yup.string().required("Please enter volume"),
    unit: yup.string().required("Please select unit"),
    Proposekantaslipno: yup.string().required("Please Provide Kanta Slip Number"),
  });


  const proposeRequestForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      volume: '',
      unit: '',
      Proposekantaslipno: '',
    },
    validationSchema: proposeValidationSchema,
    onSubmit: () => handleProposeWeight(
      proposeRequestForm.values.volume,
      proposeRequestForm.values.unit,
      proposeRequestForm.values.Proposekantaslipno,
    )
  });

  const submitProposeWeight = async () => {
    setProposeClickConfirm(true)
    await proposeRequestForm.submitForm();
  };

  const paymentValidationSchema = yup.object().shape({
    paymentmade: yup.string().required('Please Provide Payment Details'),
    paymentmode: yup.string().required("Please Provide Payment Mode Details"),
    paymentdetails: yup.string().required("Please Provide Payment Details"),
  });

  const paymentRequestForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      paymentmade: '',
      paymentmode: '',
      paymentdetails: '',
    },
    validationSchema: paymentValidationSchema,
    onSubmit: () => handlePaymentConfirm(
      paymentRequestForm.values.paymentmade,
      paymentRequestForm.values.paymentmode,
      paymentRequestForm.values.paymentdetails,
    )
  });

  const handleSubmitPayment = async () => {
    setPaymentClickConfirm(true)
    await paymentRequestForm.submitForm();
  }

  const receiptValidationSchema = yup.object().shape({
    vechileNo: yup.string().required('Please Provide Payment Details'),
  })

  const receiptRequestForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
    vechileNo: '',
    },
    validationSchema: receiptValidationSchema,
    onSubmit: () => handleReceiptConfirm(
      receiptRequestForm.values.vechileNo,
    )
  });

  const handleSubmitReceipt = async () => {
    setReceiptClickConfirm(true)
    await receiptRequestForm.submitForm();
  }

  useLayoutEffect(() => {
    const { Item } = route.params;
    setItem(Item)
    const title = 'Order Details';
    onGetUnits();
    navigation.setOptions({title});
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
    } else {
      // alert("Please Fill The Details First");
    }
  }

  const selectedCheckbox1 = (rememberMe1) => {
    if (selected1) {
      setRememberMe1(rememberMe1);
      setSelected1(false);
    } else {
      // alert("Please Fill The Details First");
    }
  }

  const selectedCheckbox2 = (setRememberMe4) => {
    if (selected3) {
      setRememberMe4(rememberMe4);
      setSelected3(false);
    } else {
      //alert("Please Fill The Material Pick-up confirmation First");
    }
  }

  const dataSubmit = () => {
    if (rememberMe) {
      setShouldShow1(!shouldShow1)
    } else {
      alert("Please Fill The Material Weighted First");
    }
  }

  const dataSubmit1 = () => {
    if (rememberMe1) {
      setShouldShow4(!shouldShow4)
    } else {
      // alert("Please Fill The Material Pick-up confirmation First");
      alert("Please Confirm Pickup First");
    }
  }

  const proposeWeight = (shouldShow3, selected2) => {
    setShouldShow3(shouldShow3);
    setSelected2(selected2);
  }

  const ImageData = (data) => {
    if (data) {
      let listData = imgData;
      let data1 = listData.concat(data);
      setImageData([...data1]);
    }
  }

  const ImageData1 = (data) => {
    if (data) {
      let listData1 = imgData1;
      let data2 = listData1.concat(data);
      setImageData1([...data2]);
    }
  }

  const ImageData2 = (data) => {
    if (data) {
      let listData2 = imgData2;
      let data3 = listData2.concat(data);
      setImageData2([...data3]);
    }
  }

  return (
    <KeyboardAwareScrollView style={[AppStyles.topView, AppStyles.ph20]}>
      <View style={AppStyles.aligncen}>
        <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt30,]}>Ref No- {item.order_no}</Text>
      </View>
      <View style={AppStyles.boxView}>
        <View style={[AppStyles.flexDir, AppStyles.mt10,]}>
          <View style={AppStyles.flexpointsix}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Waste type</Text>
          </View>
          <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.category_name}</Text>
          </View>
        </View>

        <View style={AppStyles.flexDir}>
          <View style={AppStyles.flexpointsix}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Waste sub category</Text>
          </View>
          <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.sub_category_name}</Text>
          </View>
        </View>

        <View style={AppStyles.flexDir}>
          <View style={AppStyles.flexpointsix}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Volume</Text>
          </View>
          <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.qty} {item.unit_name}</Text>
          </View>
        </View>

        <View style={AppStyles.flexDir}>
          <View style={AppStyles.flexpointsix}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Purchase Date</Text>
          </View>
          <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{moment(item.pickup_date).format('DD-MMM-YY')}</Text>
          </View>
        </View>

        <View style={AppStyles.flexDir}>
          <View style={AppStyles.flexpointsix}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Purchase amount</Text>
          </View>
          <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}><FAIcon size={14} name="rupee" /> {item.price}</Text>
          </View>
        </View>

      </View>

      <View style={[AppStyles.flexDir, AppStyles.mt35,]}>
        <TouchableOpacity style={[AppStyles.flexpointfour]} onPress={() => {
          setShouldShow(!shouldShow)
          setShouldShow3(false)
          setSelected2(false)
        }}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15,]}>Is the material Weighted</Text>
        </TouchableOpacity>

        <View style={[AppStyles.flexpointsix, AppStyles.mt10, AppStyles.alignfend, AppStyles.mr10]}>
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
          {conweight == true ?
            <View>
              {proposeweight == true ?
                <View style={AppStyles.flexDir}>
                  <View style={AppStyles.flex1}>
                    <View>
                      <TouchableOpacity style={{
                        marginTop: 20,
                        borderRadius: 10,
                        // backgroundColor:Colors.mango,
                        backgroundColor: shouldShow3 == true ? Colors.mango : Colors.grayBackground,
                        alignItems: 'center',
                        height: 44,
                        width: 154,
                      }} onPress={() => { proposeWeight(true, false) }}>
                        <Text style={{
                          fontSize: 15, marginTop: 10,
                          color: shouldShow3 == true ? Colors.white : Colors.warmGrey,
                        }}>Confirm Weight</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={AppStyles.flex1}>
                    <View>
                      <TouchableOpacity style={{
                        marginTop: 20,
                        borderRadius: 10,
                        backgroundColor: selected2 == true ? Colors.mango : Colors.grayBackground,
                        height: 44,
                        width: 154,
                        alignItems: 'center',
                        marginLeft: 9,
                      }} onPress={() => { proposeWeight(false, true) }}>
                        <Text style={{
                          fontSize: 15, marginTop: 10,
                          color: selected2 == true ? Colors.white : Colors.warmGrey,
                        }}>Propose Weight</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                : null}
            </View>
            : null}
        </View>

        // End View
      ) : null}

      {/* Start Confirm Weight */}
      {shouldShow3 == true ? (
        <View>
          {conweight == true ?
            <View>
              <View style={{ marginTop: 20 }}>
                <View>
                  <Text style={Styles.inputLabelText}>Kanta Slip Number</Text>
                </View>
                <View>
                  <TextInput
                    value={weightRequestForm.values.kantaSlipNo}
                    placeholder="Slip Number"
                    onChangeText={(txt) => weightRequestForm.setFieldValue('kantaSlipNo', txt)}
                    style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
                  />
                  {clickWeightConfirm && weightRequestForm.errors.kantaSlipNo ? (
                    <CustomText
                      fontSize={15}
                      color={Colors.red}
                      styling={{ marginTop: RfH(10) }}>
                      {weightRequestForm.errors.kantaSlipNo}

                    </CustomText>
                  ) : null}
                </View>
              </View>

              <View style={[AppStyles.flexDir, , Styles.viewVolume]}>
                <View style={AppStyles.flex1}>
                  <Text style={Styles.inputLabelText}>Date</Text>
                  <View style={Styles.viewVolumeInputContainerK}>
                    <TouchableOpacity
                      onPress={() => showDatepicker()}
                      style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary, AppStyles.br10, AppStyles.mb10, { padding: 10 }]}>
                      <FAIcon size={22} name='calendar-o' color={Colors.mangoTwo} />
                      <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{customDate}</Text>
                    </TouchableOpacity>
                    {show && (<DateTimePicker
                      testID="dateTimePicker"
                      value={new Date()}
                      minimumDate={new Date(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'))}
                      mode={mode}
                      is24Hour={false}
                      display="default"
                      onChange={onChange}
                    />)}
                  </View>
                </View>
                <View style={[AppStyles.flex1, AppStyles.ml10]}>
                  <Text style={Styles.inputLabelText}>Upload Documents</Text>
                  <View style={Styles.viewVolumeInputContainerK}>
                    <View style={AppStyles.flexpointfive}>
                      <TouchableOpacity style={[Styles.inputText, Styles.inputIcon, AppStyles.br10]} onPress={() => setImageUpload(!imageUpload)}>
                        <Text style={[AppStyles.txtSecandaryRegular, { color: imgData.length > 0 ? Colors.green : Colors.warmGrey }]}>{imgData.length > 0 ? 'File Attached' : 'Attach File'}</Text>
                        <MIcon name="attachment" size={25} color={Colors.grayThree} />
                      </TouchableOpacity>
                      {clickWeightConfirm && imgData.length === 0 ? (
                        <CustomText
                          fontSize={15}
                          color={Colors.red}
                          styling={{ marginTop: RfH(10) }}>
                          Upload Picture
                        </CustomText>
                      ) : null}
                      <UploadDocument handleClose={() => setImageUpload(false)}
                        isVisible={imageUpload}
                        ImageData={ImageData} />
                    </View>
                  </View>
                </View>
              </View>

              <View style={AppStyles.flexDir}>
                <View style={AppStyles.flex1, AppStyles.mt20}>
                  <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
                    <TouchableOpacity style={Styles.confirmButtonn}
                      // onPress={handleConfirm}
                      onPress={() => { proposeWeight(false, true) }}>
                      <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={AppStyles.flex1, AppStyles.mt20}>
                  <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
                    <TouchableOpacity style={Styles.confirmButton} onPress={() => {
                      handelWeightConfirm(item)
                      //  setSelected(true)   
                      //  setRememberMe(!rememberMe)
                      setSlipNumber("")
                      //  handleConfirmWeight(item)

                    }}>
                      <Text style={Styles.confirmBtnText}>CONFIRM</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            : null}
        </View>
      ) : null || selected2 == true ? (
        <View>
          {proposeweight == true ?
            <View>
              <View style={Styles.viewVolume}>
                <Text style={Styles.inputLabelText}>Enter New Volume</Text>
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 2, paddingRight: 10 }}>
                      <TextInput
                        placeholder="Enter volume"
                        value={proposeRequestForm.values.volume}
                        keyboardType={'numeric'}
                        onChangeText={(txt) => proposeRequestForm.setFieldValue("volume", txt)}
                        style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
                      />
                      {proposeClickConfirm && proposeRequestForm.errors.volume ? (
                        <CustomText
                          fontSize={15}
                          color={Colors.red}
                          styling={{ marginTop: RfH(5) }}>
                          {proposeRequestForm.errors.volume}
                        </CustomText>
                      ) : null}

                    </View>
                    <View style={{ flex: 1 }}>
                      <DropDown
                        items={unitPickerData}
                        placeholderText="Units"
                        //itemStyle={{ color: '#000' }}
                        onValueChange={onChangeUnit}
                        selectedValue={proposeRequestForm.values.unit}
                        containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
                      />

                      {proposeClickConfirm && proposeRequestForm.errors.unit ? (
                        <CustomText
                          fontSize={15}
                          color={Colors.red}
                          styling={{ marginTop: RfH(5) }}>
                          {proposeRequestForm.errors.unit}
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
                    value={proposeRequestForm.values.Proposekantaslipno}
                    placeholder="Slip Number"
                    onChangeText={(txt) => proposeRequestForm.setFieldValue('Proposekantaslipno', txt)}
                    style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
                  />
                  {proposeClickConfirm && proposeRequestForm.errors.Proposekantaslipno ? (
                    <CustomText
                      fontSize={15}
                      color={Colors.red}
                      styling={{ marginTop: RfH(5) }}>
                      {proposeRequestForm.errors.Proposekantaslipno}
                      {/* hhfhh */}
                    </CustomText>
                  ) : null}
                </View>
              </View>

              <View style={[AppStyles.flexDir, , Styles.viewVolume]}>
                <View style={AppStyles.flex1}>
                  <Text style={Styles.inputLabelText}>Date</Text>
                  <View style={Styles.viewVolumeInputContainerK}>
                    <TouchableOpacity
                      onPress={() => showDatepicker()}
                      style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary, AppStyles.br10, AppStyles.mb10, { padding: 10 }]}>
                      <FAIcon size={22} name='calendar-o' color={Colors.mangoTwo} />
                      <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{customDate1}</Text>
                    </TouchableOpacity>
                    {show && (<DateTimePicker
                      testID="dateTimePicker"
                      value={new Date()}
                      minimumDate={new Date(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'))}
                      mode={mode}
                      is24Hour={false}
                      display="default"
                      onChange={onChange1}
                    />)}
                  </View>
                </View>
                <View style={[AppStyles.flex1, AppStyles.ml10]}>
                  <Text style={Styles.inputLabelText}>Upload Documents</Text>
                  <View style={Styles.viewVolumeInputContainerK}>
                    <TouchableOpacity style={[Styles.inputText, Styles.inputIcon, AppStyles.br10]} onPress={() => setImageUpload1(!imageUpload1)}>
                      {/* <Text style={Styles.txtFileUpload}>Upload file</Text> */}
                      <Text style={[AppStyles.txtSecandaryRegular, { color: imgData1.length > 0 ? Colors.green : Colors.warmGrey }]}>{imgData1.length > 0 ? 'File Attached' : 'Attach File'}</Text>
                      <MIcon name="attachment" size={25} color={Colors.grayThree} />
                    </TouchableOpacity>
                    {proposeClickConfirm && imgData1.length === 0 ? (
                      <CustomText
                        fontSize={15}
                        color={Colors.red}
                        styling={{ marginTop: RfH(5) }}>
                        Upload Picture
                      </CustomText>
                    ) : null}
                    <UploadDocument handleClose={() => setImageUpload1(false)}
                      isVisible={imageUpload1}
                      ImageData={ImageData1} />
                  </View>
                </View>
              </View>

              <View style={AppStyles.flexDir}>
                <View style={AppStyles.flex1, AppStyles.mt20}>
                  <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
                    <TouchableOpacity style={Styles.confirmButtonn}
                      // onPress={handleConfirm}>
                      onPress={() => { proposeWeight(true, false) }}>
                      <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={AppStyles.flex1, AppStyles.mt20}>
                  <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
                    <TouchableOpacity style={Styles.confirmButton} onPress={() => {
                      // setSelected(true)   
                      // setRememberMe(!rememberMe)
                      setSlipNumber("")                    
                      //  handleProposeWeight(item)
                      submitProposeWeight(item)

                    }}>
                      <Text style={Styles.confirmBtnText}>CONFIRM</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            : null}
        </View>
      ) : null}
      {/* End Confirm Weight */}





      {/* Start Material pickup confirmation */}
      <View style={[AppStyles.flexDir, AppStyles.mt20,]}>
        <TouchableOpacity style={[AppStyles.flexpointfour]} onPress={() => dataSubmit()}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15,]}>Material Pick-up confirmation</Text>
        </TouchableOpacity>


        <View style={[AppStyles.flexpointsix, AppStyles.mt10, AppStyles.alignfend, AppStyles.mr10]}>
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
          {conpayment == true ?
            <View>
              <View style={[AppStyles.mt20,]}>
                <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6,]}>Payment Required</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TextInput placeholder={"25,864"} editable={false} value={item.price} style={[Styles.inputTextf, Styles.Requiredprice]} />
                  <FAIcon style={Styles.rupee} size={15} name="rupee" />
                </View>
              </View>

              <View style={[AppStyles.mt20,]}>
                <View style={AppStyles.flexDir}>
                  <View style={AppStyles.flexpointseven}>
                    <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Payment Made</Text>
                  </View>
                  <View style={AppStyles.flexpointthree}>
                    <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, AppStyles.ml30, AppStyles.mt5]}>enter value</Text>
                  </View>
                </View>
                {/* <TextInput placeholder={"25,864"} style={Styles.inputText} /> */}
                <TextInput
                  placeholder="Slip Number"
                  value={paymentRequestForm.values.paymentmade}
                  onChangeText={(txt) => paymentRequestForm.setFieldValue('paymentmade', txt)}
                  style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
                />
                {paymentClickConfirm && paymentRequestForm.errors.paymentmade ? (
                  <CustomText
                    fontSize={15}
                    color={Colors.red}
                    styling={{ marginTop: RfH(10) }}>
                    {paymentRequestForm.errors.paymentmade}
                    {/* hhfhh */}
                  </CustomText>
                ) : null}
              </View>

              <View style={[AppStyles.mt20,]}>
                <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6,]}>Payment Mode</Text>
                <TextInput placeholder={"Cash"}
                  value={paymentRequestForm.values.paymentmode}
                  onChangeText={(txt) => paymentRequestForm.setFieldValue('paymentmode', txt)}
                  style={Styles.inputText} />
                {paymentClickConfirm && paymentRequestForm.errors.paymentmode ? (
                  <CustomText
                    fontSize={15}
                    color={Colors.red}
                    styling={{ marginTop: RfH(10) }}>
                    {paymentRequestForm.errors.paymentmode}
                    {/* hhfhh */}
                  </CustomText>
                ) : null}
              </View>

              <View style={[AppStyles.mt20,]}>
                <View style={AppStyles.flexDir}>
                  <View style={AppStyles.flexpointsix}>
                    <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6,]}>Payment Details</Text>
                  </View>
                  <View style={AppStyles.flexpointfour}>
                    <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, AppStyles.mt5, AppStyles.ml20,]}>Transaction number</Text>
                  </View>
                </View>
                <TextInput placeholder={"1235567778"}
                  value={paymentRequestForm.values.paymentdetails}
                  onChangeText={(txt) => paymentRequestForm.setFieldValue('paymentdetails', txt)}
                  style={Styles.inputText} />
                {paymentClickConfirm && paymentRequestForm.errors.paymentdetails ? (
                  <CustomText
                    fontSize={15}
                    color={Colors.red}
                    styling={{ marginTop: RfH(10) }}>
                    {paymentRequestForm.errors.paymentdetails}                   
                  </CustomText>
                ) : null}
              </View>

              <View>
                <View style={[AppStyles.flexDir, AppStyles.alignCenter, AppStyles.mt20]}>
                  <Checkbox
                    disabled={false}
                    value={checkcondition}
                    tintColors={{ true: Colors.mango, false: '#777' }}
                    onValueChange={(newValue) =>                    
                      setCheckcondition((newValue) => !newValue)
                    }
                  />
                  <View style={{ marginLeft: RfW(10) }}>
                    <CustomText
                      color={Colors.warmGrey}
                      fontSize={15}
                      styling={{ paddingVertical: RfH(4) }}>
                      I agree to the terms and conditions
                </CustomText>
                  </View>
                </View>
              </View>

              {/* { payment == true ?  */}
              <View style={AppStyles.flexDir}>
                <View style={AppStyles.flex1}>
                  <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
                    <TouchableOpacity style={Styles.confirmButtonn} onPress={() => {
                      setSelected1(true)
                      // setPayment(false) 
                      dataSubmit()
                    }}>
                      <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={AppStyles.flex1}>
                  <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
                    <TouchableOpacity style={Styles.confirmButton} onPress={() => {
                      // setShouldShow6(!shouldShow6)
                      // submitPayment()                     
                      handleSubmitPayment(item)

                    }}>
                      <Text style={Styles.confirmBtnText}>CONFIRM</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* : null} */}
            </View>
            : null}
        </View>
      ) : null}
      {/* End Material pickup confirmation */}

      {/* Start Confirm Pickup */}
      {!shouldShow6 ? (
        <View>
          <TouchableOpacity style={Styles.confirmButtonnabcd} onPress={() => {
            // setSelected1(true)   
            //  setRememberMe1(!rememberMe1)
            handlePickupconfirm(item)
          }}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f17, AppStyles.mt10,]}>Confirm Pickup</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {/* End Confirm Pickup */}

      <View style={[AppStyles.flexDir, AppStyles.mt20]}>
        <TouchableOpacity style={[AppStyles.flexpointsix]} onPress={() => dataSubmit1()}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15,]}>Has the material reached your warehouse</Text>
        </TouchableOpacity>

        <View style={[AppStyles.flexpointfour, AppStyles.mt10, AppStyles.alignfend, AppStyles.mr10]}>
          <CheckBoxWrapper
            style={{ width: 50, height: 50 }}
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
          {reachedwarehouse == true ?
            <View>
              <View style={{ marginTop: 20 }}>
                <Text style={Styles.inputLabelText}>Vehicle Number</Text>
                <TextInput placeholder={"Enter Vehicle Number"}
                  value={receiptRequestForm.values.vechileNo}
                  onChangeText={(txt) => receiptRequestForm.setFieldValue('vechileNo', txt)}
                  style={Styles.inputText} />
                {receiptClickConfirm && receiptRequestForm.errors.vechileNo ? (
                  <CustomText
                    fontSize={15}
                    color={Colors.red}
                    styling={{ marginTop: RfH(10) }}>
                    {receiptRequestForm.errors.vechileNo}
                  </CustomText>
                ) : null}
              </View>

              <View style={[AppStyles.flexDir, Styles.viewVolume]}>
                <View style={AppStyles.flex1}>
                  <Text style={Styles.inputLabelText}>Date</Text>
                  <View style={Styles.viewVolumeInputContainerK}>

                    <TouchableOpacity
                      onPress={() => showDatepicker()}
                      style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary, AppStyles.br10, AppStyles.mb10, { padding: 10 }]}>
                      <FAIcon size={22} name='calendar-o' color={Colors.mangoTwo} />
                      <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{customDate2}</Text>
                    </TouchableOpacity>
                    {show && (<DateTimePicker
                      testID="dateTimePicker"
                      value={new Date()}
                      minimumDate={new Date(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'))}
                      mode={mode}
                      is24Hour={false}
                      display="default"
                      onChange={onChange2}
                    />)}
                  </View>
                </View>
                <View style={[AppStyles.flex1, AppStyles.ml10]}>
                  <Text style={Styles.inputLabelText}>Upload Documents</Text>
                  <View style={Styles.viewVolumeInputContainerK}>
                    <TouchableOpacity style={[Styles.inputText, Styles.inputIcon, AppStyles.br10]} onPress={() => setWarehouseimageUpload(!warehouseimageUpload)}>
                      {/* <Text style={Styles.txtFileUpload}>Upload file</Text> */}
                      <Text style={[AppStyles.txtSecandaryRegular, { color: imgData2.length > 0 ? Colors.green : Colors.warmGrey }]}>{imgData2.length > 0 ? 'File Attached' : 'Attach File'}</Text>
                      <MIcon name="attachment" size={25} color={Colors.grayThree} />
                    </TouchableOpacity>
                    {paymentClickConfirm && imgData2.length === 0 ? (
                      <CustomText
                        fontSize={15}
                        color={Colors.red}
                        styling={{ marginTop: RfH(5) }}>
                        Upload Picture
                      </CustomText>
                    ) : null}
                    <UploadDocument handleClose={() => setWarehouseimageUpload(false)}
                      isVisible={warehouseimageUpload}
                      ImageData={ImageData2} />
                  </View>
                </View>
              </View>

              <View style={AppStyles.flexDir}>
                <View style={AppStyles.flex1, AppStyles.mt20}>
                  <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
                    <TouchableOpacity style={Styles.confirmButtonn} onPress={() =>
                      // handleConfirm()
                      dataSubmit1()}>
                      {/* onPress={() => dataSubmit1()} */}
                      <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={AppStyles.flex1, AppStyles.mt20}>
                  <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
                    <TouchableOpacity style={Styles.confirmButton} onPress={() => {
                      setShouldShow5(!shouldShow5)                     
                      handleSubmitReceipt(item)
                    }}>
                      <Text style={Styles.confirmBtnText}>CONFIRM</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            : null}
        </View>
      ) : null}
      {/* End material reached your warehouse */}

      {/* Start Confirm Receipt */}
      {/* {!shouldShow5 ? (
             <View>
              <TouchableOpacity style={Styles.confirmButtonnabcd} onPress={() => {setSelected3(true)   
       setRememberMe4(!rememberMe4)
      }}>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f17, AppStyles.mt10,]}>Confirm Receipt</Text>
              </TouchableOpacity>
            </View>
            ) : null} */}
      {/* End Confirm Receipt */}


      {/* <View style={AppStyles.flexDir}>
      <View style={AppStyles.flex1}>
      <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
        <TouchableOpacity style={Styles.confirmButtonn} onPress={handleConfirm}>
          <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
        </TouchableOpacity>
      </View>
      </View>
      <View style={AppStyles.flex1}>
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
