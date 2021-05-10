import React, {useLayoutEffect} from 'react';
import {View, Text, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import arraydata from '../../../utils/arraydata.json';

function Orders() {
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
         {item.name == "3 Ton Plastic" ? 
          <View>
          <Image source={require('../../../assets/Images/Recycler/NewWorkOrderList/Plastic.png')}  /> 
          </View> : 
          <View>
          <Image source={require('../../../assets/Images/Recycler/NewWorkOrderList/Paper.png')}  /> 
          </View>  }
         </View>
         <View style={[AppStyles.flexpointsix, AppStyles.ml16]}>
         <Text style={[AppStyles.txtBlackRegular, AppStyles.f17,]}>{item.orderid}</Text>
         <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15,]}>{item.name}</Text>
         <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,]}>{item.date}</Text>
         </View>
         <View style={[AppStyles.flexpointtwo, AppStyles.mt30]}>
      <Image style={[AppStyles.ml14]} source={require('../../../assets/Images/AddSubUser/pending.png')}  /> 
      <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,]}>{item.status}</Text>
         </View>
       </View>

       </View>
       </TouchableOpacity>
        )
      }

  
  return (
    <View style={Styles.mainView}>
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
export default Orders;
