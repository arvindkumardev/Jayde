import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { Alert } from "react-native";
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles, Colors } from '../../../theme';
import arraydata from '../../../utils/arraydata4.json';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { listSubCategory, deleteSubCategory } from "../Middleware";
import UserContext from '../../../appContainer/context/user.context';
import FooterLoader from "../../../appContainer/footerLoader";
import EmptyView from '../../../appContainer/EmptyView'

//Image
import EWasteImg from '../../../assets/Images/NewOrderList/Group_10091.png'
import PaperImg from '../../../assets/Images/NewOrderList/Group_10089.png'
import PlasticImg from '../../../assets/Images/NewOrderList/Group_10090.png'
import MixWasterImg from '../../../assets/Images/NewOrderList/Group_10088.png'

const ORDER_IMAGE = {
    'E-Waste': EWasteImg,
    Paper: PaperImg,
    Plastic: PlasticImg,
    'Mix Waste': MixWasterImg,
};


function SubCategoryDetails() {

  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader } = useContext(UserContext);

  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0)
  const [perPage, setPerPage] = useState(15)
  const [refreshPage, setRefreshPage] = useState(false)

  const [subCategoryList, setSubCategoryList] = useState([])

  const [{ data, loading, error }, onListSubCategory] = listSubCategory(offset);
  const [{ data: deleteSubCategoryData, loading: deleteSubCategoryLoading, error: deleteSubCategoryError }, onDeleteSubCategory] = deleteSubCategory();

  const getActionType = () => {
    setOffset(0)
    setPerPage(0)
    setRefreshPage(true)
    setLoader(true)
  }

  const triggerSubCategory = async () => {
    try {
      const { data } = await onListSubCategory({ data: {} });
      setLoader(false)
      console.log("Response :", data.data[0].categories)
      setPerPage(data.data[0].links.per_page)
      setTotalCount(data.data[0].links.total_count)
      setSubCategoryList(data.data[0].categories)
    }
    catch (e) {
      console.log("Response error", e);
    }
  };

  const triggerLoadMore = async () => {
    try {
      const { data } = await onListSubCategory({ data: {} });     
      let currentData = data.data[0].categories;
      setLoadMore(false);
      setSubCategoryList(prevState => [...prevState, ...currentData]);
    }
    catch (e) {
      console.log("Response error", e);
    }
  };

  useEffect(() => {
    if (error || deleteSubCategoryError)
      setLoader(false)
  }, [error, deleteSubCategoryError])

  useEffect(() => {
    setLoader(true)
    triggerSubCategory();
    return () => {
      setLoader(false)
    }
  }, []);

  useEffect(() => {
    if (refreshPage) {
      setSubCategoryList([])
      triggerSubCategory()
      setRefreshPage(false)
    }
  }, [refreshPage])


  useEffect(() => {
    if (loadMore)
      triggerLoadMore();
  }, [loadMore])

  

  useLayoutEffect(() => {
    const title = 'Sub Category Details';
    navigation.setOptions({
      title, headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[AppStyles.pv10, AppStyles.ph20]}
          onPress={() => addSubCategory()}>
          <FAIcon size={28} name='plus-circle' color={Colors.mangoTwo} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const loadMoreResults = async info => {

    if (loadMore)
      return

    if (offset + perPage > totalCount)
      return

    setLoadMore(true);
    setOffset(offset + perPage);
  }

  useEffect(() => {
    setLoader(deleteSubCategoryLoading)
  }, [deleteSubCategoryLoading, deleteSubCategoryData])


  const addSubCategory = () => {
    navigation.navigate(NavigationRouteNames.ADD_SUBCATEGORY, { getActionType: getActionType, btnStatus: '1' });
  }

  const screenNavigate = (item) => {
    navigation.navigate(NavigationRouteNames.ADD_SUBCATEGORY, { Item: item, getActionType: getActionType, btnStatus: '0' });
  }

  const delView = (id) => {
    Alert.alert(
      "Delete?",
      "Are you sure you want to delete?",
      [
        {
          text: "Delete",
           onPress: () => handelDelete(id),
          style: "cancel"
        },
        { text: "Cancel", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  
  const handelDelete = async (id) => {
    const { data } = await onDeleteSubCategory({
      data: {
        "id": id,
      },
    });
    console.log(data.data)
    if (data.status) {
      triggerSubCategory()
    } else {
      alert(data.message)
    }
  }

  const _RenderItem = (index, item) => {
    return (
      <TouchableOpacity>

        <View style={[AppStyles.flexDir, AppStyles.mt20]}>
          <View style={[AppStyles.flexpointtwo, AppStyles.ml20]}>
            <Image source={ORDER_IMAGE[item.category_name]} style = {AppStyles.imgSubCategory}/>
          </View>
          <View style={[AppStyles.flexpointsix, AppStyles.mt10]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.category_name}</Text>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.sub_category_name}</Text>
          </View>
          <View style={[AppStyles.flexpointtwo, AppStyles.mt10]}>
            
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}><FAIcon size={11} name='rupee' /> {item.price_per_kg}</Text>
          </View>
        </View>

        <View style={[Styles.btnContainer, AppStyles.flexDir]}>
          <View style={AppStyles.flex1}>
            <TouchableOpacity
              onPress={() => screenNavigate(item)}
              style={[Styles.editBtn, AppStyles.btnHeight44, AppStyles.inCenter]}>
              <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig]}>EDIT</Text>
            </TouchableOpacity>
          </View>
          <View style={AppStyles.flex1}>
            <TouchableOpacity
              onPress={() => { delView(item.sub_category_id) }}
              style={[Styles.deleteBtn, AppStyles.mb20, AppStyles.btnHeight44, AppStyles.inCenter]}>
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
       {subCategoryList.length > 0 ? 
        <FlatList
          data={subCategoryList}
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
        !loading && <EmptyView onBack = {() => navigation.pop()}></EmptyView>
      } 
    </View>
  );
}
export default SubCategoryDetails;
