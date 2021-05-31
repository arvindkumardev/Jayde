import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import * as Alert from 'react-native';
import { Platform, TouchableOpacity, View, Text, Image, FlatList } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import { getInventory } from '../Middelware';
import FooterLoader from "../../../appContainer/footerLoader";
import EmptyView from '../../../appContainer/EmptyView'

import UserContext from '../../../appContainer/context/user.context';
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

function Inventory() {

  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader, userRole } = useContext(UserContext);
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0)
  const [perPage, setPerPage] = useState(0)
  const [inventoryList, setInventoryList] = useState([])
  const [refreshPage, setRefreshPage] = useState(false)

  const [{ data, loading, error }, onGetInventory] = getInventory(userRole, offset);

  const screenNavigate = (item, btnstatus) => {
    navigation.navigate(NavigationRouteNames.NEW_WORKORDER, { status: btnstatus, item });
  }
  const handleInventory = async () => {
    try {
      const { data } = await onGetInventory();
      setLoader(false)
      console.log("Response :", data, data.data[0].inventory)
      setPerPage(data.data[0].links.per_page)
      setTotalCount(data.data[0].links.total_count)
      setInventoryList(data.data[0].inventory)

    } catch (e) {
      console.log("Response error", e);
    }
  };

  useEffect(() => {
    setLoader(false)
  }, [error])

  const loadMoreResults = async info => {
    if (loadMore)
      return

    if (offset + perPage > totalCount)
      return

    setLoadMore(true);
    setOffset(offset + perPage);
  }

  useEffect(() => {
    triggerLoadMore();
  }, [offset])

  const triggerLoadMore = async () => {
    try {
      const { data } = await onGetInventory();
      console.log('triggerLoadMore data: ', data);
      let listData = inventoryList;
      let data1 = listData.concat(data.data[0].inventory);
      setLoadMore(false);
      setInventoryList([...data1]);
    }
    catch (e) {
      console.log("Response error", e);
    }
  };
  useLayoutEffect(() => {
    const title = 'Inventory';
    navigation.setOptions({ title });
  }, []);

  useEffect(() => {
    setLoader(true)
    handleInventory();
    return () => {
      setLoader(false)
    }
  }, []);

  useEffect(() => {
    if (refreshPage) {
      setInventoryList([])
      handleInventory()
      setRefreshPage(false)
    }
  }, [refreshPage])

  const _RenderItem = (index, item) => {
    return (
      <View key={index}>
        <View style={[AppStyles.flexDir, AppStyles.ml20, AppStyles.mt20]}>
          <View style={AppStyles.flexpointtwo}>
            <Image source={ORDER_IMAGE[item.category_name]} />
          </View>
          <View style={AppStyles.flexpointeight, AppStyles.ml30}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.category_name}</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.sub_category_name}</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11]}>{item.inventory_qty} {item.unit_name}</Text>
          </View>
        </View>

        <View style={[Styles.btnContainer, AppStyles.flexDir]}>
          <View style={AppStyles.flex1}>
            <TouchableOpacity activeOpacity={0.8}
              style={[Styles.aggregatebtn]} onPress={() => screenNavigate(item, 1)}>
              <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>AGGREGATOR</Text>
            </TouchableOpacity>
          </View>
          <View style={AppStyles.flex1}>
            <TouchableOpacity activeOpacity={0.8}
              style={[Styles.confirmbtn, AppStyles.mb20]} onPress={() => screenNavigate(item, 0)}>
              <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>RECYCLER</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[AppStyles.w100, Styles.bdrclr]}></View>
      </View>
    )
  }

  return (
    <View style={[Styles.topView]}>
      {inventoryList.length > 0 ? <FlatList
        data={inventoryList}
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
export default Inventory;
