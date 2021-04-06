import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Image,} from "react-native";
import { logout, RfH, RfW } from "../../utils/helpers";
import { useNavigation, useRoute } from "@react-navigation/native";
import Styles from './styles';
import { Colors, Fonts, AppStyles } from "../../theme";
import DropDownPicker from 'react-native-dropdown-picker';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Camera from '../../components/Camera';
import { launchImageLibrary } from "react-native-image-picker";
import NavigationRouteNames from '../../routes/ScreenNames';
import Appstyles from "../../theme/Styles/texts";
import AppStyle from "../../theme/Styles/spaces";
import style from "../../theme/Styles/container";
import CustomText from '../../components/CustomText';
import {CheckBoxWrapper, CustomTextInput, GradientButton,} from '../../components';
import Checkbox from "@react-native-community/checkbox";





const PaymentVerification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [subCategories, setSubCategories] = useState([]);
  const [rememberMe,setRememberMe]=useState(false);


  const handleConfirm = () => {
    navigation.navigate(NavigationRouteNames.NEW_ORDER_REQUEST);
  };
  return (
    <KeyboardAwareScrollView style={{ flex: 1, paddingHorizontal: RfW(20), backgroundColor: '#ffffff', }}>
      <View style={[style.flexDir, AppStyle.mt20,]}>
        <View style={style.flexpointthree}>
        <Image style={Styles.lftimg} source={require('../../assets/Images/AdminNewOrder/Group10055.png')}  />
          </View>
        <View style={style.flexpointseven}>
          <Text style={[Appstyles.txtBlackBold, Appstyles.f20,]}>Payment</Text>
          </View>
        </View>

       <View style={Appstyles.aligncen}>
       <Text style={[Appstyles.txtBlackBold, Appstyles.f17, AppStyle.mt30,]}>Ref No- JYD/SC/2020/0067</Text>
       </View>
       <View style={Styles.boxView}>

         <View style={[style.flexDir, AppStyle.mt20,]}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Waste type</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>Plastic</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Waste sub category</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>Type 1</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Volume</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>3 Tons</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Purchase Date</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>26/07/2020</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Purchase amount</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>₹ 25,864</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Pickup Address</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f11, AppStyle.mt10, AppStyle.mr20]}>1812, building No 2, Banjara Hills. Hyderabad (TN)</Text>
           </View>
           </View>
       </View>

      <View style={[style.flexDir, AppStyle.mt35,]}>
      <View style={[style.flexpointfour]}>
        <Text style={[Appstyles.txtBlackRegular, Appstyles.f15,]}>Is the material Weighted</Text>
      </View>

      <View style={[style.flexpointsix, AppStyle.mt10, Appstyles.alignfend, AppStyle.mr10]}>
                  <CheckBoxWrapper
                    isChecked={rememberMe}
                    checkBoxHandler={() =>
                      setRememberMe((rememberMe) => !rememberMe)
                    }
                  />
                  </View>
                  </View>
     

      <View style={[AppStyle.mt20,]}>
        <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mb6,]}>Payment Required</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <TextInput placeholder={"25,864"} style={Styles.inputTextf} />
        <FAIcon style={Styles.rupee} size={15} name="rupee" />
        </View>
        </View>

      <View style={[AppStyle.mt20,]}>
        <View style={style.flexDir}>
        <View style={style.flexpointseven}>
        <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mb6]}>Payment Made</Text>
        </View>
        <View style={style.flexpointthree}>
        <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f11,  AppStyle.ml30, AppStyle.mt5]}>enter value</Text>
        </View>
        </View>
        <TextInput placeholder={"25,864"} style={Styles.inputText} />
      </View>

      <View style={[AppStyle.mt20,]}>
        <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mb6,]}>Payment Mode</Text>
        <TextInput placeholder={"Cash"} style={Styles.inputText} />
      </View>

      <View style={[AppStyle.mt20,]}>
        <View style={style.flexDir}>
        <View style={style.flexpointsix}>
        <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mb6,]}>Payment Details</Text>
        </View>
        <View style={style.flexpointfour}>
        <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f11, AppStyle.mt5, AppStyle.ml20,]}>Transaction number</Text>
        </View>
        </View>
        <TextInput placeholder={"1235567778"} style={Styles.inputText} />
      </View>

      <View>
                <View style={[style.flexDir, style.alignCenter, AppStyle.mt20]}>
                <Checkbox
                            disabled={false}
                            value={true}
                            tintColors={{ true: Colors.mango, false: '#777' }}
                            onValueChange={(newValue) => console.log(newValue)}
                        />
                   <View style={{marginLeft: RfW(10)}}>
                    <CustomText
                      color={Colors.warmGrey}
                      fontSize={15}
                      styling={{paddingVertical: RfH(4)}}>
                      I agree to the terms and conditions
                    </CustomText>
                  </View> 
                </View>
              </View>
     
      <View style={style.flexDir}>
      <View style={style.flex1}>
      <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
        <TouchableOpacity style={Styles.confirmButtonn} onPress={handleConfirm}>
          <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
        </TouchableOpacity>
      </View>
      </View>
      <View style={style.flex1}>
      <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
        <TouchableOpacity style={Styles.confirmButton} onPress={handleConfirm}>
          <Text style={Styles.confirmBtnText}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
      </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PaymentVerification;
