import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, FlatList } from 'react-native';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import { getNewOrder } from "../../../services/CommonController";
import UserContext from '../../../appContainer/context/user.context';

import FooterLoader from "../../../appContainer/footerLoader";
import EmptyView from '../../../appContainer/EmptyView'
import ItemRow from '../../Components/NewOrder'

function AggregatorNewOrder() {
  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader, userRole } = useContext(UserContext);

  const [orderList, setOrderList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);

  const [totalCount, setTotalCount] = useState()
  const [perPage, setPerPage] = useState(15)

  const [{ data, loading, error }, onGetOrder] = getNewOrder(userRole, offset);

  const getActionType = async () => {
    setOrderList([])
    NewOrder()
  }

  const NewOrder = async () => {
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
      let currentData = data.data[0].newOrders;
      setLoadMore(false);
      setOrderList(prevState => [...prevState, ...currentData]);
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
    NewOrder();
    return () => {
      setLoader(false)
    }
  }, []);

  useEffect(() => {
    if (loadMore)
      triggerLoadMore();
  }, [loadMore])

  const screenNavigate = (item) => {
    navigation.navigate(NavigationRouteNames.ORDER_CONFIRMATION, { Item: item, getActionType: getActionType });
  }

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
      {orderList.length > 0 ? <FlatList
        style={{ flex: 1 }}
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
export default AggregatorNewOrder;
