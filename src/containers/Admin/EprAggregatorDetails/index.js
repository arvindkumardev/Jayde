import React, { useContext, useLayoutEffect, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, ScrollView, FlatList, } from 'react-native';
import DropDown from '../../../components/Picker/index';
import Styles from "./styles";
import { AppStyles, Colors } from '../../../theme';
import { alertBox, RfH, RfW, getSaveData } from '../../../utils/helpers';
import CustomText from '../../../components/CustomText';
import * as Yup from "yup";
import { useFormik } from "formik";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import UserContext from '../../../appContainer/context/user.context';
import { getAggregators } from "../../../services/CommonController"
import { EprAggregator, addEprAggregator, removeEprAggregator } from "../Middleware";
import FooterLoader from "../../../appContainer/footerLoader";
import EmptyView from '../../../appContainer/EmptyView'

function EprAggregatorDetails() {
  const [item, setItem] = useState({});
  const { setLoader } = useContext(UserContext);
  const [offset, setOffset] = useState(0);
  const [userName, setUserName] = useState('')
  const [loadMore, setLoadMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0)
  const [perPage, setPerPage] = useState(15)
  const [refreshPage, setRefreshPage] = useState(false)
  const [userid, setUserid] = useState();

  const [aggregators, setAggregator] = useState([])
  const [clickConfirm, setClickConfirm] = useState(false);
  const [eprAggregatorList, setEprAggregatorList] = useState([])

  // ---------------------- Start Api Section ---------------------
  const [{ data: aggregatorsData }, onGetAggregators] = getAggregators();
  const [{ data, loading, error }, onListAggregator] = EprAggregator();
  const [{ data: addAggregatorEprData, loading: addAggregatorEprLoading, error: addAggregatorEprError }, onAddEprAggregator] = addEprAggregator();
  const [{ data: removeAggregatorEprData, loading: removeAggregatorEprLoading, error: removeAggregatorEprError }, onRemoveEprAggregator] = removeEprAggregator();
  // ---------------------- End Api Section ---------------------

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (aggregatorsData) {
      const pickerData = aggregatorsData.map((item) => ({ label: item.name, value: item.id }));
      setAggregator(pickerData);
    }
  }, [aggregatorsData]);

  useLayoutEffect(() => {
    const title = 'EPR Aggregator Details';
    navigation.setOptions({ title });
    const { Item } = route.params;
    setItem(Item)
    console.log("abc", Item);
    setUserid(Item.userid)
    console.log("EPRID", Item.userid);
    onGetAggregators();
    handleAggregatorList(Item.userid);
  }, []);

  useEffect(() => {
    if (error)
      setLoader(false)
  }, [error])

  useEffect(() => {
    return () => {
      setLoader(false)
    }
  }, []);

  const validationSchema = Yup.object().shape({
    selectedID: Yup.string().required("Please select Item"),
  });

  const requestForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      selectedID: '',
    },
    validationSchema,
    onSubmit: () => handleAdd(
      requestForm.values.selectedID,
    )
  });

  const handelSubmit = async () => {
    setClickConfirm(true)
    await requestForm.submitForm();
  }

  const handleAdd = async (selectedID) => {
    try {
      const { data } = await onAddEprAggregator({
        data: {
          "aggregatorId": selectedID,
          "eprpartnerId": userid,
        },
      });
      console.log("aggregator data", data)
      if (data.status) {
        // screenNavigate()
      } else {
        alert(data.message)
      }
    } catch (e) {
      console.log("Response error", e);
    }
  };

  const handleAggregatorList = async (userid) => {
    try {
      const { data } = await onListAggregator({
        data: {
          "eprId": userid,
          "page": 0,
        },
      });
      console.log("aggregator data", data)
      if (data.status) {
        setPerPage(data.data[0].links.per_page)
        setTotalCount(data.data[0].links.total_count)
        setEprAggregatorList(data.data[0].aggregators)
        console.log("response", data.data[0].aggregators)
      } else {
        alert(data.message)
      }
    } catch (e) {
      console.log("Response error", e);
    }
  };

  const triggerLoadMore = async () => {
    try {
      const { data } = await onListAggregator({ 
        data: {
          "eprId": userid,
          "page": offset,
        } 
      });
      let currentData = data.data[0].aggregators;
      setLoadMore(false);
      setEprAggregatorList(prevState => [...prevState, ...currentData]);
    }
    catch (e) {
      console.log("Response error", e);
    }
  };

  useEffect(() => {
    return () => {
      setLoader(false)
    }
  }, []);

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


  const _alertConfirmation = (epr_aggregator_mapping_id, userid, index) => {
    console.log("delete", epr_aggregator_mapping_id, userid,)
    alertBox('Delete?',
      'Are you sure you want to delete?', {
      positiveText: 'Delete',
      onPositiveClick: () => {
        _handelDelete(epr_aggregator_mapping_id, userid, index)
      },
      negativeText: 'Cancel',
      onNegativeClick: () => {

      }
    });
  }

  const _handelDelete = async (epr_aggregator_mapping_id, userid, index) => {
    try {
      setLoader(true)
      const { data } = await onRemoveEprAggregator({
        data: {
          "eprMappingId": epr_aggregator_mapping_id,
          "eprId": userid,
        },
      });
      console.log(data.data)
      if (data.status) {
        if (index != -1) {
          let tempData = [...eprAggregatorList]
          tempData.splice(index, 1);
          setEprAggregatorList(tempData)
        }
      } else {
        alert(data.message)
      }
      setLoader(false)
    }
    catch (e) {
      console.log("Response error", e);
    }
  }

  const _RenderItem = (index, item) => {
    return (
      <View key={index}>
        <View>
          <View style={[AppStyles.flexDir, AppStyles.mt20, AppStyles.mb20]}>
            <View style={[AppStyles.flex1, AppStyles.mt10, AppStyles.ml24]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.business_name}</Text>
            </View>
            <View style={AppStyles.flex1}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[Styles.deleteBtn, AppStyles.btnHeight44, AppStyles.inCenter, AppStyles.mr24]} onPress={() => _alertConfirmation(item.epr_aggregator_mapping_id, userid, index)}>
                <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[AppStyles.w100, Styles.bdrclr]}></View>
        </View>
      </View>
    )
  }

  return (
    <View style={AppStyles.topView}>
      <View style={AppStyles.topView}>

        <View style={[AppStyles.flexDir]}>
          <View style={[AppStyles.flex1, AppStyles.mt20]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f17, AppStyles.ml24]}>EPR Name</Text>
          </View>
          <View style={[AppStyles.flex1, AppStyles.mt20, AppStyles.alignfend]}>
            <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mr24]}>{item.business_name}</Text>
          </View>
        </View>
        <View style={Styles.slctAggre}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.mb10]}>Select Any Aggregator</Text>
          <DropDown
            placeholderText="Select one"
            items={aggregators}
            itemStyle={{ color: '#000' }}
            onValueChange={(id) => requestForm.setFieldValue('selectedID', id)}
            selectedValue={requestForm.values.selectedID}
            containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
          />
          {clickConfirm && requestForm.errors.selectedID ?
            <CustomText
              fontSize={15}
              color={Colors.red}
              styling={{ marginTop: RfH(10) }}>
              {requestForm.errors.selectedID}
            </CustomText>
            : null}
        </View>

        <View style={Styles.confirmView}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[Styles.confirmBtn, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() => { handelSubmit() }}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig]}>ADD</Text>
          </TouchableOpacity>
        </View>

        <View style={[AppStyles.w100, Styles.bdrclr]}></View>

        
          {eprAggregatorList.length > 0 ? 
          <FlatList
            data={eprAggregatorList}
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


    </View>
  );
}
export default EprAggregatorDetails;
