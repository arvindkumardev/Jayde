import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Checkbox from '@react-native-community/checkbox';
import style from "../../../theme/Styles/container";
import Styles from "./styles";

import NavigationRouteNames from '../../../routes/ScreenNames';
import { Colors, AppStyles } from '../../../theme';

const PriceConfirm = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>Pickup Details</Text>,
    });
  }, [navigation]);

  const handleConfirm = () => {
    navigation.navigate(NavigationRouteNames.PICKUP_DATE);
  };
  return (
    <View style={[AppStyles.flex1SpaceBetween, AppStyles.pb20, style.whitebackgrnd,]}>
      <View style={[AppStyles.mt20, AppStyles.w100]}>
        <View style={[AppStyles.w100, AppStyles.ph20, AppStyles.txtPrimaryBold]}>
          <View style={[Styles.paperBox, style.btnSecandary,]}>
            <View style={[AppStyles.mt20, AppStyles.ml20,]}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f16, AppStyles.mb10]}>Paper</Text>
          <View style={AppStyles.flexRowSpaceBetween}>
            <View style={AppStyles.flexpointseven}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>Subcategory</Text>
            </View>
            <View style={AppStyles.flexpointthree}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f16]}>Type 2</Text>
            </View>
          </View>
          <View style={AppStyles.flexRowSpaceBetween}>
            <View style={AppStyles.flexpointseven}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>Volume</Text>
            </View>
            <View style={AppStyles.flexpointthree}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f16]}>5 Tons</Text>
            </View>
          </View>
          </View>
          </View>
          <View style={[AppStyles.mt20]}>
          <View style={[Styles.deliveryBox, style.btnSecandary,]}>
            <View style={[AppStyles.mt20, AppStyles.ml20,]}>
            <View style={AppStyles.flexRowSpaceBetween}>
              <Text style={[AppStyles.txtBlackBold, AppStyles.mb10, AppStyles.f16]}>Delivery Address</Text>
              <View style={[AppStyles.mr10]}>
              <Checkbox
                disabled={false}
                value={true}
                tintColors={{ true: Colors.mango, false: '#777' }}
                onValueChange={(newValue) => console.log(newValue)}
              />
              </View>
            </View>
            <View>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>1812, Building no. 2</Text>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>Bajranga Hills</Text>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>Hyderabad (TN)</Text>
            </View>
          </View>
          </View>
          </View>
          <View style={[Styles.addressBox, style.btnSecandary, AppStyles.mt20,]}>
            <View style={[AppStyles.mt20, AppStyles.ml20,]}>
          <TouchableOpacity style={[AppStyles.flexRowAlignCenter]}>
            <FAIcon name={'plus'} size={20} color={Colors.mango} />
            <Text style={[AppStyles.ml10, AppStyles.txtBlackBold, AppStyles.f16]}>Add New Address</Text>
          </TouchableOpacity>
          </View>
          </View>
          <View style={[Styles.addressBox, style.btnSecandary, AppStyles.mt20,]}>
            <View style={[AppStyles.mt20, AppStyles.ml20,]}>
          <TouchableOpacity style={[AppStyles.flexRowAlignCenter]}>
            <FAIcon name={'plus'} size={20} color={Colors.mango} />
            <Text style={[AppStyles.ml10, AppStyles.txtBlackBold, AppStyles.f16]}>Add Time Slot</Text>
          </TouchableOpacity>
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

export default PriceConfirm;