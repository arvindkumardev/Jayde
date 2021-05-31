import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import { recyclerGetScheduleOrder } from '../Middelware';
import UserContext from '../../../appContainer/context/user.context';
import moment from 'moment';
import FooterLoader from "../../../appContainer/footerLoader";
import EmptyView from '../../../appContainer/EmptyView'

//Image
import EWasteImg from './../../../assets/Images/NewOrderList/Group_10091.png'
import PaperImg from './../../../assets/Images/NewOrderList/Group_10089.png'
import PlasticImg from './../../../assets/Images/NewOrderList/Group_10090.png'
import MixWasterImg from './../../../assets/Images/NewOrderList/Group_10088.png'
import PendingImg from '../../../assets/Images/AddSubUser/pending.png'
import CompletedImg from '../../../assets/Images/Dashboard/Group_9995.png'

const ORDER_IMAGE = {
  'E-Waste': EWasteImg,
  Paper: PaperImg,
  Plastic: PlasticImg,
  'Mix Waste': MixWasterImg,
};

function RecyclerScheduleOrderList() {
  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader } = useContext(UserContext);

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

  const getStatusText = (item) => {
    if (item.is_completed == null) {
      if (item.proposed_weight_confirm == '1' && item.new_weight !== null) {
        return 'Proposed Weight Confirmed'
      }

      if (item.is_seller_confirmed == '3') {
        return 'Payment Confirmed'
      }

      if (item.proposed_weight_confirm == '2') {
        return 'Proposed Weight Sent'
      }
      return 'Pending'
    } else {
      return 'Completed'
    }
  }
  const _RenderItem = (index, item) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => screenNavigate(item)}>
        <View style={[AppStyles.flexDir, AppStyles.mt20, AppStyles.ph10]}>
          <View style={[AppStyles.flexpointtwo]}>
            <Image source={ORDER_IMAGE[item.category_name]} />
          </View>

          <View style={[AppStyles.flexpointfive, AppStyles.ml16]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f17,]}>{item.order_no}</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15,]}>{item.qty}  {item.unit_name}  {item.category_name}</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,]}>{moment(item.pickup_date).format('DD-MMM-YY')}</Text>
          </View>

          {item.assigned_status == '1' ? <View style={[AppStyles.flexpointthree, AppStyles.mt5, AppStyles.alignCenter]}>
            <TouchableOpacity activeOpacity={0.8}
              onPress={() => screenNavigate(item)}
              style={Styles.confirmBtn}>
              <Text style={[AppStyles.txtWhiteRegular, AppStyles.f11, AppStyles.textalig,]}>VIEW</Text>
            </TouchableOpacity>
            <Image style={[AppStyles.mt5]} source={item.is_completed == null ? PendingImg : CompletedImg} />
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, AppStyles.ml5, AppStyles.textalig]}>{getStatusText(item)}</Text>
          </View>
            :
            <View style={[AppStyles.flexpointthree, AppStyles.mt5, AppStyles.alignCenter]}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, AppStyles.ml5, AppStyles.textalig]}>Seller Confirmation Pending</Text>
            </View>
          }
        </View>
      </TouchableOpacity>
    )
  }


  return (
    <View style={Styles.mainView}>
      {orderList.length > 0 ? <FlatList
        style={{ flex: 1 }}
        data={orderList}
        renderItem={({ index, item }) =>
          _RenderItem(index, item)
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
