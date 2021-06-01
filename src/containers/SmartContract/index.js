import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../theme';

import contractIcon from '../../assets/Images/SmartContract/contract.png'
import auditIcon from '../../assets/Images/SmartContract/auditing.png'

function SmartContract() {
  const navigation = useNavigation();
  const route = useRoute();

  const ownedContracts = () => {
    navigation.navigate(NavigationRouteNames.OWNED_CONTRACTS);
  }

  const auditTrail = () => {
    navigation.navigate(NavigationRouteNames.AUDIT_TRAIL);
  }

  useLayoutEffect(() => {
    const title = 'Smart Contracts';
    navigation.setOptions({
      title,
    });
  }, []);

  return (
    <View style={[AppStyles.topView, { alignItems: 'center' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => ownedContracts()}>
          <View style={Styles.boxView}>
            <View style={AppStyles.flexDir}>
              <View style={AppStyles.flexpointeight}>
                <Text style={[AppStyles.txtWhiteBold, AppStyles.f17, AppStyles.mt20, AppStyles.ml20]}>Owned Contracts</Text>
                <View style={[Styles.bdrclr]}></View>
              </View>
              <View style={[AppStyles.flexpointtwo, AppStyles.alignfend, AppStyles.mt20, AppStyles.mr14]}>
                <Image source={contractIcon} />
              </View>
            </View>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f13, AppStyles.mt10, AppStyles.ml20]}>View all the contacts that you own.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={() => auditTrail()}>
          <View style={Styles.auditboxView}>
            <View style={AppStyles.flexDir}>
              <View style={AppStyles.flexpointeight}>
                <Text style={[AppStyles.txtWhiteBold, AppStyles.f17, AppStyles.mt20, AppStyles.ml20]}>Audit Trail</Text>
                <View style={[Styles.bdrclr]}></View>
              </View>
              <View style={[AppStyles.flexpointtwo, AppStyles.alignfend, AppStyles.mt20, AppStyles.mr14]}>
                <Image source={auditIcon} />
              </View>
            </View>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f13, AppStyles.mt10, AppStyles.ml20, AppStyles.mr30]}>Check the details of contracts for reference.</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
export default SmartContract;
