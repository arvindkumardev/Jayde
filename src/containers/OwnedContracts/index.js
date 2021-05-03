import React, {useLayoutEffect} from 'react';
import {View, Text, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles } from '../../theme';
import arraydata from '../../utils/arraydata6.json';

function OwnedContracts() {
   const navigation = useNavigation();
   const route = useRoute();
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.SMARTCONTRACT_DETAIL);
  }

  useLayoutEffect(() => {
    const title='Owned Contracts';
   navigation.setOptions({
    title,
  });
  }, []);

  const _RenderItem = (index, item) => {
    return (
      <TouchableOpacity onPress={() => screenNavigate()}>
       <View style={Styles.boxView}>
        
        
        <View style={[AppStyles.flexDir,]}>
      <View style={AppStyles.flexpointeight}>
      <Text style={[AppStyles.f13, AppStyles.txtSecandaryRegular, AppStyles.mt12, AppStyles.ml16,]}>{item.date}</Text>
      </View>
      {item.status == "Completed" ? 
      <View style={[AppStyles.flexpointtwo, AppStyles.mt12, AppStyles.ml10]}>
      <Image source={require('../../assets/Images/OwnedContracts/Completed.png')}  /> 
      </View> : 
      item.status == "Accepted" ? 
      <View style={[AppStyles.flexpointtwo, AppStyles.mt12, AppStyles.ml10]}>
      <Image source={require('../../assets/Images/OwnedContracts/Accepted.png')}  /> 
      </View> :
      <View style={[AppStyles.flexpointtwo, AppStyles.mt12, AppStyles.ml10]}>
      <Image style={Styles.scheduleimage} source={require('../../assets/Images/OwnedContracts/schedule.png')}  /> 
      </View>  }
      </View> 

      <View style={[AppStyles.flexDir,]}>
      <View style={[AppStyles.flexpointeight,]}>
      <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.ml16,]}>{item.productdetail}</Text>
      <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.ml16,]}>{item.type}</Text>
      </View>
      <View style={[AppStyles.flexpointtwo,]}>
      <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f9,]}>{item.status}</Text>
      </View>
      </View> 
      

      <View style={[AppStyles.flexDir, AppStyles.mt14]}>
      <View style={[AppStyles.flexpointone]}>
      <Image style={Styles.lftimga} source={require('../../assets/Images/Users/noun_Recycle_3673532.png')}  /> 
      </View>
      <View style={[AppStyles.flexpointnine]}>
      <Text style={[AppStyles.ml10, AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.weight}</Text>
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
export default OwnedContracts;
