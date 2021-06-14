import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { Alert } from "react-native";
import { KeyboardAvoidingView, TouchableOpacity, View, Text, ScrollView, FlatList } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import { listEpr } from "../Middleware";
import UserContext from '../../../appContainer/context/user.context';
import FooterLoader from "../../../appContainer/footerLoader";
import EmptyView from '../../../appContainer/EmptyView'


function ManageEPR() {

  const navigation = useNavigation();
  const route = useRoute();
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0)
  const [perPage, setPerPage] = useState(15)
  const [refreshPage, setRefreshPage] = useState(false)

  const { setLoader } = useContext(UserContext);

  const [eprList, setEprList] = useState([])

  const [{ data, loading, error }, onListEpr] = listEpr(offset);

  const triggerEpr = async () => {
    try {
      const { data } = await onListEpr({ data: {} });
      setLoader(false)
      console.log("Response :", data.data[0].eprs)
      setPerPage(data.data[0].links.per_page)
      setTotalCount(data.data[0].links.total_count)
      setEprList(data.data[0].eprs)
    }
    catch (e) {
      console.log("Response error", e);
    }
  };

  const triggerLoadMore = async () => {
    try {
      const { data } = await onListEpr({ data: {} });
      let currentData = data.data[0].eprs;
      setLoadMore(false);
      setEprList(prevState => [...prevState, ...currentData]);
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
    triggerEpr();
    return () => {
      setLoader(false)
    }
  }, []);

  useEffect(() => {
    if (refreshPage) {
      setEprList([])
      triggerEpr()
      setRefreshPage(false)
    }
  }, [refreshPage])

  useEffect(() => {
    if (loadMore)
      triggerLoadMore();
  }, [loadMore])

  const loadMoreResults = async info => {

    if (loadMore)
      return

    if (offset + perPage > totalCount)
      return

    setLoadMore(true);
    setOffset(offset + perPage);
  }

  const screenNavigate = (item) => {
    navigation.navigate(NavigationRouteNames.EPR_AGGREGATORDETAILS, { Item: item});
  }

  useLayoutEffect(() => {
    const title = 'EPR Users';
    navigation.setOptions({
      title,
    });
  }, []);

  const _RenderItem = (index, item) => {
    return (
      <View key={index}>
      <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => screenNavigate(item)}>
        <Text style={[AppStyles.txtBlackRegular, AppStyles.f17, AppStyles.ml24, AppStyles.mt35]}>{item.business_name}</Text>
        <View style={AppStyles.flexDir}>
          <View style={AppStyles.flexpointeight}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.ml24,]}>Aggregator</Text>
          </View>
          <View style={AppStyles.flexpointtwo}>
            <Text style={[AppStyles.txtmangoTwoBold, AppStyles.f20, AppStyles.ml20]}>{item.aggregators}</Text>
          </View>
        </View>
        <View style={[Styles.bdrclr]}></View>
        </TouchableOpacity>
      </View>
    )
  }


  return (
    <View style={AppStyles.topView}>
       {eprList.length > 0 ? 
        <FlatList
          data={eprList}
          renderItem={({ index, item }) =>
            _RenderItem(index, item)
          }
          extraData={useState}
          removeClippedSubviews={Platform.OS === 'android' && true}
          numColumns={1}
          keyExtractor={(_, index) => `${index}1`}
          ListFooterComponent={<FooterLoader Loading={loadMore}></FooterLoader>}
          onEndReachedThreshold={0.2}
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
export default ManageEPR;
