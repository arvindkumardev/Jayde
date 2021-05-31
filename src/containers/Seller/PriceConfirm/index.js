import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FAIcon from "react-native-vector-icons/FontAwesome";
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { Fonts, Colors, AppStyles } from '../../../theme';
import { getQuoteData, getImageName } from '../../../utils/Global'
import { createQuote, addOrder } from '../Middleware';
import UserContext from '../../../appContainer/context/user.context';
import NavClose from './../../../components/HeaderLeft'


const PriceConfirm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [schedulePick, setSchedulePick] = useState("");
  const { setLoader } = useContext(UserContext);

  const [{ data: quoteData, loading, error }, onSubmitQuote] = createQuote(getQuoteData().category_name);
  const [{ data: orderData, loading: orderLoading }, onAddOrder] = addOrder(getQuoteData().category_name);

  useLayoutEffect(() => {
    const { title } = route.params;
    const { status } = route.params;
    setSchedulePick(status);
    navigation.setOptions({
      title,
      headerLeft: () => <NavClose onClose = {() => navigation.pop()}></NavClose>,
    });
  }, [navigation]);

  const confirmBtn = () => {
    setSchedulePick("1");
  };

  useEffect(() => {
    setLoader(loading);
    if (quoteData && quoteData.status) {
    }
    return () => {
      setLoader(false)     
    }
  }, [quoteData, loading]);

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
        navigation.navigate(NavigationRouteNames.CONFIRM_ADDRESS);
      } else {
        alert(data.message)
      }
    } else {
      navigation.navigate(NavigationRouteNames.CONFIRM_ADDRESS);
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
                  <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>Location</Text>
                </View>
                <View style={AppStyles.flexpointfour}>
                  <Text style={[AppStyles.txtBlackRegular, AppStyles.f16]}>{getQuoteData().location}</Text>
                </View>
              </View>
              <View style={AppStyles.flexRowSpaceBetween}>
                <View style={AppStyles.flexpointsix}>
                  <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>Volume</Text>
                </View>
                <View style={AppStyles.flexpointfour}>
                  <Text style={[AppStyles.txtBlackRegular, AppStyles.f16]}>{getQuoteData().qty} {getQuoteData().unit_name}</Text>
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
            style={[AppStyles.mt20, AppStyles.br10, AppStyles.borderwidth1, AppStyles.borderColorMango, AppStyles.whitecolor, AppStyles.pv10, AppStyles.alignCenter]}
            onPress={handleREQUESTCALLBACK}>
            <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17]}>REQUEST CALL BACK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv10, AppStyles.alignCenter]}
            onPress={handleSchedulePickup}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17]}>SCHEDULE PICKUP</Text>
          </TouchableOpacity>
        </View> : <View style={Styles.btnContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[AppStyles.mt20, AppStyles.br10, AppStyles.borderwidth1, AppStyles.borderColorMango, AppStyles.whitecolor, AppStyles.pv10, AppStyles.alignCenter]}
            onPress={() => { confirmBtn() }}>
            <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17]}>CONFIRM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv10, AppStyles.alignCenter]}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17]}>REJECT</Text>
          </TouchableOpacity>
        </View>}
    </View>
  );
};

export default PriceConfirm;
