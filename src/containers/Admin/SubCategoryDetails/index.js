import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { Alert } from "react-native";
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles, Colors } from '../../../theme';
import arraydata from '../../../utils/arraydata4.json';
import FAIcon from 'react-native-vector-icons/FontAwesome';

//Image
import PaperImg from '../../../assets/Images/NewOrderList/Group_10089.png'


function SubCategoryDetails() {

  const navigation = useNavigation();
  const route = useRoute();

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.ADD_SUBCATEGORY);
  }

  useLayoutEffect(() => {
    const title = 'Sub Category Details';
    navigation.setOptions({
      title, headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[AppStyles.pv10, AppStyles.ph20]}
          onPress={() => screenNavigate()}>
          <FAIcon size={28} name='plus-circle' color={Colors.mangoTwo} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const delView = () => {
    Alert.alert(
      "Would You Want To Delete ?",
      "",
      [
        {
          text: "Yes",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "No", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  const _RenderItem = (index, item) => {
    return (
      <TouchableOpacity>

        <View style={[AppStyles.flexDir, AppStyles.mt20]}>
          <View style={[AppStyles.flexpointtwo, AppStyles.ml20]}>
            <Image style={Styles.productImage} source={PaperImg} />
          </View>
          <View style={[AppStyles.flexpointsix]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.productname}</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.type}</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11]}>{item.weight}</Text>
          </View>
          <View style={AppStyles.flexpointtwo}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.price}</Text>
          </View>
        </View>

        <View style={[Styles.btnContainer, AppStyles.flexDir]}>
          <View style={AppStyles.flex1}>
            <TouchableOpacity
              onPress={() => screenNavigate()}
              style={[Styles.editBtn, AppStyles.btnHeight44, AppStyles.inCenter]}>
              <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig]}>EDIT</Text>
            </TouchableOpacity>
          </View>
          <View style={AppStyles.flex1}>
            <TouchableOpacity
              onPress={() => { delView() }}
              style={[Styles.deleteBtn, AppStyles.mb20, AppStyles.btnHeight44, AppStyles.inCenter]}>
              <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig]}>DELETE</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[AppStyles.w100, Styles.bdrclr]}></View>
      </TouchableOpacity>
    )
  }


  return (

    <View style={AppStyles.topView}>
      <ScrollView>

        <FlatList
          data={arraydata}
          renderItem={({ index, item }) =>
            _RenderItem(index, item)
          }
        />

      </ScrollView>


    </View>
  );
}
export default SubCategoryDetails;
