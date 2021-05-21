import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import { aggregatorGetScheduleOrder } from '../Middelware';
import UserContext from '../../../appContainer/context/user.context';
import moment from 'moment';
import FooterLoader from "../../../appContainer/footerLoader";

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

function AggregatorScheduleOrderList() {
  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader } = useContext(UserContext);

  const [orderList, setOrderList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);

  const [totalCount, setTotalCount] = useState(15)
  const [perPage, setPerPage] = useState(15)

  const [{ data, loading, error }, onGetOrder] = aggregatorGetScheduleOrder(offset);

  const getActionType = async () => {
    setOrderList([])
    getOrderList()
  }

  const getOrderList = async () => {
    try {
      const { data } = await onGetOrder({ data: {} });
      setLoader(false)
      console.log("Response from login ", data.data[0].newOrders)
      setOrderList(data.data[0].newOrders)
      setPerPage(data.data[0].links.per_page)
      setTotalCount(data.data[0].links.total_count)
      // setOffset(offset + perPage);
      // triggerLoadMore();
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
    setLoader(true)
    getOrderList();
  }, []);

  useEffect(() => {
    triggerLoadMore();
  }, [offset])

  const screenNavigate = (item) => {
    navigation.navigate(NavigationRouteNames.ORDER_CONFIRMATION, { Item: item, getActionType: getActionType });
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

  const _RenderItem = (index, item) => {
    return (
      <TouchableOpacity onPress={() => screenNavigate(item)}>
        <View style={[AppStyles.flexDir, AppStyles.mt20]}>
          <View style={[AppStyles.flexpointtwo, AppStyles.ml14]}>
            <Image source={ORDER_IMAGE[item.category_name]} />
          </View>

          <View style={[AppStyles.flexpointsix, AppStyles.ml16]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f17,]}>{item.order_no}</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15,]}>{item.qty}  {item.unit_name}  {item.category_name}</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,]}>{moment(item.pickup_date).format('DD-MMM-YY')}</Text>
          </View>

          <View style={[AppStyles.flexpointtwo, AppStyles.mt5]}>
            <TouchableOpacity
              onPress={() => screenNavigate(item)}
              style={Styles.confirmBtn}>
              <Text style={[AppStyles.txtWhiteRegular, AppStyles.f11, AppStyles.textalig,]}>{item.is_confirmed == 2 ? 'VIEW' : 'ACCEPT'}</Text>
            </TouchableOpacity>
            <Image style={[AppStyles.ml20, AppStyles.mt5,]} source={PendingImg} />
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, AppStyles.ml5]}>Pending</Text>
          </View>
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
        !loading && <View style={[Styles.mainView, AppStyles.alignCenter, AppStyles.justifyCon]}>
          <Text style={AppStyles.txtBlackRegular, AppStyles.f16}>No Record Found</Text>
        </View>
      }

    </View>
  );
}
export default AggregatorScheduleOrderList;
