import React, {useLayoutEffect} from 'react';
import {View, Text, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import arraydata from '../../../utils/arraydata8.json';

function AdminNewOrderList() {
   const navigation = useNavigation();
   const route = useRoute();
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.SMARTCONTRACT_DETAIL);
  }

  useLayoutEffect(() => {
    const title='New Orders';
   navigation.setOptions({
    title,
  });
  }, []);

  const _RenderItem = (index, item) => {
    return (
      <TouchableOpacity onPress={() => screenNavigate()}>
       <View>
        
       <View style={[AppStyles.flexDir, AppStyles.mt20]}>
         <View style={[AppStyles.flexpointtwo, AppStyles.ml14]}>
         {item.type == "Paper" ? 
          <View>
          <Image source={require('../../../assets/Images/Recycler/NewWorkOrderList/Paper.png')}  /> 
          </View> : 
          <View>
          <Image source={require('../../../assets/Images/Recycler/NewWorkOrderList/Plastic.png')}  /> 
          </View>  }
         </View>
         <View style={[AppStyles.flexpointsix, AppStyles.ml16]}>
         <Text style={[AppStyles.txtBlackRegular, AppStyles.f17,]}>{item.product}</Text>
         <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15,]}>{item.company}</Text>
         <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,]}>{item.type}</Text>
         </View>
         <View style={[AppStyles.flexpointtwo,]}>
      <Text style={[AppStyles.txtBlackRegular, AppStyles.f15,]}>{item.price}</Text>
         </View>
       </View>

       </View>
       </TouchableOpacity>
        )
      }

  
  return (
    <View style = {Styles.mainView}>      

       <FlatList
        data={arraydata}
        renderItem={({ index, item }) =>
          _RenderItem(index, item) 
        }
      />

      
    </View>
    
  );
}
export default AdminNewOrderList;
