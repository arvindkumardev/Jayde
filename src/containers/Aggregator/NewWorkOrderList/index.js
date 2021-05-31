import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import UserContext from '../../../appContainer/context/user.context';
import FooterLoader from "../../../appContainer/footerLoader";
import EmptyView from '../../../appContainer/EmptyView'

import { getWorkOrderList } from '../Middelware';
import moment from 'moment';

//Image
import EWasteImg from './../../../assets/Images/NewOrderList/Group_10091.png'
import PaperImg from './../../../assets/Images/NewOrderList/Group_10089.png'
import PlasticImg from './../../../assets/Images/NewOrderList/Group_10090.png'
import MixWasterImg from './../../../assets/Images/NewOrderList/Group_10088.png'
import FAIcon from 'react-native-vector-icons/FontAwesome';

const ORDER_IMAGE = {
  'E-Waste': EWasteImg,
  Paper: PaperImg,
  Plastic: PlasticImg,
  'Mix Waste': MixWasterImg,
};

function AggregatorWorkOrderList() {
  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader } = useContext(UserContext);
  const [workOrderList, setOrderList] = useState([])

  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);

  const [totalCount, setTotalCount] = useState(0)
  const [perPage, setPerPage] = useState(0)

  const [refreshPage, setRefreshPage] = useState(false)

  const [{ data, loading, error }, onWorkOrder] = getWorkOrderList(offset);

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.SMARTCONTRACT_DETAIL);
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

      //setOffset(offset + data.data[0].links.per_page);                     
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

  const _RenderItem = (index, item) => {
    return (
      <TouchableOpacity
        activeOpacity = {0.8}
        key={index}
        onPress={() => screenNavigate()}>
        <View>

          <View style={[AppStyles.flexDir, AppStyles.mt20]}>
            <View style={[AppStyles.flexpointtwo, AppStyles.ml14]}>
              <Image source={ORDER_IMAGE[item.category_name]} />
            </View>
            <View style={[AppStyles.flexpointsix, AppStyles.ml16]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f17,]}>{item.order_no}</Text>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15,]}>{item.qty} {item.unit_name} {item.category_name}</Text>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,]}>{moment(item.pickup_date).format('DD-MMM-YY')}</Text>
            </View>
            <View style={[AppStyles.flexpointtwo,]}>
              <View style={[AppStyles.flexRowAlignCenter, AppStyles.mr20]}>
                <FAIcon size={14} name='rupee'></FAIcon>
                <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.ml5]}>{item.price}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }


  return (
    <View style={Styles.mainView}>
      {workOrderList.length > 0 ? <FlatList
        data={workOrderList}
        renderItem={({ index, item }) =>
          _RenderItem(index, item)
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
