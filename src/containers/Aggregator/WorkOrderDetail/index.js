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


function WorkOrderDetail() {

  const navigation = useNavigation();
  const route = useRoute();

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }

  return (
    <View style={Styles.topView}>
      <ScrollView>


        <View style={AppStyles.aligncen}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt30,]}>DC No- JYD/SC/2020/0067</Text>
        </View>
        <View style={Styles.boxView}>

          <View style={[AppStyles.flexDir, AppStyles.mt20,]}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.ml20]}>Recycler Name</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mr20]}>TestUser</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Category</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>Paper</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Sub Category</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>Color record</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Quantity</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>100 kg</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Unit Price</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>₹ 200</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Total Price</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>₹ 20,000</Text>
            </View>
          </View>

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
export default WorkOrderDetail;
