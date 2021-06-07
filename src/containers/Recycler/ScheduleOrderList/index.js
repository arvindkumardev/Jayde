import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, FlatList } from 'react-native';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import { recyclerGetScheduleOrder } from '../Middelware';
import UserContext from '../../../appContainer/context/user.context';
import FooterLoader from "../../../appContainer/footerLoader";
import EmptyView from '../../../appContainer/EmptyView'
import ItemRow from '../../Components/ScheduleOrder'

function RecyclerScheduleOrderList() {
  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader, userRole } = useContext(UserContext);

  const [orderList, setOrderList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);

  const [totalCount, setTotalCount] = useState(0)
  const [perPage, setPerPage] = useState(15)
  const [refreshPage, setRefreshPage] = useState(false)

  const [{ data, loading, error }, onGetOrder] = recyclerGetScheduleOrder(offset);

  const getActionType = async () => {
    setOffset(0)
    setPerPage(0)
    setRefreshPage(true)
    setLoader(true)
  }

  const getOrderList = async () => {
    try {
      const { data } = await onGetOrder({ data: {} });
      setLoader(false)
      setOrderList(data.data[0].newOrders)
      setPerPage(data.data[0].links.per_page)
      setTotalCount(data.data[0].links.total_count)
    } catch (e) {
      console.log("Response error", e);
    }
  };

  const triggerLoadMore = async () => {
    try {
      const { data } = await onGetOrder({ data: {} });
      let listData = orderList;
      let data1 = listData.concat(data.data[0].newOrders);
      setLoadMore(false);
      setOrderList([...data1]);
    } catch (e) {
      console.log("Response error", e);
    }
  };

  useEffect(() => {
    if (error)
      setLoader(false)
  }, [error])

  useEffect(() => {
    setLoader(true)
    getOrderList();
    return () => {
      setLoader(false)
    }
  }, []);

  useEffect(() => {
    if (refreshPage) {
      setOrderList([])
      getOrderList()
      setRefreshPage(false)
    }
  }, [refreshPage])

  useEffect(() => {
    triggerLoadMore();
  }, [offset])

  const screenNavigate = (item) => {
    {
      item.assigned_status == '1' &&
        navigation.navigate(NavigationRouteNames.PAYMENT_VERIFICATION, { 'assignedID': item.assigned_id, getActionType: getActionType });
    }
  }

  useLayoutEffect(() => {
    const title = 'Schedule Orders';
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
      {orderList.length > 0 ? <FlatList
        showsVerticalScrollIndicator={false}
        style={AppStyles.flex1}
        data={orderList}
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
export default RecyclerScheduleOrderList;
