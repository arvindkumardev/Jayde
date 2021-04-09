import React, { useContext, useEffect, useState } from 'react';
import * as Alert from 'react-native';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationRouteNames from '../../routes/ScreenNames';
import { AppStyles, Colors } from '../../theme';
import { getCategories } from './middleware';
import UserContext from '../../appContainer/context/user.context';
import Styles from "./styles";

const ORDER_IMAGE = {
  'E-Waste': require('../../assets/Images/NewOrderList/Group_10091.png'),
  Paper: require('../../assets/Images/NewOrderList/Group_10089.png'),
  Plastic: require('../../assets/Images/NewOrderList/Group_10090.png'),
  'Mix Waste': require('../../assets/Images/NewOrderList/Group_10088.png'),
};
function NewOrderList() {
  const navigation = useNavigation();
  const { setLoader } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [{ data, loading, error }, onGetCategories] = getCategories();

  useEffect(() => {
    onGetCategories();
  }, []);

  useEffect(() => {
    setLoader(loading);
    setCategories(data);
  }, [data, loading]);

  const handleNavigate = (title, category) => {
    navigation.navigate(NavigationRouteNames.PRICE_REQUEST, { title, categoryId: category });
  };
  const _renderItem = (index, item) => (
    <TouchableOpacity onPress={() => handleNavigate(item.category_name, item.id)} style={Styles.itemContainer}>
      <View>
        <Image style={Styles.itemImageSize} source={ORDER_IMAGE[item.category_name]} />
      </View>
      <Text style={[AppStyles.txtBlackRegular, AppStyles.f18, AppStyles.ml20]}>
        {item.category_name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ backgroundColor: Colors.white }}>
      <View style={[AppStyles.mt40, AppStyles.ml24, AppStyles.alignCenter]}>
        <Text style={[AppStyles.txtBlackBold, AppStyles.f35]}>New Order</Text>
        <Text style={[AppStyles.f17, AppStyles.txtBlackRegular]}>Please Choose a Category</Text>
      </View>
      <FlatList data={categories} renderItem={({ index, item }) => _renderItem(index, item)} />
    </ScrollView>
  );
}
export default NewOrderList;
