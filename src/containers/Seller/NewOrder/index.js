import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Styles from "./styles";
import { Colors, AppStyles } from "../../../theme";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { getSubCategories, getUnits, createQuote } from './middleware';

const NewOrder = () => {
  // const { user, setLogin } = useContext(UserContext);
  const navigation = useNavigation();
  const route = useRoute();
  const [{ data: subData }, onGetSubCategories] = getSubCategories();
  const [subCategories, setSubCategoryes] = useState([]);
  const [unitPickerData, setUnitData] = useState([]);
  const [{ data: unitsData }, onGetUnits] = getUnits();

  const [categoryId, setCategoryId] = useState(0);
  const [subCategoryId, setSubCategoryId] = useState('');
  const [volume, setVolume] = useState('');
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('');

  const handleGetQuote = () => {
    navigation.navigate(NavigationRouteNames.PRICE_CONFIRM);
  };
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>New Order</Text>,
  //   });
  // }, [navigation]);
  useLayoutEffect(() => {
    const { title, categoryId } = route.params;
    onGetSubCategories({ data: { id: categoryId } });
    onGetUnits();
    setCategoryId(categoryId);
    navigation.setOptions({
      title,
    });
  }, []);

  return (
    <View style={Styles.screenContainer}>
      <Text style={[AppStyles.f18, AppStyles.txtBlackRegular]}>What would you want to do?</Text>
      <View style={[AppStyles.w100, AppStyles.ph20]}>
        <TouchableOpacity style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv15, AppStyles.alignCenter]} onPress={handleGetQuote}>
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18]}>GET QUOTE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnSecandary, AppStyles.pv15, AppStyles.alignCenter]} onPress={handleGetQuote}>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f18]}>SCHEDULE PICKUP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewOrder;
