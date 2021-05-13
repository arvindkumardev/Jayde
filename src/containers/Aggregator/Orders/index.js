import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import arraydata from '../../../utils/arraydata.json';
import { aggregatorNeworder } from './middleware';
import UserContext from '../../../appContainer/context/user.context';
import moment from 'moment';

function Orders() {
   const navigation = useNavigation();
   const route = useRoute();

   const { setLoader } = useContext(UserContext);
   const [{ data, loading, error: emLoginError }, emLogin] = aggregatorNeworder();
   const [arraydata,setarraydata]=useState([]);

   const triggerLogin = async () => {
    try{
            const { data } = await emLogin({ data: {} });
            console.log("Response from login ", data.data[0].newOrders)
            setarraydata(data.data[0].newOrders)
          }
          catch(e){
            console.log("Response error", e);
          }
         };
  
         useEffect(()=>{
          setLoader(data, loading);
          triggerLogin();
        }, navigation);

  const screenNavigate = (item) => {
    navigation.navigate(NavigationRouteNames.ORDER_CONFIRMATION, {Item : item, getActionType : getActionType});
  }

  const getActionType = async () => {
    setarraydata([])
    triggerLogin()
  }

  useLayoutEffect(() => {
    const title='New Orders';
   navigation.setOptions({
    title,
  });
  }, []);

  const _RenderItem = (index, item) => {
    return (
      <TouchableOpacity onPress={() => screenNavigate(item)}>
       <View>
        
       <View style={[AppStyles.flexDir, AppStyles.mt20]}>
         <View style={[AppStyles.flexpointtwo, AppStyles.ml14]}>
         {item.category_name == "Plastic" ? 
          <View>
          <Image source={require('../../../assets/Images/Recycler/NewWorkOrderList/Plastic.png')}  /> 
          </View> : item.category_name == "Paper" ? 
          <View>
          <Image source={require('../../../assets/Images/Recycler/NewWorkOrderList/Paper.png')}  /> 
          </View>  : item.category_name == "Mix Waste" ? 
          <View>
          <Image source={require('../../../assets/Images/Recycler/NewWorkOrderList/Mix-Waste.png')}  /> 
          </View>  : 
          <View>
          <Image source={require('../../../assets/Images/Recycler/NewWorkOrderList/E-Waste.png')}  /> 
          </View> }

         </View>
         <View style={[AppStyles.flexpointsix, AppStyles.ml16]}>
         <Text style={[AppStyles.txtBlackRegular, AppStyles.f17,]}>{item.order_no}</Text>
         <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15,]}>{item.qty}  {item.unit_name}  {item.category_name}</Text>
         <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,]}>{moment(item.pickup_date).format('DD-MMM-YY')}</Text>
         </View>
         <View style={[AppStyles.flexpointtwo, AppStyles.mt5]}>
         <TouchableOpacity 
         onPress = {() => screenNavigate(item)}
         style={Styles.confirmBtn}>
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f11,
           AppStyles.textalig,]}>{item.is_confirmed  == 2 ? 'VIEW' : 'ACCEPT'}</Text>
        </TouchableOpacity>
      <Image style={[AppStyles.ml20, AppStyles.mt5,]} source={require('../../../assets/Images/AddSubUser/pending.png')}  /> 
      <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, AppStyles.ml5]}>Pending</Text>
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
