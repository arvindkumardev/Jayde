import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { Alert } from "react-native";
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles, Colors } from '../../../theme';
import UserContext from '../../../appContainer/context/user.context';

import FooterLoader from "../../../appContainer/footerLoader";
import EmptyView from '../../../appContainer/EmptyView'
import NetworkView from '../../../appContainer/NetworkView'
import { provisionalPricingList } from '../Middleware';

//Image
import EWasteImg from '../../../assets/Images/NewOrderList/Group_10091.png'
import PaperImg from '../../../assets/Images/NewOrderList/Group_10089.png'
import PlasticImg from '../../../assets/Images/NewOrderList/Group_10090.png'
import MixWasterImg from '../../../assets/Images/NewOrderList/Group_10088.png'
import FAIcon from 'react-native-vector-icons/FontAwesome';


const ORDER_IMAGE = {
  'E-Waste': EWasteImg,
  Paper: PaperImg,
  Plastic: PlasticImg,
  'Mix Waste': MixWasterImg,
};

function ProvisionalPricing() {

  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader } = useContext(UserContext);
  const [priceList, setPriceList] = useState([])

  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);

  const [totalCount, setTotalCount] = useState(0)
  const [perPage, setPerPage] = useState(0)

  const [refreshPage, setRefreshPage] = useState(false)
  const [retry, setRetry] = useState(false)

  const [{ data, loading, error }, onProvisionalPricing] = provisionalPricingList(offset);


  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.ADD_PROVISIONAL_PRICING, { getActionType: getActionType });
  }

  useLayoutEffect(() => {
    const title = 'Provisional Pricing';
    navigation.setOptions({
      title, headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[AppStyles.pv10, AppStyles.ph20]}
          onPress={() => screenNavigate()}>
          <FAIcon size={28} name='plus-circle' color={Colors.mangoTwo} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const getActionType = () => {
    setOffset(0)
    setPerPage(0)
    setRefreshPage(true)
    setLoader(true)
  }

  const getProvisionalPrice = async () => {
    try {
      const { data } = await onProvisionalPricing({ data: {} });
      setLoader(false)
      setPerPage(data.data[0].links.per_page)
      setTotalCount(data.data[0].links.total_count)
      setPriceList(data.data[0].categories)
    } catch (e) {
      console.log("Response error", e);
    }
  };

  const provisionalPriceLoadMore = async () => {
    try {
      const { data } = await onProvisionalPricing({ data: {} });
      let currentData = data.data[0].categories;
      setLoadMore(false);
      setPriceList(prevState => [...prevState, ...currentData]);
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
    getProvisionalPrice();
    return () => {
      setLoader(false)
    }
  }, [retry]);

  useEffect(() => {
    if (refreshPage) {
      setPriceList([])
      getProvisionalPrice()
      setRefreshPage(false)
    }
  }, [refreshPage])

  useEffect(() => {
    if (loadMore)
      provisionalPriceLoadMore();
  }, [loadMore])

  const loadMoreResults = async info => {

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
          <View style={[AppStyles.flexpointtwo, AppStyles.ml20]}>
            <Image source={ORDER_IMAGE[item.category_name]} style={AppStyles.imgOrders} />
          </View>
          <View style={[AppStyles.flexpointsix, AppStyles.ml20]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.business_name}</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.category_name}</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.sub_category_name}</Text>
          </View>
          <View style={AppStyles.flexpointtwo}>
            <View style={[AppStyles.flexRowAlignCenter]}>
              <FAIcon size={14} name='rupee'></FAIcon>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.ml5]}>{item.special_price_per_kg}</Text>
            </View>
          </View>
        </View>

        <View style={[Styles.btnContainer, AppStyles.flexDir]}>
          <View style={AppStyles.flex1}>
            <TouchableOpacity
              style={[Styles.aggregatebtn, AppStyles.btnHeight44, AppStyles.inCenter]}>
              <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig]}>EDIT</Text>
            </TouchableOpacity>
          </View>
          <View style={AppStyles.flex1}>
            <TouchableOpacity
              style={[Styles.confirmbtn, AppStyles.mb20, AppStyles.btnHeight44, AppStyles.inCenter]}>
              <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig]}>DELETE</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[AppStyles.w100, Styles.bdrclr]}></View>
      </TouchableOpacity>
    )
  }


  return (
    <View style={AppStyles.topView}>
      {
        priceList.length > 0 ? <FlatList
          data={priceList}
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
          !loading && error == null ? <EmptyView onBack={() => navigation.pop()}></EmptyView>
            : error &&
            <NetworkView Retry={() => setRetry(!retry)}></NetworkView>
      }
    </View>
  );
}
export default ProvisionalPricing;
