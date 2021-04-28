import React, {useLayoutEffect} from 'react';
import {View, Text, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles } from '../../theme';
import arraydata from '../../utils/arraydata7.json';

function AddSubUser() {
   const navigation = useNavigation();
   const route = useRoute();
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.SMARTCONTRACT_DETAIL);
  }

  useLayoutEffect(() => {
    const title='Sub User Details';
   navigation.setOptions({
    title,
  });
  }, []);

  const _RenderItem = (index, item) => {
    return (
      <TouchableOpacity onPress={() => screenNavigate()}>
       <View>
        
       <View style={[AppStyles.flexDir, AppStyles.ml24]}>
         <View style={AppStyles.flexpointeight}>
         <Text style={[AppStyles.txtBlackRegular, AppStyles.f17, AppStyles.mt20,]}>{item.name}</Text>
         <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15,]}>{item.mobilenumber}</Text>
         <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,]}>{item.email}</Text>
         </View>
         <View style={[AppStyles.flexpointtwo, AppStyles.mt30,]}>
         {item.status == "Pending" ? 
      <View style={[AppStyles.flexpointtwo, AppStyles.mt12, AppStyles.ml10]}>
      <Image style={Styles.pendingimage} source={require('../../assets/Images/AddSubUser/pending.png')}  /> 
      </View> : 
      <View style={[AppStyles.flexpointtwo, AppStyles.mt12, AppStyles.ml10]}>
      <Image style={Styles.scheduleimage} source={require('../../assets/Images/AddSubUser/transit.png')}  /> 
      </View>  }
      <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,]}>{item.status}</Text>
         </View>
       </View>

       <View style={[Styles.bdrclr]}></View>

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
export default AddSubUser;
