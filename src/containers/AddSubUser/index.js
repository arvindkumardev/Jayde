import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import NavigationRouteNames from '../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles, Colors } from '../../theme';
import UserContext from '../../appContainer/context/user.context';
import FooterLoader from "../../appContainer/footerLoader";
import EmptyView from '../../appContainer/EmptyView'
import NetworkView from '../../appContainer/NetworkView'
import { subUser } from '../../services/CommonController';
import FAIcon from 'react-native-vector-icons/FontAwesome';

function AddSubUser() {
  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader } = useContext(UserContext);
  const [subUserList, setSubUserList] = useState([])

  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);

  const [totalCount, setTotalCount] = useState(0)
  const [perPage, setPerPage] = useState(0)

  const [refreshPage, setRefreshPage] = useState(false)
  const [retry, setRetry] = useState(false)

  const [{ data, loading, error }, onSubUser] = subUser(offset);

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.ADD_USER, { getActionType: getActionType });
  }

  useLayoutEffect(() => {
    const title = 'Sub User Details';
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

  const getSubUser = async () => {
    try {
      const { data } = await onSubUser({ data: {} });
      setLoader(false)
      setPerPage(data.data[0].links.per_page)
      setTotalCount(data.data[0].links.total_count)
      setSubUserList(data.data[0].subUsers)
    } catch (e) {
      console.log("Response error", e);
    }
  };

  const subUserLoadMore = async () => {
    try {
      const { data } = await onSubUser({ data: {} });      
      let currentData = data.data[0].subUsers;
      setLoadMore(false);
      setSubUserList(prevState => [...prevState, ...currentData]);
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
    getSubUser();
    return () => {
      setLoader(false)
    }
  }, [retry]);

  useEffect(() => {
    if (refreshPage) {
      setSubUserList([])
      getSubUser()
      setRefreshPage(false)
    }
  }, [refreshPage])

  useEffect(() => {
    if(loadMore)
    subUserLoadMore();
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
      <View key = {index} style={[AppStyles.alignCenter]}>
        <View style={[AppStyles.flexDir, AppStyles.ph20, AppStyles.pv10]}>
          <View style={AppStyles.flexpointeight}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f17]}>{item.name}</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15,]}>{item.phone}</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,]}>{item.email}</Text>
          </View>
          <View style={[AppStyles.flexpointtwo, AppStyles.alignCenter, AppStyles.justifyCon]}>
            {item.status === '1' ?
              <FAIcon size={22} name='check-circle-o' color={Colors.green} />
              :
              <FAIcon size={22} name='times-circle-o' color={Colors.red} />
            }

            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, AppStyles.mt5]}>{item.status === '1' ? 'Active' : 'Block'}</Text>
          </View>
        </View>
        <View style={[AppStyles.bdrclr]}></View>
      </View>
    )
  }


  return (
    <View style={AppStyles.topView}>
      {
        subUserList.length > 0 ? <FlatList
          data={subUserList}
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
export default AddSubUser;
