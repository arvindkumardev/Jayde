
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

function SellerMyOrder() {
  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader, userRole } = useContext(UserContext);
  const [orderList, setOrderList] = useState([])

  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);

  const [totalCount, setTotalCount] = useState(0)
  const [perPage, setPerPage] = useState(0)

  const [refreshPage, setRefreshPage] = useState(false)

  const [{ data, loading, error }, onMyOrder] = getNewOrder(userRole, offset);

  const screenNavigate = (item) => {
    navigation.navigate(NavigationRouteNames.SELLER_ORDER_DETAIL, { Item: item, getActionType: getActionType })
  }

  const getActionType = () => {
    setOffset(0)
    setPerPage(0)
    setRefreshPage(true)
    setLoader(true)
  }
  const triggerNewOrder = async () => {
    try {
      const { data } = await onMyOrder({ data: {} });
      setLoader(false)
      setPerPage(data.data[0].links.per_page)
      setTotalCount(data.data[0].links.total_count)
      setOrderList(data.data[0].orderDetails)
    }
    catch (e) {
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
    triggerNewOrder();
    return () => {
      setLoader(false)
    }
  }, []);

  useEffect(() => {
    if (refreshPage) {
      setOrderList([])
      triggerNewOrder()
      setRefreshPage(false)
    }
  }, [refreshPage])

  useEffect(() => {
    triggerLoadMore();
  }, [offset])

  useLayoutEffect(() => {
    const title = 'My Orders';
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
        style={AppStyles.flex1}
        data={orderList}
        showsVerticalScrollIndicator={false}
        renderItem={({ index, item }) =>
          <ItemRow item={item}
            index={index}
            screenNavigate = {screenNavigate}
            userRole = {userRole}>
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
export default SellerMyOrder;
