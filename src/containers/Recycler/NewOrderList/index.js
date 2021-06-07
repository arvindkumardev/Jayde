import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, FlatList } from 'react-native';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import UserContext from '../../../appContainer/context/user.context';
import FooterLoader from "../../../appContainer/footerLoader";
import EmptyView from '../../../appContainer/EmptyView'

import { getNewOrder } from "../../../services/CommonController";
import ItemRow from '../../Components/NewOrder'

function RecyclerNewOrderList() {
  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader, userRole } = useContext(UserContext);
  const [workOrderList, setOrderList] = useState([])

  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);

  const [totalCount, setTotalCount] = useState(0)
  const [perPage, setPerPage] = useState(0)

  const [refreshPage, setRefreshPage] = useState(false)

  const [{ data, loading, error }, onMyOrder] = getNewOrder(userRole, offset);

  const screenNavigate = (item) => {
    navigation.navigate(NavigationRouteNames.ORDER_CONFIRMATION, { Item: item });
  }

  useLayoutEffect(() => {
    const title = 'New Orders';
    navigation.setOptions({
      title,
    });
  }, []);

  const getActionType = () => {
    setOffset(0)
    setPerPage(0)
    setRefreshPage(true)
    setLoader(true)
  }
  const workOrder = async () => {
    try {
      const { data } = await onMyOrder({ data: {} });
      console.log(data)
      setLoader(false)
      setPerPage(data.data[0].links.per_page)
      setTotalCount(data.data[0].links.total_count)
      setOrderList(data.data[0].newOrders)
    }
    catch (e) {
      console.log("Response error", e);
    }
  };

  const workOrderLoadMore = async () => {
    try {
      const { data } = await onMyOrder({ data: {} });
      let listData = workOrderList;
      let data1 = listData.concat(data.data[0].newOrders);
      setLoadMore(false);
      setOrderList([...data1]);
    }
    catch (e) {
      console.log("Response error", e);
    }
  };

  useEffect(() => {
    if (error)
      setLoader(false)
  }, [error])

  useEffect(() => {
    setLoader(true)
    workOrder();
    return () => {
      setLoader(false)
    }
  }, []);

  useEffect(() => {
    workOrderLoadMore();
  }, [offset]);

  useEffect(() => {
    if (refreshPage) {
      setOrderList([])
      workOrder()
      setRefreshPage(false)
    }
  }, [refreshPage])

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
      {workOrderList.length > 0 ? <FlatList
        data={workOrderList}
        renderItem={({ index, item }) =>
          <ItemRow item={item}
            index={index}
            screenNavigate={screenNavigate}
            userRole={userRole}>
          </ItemRow>
        }
        showsVerticalScrollIndicator={false}
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
export default RecyclerNewOrderList;
