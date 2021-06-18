import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FAIcon from "react-native-vector-icons/FontAwesome";
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { Fonts, Colors, AppStyles } from '../../../theme';
import { getQuoteData, getImageName,setQuoteData, setEPRName, setEPRAggregatorID, setAggregator } from '../../../utils/Global'
import { deleteQuote, addOrder } from '../Middleware';
import UserContext from '../../../appContainer/context/user.context';
import NavClose from './../../../components/HeaderLeft'


const PriceConfirm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [schedulePick, setSchedulePick] = useState("");
  const { setLoader } = useContext(UserContext);

  const [{ data: deleteQuoteData, loading: QuoteLoading, error: deleteError }, onDeleteQuote] = deleteQuote(getQuoteData().category_name);
  const [{ data: orderData, loading: orderLoading, error }, onAddOrder] = addOrder(getQuoteData().category_name);

  useLayoutEffect(() => {
    const { title } = route.params;
    const { status } = route.params;
    setSchedulePick(status);
    navigation.setOptions({
      title,
      headerLeft: () => <NavClose onClose={() => navigation.pop()}></NavClose>,
    });
  }, [navigation]);

  const confirmBtn = () => {
    setSchedulePick("1");
  };

  useEffect(() => {
    if (error || deleteError)
      setLoader(false)
  }, [error, deleteError])

  useEffect(() => {
    setLoader(QuoteLoading);
    return () => {
      setLoader(false)
    }
  }, [QuoteLoading, deleteQuoteData]);

  useEffect(() => {
    setLoader(orderLoading);
  }, [orderData, orderLoading]);

  const handleREQUESTCALLBACK = async () => {
    navigation.navigate(NavigationRouteNames.CALL_REQUEST);
  };

  const handleSchedulePickup = async () => {
    if (route.params.status === '0') {
      const { data } = await onAddOrder({
        data: {
          primeId: 0,
          category_id: getQuoteData().category_id,
          sub_category_id: getQuoteData().sub_category_id,
          qty: getQuoteData().qty,
          unit: getQuoteData().unit,
          location: getQuoteData().location,
          uploaded_files: getImageName(),
        },
      });
      console.log(data.data)
      if (data.status) {
        setQuoteData(data.data.orderDetails);
        setEPRName(data.data.eprName);
        setEPRAggregatorID(data.data.businessDetails.epr_aggregator_id);
        setAggregator(data.data.aggregators);        
        navigation.navigate(NavigationRouteNames.CONFIRM_ADDRESS);
      } else {
        alert(data.message)
      }
    } else {
      navigation.navigate(NavigationRouteNames.CONFIRM_ADDRESS);
    }
  };

  const handelCheckStatus = async (rejected) => {   
    if (route.params.status === '0') {
      const { data } = await onDeleteQuote({
        data: {
          "id": getQuoteData().orderId
        },
      });
      console.log(data.data)
      if (data.status) {
        rejected ? navigation.popToTop() : handleSchedulePickup()
      } else {
        alert(data.message)
      }
    } else {
      handleSchedulePickup()
    }
  };


  return (
    <View style={[Styles.screenContainer,]}>
      <View style={[AppStyles.mt20, AppStyles.w100, AppStyles.alignCenter]}>
        <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>Provisional Price</Text>
        <View style={[AppStyles.ph40, AppStyles.mt20]}>
          <View style={[Styles.provisionalBox]}>
            <View style={[AppStyles.mt20, AppStyles.ml20]}>
              <View style={AppStyles.flexRowSpaceBetween}>
                <View style={AppStyles.flexpointsix}>
                  <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>Subcategory</Text>
                </View>
                <View style={AppStyles.flexpointfour}>
                  <Text style={[AppStyles.txtBlackRegular, AppStyles.f16]}>{getQuoteData().sub_category_name}</Text>
                </View>
              </View>
              <View style={AppStyles.flexRowSpaceBetween}>
                <View style={AppStyles.flexpointsix}>
                  <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16, AppStyles.mt10]}>Location</Text>
                </View>
                <View style={AppStyles.flexpointfour}>
                  <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mt10]}>{getQuoteData().location}</Text>
                </View>
              </View>
              <View style={AppStyles.flexRowSpaceBetween}>
                <View style={AppStyles.flexpointsix}>
                  <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16, AppStyles.mt10]}>Volume</Text>
                </View>
                <View style={AppStyles.flexpointfour}>
                  <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mt10]}>{getQuoteData().qty} {getQuoteData().unit_name}</Text>
                </View>
              </View>
              <View style={Styles.totalPriceContainer}>
                <View style={AppStyles.flexpointsix}>
                  <Text style={[AppStyles.txtBlackBold, AppStyles.f16]}>Estimated Price</Text>
                </View>
                <View style={AppStyles.flexpointfour}>
                  <Text style={[AppStyles.txtBlackBold, AppStyles.f16, Styles.estPrice]}>
                    <FAIcon size={14} name="rupee" /> {getQuoteData().price}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      {schedulePick == "1" ?
        <View style={Styles.btnContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[AppStyles.mt20, AppStyles.br10, AppStyles.borderwidth1, AppStyles.borderColorMango, AppStyles.whitecolor, AppStyles.btnHeightwidth, AppStyles.inCenter]}
            onPress={() => handleREQUESTCALLBACK()}>
            <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17]}>REQUEST CALL BACK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnPrimary, AppStyles.btnHeightwidth, AppStyles.inCenter]}
            onPress={() => handelCheckStatus(false)}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17]}>SCHEDULE PICKUP</Text>
          </TouchableOpacity>
        </View> : <View style={Styles.btnContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[AppStyles.mt20, AppStyles.br10, AppStyles.borderwidth1, AppStyles.borderColorMango, AppStyles.whitecolor, AppStyles.btnHeightwidth, AppStyles.inCenter]}
            onPress={() => { confirmBtn() }}>
            <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17]}>CONFIRM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handelCheckStatus(true)}
            activeOpacity={0.8}
            style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnPrimary, AppStyles.btnHeightwidth, AppStyles.borderwidth1, AppStyles.borderColorMango, AppStyles.inCenter]}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17]}>REJECT</Text>
          </TouchableOpacity>
        </View>}
    </View>
  );
};

export default PriceConfirm;
