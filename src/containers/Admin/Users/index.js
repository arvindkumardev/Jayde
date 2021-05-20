import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView, ActivityIndicator} from 'react-native';
import  DropDownPicker from "react-native-dropdown-picker";

import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import AppStyles from "../../../theme/Styles/texts";
import AppStyle from "../../../theme/Styles/spaces";
import style from "../../../theme/Styles/container";
import { users } from "../../../services/middleware/user";
import UserContext from '../../../appContainer/context/user.context';
import FooterLoader from "../../../appContainer/footerLoader";

function Users() {
   const navigation = useNavigation();
   const route = useRoute();

  const { setLoader } = useContext(UserContext);

  const [offset, setOffset] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [totalCount, setTotalCount] = useState(5)
  const [perPage, setPerPage] = useState(5)

  const [arraydata, setarraydata]=useState([])

   const [{ data, loading, error: emLoginError }, emLogin] = users(offset);

  const triggerUser = async () => {
    try {
            const { data } = await emLogin({ data: {} });
            setLoader(false)                

            console.log("Response :", data.data[0].users)        
              setPerPage(data.data[0].links.per_page)
              setTotalCount(data.data[0].links.total_count)
              setarraydata(data.data[0].users)          
        }
        catch(e){
            console.log("Response error", e);
        }
  };

  const triggerLoadMore = async () => {
    try {
            const { data } = await emLogin({ data: {} });                     
            let listData = arraydata;          
            let data1 = listData.concat(data.data[0].users);
            setLoadMore(false);
            setarraydata([...data1]);                       
          }
        catch(e){
            console.log("Response error", e);
        }
  };

   useEffect(()=>{
    setLoader(true)
    triggerUser();
  },[]);

  useEffect(() => {
    triggerLoadMore();
  }, [offset])

  useLayoutEffect(() => {
    const title='Jayde Users';
    navigation.setOptions({title});
  }, []);

   
  const getActionType = (index) => {
    let tempData = [...arraydata]   
    tempData[index].status == '1' ?  tempData[index].status = '0' :  tempData[index].status = '1'
    setarraydata(tempData)
  }

  const screenNavigate = (rowItem, index ) => {
    navigation.navigate(NavigationRouteNames.ENABLEDISABLE_USER, {Item: rowItem, index: index, getActionType : getActionType});
  }

  const loadMoreResults = async info => {
   
    if (loadMore)
       return

    if(offset > totalCount) 
      return
    
    setLoadMore(true);
    setOffset(offset + perPage);
 }

  const _RenderItem = (index, item) => {
    return (
      <TouchableOpacity
        key = {index}
        onPress={() => {screenNavigate(item, index)}}>  
       <View style={Styles.boxView}>       
        
      <View style={[style.flexDir, AppStyle.ml24,]}>
      <View style={Styles.flx2}>
      <Text style={[AppStyles.f13, AppStyles.txtSecandaryRegular, AppStyle.mt20]}>{item.email}</Text>
      </View>
      <View style={[style.flexpointthree, AppStyle.mt20, AppStyles.ml24]}>
      <TouchableOpacity style={item.status == 1 ? Styles.confirmBtn : Styles.InactiveBtn}>
      <Text style={[AppStyles.txtWhiteRegular, AppStyles.f11, AppStyles.textalig]}>{item.status == 1 ? 'Active' : 'Inactive'}</Text>
      </TouchableOpacity>
      </View>
      </View> 

      <Text style={[AppStyles.f15, AppStyle.ml24,]}>{item.business_name}</Text>
      <Text style={[AppStyles.f15, AppStyle.ml24,]}>{item.name}</Text>
      

      <View style={[style.flexDir, AppStyle.mt14]}>
      <View style={[style.flexpointone]}>
      <Image style={Styles.lftimga} source={require('../../../assets/Images/Users/noun_Recycle_3673532.png')}  /> 
      </View>
      <View style={[style.flexpointthree]}>
      <Text style={[AppStyle.ml24, AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.business_type}</Text>
      </View>
      <View style={{height: '100%', width: 1, borderLeftColor: '000', borderBottomWidth: 20, }}>
        </View>
        <View>
          <Text style={[AppStyle.ml20, AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.type}</Text>
          </View>
      </View>

       </View>
       </TouchableOpacity>  
        )
      }

  
  return (
    <View style={Styles.mainView}>
       <FlatList
        data={arraydata}
        renderItem={({ index, item }) =>
          _RenderItem(index, item) 
        }
        extraData = {useState}
        removeClippedSubviews={Platform.OS === 'android' && true}
        numColumns={1}
        keyExtractor={(_, index) => `${index}1`}
        ListFooterComponent={<FooterLoader Loading = {loadMore}></FooterLoader>}
        onEndReachedThreshold={0.2}
        onEndReached={info => {
          loadMoreResults(info);
        }}
      />      
    </View>    
  );
}
export default Users;
