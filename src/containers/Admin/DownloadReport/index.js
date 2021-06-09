import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import { Alert } from "react-native";
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import Styles from "./styles";
import CustomText from '../../../components/CustomText';
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import FAIcon from "react-native-vector-icons/FontAwesome";
import CheckBoxWrapper from '../../../components/CheckBoxWrapper';
import arraydata from '../../../utils/arraydata3.json';


function DownloadReport() {

   const navigation = useNavigation();
   const route = useRoute();
   const [rememberMe,setRememberMe]=useState(false);
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }

     useLayoutEffect(() => {
      const title='Reports';
     navigation.setOptions({
      title,
    });
    }, []);

    const _RenderItem = (index, item) => {
      return (
        <TouchableOpacity>
        <View style={[AppStyles.flexDir, AppStyles.mt20]}>
          <View style={[AppStyles.ml24, AppStyles.flexpointeight]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.productnumber}</Text>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.name}</Text>
          </View>
          <View style={[AppStyles.flexpointtwo,]}>
          <View style={[AppStyles.mr10]}>
                  <CheckBoxWrapper
                  //  style={{width: 40, height: 40}}
                    isChecked={item.checkboxvalue}
                    // checkBoxHandler={() =>
                    //   setRememberMe((rememberMe) => !rememberMe)
                    // }
                  />
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f9, AppStyles.mr10]}>{item.status}</Text>
                  </View>
          </View>
          </View>

         <View style={[AppStyles.flexDir, AppStyles.mt20]}>
         <View style={[AppStyles.flexpointtwo, AppStyles.ml20]}>
         <Image source={require('../../../assets/Images/NewOrderList/Group_10089.png')}  />
         </View>
         <View style={[AppStyles.flexpointsix, AppStyles.ml10]}>
           <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.productname}</Text>
           <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.color}</Text>
           <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11]}>{item.weight}</Text>
         </View>
         <View style={AppStyles.flexpointtwo}>
         <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.price}</Text>
         </View>
         </View>

         <View style={[Styles.btnContainer, AppStyles.flexDir]}>
        <View style={AppStyles.flex1}>
        <TouchableOpacity
          style={[Styles.aggregatebtn]}>
          <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>VIEW</Text>
        </TouchableOpacity>
       </View>
       <View style={AppStyles.flex1}>
      <TouchableOpacity
          style={[Styles.confirmbtn, AppStyles.mb20]}>
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>DOWNLOAD</Text>
        </TouchableOpacity>
        </View>
      </View>

        <View style={[AppStyles.w100, Styles.bdrclr]}></View>
        </TouchableOpacity>     
      )
    }

  
  return (
    
    <View style={Styles.topView}>
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
export default DownloadReport;
