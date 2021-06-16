import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../theme';
import { getSaveData } from '../../utils/helpers';
import { LOCAL_STORAGE_DATA_KEY } from '../../utils/constants';
import UserContext from '../../appContainer/context/user.context';


function UpdateProfile() {

  const navigation = useNavigation();
  const route = useRoute();
  const {userRole} = useContext(UserContext)
  const [name, setName] = useState("");

  useEffect(() => {
    async function getUserName() {
      const username = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_NAME);
      setName(username)
    }
    getUserName();
  }, []);

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.BUSINESS_DETAIL);
  }

  const updateProfile = () => {
    navigation.navigate(NavigationRouteNames.PROFILE_UPDATE);
  }

  const completeLater = () => {
    navigation.navigate(NavigationRouteNames.HOME_SCREEN);
  }

  return (
    <View style={AppStyles.topView}>
    
        <View style={AppStyles.aligncen}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt30,]}>Welcome {name}</Text>
        </View>
        <View style={Styles.boxView}>
          <View style={[AppStyles.ml20, AppStyles.mr20, AppStyles.mb20]}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt20]}>As a business user you need to complete business registration to complete transactions on Jayde.</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt20]}>You can choose to complete it now or complete it later under the profile section.</Text>
          </View>
        </View>

        <View style={[Styles.btnContainer, AppStyles.flexDir]}>
          <View style={AppStyles.flex1}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[Styles.businessButton, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() => screenNavigate()}>
              <Text style={[AppStyles.txtmangoTwoRegular, AppStyles.f17, AppStyles.textalig]}>UPDATE BUSINESS</Text>
            </TouchableOpacity>
          </View>
          <View style={AppStyles.flex1}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[Styles.profileButton, AppStyles.mb20, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() => updateProfile()}>
              <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig]}>UPDATE PROFILE</Text>
            </TouchableOpacity>
          </View>
        </View>
       

         <View style={AppStyles.aligncen}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[Styles.completelaterbtn, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() => completeLater()}>
            <Text style={[AppStyles.txtmangoTwoRegular, AppStyles.f17, AppStyles.textalig]}>COMPLETE LATER</Text>
          </TouchableOpacity>
        </View> 

    
    </View>
  );
}
export default UpdateProfile;
