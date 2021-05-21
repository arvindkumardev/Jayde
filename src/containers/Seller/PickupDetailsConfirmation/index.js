import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import style from "../../../theme/Styles/container";
import Styles from './styles';

import NavigationRouteNames from '../../../routes/ScreenNames';
import { Colors, AppStyles } from '../../../theme';

const PickupDetailsConfirmation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>Pickup Details</Text>,
    });
  }, [navigation]);

  const handleConfirm = () => {
    navigation.navigate(NavigationRouteNames.CONFIRMATION);
  };
  return (
    <View style={[AppStyles.flex1SpaceBetween, AppStyles.pb20, style.whitebackgrnd,]}>
      <View style={[AppStyles.mt20, AppStyles.w100]}>
        <View style={[AppStyles.w100, AppStyles.ph20, AppStyles.txtPrimaryBold]}>
          <View style={[AppStyles.mt20]}>
            <View style={[Styles.deliveryBox, style.btnSecandary,]}>
              <View style={[AppStyles.mt20, AppStyles.ml20,]}>
                <View style={AppStyles.flexRowSpaceBetween}>
                  <Text style={[AppStyles.txtBlackBold, AppStyles.mb10, AppStyles.f17]}>Delivery Address</Text>
                  <View style={[AppStyles.mr20]}>
                    <Text style={[AppStyles.txtmangoTwoRegular, AppStyles.f11]}>Edit</Text>
                  </View>
                </View>
                <View>
                  <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15]}>1812, Building no. 2</Text>
                  <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15]}>Bajranga Hills</Text>
                  <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15]}>Hyderabad (TN)</Text>
                </View>
              </View>
            </View>
          </View>


          <View style={[AppStyles.mt20]}>
            <View style={[Styles.dateBox, style.btnSecandary,]}>
              <View style={[AppStyles.mt20, AppStyles.ml20,]}>
                <View style={AppStyles.flexRowSpaceBetween}>
                  <Text style={[AppStyles.txtBlackBold, AppStyles.mb10, AppStyles.f17]}>Date & Time</Text>
                  <View style={[AppStyles.mr20]}>
                    <Text style={[AppStyles.txtmangoTwoRegular, AppStyles.f11]}>Edit</Text>
                  </View>
                </View>
                <View>
                  <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15]}>6 feb' 2021</Text>
                  <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15]}>10:00 am - 12:00 noon</Text>
                </View>
              </View>
            </View>
          </View>

        </View>
      </View>
      <View style={[AppStyles.flexRowSpaceBetween, AppStyles.w100, AppStyles.ph20, AppStyles.alignCenter]}>
        <View style={AppStyles.ph10}>
          <Text style={[AppStyles.f12, AppStyles.txtPrimaryBold]}>ESTIMATED PRICE</Text>
          <Text style={AppStyles.txtBlackRegular}>
            <FAIcon size={14} name="rupee" /> 6000
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={[AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv10, AppStyles.alignCenter, AppStyles.ph40]}
            onPress={handleConfirm}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18]}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PickupDetailsConfirmation;
