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
import FooterLoader from "../../../appContainer/footerLoader";

function Orders() {
   const navigation = useNavigation();
   const route = useRoute();

   const { setLoader } = useContext(UserContext);
   
   const [arraydata,setarraydata]=useState([]);
   const [offset, setOffset] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const [totalCount, setTotalCount] = useState(15)
  const [perPage, setPerPage] = useState(15)

  const [{ data, loading, error: emLoginError }, emLogin] = aggregatorNeworder(offset);

  const getActionType = async () => {
    setarraydata([])
    triggerLogin()
  }

   const triggerLogin = async () => {
    try{
            const { data } = await emLogin({ data: {} });
            console.log("Response from login ", data.data[0].newOrders)
             setarraydata(data.data[0].newOrders)
            setPerPage(data.data[0].links.per_page)
            setTotalCount(data.data[0].links.total_count)
            setLoader(false)   
            setarraydata(data.data[0].newOrders)            
            setOffset(offset + perPage);
            triggerLoadMore();
          }
          catch(e){
            console.log("Response error", e);
          }
         };

         const triggerLoadMore = async () => {
          try {
                  const { data } = await emLogin({ data: {} });                     
                  let listData = arraydata;          
                  let data1 = listData.concat(data.data[0].newOrders);
                  setLoadMore(false);
                  setarraydata([...data1]);                       
                }
              catch(e){
                  console.log("Response error", e);
              }
        };
  
         useEffect(()=>{
          //  setLoader(data, loading);
           setLoader(true)
           triggerLogin();
        }, []);

  const screenNavigate = (item) => {
    navigation.navigate(NavigationRouteNames.ORDER_CONFIRMATION, {Item : item, getActionType : getActionType});
  }

  useLayoutEffect(() => {
    const title='New Orders';
   navigation.setOptions({
    title,
  });
  }, []);

  const loadMoreResults = async info => {
    console.log(totalCount)
    if (loadMore)
       return

    if(offset > totalCount) 
      return
    
    setLoadMore(true);
    setOffset(offset + perPage);
    triggerLoadMore();
 }

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
        style = {{flex:1}}
        data={arraydata}
        renderItem={({ index, item }) =>
          _RenderItem(index, item) 
        }
        extraData = {useState}
        removeClippedSubviews={Platform.OS === 'android' && true}
        numColumns={1}
        keyExtractor={(_, index) => `${index}1`}
        ListFooterComponent={<FooterLoader Loading = {loadMore}></FooterLoader>}
        onEndReachedThreshold={0.5}
        onEndReached={info => {
          loadMoreResults(info);
        }}
      />

          </ScrollView> 
        
      
    </View>
    
  );
}
export default Orders;
