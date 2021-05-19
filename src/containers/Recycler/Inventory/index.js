import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import Styles from "./styles";
import CustomText from '../../../components/CustomText';
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import arraydata from '../../../utils/arraydata2.json';
import UserContext from '../../../appContainer/context/user.context';
import FooterLoader from "../../../appContainer/footerLoader";
import {Inventory} from '../Middelware';

//Image
import EWasteImg from  './../../../assets/Images/NewOrderList/Group_10091.png'
import PaperImg from  './../../../assets/Images/NewOrderList/Group_10089.png'
import PlasticImg from './../../../assets/Images/NewOrderList/Group_10090.png'
import MixWasterImg from './../../../assets/Images/NewOrderList/Group_10088.png'
import FAIcon from 'react-native-vector-icons/FontAwesome';

const ORDER_IMAGE = {
  'E-Waste':EWasteImg,
   Paper: PaperImg,
   Plastic: PlasticImg,
  'Mix Waste':MixWasterImg,
};


function RecyclerInventory() {

   const navigation = useNavigation();
   const route = useRoute();
   
   const { setLoader } = useContext(UserContext);
   const [inventoryList, setInventoryList] = useState([])

   const [offset, setOffset] = useState(0);
   const [loadMore, setLoadMore] = useState(false);
 
   const [totalCount, setTotalCount] = useState(5)
   const [perPage, setPerPage] = useState(0)
 
   const [refreshPage, setRefreshPage] = useState(false)
 
   const [{ data, loading, error }, onInventory] = Inventory(offset);

  
   const screenNavigate = (btnstatus) => {
    navigation.navigate(NavigationRouteNames.RECYCLER_NEW_WORKORDER, {status:btnstatus});
  }

    useLayoutEffect(() => {
      const title='Inventory';
     navigation.setOptions({title});
    }, []);

    const getActionType = () => {
      setOffset(0)
      setPerPage(0)
      setRefreshPage(true)
      setLoader(true)
    }
    const inventory = async () => {
      try {
              const { data } = await onInventory({ data: {} });
              console.log("Response :", data.data[0].newOrders)        
              setPerPage(data.data[0].links.per_page)
              setTotalCount(data.data[0].links.total_count)
              setInventoryList(data.data[0].newOrders)          
              setLoader(false)     
              setOffset(offset + data.data[0].links.per_page);                     
          }
          catch(e){
              console.log("Response error", e);
          }
    };
  
    const inventoryLoadMore = async () => {
      try {
              const { data } = await onInventory({ data: {} });                     
              let listData = inventoryList;          
              let data1 = listData.concat(data.data[0].orderDetails);
              setLoadMore(false);
              //setInventoryList( inventoryList =>  [...inventoryList, data.data[0].orderDetails])
              setInventoryList([...data1]);                       
            }
          catch(e){
              console.log("Response error", e);
          }
    };
  
     useEffect(()=>{
      //setLoader(true)
      //inventory();
    },[]);
  
    useEffect(() => {   
      if(refreshPage){
        setInventoryList([])      
        inventory()
        setRefreshPage(false)
      }
    }, [refreshPage])
  
    const loadMoreResults = async info => {
      console.log(totalCount)
      if (loadMore)
         return
  
      if(offset > totalCount) 
        return
      
      setLoadMore(true);
      setOffset(offset + perPage);
      inventoryLoadMore();
    }

    const _RenderItem = (index, item) => {
      return (
        <View key = {index} >
            <View style={[AppStyles.flexDir, AppStyles.ml20, AppStyles.mt20]}>
              <View style={AppStyles.flexpointtwo}>
                <Image source={require('../../../assets/Images/Aggregator/Inventory/Group10150.png')}  />
              </View>
              <View style={AppStyles.flexpointeight, AppStyles.ml30}>
                <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.productname}</Text>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.product}</Text>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11]}>{item.weight}</Text>
              </View>
            </View>

            <View style={[Styles.btnContainer, AppStyles.flexDir]}>
                <View style={AppStyles.flex1}>
                  <TouchableOpacity
                    style={[Styles.aggregatebtn]} onPress={() => screenNavigate("1")}>
                    <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>AGGREGATOR</Text>
                  </TouchableOpacity>
                </View>
              <View style={AppStyles.flex1}>
                  <TouchableOpacity
                      style={[Styles.confirmbtn, AppStyles.mb20]} onPress={() => screenNavigate("0")}>
                      <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>RECYCLER</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[AppStyles.w100, Styles.bdrclr]}></View>
        </View>   
      )
    }
  
    return (
      <View style={[Styles.topView]}>    
         {arraydata.length > 0 ? <FlatList
          data={arraydata}
          renderItem={({ index, item }) =>
            _RenderItem(index, item) 
          }
          showsVerticalScrollIndicator = {false}
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
         :
         <View style={[Styles.topView, AppStyles.alignCenter, AppStyles.justifyCon]}>  
          <Text style = { AppStyles.txtBlackRegular, AppStyles.f16 }>No Record Found</Text>  
         </View>
         }  
      </View>
    );
}
export default RecyclerInventory;
