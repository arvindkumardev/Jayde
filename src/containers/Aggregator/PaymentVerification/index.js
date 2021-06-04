import React, { useContext, useEffect, useState, useLayoutEffect, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, Button } from "react-native";
import { RfH, RfW, formatDisplayDate } from "../../../utils/helpers";
import { useNavigation, useRoute } from "@react-navigation/native";
import Styles from './styles';

import { Colors, Fonts, AppStyles } from "../../../theme";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationRouteNames from '../../../routes/ScreenNames';
import CustomText from '../../../components/CustomText';
import { CheckBoxWrapper, CustomTextInput, GradientButton, } from '../../../components';
import Checkbox from "@react-native-community/checkbox";
import moment from 'moment';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UploadDocument } from '../../../components/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormik } from "formik";
import * as yup from "yup";
import { weightConfirm, weightPropose, paymentConfirm, pickupConfirm, receiptConfirm, scheduleOrderDetail } from '../Middelware';
import UserContext from '../../../appContainer/context/user.context';
import DropDown from '../../../components/Picker/index';

const paymentMode = [
  { label: 'CASH', value: 'CASH' },
  { label: 'CHEQUE', value: 'CHEQUE' },
  { label: 'RTGS', value: 'RTGS' },
  { label: 'DD', value: 'DD' },
]

