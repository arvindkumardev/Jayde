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
import { useNavigation } from "@react-navigation/native";
import NavigationRouteNames from "../../routes/ScreenNames";
import { AppStyles, Colors } from '../../theme';

const STATIC_OPTION = [
  {
    name: 'PAPER WASTE',
    image: require('../../assets/Images/NewOrderList/Group_10089.png'),
    categoryId: 1
  },
  {
    name: 'PLASTIC WASTE',
    image: require('../../assets/Images/NewOrderList/Group_10090.png'),
    categoryId: 2
  },
  {
    name: 'ELECTRONIC WASTE',
    image: require('../../assets/Images/NewOrderList/Group_10091.png'),
    categoryId: 3
  },
  {
    name: 'MIX WASTE',
    image: require('../../assets/Images/NewOrderList/Group_10088.png'),
    categoryId: 4
  },
];

function NewOrderList() {
  const navigation = useNavigation();

  const handleNavigate = (title, category) => {
    navigation.navigate(NavigationRouteNames.PRICE_REQUEST, { title: title, categoryId: category })
  }
  const _renderItem = (index, item) => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 24 }} onPress={() => { handleNavigate(item.name, item.categoryId) }}>
        <View style={{ flex: 0.2 }}>
          <Image
            style={{ width: 66, height: 66, marginTop: 32 }}
            source={item.image}
          />
        </View>
        <View style={{ flex: 0.8 }}>
          <Text
            style={{
              fontSize: 17,
              marginLeft: 35,
              color: '#121212',
              marginTop: 58,
              fontFamily: 'ProximaNova-Regular',
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
      <ScrollView style={{ backgroundColor: Colors.white}}>
        <View style={[AppStyles.mt40, AppStyles.ml24, AppStyles.alignCenter]}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f35]}>
            New Order
          </Text>
          <Text style={[AppStyles.f17, AppStyles.txtBlackRegular]} >
            Please Choose a Category
          </Text>
        </View>

        <FlatList
          data={STATIC_OPTION}
          renderItem={({ index, item }) => _renderItem(index, item)}
        />
      </ScrollView>
  );
}
export default NewOrderList;
