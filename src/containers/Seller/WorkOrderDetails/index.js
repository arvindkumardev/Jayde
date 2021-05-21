import React, { useContext, useEffect, useState } from 'react';
import * as Alert from 'react-native';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView } from 'react-native';
import Styles from "./styles";
import { logout, RfH, RfW } from "../../../utils/helpers";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { Colors, AppStyles } from '../../../theme';
import Checkbox from "@react-native-community/checkbox";
import CustomText from '../../../components/CustomText';


function WorkOrderDetails() {

  const navigation = useNavigation();
  const route = useRoute();

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }

  return (
    <View style={Styles.topView}>
      <ScrollView>


        <View style={AppStyles.aligncen}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt30,]}>Ref No- JYD/SC/2020/0067</Text>
        </View>
        <View style={Styles.boxView}>

          <View style={[AppStyles.flexDir, AppStyles.mt20,]}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.ml20]}>Waste type</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mr20]}>Plastic</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Waste sub category</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>Type 1</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Volume</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>3 Tons</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Purchase Date</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>26/07/2020</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Provisional Pricing</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>₹ 25,864</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Payment made</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>₹ 25,864</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Payment mode</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>Cash</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Payment details</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>1235567778</Text>
            </View>
          </View>
        </View>

        <View style={[AppStyles.ml20, AppStyles.mr20]}>
          <Text style={[AppStyles.txtSecandaryBold, AppStyles.f11, AppStyles.mt20]}>Please note that the provisional pricing is subject to verifycation by the authorized by Jayde pickup agent</Text>
        </View>

        <View>
          <View style={[AppStyles.flexDir, AppStyles.alignCenter, AppStyles.mt14, AppStyles.ml20,]}>
            <Checkbox
              disabled={false}
              value={true}
              tintColors={{ true: Colors.mango, false: '#777' }}
              onValueChange={(newValue) => console.log(newValue)}
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

        <View style={Styles.btnContainer}>
          <TouchableOpacity
            style={[Styles.confirmbtn, AppStyles.mb20]}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>CONFIRM</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>


    </View>
  );
}
export default WorkOrderDetails;
