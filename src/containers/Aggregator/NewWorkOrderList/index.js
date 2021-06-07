import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, FlatList} from 'react-native';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import UserContext from '../../../appContainer/context/user.context';
import FooterLoader from "../../../appContainer/footerLoader";
import EmptyView from '../../../appContainer/EmptyView'
import { getWorkOrderList } from '../Middelware';
import ItemRow from '../../Components/WorkOrder'

function AggregatorWorkOrderList() {
  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader, userRole } = useContext(UserContext);
  const [workOrderList, setOrderList] = useState([])

  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);

  const [totalCount, setTotalCount] = useState(0)
  const [perPage, setPerPage] = useState(0)

  const [refreshPage, setRefreshPage] = useState(false)

  const [{ data, loading, error }, onWorkOrder] = getWorkOrderList(offset);

  const screenNavigate = (item) => {
    navigation.navigate(NavigationRouteNames.WORK_ORDER_VERIFICATION, { item, WhereFrom : NavigationRouteNames.AGGREGATOR_WORK_ORDER_LIST });
  }

  useLayoutEffect(() => {
    const title = 'New Work Orders';
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
      const { data } = await onWorkOrder({ data: {} });
      setLoader(false)
      console.log("Response :", data.data[0])
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
      const { data } = await onWorkOrder({ data: {} });
      let listData = workOrderList;
      let data1 = listData.concat(data.data[0].newOrders);
      setLoadMore(false);
      //setOrderList( workOrderList =>  [...workOrderList, data.data[0].orderDetails])
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
      showsVerticalScrollIndicator = {false}
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
        !loading && <EmptyView onBack = {() => navigation.pop()}></EmptyView>
      }
    </View>
  );
}
export default AggregatorWorkOrderList;
