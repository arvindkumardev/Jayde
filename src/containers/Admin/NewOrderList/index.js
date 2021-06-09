
import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, FlatList} from 'react-native';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';

import { getNewOrder } from "../../../services/CommonController";

import UserContext from '../../../appContainer/context/user.context';
import FooterLoader from "../../../appContainer/footerLoader";
import EmptyView from '../../../appContainer/EmptyView'
import ItemRow from '../../Components/NewOrder'

function AdminNewOrderList() {
  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader, userRole } = useContext(UserContext);
  const [adminOrderList, setAdminOrderList] = useState([])

  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false)

  const [totalCount, setTotalCount] = useState(0)
  const [perPage, setPerPage] = useState(5)

  const [{ data, loading, error }, onAdminNewOrder] = getNewOrder(userRole, offset);

  const screenNavigate = (item) => {
    {
      item.is_confirmed == 2 ?
        navigation.navigate(NavigationRouteNames.ORDER_ASSIGN, { Value: item, getActionType: getActionType })
        :
        navigation.navigate(NavigationRouteNames.ADMIN_NEW_ORDER, { Item: item, getActionType: getActionType })
    }
  }

  const getActionType = async () => {
    setOffset(0)
    setPerPage(0)
    setRefreshPage(true)
    setLoader(true)
  }

  const triggerNewOrder = async () => {
    try {
      const { data } = await onAdminNewOrder({ data: {} });
      setLoader(false)
      setPerPage(data.data[0].links.per_page)
      setTotalCount(data.data[0].links.total_count)
      setAdminOrderList(data.data[0].newOrders)
    }
    catch (e) {
      console.log("Response error", e);
    }
  };

  const triggerLoadMore = async () => {
    try {
      const { data } = await onAdminNewOrder({ data: {} });     
      let currentData = data.data[0].newOrders;
      setLoadMore(false);
      setAdminOrderList(prevState => [...prevState, ...currentData]);
    }
    catch (e) {
      console.log("Response error", e);
    }
  };

  useEffect(() => {
    if (refreshPage) {
      setAdminOrderList([])
      triggerNewOrder()
      setRefreshPage(false)
    }
  }, [refreshPage])

  useEffect(() => {
    if (error)
      setLoader(false)
  }, [error])

  useEffect(() => {
    setLoader(true)
    triggerNewOrder();
    return () => {
      setLoader(false)
    }
  }, []);

  useEffect(() => {
    if (loadMore)
      triggerLoadMore();
  }, [loadMore])

  useLayoutEffect(() => {
    const title = 'New Orders';
    navigation.setOptions({ title });
  }, []);

  const loadMoreResults = async info => {
    console.log(totalCount)
    if (loadMore)
      return

    if (offset + perPage > totalCount)
      return

    setLoadMore(true);
    setOffset(offset + perPage);
  }

  return (
    <View style={AppStyles.topView}>
      {adminOrderList.length > 0 ? <FlatList
        showsVerticalScrollIndicator = {false}
        style={AppStyles.flex1}
        data={adminOrderList}
        renderItem={({ index, item }) =>
          <ItemRow item={item}
            index={index}
            screenNavigate={screenNavigate}
            userRole={userRole}>
          </ItemRow>
        }
        extraData={useState}
        removeClippedSubviews={Platform.OS === 'android' && true}
        numColumns={1}
        keyExtractor={(_, index) => `${index}1`}
        ListFooterComponent={<FooterLoader Loading={loadMore}></FooterLoader>}
        onEndReachedThreshold={0.5}
        onEndReached={info => {
          loadMoreResults(info);
        }}
      />
        :
        !loading && <EmptyView onBack={() => navigation.pop()}></EmptyView>
      }
    </View>
  );
}
export default AdminNewOrderList;
