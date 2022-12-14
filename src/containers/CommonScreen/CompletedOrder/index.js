import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles, Colors } from '../../../theme';
import CheckBoxWrapper from '../../../components/CheckBoxWrapper';
import { getCompletedOrder } from '../Middelware';
import UserContext from '../../../appContainer/context/user.context';
import moment from 'moment';
import FooterLoader from "../../../appContainer/footerLoader";
import EmptyView from '../../../appContainer/EmptyView'

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

function CompletedOrder() {
  const navigation = useNavigation();
  const route = useRoute();
  const { setLoader, userRole } = useContext(UserContext);

  const [orderList, setOrderList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);

  const [totalCount, setTotalCount] = useState(0)
  const [perPage, setPerPage] = useState(15)
  const [refreshPage, setRefreshPage] = useState(false)

  const [{ data, loading, error }, onGetOrder] = getCompletedOrder(offset, userRole);


  const getActionType = async () => {
    setOffset(0)
    setPerPage(0)
    setRefreshPage(true)
    setLoader(true)
  }


  const handelNavigation = (item) => {
    if (item.paid_amount !== null && item.is_seller_confirmed == 0) {
      navigation.navigate(NavigationRouteNames.WORKORDER_DETAILS, { item, getActionType: getActionType })
    }
  }

  useLayoutEffect(() => {
    const title = 'Completed Orders';
    navigation.setOptions({
      title,
    });
  }, []);

  useEffect(() => {
    if (error)
      setLoader(false)
  }, [error])

  const getOrderList = async () => {
    try {
      const { data } = await onGetOrder({ data: {} });
      setLoader(false)
      setPerPage(data.data[0].links.per_page)
      setTotalCount(data.data[0].links.total_count)
      setOrderList(data.data[0].completeOrders)
    } catch (e) {
      console.log("Response error", e);
    }
  };

  const triggerLoadMore = async () => {
    try {
      const { data } = await onGetOrder({ data: {} });
      let currentData = data.data[0].completeOrders;
      setLoadMore(false);
      setOrderList(prevState => [...prevState, ...currentData]);
    } catch (e) {
      console.log("Response error", e);
    }
  };

  useEffect(() => {
    setLoader(true)
    getOrderList();
    return () => {
      setLoader(false)
    }
  }, []);

  useEffect(() => {
    if (loadMore)
      triggerLoadMore();
  }, [loadMore])

  useEffect(() => {
    if (refreshPage) {
      setOrderList([])
      getOrderList()
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
        onPress={() => handelNavigation(item)}
        activeOpacity={0.8} key={index}>
        <View style={[AppStyles.flexDir, AppStyles.mt20]}>
          <View style={[AppStyles.ml24, AppStyles.flexpointseven]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.work_order_no}</Text>
            <Text numberOfLines={1}
              style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt3]}>{item.business_name}</Text>
          </View>
          <View style={[AppStyles.flexpointthree,]}>
            <View style={[AppStyles.inCenter]}>
              {item.paid_amount !== null && item.is_seller_confirmed == 0 ?
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handelNavigation(item)}
                  style={[Styles.confirmBtn, AppStyles.inCenter]}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f11, AppStyles.textalig]}>Confirm Payment</Text>
                </TouchableOpacity>
                : item.work_status == 1 ?
                  <View
                    style={[Styles.textHeight, AppStyles.inCenter]}>
                    <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f11, AppStyles.textalig]}>Work Order Sent</Text>
                  </View>
                  :
                  <CheckBoxWrapper
                    isChecked={true}
                  />
              }
            </View>
          </View>
        </View>

        <View style={[AppStyles.flexDir, AppStyles.mt10]}>
          <View style={[AppStyles.flexpointtwo, AppStyles.ml20]}>
            <Image source={require('../../../assets/Images/NewOrderList/Group_10089.png')} />
          </View>
          <View style={[AppStyles.flexpointfive, AppStyles.ml10]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt5]}>{item.category_name}</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.sub_category_name}</Text>
            <View style={AppStyles.flexDir}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11]}>{item.work_qty} {item.unit_name} | </Text>
              <View style={[AppStyles.flexRowAlignCenter, AppStyles.ml0]}>
                <FAIcon size={10} name='rupee' color={Colors.warmGrey}></FAIcon>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.ml5]}>{item.work_price} / {item.price_unit}</Text>
              </View>
            </View>

          </View>
          <View style={[AppStyles.flexpointthree, AppStyles.inCenter]}>
            <View style={[AppStyles.flexRowAlignCenter, AppStyles.mt10]}>
              <FAIcon size={14} name='rupee'></FAIcon>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.ml5]}>{item.work_sub_total}</Text>
            </View>
          </View>
        </View>

        <View style={[AppStyles.w100, Styles.bdrclr]}></View>
      </TouchableOpacity>
    )
  }


  return (
    <View style={AppStyles.topView}>
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
export default CompletedOrder;
