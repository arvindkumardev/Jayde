import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import { adminNewOrder } from "../../../services/middleware/user";
import Colors from '../../../theme/Colors';
import UserContext from '../../../appContainer/context/user.context';

function AdminNewOrderList() {
   const navigation = useNavigation();
   const route = useRoute();

  const { setLoader } = useContext(UserContext);
  const [arraydata, setarraydata]=useState([])

  const [offset, setOffset] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const [totalCount, setTotalCount] = useState(5)
  const [perPage, setPerPage] = useState(5)

  const [{ data, loading, error }, onAdminNewOrder] = adminNewOrder(offset);
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.SMARTCONTRACT_DETAIL);
  }

  const triggerNewOrder = async () => {
    try {
            const { data } = await onAdminNewOrder({ data: {} });
            console.log("Response :", data.data[0].newOrders)        
              setPerPage(data.data[0].links.per_page)
              setTotalCount(data.data[0].links.total_count)
              setarraydata(data.data[0].newOrders)          
              setLoader(false)                
        }
        catch(e){
            console.log("Response error", e);
        }
  };

  const triggerLoadMore = async () => {
    try {
            const { data } = await onAdminNewOrder({ data: {} });                     
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
    setLoader(true)
    triggerNewOrder();
  },[]);


  useLayoutEffect(() => {
   const title='New Orders';
   navigation.setOptions({title});}, []);

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

  const renderFooter = () => {
    return (    
        <View style={[style.alignCenter, style.justifyCon]}>
            <ActivityIndicator
                animating={true}
                size='large'
                color={Colors.mangoTwo} />
        </View>
    );
  };

  const _RenderItem = (index, item) => {
    return (
      <TouchableOpacity 
      key = {index}
      onPress={() => screenNavigate()}>
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
         <Text style={[AppStyles.txtBlackRegular, AppStyles.f17,]}>{item.order_no}</Text>
         <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15,]}>{item.company}</Text>
         <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,]}>{item.pickup_date}</Text>
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
        extraData = {useState}
        removeClippedSubviews={Platform.OS === 'android' && true}
        numColumns={1}
        keyExtractor={(_, index) => `${index}1`}
        ListFooterComponent={loadMore && renderFooter}
        onEndReachedThreshold={0.2}
        onEndReached={info => {
          loadMoreResults(info);
        }}
      />
    </View>
  );
}
export default AdminNewOrderList;
