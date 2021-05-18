
import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import Styles from "./../MyOrder/styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import { MyOrder } from "./../PricingRequest/middleware";

import UserContext from '../../../appContainer/context/user.context';
import moment from 'moment';
import FooterLoader from "../../../appContainer/footerLoader";

//Image
import EWasteImg from  '../../../assets/Images/NewOrderList/Group_10091.png'
import PaperImg from  '../../../assets/Images/NewOrderList/Group_10089.png'
import PlasticImg from '../../../assets/Images/NewOrderList/Group_10090.png'
import MixWasterImg from '../../../assets/Images/NewOrderList/Group_10088.png'
import PendingImg from '../../../assets/Images/AddSubUser/pending.png'
import CompletedImg from '../../../assets/Images/Dashboard/Group_9995.png'

const ORDER_IMAGE = {
  'E-Waste':EWasteImg,
   Paper: PaperImg,
   Plastic: PlasticImg,
  'Mix Waste':MixWasterImg,
};

function SellerMyOrder() {
   const navigation = useNavigation();
   const route = useRoute();

  const { setLoader } = useContext(UserContext);
  const [orderList, setOrderList] = useState([])

  const [offset, setOffset] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const [totalCount, setTotalCount] = useState(5)
  const [perPage, setPerPage] = useState(5)

  const [{ data, loading, error }, onMyOrder] = MyOrder(offset);
  
   const screenNavigate = (item) => {
     navigation.navigate(NavigationRouteNames.SELLER_ORDER_DETAIL, {Item : item, getActionType : getActionType})
  }

  const getActionType = async () => {
    setOrderList([])
    triggerNewOrder()
  }
  const triggerNewOrder = async () => {
    try {
            const { data } = await onMyOrder({ data: {} });
            console.log("Response :", data.data[0].orderDetails)        
            setPerPage(data.data[0].links.per_page)
            setTotalCount(data.data[0].links.total_count)
            setOrderList(data.data[0].orderDetails)          
            setLoader(false)     
            setOffset(offset + perPage);                     
        }
        catch(e){
            console.log("Response error", e);
        }
  };

  const triggerLoadMore = async () => {
    try {
            const { data } = await onMyOrder({ data: {} });                     
            let listData = orderList;          
            let data1 = listData.concat(data.data[0].orderDetails);
            setLoadMore(false);
            setOrderList([...data1]);                       
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
   const title='My Orders';
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

  const _RenderItem = (index, item) => {
    return (
      <TouchableOpacity 
      key = {index}
      onPress={() => screenNavigate(item)}>
       <View>
        
       <View style={[AppStyles.flexDir, AppStyles.mt20,]}>
         <View style={[AppStyles.flexpointtwo, AppStyles.ml14]}>

          <View>
          <Image source={ORDER_IMAGE[item.category_name]}  /> 
          </View> 
         </View>
         <View style={[AppStyles.flexpointfive, AppStyles.ml16]}>
         <Text style={[AppStyles.txtBlackRegular, AppStyles.f17,]}>{item.order_no}</Text>
         <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15,]}>{item.qty} {item.unit_name} {item.category_name}</Text>
         <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,]}>{moment(item.pickup_date).format('DD-MMM-YY')}</Text>
         </View>
         <View style={[AppStyles.flexpointthree, AppStyles.ml35]}>
         <TouchableOpacity 
         onPress = {() => screenNavigate(item)}
         style={Styles.confirmBtn}>
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f11,
           AppStyles.textalig,]}>{item.is_confirmed  == 2 ? 'ASSIGN' : 'VIEW'}</Text>
        </TouchableOpacity>
        {item.is_confirmed  == 4 ? 
          <View style={AppStyles.mr20}>
            <Image style={[AppStyles.ml24, AppStyles.mt10]} 
            source={CompletedImg}  /> 
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, AppStyles.ml5]}>Completed</Text>
          </View> : item.is_confirmed  == 3 && 
          <View>
            <Image style={[AppStyles.ml24, AppStyles.mt10]} 
            source={PendingImg}  /> 
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, AppStyles.ml10]}>Pending</Text>
          </View> 
          }
         </View>
       </View>

       </View>
       </TouchableOpacity>
        )
      }

  
  return (
    <View style = {Styles.mainView}>      
       <FlatList
        style = {AppStyles.flex1}
        data={orderList}
        showsVerticalScrollIndicator = {false}
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
    </View>
  );
}
export default SellerMyOrder;