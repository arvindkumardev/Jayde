import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles, Colors } from '../../../theme';
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
import PendingImg from './../../../assets/Images/AddSubUser/pending.png'
import CompletedImg from './../../../assets/Images/Dashboard/Group_9995.png'

const ORDER_IMAGE = {
  'E-Waste': EWasteImg,
  Paper: PaperImg,
  Plastic: PlasticImg,
  'Mix Waste': MixWasterImg,
};

function RecyclerWorkOrderList() {
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

  const screenNavigate = (item) => {
    navigation.navigate(NavigationRouteNames.WORK_ORDER_VERIFICATION, { item });
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

  const getStatusText = (item) => {

    if (item.paid_amount != null && item.is_seller_confirmed == 0) {
      return 'Waiting for Confirmation'
    }

    if (item.paid_amount != null && item.is_seller_confirmed == 1) {
      return 'Confirmed'
    }

    if (item.paid_amount == null && item.is_seller_confirmed == 0) {
      return 'View'
    }

  }

  const _RenderItem = (index, item) => {
    return (
      <TouchableOpacity activeOpacity={0.8}
        key={index}
        onPress={() => screenNavigate(item)}>
        <View>

          <View style={[AppStyles.flexDir, AppStyles.mt20]}>
            <View style={[AppStyles.flexpointtwo, AppStyles.ml14]}>
              <Image source={ORDER_IMAGE[item.category_name]} />
            </View>
            <View style={[AppStyles.flexpointfive, AppStyles.ml16]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f17,]}>{item.work_order_no}</Text>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15,]}>{item.work_qty} {item.unit_name} {item.category_name}</Text>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,]}>{moment(item.pickup_date).format('DD-MMM-YY')}</Text>
              <View style={[AppStyles.flexRowAlignCenter, AppStyles.mr20]}>
                <FAIcon size={11} name='rupee' color={Colors.warmGrey}></FAIcon>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f12, AppStyles.ml5]}>{item.work_price} / {item.price_unit}</Text>
              </View>
            </View>
            <View style={[AppStyles.flexpointthree, AppStyles.inCenter,]}>
              <View style={[AppStyles.flexRowAlignCenter]}>
                <FAIcon size={14} name='rupee'></FAIcon>
                <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.ml5]}>{item.work_sub_total}</Text>
              </View>
              <Image style={[AppStyles.mt5]} source={item.is_seller_confirmed == 0 ? PendingImg : CompletedImg} />
              {item.paid_amount == null && item.is_seller_confirmed == 0 ?
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => screenNavigate(item)}
                  style={[Styles.confirmBtn, AppStyles.mt5]}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f11,
                  AppStyles.textalig,]}> View </Text>
                </TouchableOpacity>
                :
                <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f11, AppStyles.mt5, AppStyles.textalig, AppStyles.ph10]}>{getStatusText(item)}</Text>
              }
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
        !loading && <EmptyView onBack={() => navigation.pop()}></EmptyView>
      }
    </View>
  );
}
export default RecyclerWorkOrderList;
