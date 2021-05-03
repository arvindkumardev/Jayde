import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Styles from './styles';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { Colors, AppStyles } from '../../../theme';
import { UploadDocument } from '../../../components/index';

const CallRequest = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [imageUpload, setImageUpload] = useState(false);

  const handleSchedulePickup = () => {
    navigation.navigate(NavigationRouteNames.CALLBACK_CONFIRMATION);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>Call Back Request</Text>,
    });
  }, [navigation]);

  const handleConfirm = () => {};
  return (
    <KeyboardAwareScrollView style={Styles.mainContainer}>
      <View style={[AppStyles.w100, AppStyles.alignCenter, AppStyles.mt20]}>
        <Text style={[AppStyles.txtBlackBold, AppStyles.f16]}>Please confirm your details</Text>
      </View>
      <View style={AppStyles.mt20}>
        <View>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Contact person</Text>
          <TextInput
            placeholder="Name..."
            style={[
              AppStyles.txtSecandaryRegular,
              AppStyles.btnSecandary,
              AppStyles.br10,
              AppStyles.mb10,
              AppStyles.pl20,
            ]}
          />
        </View>
        <View>
          <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]]}>Contact number</Text>
          <TextInput
            placeholder="Contact number..."
            style={[
              AppStyles.txtSecandaryRegular,
              AppStyles.btnSecandary,
              AppStyles.br10,
              AppStyles.mb10,
              AppStyles.pl20,
            ]}
          />
        </View>
        <View>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Upload File</Text>
          <TouchableOpacity style={[Styles.inputText, Styles.inputIcon, AppStyles.br10]} onPress={() => setImageUpload(!imageUpload)}>
            <Text style={Styles.txtFileUpload}>Select file</Text>
            <MIcon name="attachment" size={25} color={Colors.grayThree} />
          </TouchableOpacity>
          <UploadDocument handleClose={() => setImageUpload(false)} isVisible={imageUpload} />
        </View>
      </View>
      <View style={[AppStyles.mv20]}>
        <Text style={[AppStyles.txtBlackRegular, AppStyles.f16]}>Preferred time slot</Text>
        <TouchableOpacity style={[AppStyles.pv15, AppStyles.ph20, AppStyles.flexRowSpaceBetween]}>
          <Text style={AppStyles.txtBlackRegular}>09-03-2021</Text>
          <Text style={AppStyles.txtBlackRegular}>11:00 am - 1:00 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[AppStyles.pv15, AppStyles.ph20, AppStyles.flexRowSpaceBetween]}>
          <Text style={AppStyles.txtBlackRegular}>09-03-2021</Text>
          <Text style={AppStyles.txtBlackRegular}>3:00 pm - 5:00 pm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[AppStyles.pv15, AppStyles.ph20, AppStyles.flexRowSpaceBetween, Styles.active]}>
          <Text style={AppStyles.txtBlackRegular}>10-03-2021</Text>
          <Text style={AppStyles.txtBlackRegular}>11:00 am - 1:00 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[AppStyles.pv15, AppStyles.ph20, AppStyles.flexRowSpaceBetween]}>
          <Text style={AppStyles.txtBlackRegular}>10-03-2021</Text>
          <Text style={AppStyles.txtBlackRegular}>3:00 pm - 5:00 pm</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv10, AppStyles.alignCenter, AppStyles.mb20]} onPress={() => {handleSchedulePickup()}}>
        <Text style={[AppStyles.f18, AppStyles.txtWhiteRegular]}>CONFIRM</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default CallRequest;
