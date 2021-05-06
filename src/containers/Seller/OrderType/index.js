import React, { useContext, useEffect, useState } from 'react';
import * as Alert from 'react-native';
import { TouchableOpacity, View, Text, Image, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { AppStyles, Colors } from '../../../theme';
import { getCategories } from './middleware';
import UserContext from '../../../appContainer/context/user.context';
import Styles from './styles';

const ORDER_IMAGE = {
  'E-Waste': require('../../../assets/Images/NewOrderList/Group_10091.png'),
  Paper: require('../../../assets/Images/NewOrderList/Group_10089.png'),
  Plastic: require('../../../assets/Images/NewOrderList/Group_10090.png'),
  'Mix Waste': require('../../../assets/Images/NewOrderList/Group_10088.png'),
};
function OrderType() {
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
    navigation.navigate(NavigationRouteNames.NEW_ORDER_REQUEST, { title, categoryId: category });
  };
  const _renderItem = (index, item) => (
    <TouchableOpacity 
    key = {index}
    onPress={() => handleNavigate(item.category_name, item.id)} style={Styles.itemContainer}>
      <View>
        <Image style={Styles.itemImageSize} source={ORDER_IMAGE[item.category_name]} />
      </View>
      <Text style={[AppStyles.txtBlackRegular, AppStyles.f18, AppStyles.ml20]}>{item.category_name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ backgroundColor: Colors.white }}>
      <View style={[AppStyles.mt10, AppStyles.ml24, AppStyles.alignCenter]}>
        <Text style={[AppStyles.txtBlackBold, AppStyles.f35]}>New Order</Text>
        <Text style={[AppStyles.f17, AppStyles.txtBlackRegular]}>Choose a Category</Text>
      </View>
      <View style={AppStyles.mt20}>
        <FlatList data={categories}         
        keyExtractor={(_, index) => `${index}1`}
        renderItem={({ index, item }) => _renderItem(index, item)} />
      </View>
    </ScrollView>
  );
}
export default OrderType;
