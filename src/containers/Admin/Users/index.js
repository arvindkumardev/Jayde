import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import * as Alert from 'react-native';
import { Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView, ActivityIndicator } from 'react-native';

import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import { users } from "../Middleware";
import UserContext from '../../../appContainer/context/user.context';
import FooterLoader from "../../../appContainer/footerLoader";
import EmptyView from '../../../appContainer/EmptyView'

//Image
import recycleImg from '../../../assets/Images/Users/noun_Recycle_3673532.png'

function Users() {
  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader } = useContext(UserContext);

  const [offset, setOffset] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0)
  const [perPage, setPerPage] = useState(5)

  const [userList, setUserList] = useState([])

  const [{ data, loading, error }, onGetUser] = users(offset);

  const triggerUser = async () => {
    try {
      const { data } = await onGetUser({ data: {} });
      setLoader(false)
      console.log("Response :", data.data[0].users)
      setPerPage(data.data[0].links.per_page)
      setTotalCount(data.data[0].links.total_count)
      setUserList(data.data[0].users)
    }
    catch (e) {
      console.log("Response error", e);
    }
  };

  const triggerLoadMore = async () => {
    try {
      const { data } = await onGetUser({ data: {} });
      let listData = userList;
      let data1 = listData.concat(data.data[0].users);
      setLoadMore(false);
      setUserList([...data1]);
    }
    catch (e) {
      console.log("Response error", e);
    }
  };

  useEffect(() => {
    if(error)
    setLoader(false)   
  }, [error])
  
  useEffect(() => {
    setLoader(true)
    triggerUser();
    return () => {
      setLoader(false)
    }
  }, []);

  
  useEffect(() => {
    triggerLoadMore();
  }, [offset])

  useLayoutEffect(() => {
    const title = 'Jayde Users';
    navigation.setOptions({ title });
  }, []);


  const getActionType = (index) => {
    let tempData = [...userList]
    tempData[index].status == '1' ? tempData[index].status = '0' : tempData[index].status = '1'
    setUserList(tempData)
  }

  const screenNavigate = (rowItem, index) => {
    navigation.navigate(NavigationRouteNames.ENABLEDISABLE_USER, { Item: rowItem, index: index, getActionType: getActionType });
  }

  const loadMoreResults = async info => {

    if (loadMore)
      return

    if (offset + perPage > totalCount)
      return

    setLoadMore(true);
    setOffset(offset + perPage);
  }

  const _RenderItem = (index, item) => {
    return (
      <TouchableOpacity
        activeOpacity = {0.8}
        key={index}
        style={[AppStyles.cardStyle, AppStyles.shadow, AppStyles.whitebackgrnd]}
        onPress={() => { screenNavigate(item, index) }}>
        <View >

          <View style={[AppStyles.flexDir, AppStyles.ml16, AppStyles.mt12]}>
            <View style={AppStyles.flexpointseven}>
              <Text style={[AppStyles.f13, AppStyles.txtSecandaryRegular,]}>{item.email}</Text>
            </View>
            <View style={[AppStyles.flexpointthree, AppStyles.inCenter]}>
              <TouchableOpacity 
              activeOpacity = {0.8}
              style={item.status == 1 ? Styles.confirmBtn : Styles.InactiveBtn}>
                <Text style={[AppStyles.txtWhiteRegular, AppStyles.f11, AppStyles.textalig]}>{item.status == 1 ? 'Active' : 'Inactive'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.ml16, AppStyles.mt12]}>{item.business_name}</Text>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.ml16,]}>{item.name}</Text>


          <View style={[AppStyles.flexDir, AppStyles.mt14, AppStyles.mb20]}>
            <View>
              <Image style={Styles.lftimga} source={recycleImg} />
            </View>
            <View style={[AppStyles.ml10]}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.business_type}</Text>
            </View>
            <View style={{ height: '100%', width: 1, borderBottomWidth: 20, marginLeft: 12,}}>
            </View> 
            <View>
              <Text style={[AppStyles.ml10, AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.type}</Text>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    )
  }


  return (
    <View style={AppStyles.topView}>
      {userList.length > 0 ? <FlatList
        data={userList}
        renderItem={({ index, item }) =>
          _RenderItem(index, item)
        }
        extraData={useState}
        removeClippedSubviews={Platform.OS === 'android' && true}
        numColumns={1}
        keyExtractor={(_, index) => `${index}1`}
        ListFooterComponent={<FooterLoader Loading={loadMore}></FooterLoader>}
        onEndReachedThreshold={0.2}
        onEndReached={info => {
          loadMoreResults(info);
        }}
      />
        :
        !loading && <EmptyView onBack = {() => navigation.pop()}></EmptyView>
      }
    </View>
  );
}
export default Users;