const PaymentVerification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { setLoader } = useContext(UserContext);

  const refPaymentMode = useRef(null);
  const refPaymentDetail = useRef(null);

  const [item, setItem] = useState({});
  const [isViewLoaded, setViewLoaded] = useState(false)
  const [refreshPage, setRefreshPage] = useState(false)

  const [imageUpload, setImageUpload] = useState(false);
  const [imageUpload1, setImageUpload1] = useState(false);
  const [warehouseImageUpload, setWarehouseImageUpload] = useState(false);

  const [confirmWeightImgData, setConfirmWeightImgData] = useState([])
  const [proposeWeightImgData, setProposeWeightImgData] = useState([])
  const [receiptImgData, setReceiptImgData] = useState([])
  const [unitPickerData, setUnitData] = useState([]);
  const [receiptData, setReceiptData] = useState([]);

  //----------------- Date Picker ----------------------
  const [showPickerConfirmWeight, setPickerConfirmWeight] = useState(false);
  const [showPickerProposeWeight, setPickerProposeWeight] = useState(false);
  const [showPickerWarehouse, setPickerWarehouse] = useState(false);
  const [confirmWeightDate, setConfirmWeightDate] = useState(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'));
  const [proposeWeightDate, setProposeWeightDate] = useState(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'));
  const [warehouseDate, setWarehouseDate] = useState(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'));

  const [isTermChecked, setTermChecked] = useState(false);

  const [clickWeightConfirm, setWeightClickConfirm] = useState(false);
  const [proposeClickConfirm, setProposeClickConfirm] = useState(false);
  const [paymentClickConfirm, setPaymentClickConfirm] = useState(false);
  const [receiptClickConfirm, setReceiptClickConfirm] = useState(false);

  // View Section
  const [isShowWeightedMainView, setShowWeightedMainView] = useState(false)
  const [isShowPickUpMainView, setShowPickUpMainView] = useState(false)
  const [isShowPickUpConfirmButton, setShowPickUpConfirmButton] = useState(false)
  const [isShowWareHouseMainView, setShowWareHouseMainView] = useState(false)
  const [toggleConfirmProposeWeight, setToggleConfirmProposeWeight] = useState(true)

  // ---------------------- Start Api Section ---------------------
  const [{ data: confirmWeightData }, onWeightConfirm] = weightConfirm();
  const [{ data: proposeWeightData }, onSubmitProposeWeight] = weightPropose();
  const [{ data: paymentConfirmData }, onSubmitPaymentConfirm] = paymentConfirm();
  const [{ data: pickupConfirmData }, onSubmitPickupConfirm] = pickupConfirm();
  const [{ data: receiptConfirmData }, onSubmitReceiptConfirm] = receiptConfirm();
  const [{ data: scheduleData, loading, error }, onScheduleOrderDetail] = scheduleOrderDetail();

  // ---------------------- End Api Section ---------------------

  const handelRefresh = () => {    
    if (route.params.WhereFrom === NavigationRouteNames.AGGREGATOR_SCHEDULE_ORDER_LIST) {
      route.params.getActionType()
    }
  }

  const handleConfirmWeight = async (kantaSlipNo) => {
    if (confirmWeightImgData.length == 0)
      return

    setLoader(true)
    try {
      const { data } = await onWeightConfirm({
        data: {
          assignedId: item.assigned_id,
          kanta_slip_number: kantaSlipNo,
          kanta_slip_date: confirmWeightDate,
          uploaded_files: confirmWeightImgData,
        },
      });

      console.log(data)
      if (data.status) {
        handelRefresh()
      } else {
        alert(data.message)
      }
      setLoader(false)
    }
    catch (e) {
      console.log("Response error", e);
    }
  };

  const handleProposeWeight = async (volume, unit, Proposekantaslipno) => {
    if (proposeWeightImgData.length === 0)
      return

    setLoader(true)
    try {
      const { data } = await onSubmitProposeWeight({
        data: {
          assignedId: item.assigned_id,
          newWeight: volume,
          unit: unit,
          kanta_slip_number: Proposekantaslipno,
          kanta_slip_date: proposeWeightDate,
          uploaded_files: proposeWeightImgData,
        },
      });

      console.log(data)
      if (data.status) {
        handelRefresh()
      } else {
        alert(data.message)
      }
      setLoader(false)
    }
    catch (e) {
      console.log("Response error", e);
    }
  };

  const handlePaymentConfirm = async (paymentmade, paymentmode, paymentdetails) => {

    if (!isTermChecked) {
      alert('Please Accept Terms & Condition.')
      return
    }
    setLoader(true)
    try {
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
        handelRefresh()
        setShowPickUpMainView(false)
      } else {
        alert(data.message)
      }
      setLoader(false)
    }
    catch (e) {
      console.log("Response error", e);
    }
  };

  const handelPickupConfirm = async () => {
    setLoader(true)
    try {
      const { data } = await onSubmitPickupConfirm({
        data: {
          assignedId: item.assigned_id,
        },
      });
      console.log(data)
      if (data.status) {
        handelRefresh()
      } else {
        alert(data.message)
      }
      setLoader(false)
    }
    catch (e) {
      console.log("Response error", e);
    }
  };

  const handleReceiptConfirm = async (vechileNo) => {
    if (receiptImgData.length == 0)
      return

    setLoader(true)
    try {
      const { data } = await onSubmitReceiptConfirm({
        data: {
          assignedId: item.assigned_id,
          vehicleNumber: vechileNo,
          pickUpDate: warehouseDate,
          uploaded_files: receiptImgData,
        },
      });

      console.log(data)
      if (data.status) {
        navigation.pop()
        navigation.navigate(NavigationRouteNames.WAREHOUSE_DETAILS, { items: item });
      } else {
        alert(data.message)

      }
      setLoader(false)
    }
    catch (e) {
      console.log("Response error", e);
    }
  };

  const onChangeUnit = (id) => {
    proposeRequestForm.setFieldValue('unit', id)
  }

  const onChangeConfirmWeightDate = (event, selectedDate) => {
    setPickerConfirmWeight(false)
    if (selectedDate) {
      setConfirmWeightDate(moment(selectedDate).format('YYYY-MM-DD'));
      //setShow(Platform.OS === 'ios');   
    } else {
    }
  };

  const onChangeProposeWeightDate = (event, selectedDate) => {
    setPickerProposeWeight(false)
    if (selectedDate) {
      setProposeWeightDate(moment(selectedDate).format('YYYY-MM-DD'));
    } else {
    }
  };

  const onChangeWareHouseDate = (event, selectedDate) => {
    setPickerWarehouse(false)
    if (selectedDate) {
      setWarehouseDate(moment(selectedDate).format('YYYY-MM-DD'));
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
    validationSchema: WeightValidationSchema,
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
    const title = 'Order Details';
    navigation.setOptions({ title });
  }, []);

  const getScheduleDetails = async () => {
    try {
      const { data } = await onScheduleOrderDetail({ data: { 'assignedId': route.params.assignedID } });
      if (data.status) {
        let itemObj = data.data.orderDetails[0]
        console.log(data)
        setItem(itemObj)

        const pickderData = data.data.units.map((item) => ({ label: item.unit_name, value: item.id }));
        setUnitData(pickderData);
        setReceiptData(data.data.receiptData)
        setViewLoaded(true) // Render View
        setLoader(false)

        //navigation.navigate(NavigationRouteNames.WAREHOUSE_DETAILS, {items:  item});     


        // ------------------- View Condition -------------------------
        if (itemObj.proposed_weight_confirm === '0' && itemObj.pickup_confirmed === '0') {
          setShowWeightedMainView(true)
        } else if (itemObj.proposed_weight_confirm === '1' && itemObj.pickup_confirmed === '0' && itemObj.is_seller_confirmed == null) {
          setShowPickUpMainView(true)
        } else if (itemObj.proposed_weight_confirm === '1' && itemObj.pickup_confirmed === '0' && itemObj.is_seller_confirmed == '2') {
          setShowPickUpMainView(false)
          return
        } else if (itemObj.proposed_weight_confirm === '1' && itemObj.pickup_confirmed === '0' && itemObj.is_seller_confirmed == '3') {
          setShowPickUpConfirmButton(true)
        } else if (itemObj.proposed_weight_confirm === '1' && itemObj.pickup_confirmed === '1' && itemObj.is_completed == '1') {
          setShowWareHouseMainView(false)
        } else {
          setShowWeightedMainView(false)
          setShowPickUpMainView(false)
          setShowPickUpConfirmButton(false)
          setShowWareHouseMainView(true)
        }
      } else {
        alert(data.message)
      }

    } catch (e) {
      console.log("Response error", e);
    }
  }

  useEffect(() => {
    if (error)
      setLoader(false)
  }, [error])

  useEffect(() => {
    setLoader(true)
    getScheduleDetails()
    return () => {
      setLoader(false)
    }
  }, [])

  useEffect(() => {
    setLoader(true)
    getScheduleDetails()
  }, [confirmWeightData, proposeWeightData, paymentConfirmData, pickupConfirmData])

  const confirmWeightImageData = (data) => {
    if (data) {
      let listData = confirmWeightImgData;
      let data1 = listData.concat(data);
      setConfirmWeightImgData([...data1]);
    }
  }

  const proposeWeightImageData = (data) => {
    if (data) {
      let listData1 = proposeWeightImgData;
      let data2 = listData1.concat(data);
      setProposeWeightImgData([...data2]);
    }
  }

  const receiptImageData = (data) => {
    if (data) {
      let listData2 = receiptImgData;
      let data3 = listData2.concat(data);
      setReceiptImgData([...data3]);
    }
  }

  return (
    isViewLoaded && <KeyboardAwareScrollView style={[AppStyles.topView, AppStyles.ph20]}>
      <View style={AppStyles.aligncen}>
        <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt30,]}>Ref No- {item.order_no}</Text>
      </View>
      <View style={[AppStyles.paymentboxView, AppStyles.mt25]}>
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
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{formatDisplayDate(item.pickup_date)}</Text>
          </View>
        </View>

        <View style={AppStyles.flexDir}>
          <View style={AppStyles.flexpointsix}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20, AppStyles.mb20]}>Purchase amount</Text>
          </View>
          <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}><FAIcon size={14} name="rupee" /> {item.price}</Text>
          </View>
        </View>
      </View>

      {/* Start Material weighted */}
      <View style={[AppStyles.flexDir, AppStyles.mt35, AppStyles.inCenter]}>
        <TouchableOpacity activeOpacity={0.8} style={[AppStyles.flexpointfour]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15,]}>Is the material Weighted</Text>
        </TouchableOpacity>

        <View style={[AppStyles.flexpointsix, AppStyles.alignfend, AppStyles.mr10]}>
          <CheckBoxWrapper
            isChecked={item.proposed_weight_confirm == '1' ? true : false}
            checkBoxHandler={() => { }}
          />
        </View>
      </View>

      {item.proposed_weight_confirm == '0' && isShowWeightedMainView && <View>
        <View style={[AppStyles.flexDir, AppStyles.mt20]}>
          <View style={[AppStyles.flex1, AppStyles.mr5]}>
            <TouchableOpacity activeOpacity={0.8} style={[AppStyles.alignCenter, AppStyles.justifyCon, {
              borderRadius: 10, height: 44,
              backgroundColor: toggleConfirmProposeWeight ? Colors.mango : Colors.grayBackground
            }]} onPress={() => { setToggleConfirmProposeWeight(!toggleConfirmProposeWeight) }}>
              <Text style={{
                color: toggleConfirmProposeWeight ? Colors.white : Colors.warmGrey,
              }}>Confirm Weight</Text>
            </TouchableOpacity>
          </View>

          <View style={[AppStyles.flex1, AppStyles.ml5]}>
            <TouchableOpacity activeOpacity={0.8} style={[AppStyles.alignCenter, AppStyles.justifyCon, {
              borderRadius: 10, height: 44,
              backgroundColor: toggleConfirmProposeWeight ? Colors.grayBackground : Colors.mango,
            }]} onPress={() => { setToggleConfirmProposeWeight(!toggleConfirmProposeWeight) }}>
              <Text style={{ color: toggleConfirmProposeWeight ? Colors.warmGrey : Colors.white }}>Propose Weight</Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* Start Confirm Weight */}
        {toggleConfirmProposeWeight &&
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
                  style={{ backgroundColor: Colors.grayBackground, borderRadius: 10, paddingLeft: 10 }}
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
                <View>
                  <TouchableOpacity activeOpacity={0.8}
                    onPress={() => setPickerConfirmWeight(true)}
                    style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary, AppStyles.br10, AppStyles.mb10, { padding: 10 }]}>
                    <FAIcon size={22} name='calendar-o' color={Colors.mangoTwo} />
                    <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{formatDisplayDate(confirmWeightDate)}</Text>
                  </TouchableOpacity>
                  {showPickerConfirmWeight && (<DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    minimumDate={new Date(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'))}
                    mode={'date'}
                    is24Hour={false}
                    display="default"
                    onChange={onChangeConfirmWeightDate}
                  />)}
                </View>
              </View>
              <View style={[AppStyles.flex1, AppStyles.ml10]}>
                <Text style={Styles.inputLabelText}>Upload Documents</Text>
                <View>
                  <View>
                    <TouchableOpacity activeOpacity={0.8} style={[Styles.inputText, Styles.inputIcon, AppStyles.br10]} onPress={() => setImageUpload(!imageUpload)}>
                      <Text style={[AppStyles.txtSecandaryRegular, { color: confirmWeightImgData.length > 0 ? Colors.green : Colors.warmGrey }]}>{confirmWeightImgData.length > 0 ? 'File Attached' : 'Attach File'}</Text>
                      <MIcon name="attachment" size={25} color={Colors.grayThree} />
                    </TouchableOpacity>
                    {clickWeightConfirm && confirmWeightImgData.length === 0 ? (
                      <CustomText
                        fontSize={15}
                        color={Colors.red}
                        styling={[AppStyles.mt10, AppStyles.mb5]}>
                        Upload Picture
                      </CustomText>
                    ) : null}
                    <UploadDocument handleClose={() => setImageUpload(false)}
                      isVisible={imageUpload}
                      ImageData={confirmWeightImageData} />
                  </View>
                </View>
              </View>
            </View>

            <View style={[AppStyles.flexDir, AppStyles.mt20]}>
              <View style={[AppStyles.flex1]}>
                <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
                  <TouchableOpacity activeOpacity={0.8} style={[Styles.confirmButtonn, AppStyles.btnHeight44, AppStyles.inCenter]}
                    onPress={() => navi}>
                    <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[AppStyles.flex1]}>
                <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
                  <TouchableOpacity activeOpacity={0.8} style={[Styles.confirmButton, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() => handelWeightConfirm()}>
                    <Text style={Styles.confirmBtnText}>CONFIRM</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        }

        {/* End Confirm Weight */}

        {/* Start Propose Weight */}
        {!toggleConfirmProposeWeight &&
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
                      style={{ backgroundColor: Colors.grayBackground, borderRadius: 10, paddingLeft: 10 }}
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
                      containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayBackground, paddingLeft: 10 }}
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
                  style={{ backgroundColor: Colors.grayBackground, borderRadius: 10, paddingLeft: 10 }}
                />
                {proposeClickConfirm && proposeRequestForm.errors.Proposekantaslipno ? (
                  <CustomText
                    fontSize={15}
                    color={Colors.red}
                    styling={{ marginTop: RfH(5) }}>
                    {proposeRequestForm.errors.Proposekantaslipno}
                  </CustomText>
                ) : null}
              </View>
            </View>

            <View style={[AppStyles.flexDir, Styles.viewVolume, AppStyles.mr5]}>
              <View style={AppStyles.flex1}>
                <Text style={Styles.inputLabelText}>Date</Text>
                <View>
                  <TouchableOpacity activeOpacity={0.8}
                    onPress={() => setPickerProposeWeight(true)}
                    style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary, AppStyles.br10, AppStyles.mb10, { padding: 10 }]}>
                    <FAIcon size={22} name='calendar-o' color={Colors.mangoTwo} />
                    <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{formatDisplayDate(proposeWeightDate)}</Text>
                  </TouchableOpacity>
                  {showPickerProposeWeight && (<DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    minimumDate={new Date(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'))}
                    mode={'date'}
                    is24Hour={false}
                    display="default"
                    onChange={onChangeProposeWeightDate}
                  />)}
                </View>
              </View>
              <View style={[AppStyles.flex1, AppStyles.ml5]}>
                <Text style={Styles.inputLabelText}>Upload Documents</Text>
                <View>
                  <TouchableOpacity activeOpacity={0.8} style={[Styles.inputText, Styles.inputIcon, AppStyles.br10]} onPress={() => setImageUpload1(!imageUpload1)}>
                    {/* <Text style={Styles.txtFileUpload}>Upload file</Text> */}
                    <Text style={[AppStyles.txtSecandaryRegular, { color: proposeWeightImgData.length > 0 ? Colors.green : Colors.warmGrey }]}>{proposeWeightImgData.length > 0 ? 'File Attached' : 'Attach File'}</Text>
                    <MIcon name="attachment" size={25} color={Colors.grayThree} />
                  </TouchableOpacity>
                  {proposeClickConfirm && proposeWeightImgData.length === 0 ? (
                    <CustomText
                      fontSize={15}
                      color={Colors.red}
                      styling={{ marginTop: RfH(5) }}>
                      Upload Picture
                    </CustomText>
                  ) : null}
                  <UploadDocument handleClose={() => setImageUpload1(false)}
                    isVisible={imageUpload1}
                    ImageData={proposeWeightImageData} />
                </View>
              </View>
            </View>

            <View style={AppStyles.flexDir}>
              <View style={[AppStyles.flex1, AppStyles.mt20]}>
                <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
                  <TouchableOpacity activeOpacity={0.8} style={[Styles.confirmButtonn, AppStyles.btnHeight44, AppStyles.inCenter]}
                    onPress={() => navigation.pop()}>
                    <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[AppStyles.flex1, AppStyles.mt20]}>
                <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
                  <TouchableOpacity activeOpacity={0.8} style={[Styles.confirmButton, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() =>
                    submitProposeWeight()}>
                    <Text style={Styles.confirmBtnText}>CONFIRM</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        }
        {/* End Propose Weight */}
      </View>}

      {item.proposed_weight_confirm == '2' && <View style={[AppStyles.alignCenter, AppStyles.justifyCon, AppStyles.pv10]}>
        <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.txtmangoTwoBold]}>Proposed Weight Sent</Text>
      </View>
      }

      {/* Start Material pickup confirmation */}
      <View style={[AppStyles.flexDir, AppStyles.mt20, AppStyles.inCenter]}>
        <TouchableOpacity activeOpacity={0.8} style={[AppStyles.flexpointfour]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15,]}>Material Pick-up confirmation</Text>
        </TouchableOpacity>

        <View style={[AppStyles.flexpointsix, AppStyles.alignfend, AppStyles.mr10]}>
          <CheckBoxWrapper
            isChecked={item.pickup_confirmed == '1' ? true : false}
            checkBoxHandler={() => { }}
          />
        </View>
      </View>

      {item.pickup_confirmed == '0' && isShowPickUpMainView && <View>
        <View style={[AppStyles.mt20]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6,]}>Payment Required</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TextInput placeholder={"25,864"}
              editable={false}
              value={item.price}
              style={[Styles.inputTextf, Styles.Requiredprice]} />
            <FAIcon style={Styles.rupee} size={15} name="rupee" />
          </View>
        </View>

        <View style={[AppStyles.mt20,]}>
          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointseven}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Payment Made</Text>
            </View>
            {/* <View style={AppStyles.flexpointthree}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, AppStyles.ml30, AppStyles.mt5]}>enter value</Text>
            </View> */}
          </View>

          <TextInput
            placeholder="Enter Paid Amount"
            value={paymentRequestForm.values.paymentmade}
            onChangeText={(txt) => paymentRequestForm.setFieldValue('paymentmade', txt)}
            style={{ backgroundColor: Colors.grayBackground, borderRadius: 10, paddingLeft: 10 }}
            maxLength={50}
            returnKeyType='next'
            keyboardType='number-pad'
            onSubmitEditing={() => refPaymentDetail.current?.focus()}
          />
          {paymentClickConfirm && paymentRequestForm.errors.paymentmade ? (
            <CustomText
              fontSize={15}
              color={Colors.red}
              styling={{ marginTop: RfH(10) }}>
              {paymentRequestForm.errors.paymentmade}
            </CustomText>
          ) : null}
        </View>

        <View style={[AppStyles.mt20,]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6,]}>Select Payment Mode</Text>
          <DropDown
            items={paymentMode}
            placeholderText="Select Payment Mode"
            itemStyle={{ color: '#000' }}
            onValueChange={(val) => paymentRequestForm.setFieldValue('paymentmode', val)}
            selectedValue={paymentRequestForm.values.paymentmode}
            containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayBackground, paddingLeft: 10 }}
          />

          {paymentClickConfirm && paymentRequestForm.errors.paymentmode ? (
            <CustomText
              fontSize={15}
              color={Colors.red}
              styling={{ marginTop: RfH(10) }}>
              {paymentRequestForm.errors.paymentmode}
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
          <TextInput
            ref={refPaymentDetail}
            placeholder={"1235567778"}
            value={paymentRequestForm.values.paymentdetails}
            onChangeText={(txt) => paymentRequestForm.setFieldValue('paymentdetails', txt)}
            keyboardType='number-pad'
            style={Styles.inputText}
            maxLength={50}
            returnKeyType='done'
          />
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
              value={isTermChecked}
              tintColors={{ true: Colors.mango, false: '#777' }}
              onValueChange={(newValue) =>
                setTermChecked((newValue) => !newValue)
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


        <View style={AppStyles.flexDir}>
          <View style={AppStyles.flex1}>
            <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
              <TouchableOpacity activeOpacity={0.8} style={[Styles.confirmButtonn, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() => navigation.pop()}>
                <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={AppStyles.flex1}>
            <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
              <TouchableOpacity activeOpacity={0.8} style={[Styles.confirmButton, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() => handleSubmitPayment()}>
                <Text style={Styles.confirmBtnText}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      }

      {item.is_seller_confirmed == '2' ? <View style={[AppStyles.alignCenter, AppStyles.justifyCon, AppStyles.pv10]}>
        <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.txtmangoTwoBold]}>Payment Confirmation Sent</Text>
      </View>
        : item.pickup_confirmed == '2' && <View style={[AppStyles.alignCenter, AppStyles.justifyCon, AppStyles.pv10]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.txtmangoTwoBold]}>Payment Confirmation Sent</Text>
        </View>
      }

      {isShowPickUpConfirmButton && <TouchableOpacity activeOpacity={0.8}
        style={Styles.btnConfirmPickup}
        onPress={() => handelPickupConfirm()}>
        <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.mt10,]}>Confirm Pickup</Text>
      </TouchableOpacity>}

      {/* End Material pickup confirmation */}

      <View style={[AppStyles.flexDir, AppStyles.mt20,  AppStyles.inCenter]}>
        <TouchableOpacity activeOpacity={0.8} style={[AppStyles.flexpointsix]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15,]}>Has the material reached your warehouse</Text>
        </TouchableOpacity>

        <View style={[AppStyles.flexpointfour, AppStyles.alignfend, AppStyles.mr10]}>
          <CheckBoxWrapper           
            isChecked={item.is_completed == '1' ? true : false}
            checkBoxHandler={() => { }}
          />
        </View>
      </View>

      {/* Start material reached your warehouse */}
      {isShowWareHouseMainView && <View>
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
            <View>
              <TouchableOpacity activeOpacity={0.8}
                onPress={() => setPickerWarehouse(true)}
                style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary, AppStyles.br10, AppStyles.mb10, { padding: 10 }]}>
                <FAIcon size={22} name='calendar-o' color={Colors.mangoTwo} />
                <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{formatDisplayDate(warehouseDate)}</Text>
              </TouchableOpacity>
              {showPickerWarehouse && (<DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                minimumDate={new Date(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'))}
                mode={'date'}
                is24Hour={false}
                display="default"
                onChange={onChangeWareHouseDate}
              />)}
            </View>
          </View>
          <View style={[AppStyles.flex1, AppStyles.ml10]}>
            <Text style={Styles.inputLabelText}>Upload Documents</Text>
            <View>
              <TouchableOpacity activeOpacity={0.8} style={[Styles.inputText, Styles.inputIcon, AppStyles.br10]} onPress={() => setWarehouseImageUpload(!warehouseImageUpload)}>
                <Text style={[AppStyles.txtSecandaryRegular, { color: receiptImgData.length > 0 ? Colors.green : Colors.warmGrey }]}>{receiptImgData.length > 0 ? 'File Attached' : 'Attach File'}</Text>
                <MIcon name="attachment" size={25} color={Colors.grayThree} />
              </TouchableOpacity>
              {receiptClickConfirm && receiptImgData.length == 0 ? (
                <CustomText
                  fontSize={15}
                  color={Colors.red}
                  styling={{ marginTop: RfH(5) }}>
                  Upload Picture
                </CustomText>
              ) : null}
              <UploadDocument handleClose={() => setWarehouseImageUpload(false)}
                isVisible={warehouseImageUpload}
                ImageData={receiptImageData} />
            </View>
          </View>
        </View>

        <View style={AppStyles.flexDir}>
          <View style={[AppStyles.flex1, AppStyles.mt20]}>
            <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
              <TouchableOpacity activeOpacity={0.8} style={[Styles.confirmButtonn, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() => navigation.pop()}>
                <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[AppStyles.flex1, AppStyles.mt20]}>
            <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
              <TouchableOpacity activeOpacity={0.8} style={[Styles.confirmButton, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() => handleSubmitReceipt()}>
                <Text style={Styles.confirmBtnText}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      }
      {/* End material reached your warehouse */}

      {item.is_completed == '1' && <View style={[AppStyles.flex1, AppStyles.ph20, AppStyles.pv10, { borderTopColor: Colors.grayLine, borderTopWidth: RfH(1) }]}>
        <View style={[AppStyles.flexDir, AppStyles.flexRowSpaceBetween, AppStyles.pv10]}>
          <Text style={[AppStyles.flex1, AppStyles.txtPrimaryBold, AppStyles.f15, AppStyles.textalig]}>Sub Category</Text>
          <Text style={[AppStyles.flex1, AppStyles.txtPrimaryBold, AppStyles.f15, AppStyles.textalig]}>Quantity</Text>
        </View>
        {receiptData.map((item, index) => (
          <View
            key={index}
            style={[AppStyles.flexDir, AppStyles.flexRowSpaceBetween, { backgroundColor: index % 2 == 0 ? Colors.grayBorder : Colors.grayTwo }]}>
            <CustomText
              styling={{ flex: 1, paddingVertical: RfH(20), textAlign: 'center' }}
              fontSize={15}
              color={Colors.blackOne}
              fontFamily={Fonts.regular}
              fontWeight='bold'>
              {item.sub_category_name}
            </CustomText>
            <CustomText
              styling={{ flex: 1, paddingVertical: RfH(20), textAlign: 'center' }}
              fontSize={15}
              color={Colors.blackOne}
              fontFamily={Fonts.regular}
              fontWeight='bold'>
              {item.receipt_qty} {item.unit_name}
            </CustomText>
          </View>
        ))}
      </View>}
    </KeyboardAwareScrollView>

  );
};

export default PaymentVerification;
