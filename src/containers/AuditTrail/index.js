import React, {useState, useLayoutEffect} from 'react';
import {TouchableOpacity, View, Text, TextInput, ScrollView} from 'react-native';
import Styles from "./styles";
import CustomText from '../../components/CustomText';
import NavigationRouteNames from '../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles, Colors } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import { useFormik } from 'formik';

function AuditTrail() {
  const navigation = useNavigation();
  const route = useRoute();
  const [unitPickerData, setUnitData] = useState([]);
  const [unit, setUnit] = useState('');
  const [clickLogin, setClickLogin] = useState(false);

  const validationSchema = Yup.object().shape({
    id: Yup.string().required('Please enter jayde id'),
  });

  const businessForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      id: '',
    },
    validationSchema,
    onSubmit: () => screenNavigate(businessForm.values.id),
  });

  const handleAuditTrail = async () => {
    setClickLogin(true);
    await businessForm.submitForm();
  };

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.SMARTCONTRACT_DETAIL);
  };

  useLayoutEffect(() => {
    const title = 'Check Audit Trail';
    navigation.setOptions({
      title,
    });
  }, []);

  return (
    <KeyboardAwareScrollView
    contentInsetAdjustmentBehavior = 'always'
      showsVerticalScrollIndicator = {false}
      contentContainerStyle = {{flexGrow:1,}}
      automaticallyAdjustContentInsets = {false}
      style={[AppStyles.flex1, AppStyles.whitebackgrnd]}>

          <View style={AppStyles.flex1}>
            <Text style={[AppStyles.txtBlackBold, AppStyles.f17, Styles.title]}>
              Check the basic details of the contracts for reference purpose
            </Text>

            <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Enter valid Jayde ID</Text>
              <View>
                <TextInput
                  placeholder={'JYD/X/20XX/XXXX'}
                  style={AppStyles.inputTxtStyle}
                  value={businessForm.values.id}
                  onChangeText={(txt) => businessForm.setFieldValue('id', txt)}
                />
                {clickLogin && businessForm.errors.id ? (
                  <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10), marginLeft: 5 }}>
                    {businessForm.errors.id}
                  </CustomText>
                ) : null}
              </View>
            </View>
            </View>


          <View style={[Styles.btnContainer, AppStyles.flexDir]}>
              <View style={AppStyles.flex1}>
                <TouchableOpacity activeOpacity = {0.8} style={[Styles.resetButton, AppStyles.btnHeight44, AppStyles.inCenter]}>
                  <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig]}>
                    RESET
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={AppStyles.flex1}>
                <TouchableOpacity activeOpacity = {0.8} style={[Styles.submitButton, AppStyles.mb20, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() => handleAuditTrail()}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig]}>
                    SUBMIT
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          
    
    </KeyboardAwareScrollView>
  );
}
export default AuditTrail;
