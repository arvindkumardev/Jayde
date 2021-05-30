import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles, Colors } from '../../../theme';
import { CheckBoxWrapper } from '../../../components';
import { getCompletedOrder } from '../Middelware';
import UserContext from '../../../appContainer/context/user.context';
import moment from 'moment';
import FooterLoader from "../../../appContainer/footerLoader";
import EmptyView from '../../../appContainer/EmptyView'

import EWasteImg from './../../../assets/Images/NewOrderList/Group_10091.png'
import PaperImg from './../../../assets/Images/NewOrderList/Group_10089.png'
import PlasticImg from './../../../assets/Images/NewOrderList/Group_10090.png'
import MixWasterImg from './../../../assets/Images/NewOrderList/Group_10088.png'
import PendingImg from '../../../assets/Images/AddSubUser/pending.png'
import CompletedImg from '../../../assets/Images/Dashboard/Group_9995.png'
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
  const { setLoader,userRole } = useContext(UserContext);

  const [orderList, setOrderList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);

  const [totalCount, setTotalCount] = useState(15)
  const [perPage, setPerPage] = useState(15)

  const [{ data, loading, error }, onGetOrder] = getCompletedOrder(offset, userRole);


  useLayoutEffect(() => {
    const title = 'Completed Orders';
    navigation.setOptions({
      title,
    });
  }, []);

  const getActionType = async () => {
    setOrderList([])
    getOrderList()
  }

  const getOrderList = async () => {
    try {
      const { data } = await onGetOrder({ data: {} });
      setLoader(false)
      console.log("Response from login ", data.data[0].completeOrders)
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
      let listData = orderList;
      let data1 = listData.concat(data.data[0].completeOrders);
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
      <TouchableOpacity key={index}>
        <View style={[AppStyles.flexDir, AppStyles.mt20]}>
          <View style={[AppStyles.ml24, AppStyles.flexpointeight]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{'JYD/N/21/0968'}</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt3]}>{item.business_name}</Text>
          </View>
          <View style={[AppStyles.flexpointtwo,]}>
            <View style={[AppStyles.mr10]}>
              <CheckBoxWrapper
                //  style={{width: 40, height: 40}}
                isChecked={true}
              // checkBoxHandler={() =>
              //   setRememberMe((rememberMe) => !rememberMe)
              // }
              />
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f9, AppStyles.mr10]}></Text>
            </View>
          </View>
        </View>

        <View style={[AppStyles.flexDir, AppStyles.mt20]}>
          <View style={[AppStyles.flexpointtwo, AppStyles.ml20]}>
            <Image source={require('../../../assets/Images/Aggregator/Inventory/Group10150.png')} />
          </View>
          <View style={[AppStyles.flexpointsix, AppStyles.ml10]}>
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
          <View style={AppStyles.flexpointtwo}>
            <View style={[AppStyles.flexRowAlignCenter, AppStyles.mt10, AppStyles.mr20]}>
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
    <View style={Styles.topView}>
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
        !loading && <EmptyView onBack = {() => navigation.pop()}></EmptyView>
      }

    </View>
  );
}
export default CompletedOrder;
