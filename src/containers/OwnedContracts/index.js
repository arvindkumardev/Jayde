import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { Platform, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import Styles from './styles';
import NavigationRouteNames from '../../routes/ScreenNames';
import { AppStyles, Colors } from '../../theme';
import { ownedContracts } from './middleware';
import UserContext from '../../appContainer/context/user.context';
import EmptyView from '../../appContainer/EmptyView';
import FooterLoader from '../../appContainer/footerLoader';

// Image
import completedImg from '../../assets/Images/OwnedContracts/Completed.png';
import acceptedImg from '../../assets/Images/OwnedContracts/Accepted.png';
import scheduledImg from '../../assets/Images/OwnedContracts/schedule.png';
import recycleImg from '../../assets/Images/Users/noun_Recycle_3673532.png';

const IMAGES = {
  Completed: require('../../assets/Images/OwnedContracts/Completed.png'),
  Accepted: require('../../assets/Images/OwnedContracts/Accepted.png'),
  Scheduled: require('../../assets/Images/OwnedContracts/schedule.png'),
};
function OwnedContracts() {
  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader } = useContext(UserContext);

  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
   const [totalCount, setTotalCount] = useState(0)
  const [perPage, setPerPage] = useState(15)

  const [arraydata, setArraydata] = useState([]);

  const [{ data, loading, error }, onOwnedContracts] = ownedContracts(offset);

  const getOwnedContracts = async () => {
    try {
      const { data } = await onOwnedContracts({ data: {} });
      console.log('data', data.data[0].orderDetails);
      setLoader(false);
      console.log('data', data.data[0].orderDetails);
      setPerPage(data.data[0].links.per_page);
      setTotalCount(data.data[0].links.total_count);
      setArraydata(data.data[0].orderDetails);
      // console.log("data", JSON.stringify(data.data[0].orderDetails))
    } catch (e) {
      console.log('Response error', e);
    }
  };

  useEffect(() => {
    if(error)
    setLoader(false) 
  }, [error])
  
  useEffect(() => {
    setLoader(true);
    getOwnedContracts();
  }, []);

  const triggerLoadMore = async () => {
    try {
      const { data } = await onOwnedContracts({ data: {} });
      const listData = arraydata;
      const data1 = listData.concat(data.data[0].orderDetails);
      setLoadMore(false);
      setArraydata([...data1]);
    } catch (e) {
      console.log('Response error', e);
    }
  };

  useEffect(() => {
    triggerLoadMore();
  }, [offset]);

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.SMARTCONTRACT_DETAIL);
  };

  useLayoutEffect(() => {
    const title = 'Owned Contracts';
    navigation.setOptions({
      title,
    });
  }, []);

  const loadMoreResults = async (info) => {
    // console.log(totalCount)
    if (loadMore) return;

    if (offset + perPage > totalCount) return;

    setLoadMore(true);
    setOffset(offset + perPage);
  };

  const getButtonText = (item) => {
    if (item.assigned_status == 2) {
      return 'Rescheduled';
    }
    if (item.proposed_weight_confirm == 2) {
      return 'New Weight Proposed';
    }
    if (item.is_seller_confirmed == 2) {
      return 'Confirm Payment';
    }
    if (item.pickup_confirmed == 1) {
      return 'COMPLETED';
    }
    if (item.is_confirmed == 2) {
      return 'SCHEDULED';
    }
    if (item.is_confirmed == 3) {
      return 'ACCEPTED';
    }
    if (item.is_confirmed == 4) {
      return 'Rejected';
    }
  };

  const _RenderItem = (index, item) => {
    const btnText = getButtonText(item);
    return (
      <TouchableOpacity onPress={() => screenNavigate()}>
        <View style={Styles.boxView}>
          <View style={[AppStyles.flexDir]}>
            <View style={AppStyles.flexpointseven}>
              <Text style={[AppStyles.f13, AppStyles.txtSecandaryRegular, AppStyles.mt12, AppStyles.ml16]}>
                {moment(item.pickup_date).format('DD-MMM-YY')}
              </Text>
            </View>
            {item.pickup_confirmed == 1 ? (
              <View style={[AppStyles.flexpointthree, AppStyles.mt12, AppStyles.aligncen]}>
                <Image source={completedImg} />
              </View>
            ) : item.is_confirmed == 3 ? (
              <View style={[AppStyles.flexpointtwo, AppStyles.mt12, AppStyles.aligncen]}>
                <Image style={AppStyles.ml30} source={acceptedImg} />
              </View>
            ) : (
              <View style={[AppStyles.flexpointtwo, AppStyles.mt12, AppStyles.aligncen]}>
                <Image style={Styles.scheduleimage} source={scheduledImg} />
              </View>
            )}
          </View>

          <View style={[AppStyles.flexDir]}>
            <View style={[AppStyles.flexpointseven]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.ml16]}>{item.order_no}</Text>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.ml16]}>{item.sub_category_name}</Text>
            </View>
            <View style={[AppStyles.flexpointthree]}>
              <Text
                style={[
                  AppStyles.txtSecandaryRegular,
                  AppStyles.f11,
                  AppStyles.ml20,
                  {
                    color:
                      btnText === 'ACCEPTED'
                        ? Colors.warmGrey
                        : btnText === 'COMPLETED'
                        ? Colors.warmGrey
                        : btnText === 'SCHEDULED'
                        ? Colors.warmGrey
                        : Colors.red,
                  },
                ]}>
                {btnText}
              </Text>
            </View>
          </View>

          <View style={[AppStyles.flexDir, AppStyles.mt14]}>
            <View style={[AppStyles.flexpointone]}>
              <Image style={Styles.lftimga} source={recycleImg} />
            </View>
            <View style={[AppStyles.flexpointnine]}>
              <Text style={[AppStyles.ml10, AppStyles.txtSecandaryRegular, AppStyles.f13]}>
                {item.qty} {item.unit_name}
              </Text>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={Styles.mainView}>
      {arraydata.length > 0 ? (
        <FlatList
          style={{ flex: 1 }}
          data={arraydata}
          renderItem={({ index, item }) => _RenderItem(index, item)}
          extraData={useState}
          removeClippedSubviews={Platform.OS === 'android' && true}
          numColumns={1}
          keyExtractor={(_, index) => `${index}1`}
          ListFooterComponent={<FooterLoader Loading={loadMore} />}
          onEndReachedThreshold={0.5}
          onEndReached={(info) => {
            loadMoreResults(info);
          }}
        />
      ) : (
        !loading && <EmptyView onBack={() => navigation.pop()} />
      )}
    </View>
  );
}
export default OwnedContracts;
