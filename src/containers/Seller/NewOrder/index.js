import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Styles from "./styles";
import { Colors, AppStyles } from "../../../theme";
import NavigationRouteNames from '../../../routes/ScreenNames';


const NewOrder = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [titleName, setTitleName] = useState("");


  const handleGetQuote = (btnstatus) => {
    navigation.navigate(NavigationRouteNames.PRICE_REQUEST,{title:titleName,
    status:btnstatus});
  };
 
  useLayoutEffect(() => {
    const { title, categoryId } = route.params
    setTitleName(title);
    navigation.setOptions({
      title,
    });
  }, []);

  return (
    <View style={Styles.screenContainer}>
      <Text style={[AppStyles.f18, AppStyles.txtBlackRegular]}>What would you want to do?</Text>
      <View style={[AppStyles.w100, AppStyles.ph20]}>
        <TouchableOpacity style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv10, AppStyles.alignCenter]} 
        // onPress={handleGetQuote("0")}
        onPress={() => {handleGetQuote("0")}}>
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18]}>GET QUOTE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnSecandary, AppStyles.pv10, AppStyles.alignCenter]} 
        // onPress={handleGetQuote("1")}>
        onPress={() => {handleGetQuote("1")}}>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f18]}>SCHEDULE PICKUP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewOrder;
