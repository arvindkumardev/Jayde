import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FAIcon from "react-native-vector-icons/FontAwesome";
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { Fonts, Colors, AppStyles } from '../../../theme';



const PriceConfirm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [schedulePick, setSchedulePick] = useState("");

  useLayoutEffect(() => {
    const { title } = route.params;
    const { status } = route.params;
    console.log("status",status);
    setSchedulePick(status);
    navigation.setOptions({
      title,
    });
  }, [navigation]);

  const confirmBtn = () => {
    setSchedulePick("1");
  };

  const handleREQUESTCALLBACK = () => {
    navigation.navigate(NavigationRouteNames.CALL_REQUEST);
  };
  const handleSchedulePickup = () => {
    navigation.navigate(NavigationRouteNames.CONFIRM_ADDRESS);
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
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f16]}>Type 2</Text>
            </View>
          </View>
          <View style={AppStyles.flexRowSpaceBetween}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>Location</Text>
            </View>
            <View style={AppStyles.flexpointfour}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f16]}>Hyderabad</Text>
            </View>
          </View>
          <View style={AppStyles.flexRowSpaceBetween}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>Valume</Text>
            </View>
            <View style={AppStyles.flexpointfour}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f16]}>5 Tons</Text>
            </View>
          </View>
          <View style={Styles.totalPriceContainer}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtBlackBold, AppStyles.f16]}>Estimated Price</Text>
            </View>
            <View style={AppStyles.flexpointfour}>
              <Text style={[AppStyles.txtBlackBold, AppStyles.f16]}>
                <FAIcon size={14} name="rupee" /> 6000
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
           style={[AppStyles.mt20, AppStyles.br10, AppStyles.borderwidth1, AppStyles.borderColorMango, AppStyles.whitecolor, AppStyles.pv10, AppStyles.alignCenter]}
           onPress={handleREQUESTCALLBACK}>
           <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17]}>REQUEST CALL BACK</Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv10, AppStyles.alignCenter]}
           onPress={handleSchedulePickup}
         >
           <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17]}>SCHEDULE PICKUP</Text>
         </TouchableOpacity>
       </View> : <View style={Styles.btnContainer}>
       <TouchableOpacity
           style={[AppStyles.mt20, AppStyles.br10, AppStyles.borderwidth1, AppStyles.borderColorMango, AppStyles.whitecolor, AppStyles.pv10, AppStyles.alignCenter]}
          //  onPress={setSchedulePick("1")}
          onPress={() => {confirmBtn()}}
           >
           <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17]}>CONFIRM</Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv10, AppStyles.alignCenter]}
          //  onPress={handleSchedulePickup}
         >
           <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17]}>REJECT</Text>
         </TouchableOpacity>
       </View>   }
       
     
    </View>
  );
};

export default PriceConfirm;
