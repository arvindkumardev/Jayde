import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import arraydata1 from '../../utils/arraydata';
import Styles from "./styles";
import { newOrder } from "../../services/middleware/user";
import NavigationRouteNames from '../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';

function Order() {
  const navigation = useNavigation();
  const route = useRoute();

  const [
    { data: emLoginData, loading: emLoginLoading, error: emLoginError },
    emLogin,
  ] = newOrder();

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
    triggerLogin();
  }, navigation);

  // const [
  //    ] = newOrder();


  const [title4,setTitle4]=useState('New Orders');
  

  const [arraydata,setarraydata]=useState([]);
  // const [arraydata,setarraydata]=useState(arraydata1);

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.NEW_ORDERR);
  }


  const _RenderItem = (index, item) => {
    return (
      <TouchableOpacity style={Styles.dataView} onPress={() => {screenNavigate(item)}}>
      <View style={Styles.flx1}>
      <Image style={Styles.leftImg} source={require('../../assets/Images/AdminSelectOrder/Group10061.png')}  />
      </View>
      <View style={Styles.flx2}>
      <Text style={Styles.txt1}>{item.order_no}</Text>
      <Text style={Styles.txt2}>{item.category_name}</Text>
      <Text style={Styles.txt3}>{item.pickup_date}</Text>
      </View>
      {/* <View style={Styles.flx1}>
      <Image style={Styles.rgtIcon} source={require('../../assets/Images/Dashboard/Fill_164.png')}  />
      <Text style={Styles.rgtStatus}>{item.status}</Text>
      </View> */}
      </TouchableOpacity>     
    )
  }

  
  return (
    <View style={Styles.mainView}>
       <ScrollView>
            
            <View style={Styles.topArrowView}>
        <View style={Styles.topArrowFlex}>
        <TouchableOpacity>  
                    <View>  
                    <Image style={Styles.topArrowImg} source={require('../../assets/Images/AdminSelectOrder/Group10058.png')}  />   
                        
                    </View>  
                </TouchableOpacity>  
        </View>
        <View style={Styles.topTitleFlex}>
        <TouchableOpacity>  
                    <View>  
                        <Text style={Styles.topTitle}>{title4}</Text>  
                    </View>  
                </TouchableOpacity>  
        </View>
          </View> 


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
export default Order;
