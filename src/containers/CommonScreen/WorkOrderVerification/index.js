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
import CheckBoxWrapper from '../../../components/CheckBoxWrapper';
import Checkbox from "@react-native-community/checkbox";
import moment from 'moment';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormik } from "formik";
import * as yup from "yup";
import {
  weightConfirm, weightPropose, confirmPaymentWork, pickupConfirm,
  receiptConfirm, scheduleOrderDetail
} from '../Middelware';
import UserContext from '../../../appContainer/context/user.context';
import DropDown from '../../../components/Picker/index';

const paymentMode = [
  { label: 'CASH', value: 'CASH' },
  { label: 'CHEQUE', value: 'CHEQUE' },
  { label: 'RTGS', value: 'RTGS' },
  { label: 'DD', value: 'DD' },
]

const WorkOrderVerification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { setLoader, userRole } = useContext(UserContext);

  const refPaymentMode = useRef(null);
  const refPaymentDetail = useRef(null);

  const [item, setItem] = useState({});
  const [isViewLoaded, setViewLoaded] = useState(false)

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
  const [{ data: confirmWeightData }, onWeightConfirm] = weightConfirm(userRole);
  const [{ data: proposeWeightData }, onSubmitProposeWeight] = weightPropose(userRole);
  const [{ data: paymentConfirmData }, onSubmitPaymentConfirm] = confirmPaymentWork(userRole);
  const [{ data: pickupConfirmData }, onSubmitPickupConfirm] = pickupConfirm(userRole);
  const [{ data: receiptConfirmData }, onSubmitReceiptConfirm] = receiptConfirm(userRole);
  const [{ data: scheduleData, loading, error }, onScheduleOrderDetail] = scheduleOrderDetail(userRole);

  // ---------------------- End Api Section ---------------------

  const handelNavigate = () => {
    if (route.params.WhereFrom === NavigationRouteNames.AGGREGATOR_WORK_ORDER_LIST) {
      navigation.popToTop()
      navigation.navigate(NavigationRouteNames.AGGREGATOR_WORK_ORDER_LIST);
    } else if (route.params.WhereFrom === NavigationRouteNames.RECYCLER_WORK_ORDER_LIST) {
      navigation.popToTop()
      navigation.navigate(NavigationRouteNames.RECYCLER_WORK_ORDER_LIST);
    }
  }

  const handleConfirmWeight = async (kantaSlipNo) => {
    if (confirmWeightImgData.length == 0)
      return

    setLoader(true)
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
      handelNavigate()
    } else {
      alert(data.message)
    }
    setLoader(false)
  };

  const handleProposeWeight = async (volume, unit, Proposekantaslipno) => {
    if (proposeWeightImgData.length === 0)
      return

    setLoader(true)
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
      handelNavigate()
    } else {
      alert(data.message)
    }
    setLoader(false)
  };

  const handlePaymentConfirm = async (paymentmade, paymentmode, paymentdetails) => {
    setLoader(true)
    try {
      const { data } = await onSubmitPaymentConfirm({
        data: {
          "workId": item.work_id,
          "paymentRequired": item.work_sub_total,
          "paymentMade": paymentmade,
          "paymentMode": paymentmode,
          "paymentDetails": paymentdetails
        },
      });

      console.log(data)
      if (data.status) {
        handelNavigate()
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
    const { data } = await onSubmitPickupConfirm({
      data: {
        assignedId: item.assigned_id,
      },
    });
    console.log(data)
    if (data.status) {
      handelNavigate()
    } else {
      alert(data.message)
    }
    setLoader(false)
  };

  const handleReceiptConfirm = async (vechileNo) => {
    if (receiptImgData.length == 0)
      return

    setLoader(true)
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
    checkCondition: yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),

  });

  const paymentRequestForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      paymentmade: '',
      paymentmode: '',
      checkCondition: false,
      paymentdetails: ''
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
          return
        } else if (itemObj.proposed_weight_confirm === '1' && itemObj.pickup_confirmed === '0' && itemObj.is_seller_confirmed == '3') {
          setShowPickUpConfirmButton(true)
        } else if (itemObj.proposed_weight_confirm === '1' && itemObj.pickup_confirmed === '1' && itemObj.is_completed == '1') {
          setShowWareHouseMainView(false)
        } else {
          setShowWeightedMainView(false)
          setShowPickUpMainView(false)
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
    //setLoader(true)
    const { item } = route.params
    setItem(item)
    setViewLoaded(true)
    //getScheduleDetails()  
    return () => {
      setLoader(false)
    }
  }, [])

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
        <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt30,]}>Ref No- {item.work_order_no}</Text>
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
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.work_qty} {item.unit_name}</Text>
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
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Unit Price</Text>
          </View>
          <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}><FAIcon size={14} name="rupee" /> {item.work_price}</Text>
          </View>
        </View>

        <View style={[AppStyles.flexDir, AppStyles.mb20]}>
          <View style={AppStyles.flexpointsix}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Total Price</Text>
          </View>
          <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}><FAIcon size={14} name="rupee" /> {item.work_sub_total}</Text>
          </View>
        </View>
      </View>

      {/* Start Material pickup confirmation */}
      <View style={[AppStyles.flexDir, AppStyles.mt20,]}>
        <TouchableOpacity activeOpacity={0.8} style={[AppStyles.flexpointfour]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15,]}>Material Pick-up confirmation</Text>
        </TouchableOpacity>

        <View style={[AppStyles.flexpointsix, AppStyles.mt10, AppStyles.alignfend]}>
          <CheckBoxWrapper
            isChecked={item.is_seller_confirmed == '1' ? true : false}
            checkBoxHandler={() => { }}
          />
        </View>
      </View>

      {item.paid_amount == null && item.is_seller_confirmed == 0 && <View>
        <View style={[AppStyles.mt20]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6,]}>Payment Required</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TextInput placeholder={"25,864"}
              editable={false}
              value={item.work_sub_total}
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
            keyboardType='number-pad'
            returnKeyType='next'
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
          {/* <TextInput placeholder={"Cash"}
            ref={refPaymentMode}
            value={paymentRequestForm.values.paymentmode}
            onChangeText={(txt) => paymentRequestForm.setFieldValue('paymentmode', txt)}
            style={Styles.inputText}
            maxLength={50}
            returnKeyType='next'
            onSubmitEditing={() => refPaymentDetail.current?.focus()}
          /> */}

          <DropDown
            items={paymentMode}
            placeholderText="Payment Mode"
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
            //keyboardType='number-pad'
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
              value={paymentRequestForm.values.checkCondition}
              tintColors={{ true: Colors.mango, false: '#777' }}
              onValueChange={(newValue) => paymentRequestForm.setFieldValue('checkCondition', newValue)}

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
          {paymentClickConfirm && paymentRequestForm.errors.checkCondition ? (
            <CustomText fontSize={15} color={Colors.red} styling={{ marginLeft: 27 }}>
              { paymentRequestForm.errors.checkCondition}
            </CustomText>
          ) : null}
        </View>


        <View style={AppStyles.flexDir}>
          <View style={AppStyles.flex1}>
            <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
              <TouchableOpacity activeOpacity={0.8} style={Styles.confirmButtonn} onPress={() => navigation.pop()}>
                <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={AppStyles.flex1}>
            <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
              <TouchableOpacity activeOpacity={0.8} style={Styles.confirmButton} onPress={() => handleSubmitPayment()}>
                <Text style={Styles.confirmBtnText}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      }


      {item.paid_amount != null && item.is_seller_confirmed == 0 ? <View style={[AppStyles.alignCenter, AppStyles.justifyCon, AppStyles.pv10]}>
        <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.txtmangoTwoBold]}>Payment Confirmation Sent</Text>
      </View>
        : item.pickup_confirmed == '2' && <View style={[AppStyles.alignCenter, AppStyles.justifyCon, AppStyles.pv10]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.txtmangoTwoBold]}>Payment Confirmation Sent</Text>
        </View>
      }

      {isShowPickUpConfirmButton && <TouchableOpacity activeOpacity={0.8} style={Styles.confirmButtonnabcd} onPress={() => handelPickupConfirm()}>
        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f17, AppStyles.mt10,]}>Confirm Pickup</Text>
      </TouchableOpacity>}


    </KeyboardAwareScrollView>

  );
};

export default WorkOrderVerification;
