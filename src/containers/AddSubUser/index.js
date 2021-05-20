import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles, Colors } from '../../theme';
import UserContext from '../../appContainer/context/user.context';
import FooterLoader from "../../appContainer/footerLoader";
import {subUser} from '../../services/middleware/user';
import FAIcon from 'react-native-vector-icons/FontAwesome';

function AddSubUser() {
   const navigation = useNavigation();
   const route = useRoute();

   const { setLoader } = useContext(UserContext);
   const [subUserList, setSubUserList] = useState([])

   const [offset, setOffset] = useState(0);
   const [loadMore, setLoadMore] = useState(false);
 
   const [totalCount, setTotalCount] = useState(5)
   const [perPage, setPerPage] = useState(0)
 
   const [refreshPage, setRefreshPage] = useState(false)
 
   const [{ data, loading, error }, onSubUser] = subUser(offset);
   
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.ADD_USER, { getActionType : getActionType});
   }

  useLayoutEffect(() => {
    const title='Sub User Details';
    navigation.setOptions({title,  headerRight: () => (
      <TouchableOpacity 
        style = {[AppStyles.pv10, AppStyles.ph20]}
       onPress = {() => screenNavigate()}>
      <FAIcon size={28} name='plus-circle' color = {Colors.mangoTwo} />
      </TouchableOpacity>
    ),});
  }, []);

  const getActionType = () => {
    setOffset(0)
    setPerPage(0)
    setRefreshPage(true)
    setLoader(true)
  }
  const getSubUser = async () => {
    try {
         const { data } = await onSubUser({ data: {} });
         setLoader(false)  
         console.log("Response :", data.data[0].subUsers)        
         setPerPage(data.data[0].links.per_page)
         setTotalCount(data.data[0].links.total_count)
         setSubUserList(data.data[0].subUsers)         
        // setOffset(offset + data.data[0].links.per_page);                     
      } catch(e){
            console.log("Response error", e);
      }
  };

  const subUserLoadMore = async () => {
    try {           
            const { data } = await onSubUser({ data: {} });                     
            let listData = subUserList;          
            let data1 = listData.concat(data.data[0].subUsers);
            setLoadMore(false);
            //setSubUserList( subUserList =>  [...subUserList, data.data[0].subUsers])
            setSubUserList([...data1]);                       
          }
        catch(e){
            console.log("Response error", e);
        }
  };

   useEffect(()=>{
    setLoader(true)
    getSubUser();
  },[]);

  useEffect(() => {   
    if(refreshPage){
      setSubUserList([])      
      getSubUser()
      setRefreshPage(false)
    }
  }, [refreshPage])

  useEffect(() => {
    subUserLoadMore();
  }, [offset])

  const loadMoreResults = async info => {
   
    if (loadMore)
       return

    if(offset + perPage > totalCount) 
      return
  
    setLoadMore(true);
    setOffset(offset + perPage);    
  }

  const _RenderItem = (index, item) => {
    return (    
       <View style = {[AppStyles.alignCenter]}>        
          <View style={[AppStyles.flexDir, AppStyles.ph20, AppStyles.pv10]}>
            <View style={AppStyles.flexpointeight}>
                <Text style={[AppStyles.txtBlackRegular, AppStyles.f17]}>{item.name}</Text>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15,]}>{item.phone}</Text>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,]}>{item.email}</Text>
            </View>
            <View style={[AppStyles.flexpointtwo, AppStyles.alignCenter, AppStyles.justifyCon]}>            
            {item.status === '1' ?
              <FAIcon size={22} name='check-circle-o' color = {Colors.green} />
              :
              <FAIcon size={22} name='times-circle-o' color = {Colors.red} />
            }
               
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, AppStyles.mt5]}>{item.status === '1' ? 'Active' : 'Block'}</Text>           
          </View>
          </View>
          <View style={[Styles.bdrclr]}></View>
        </View>     
        )
      }

  
  return (
    <View style={Styles.mainView}>      
         {subUserList.length > 0 ? <FlatList
          data={subUserList}
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
         ! loading && <View style={[Styles.mainView, AppStyles.alignCenter, AppStyles.justifyCon]}>  
          <Text style = { AppStyles.txtBlackRegular, AppStyles.f16 }>No Record Found</Text>  
         </View>
         }  
      </View>
  );
}
export default AddSubUser;
