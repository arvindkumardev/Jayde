import React, { useContext, useEffect, useState, useLayoutEffect, useRef } from 'react';
import { TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView } from 'react-native';
import CustomText from '../../../components/CustomText';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles, Colors } from '../../../theme';
import { RfH, RfW } from "../../../utils/helpers";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { size } from 'lodash';
import UserContext from '../../../appContainer/context/user.context';
import DropDown from '../../../components/Picker/index';
import { getCategories, getSubCategories } from '../../../services/CommonController';
import { getCustomer, addProvisionalPrice } from '../Middleware'

function AddProvisionalPricing() {

  const navigation = useNavigation();
  const route = useRoute();

  const [customerList, setCustomerList] = useState([]);
  const [categoryPickerData, setCategoryData] = useState([]);
  const [subCategoryPickerData, setSubCategoryData] = useState([]);

  const [clickConfirm, setClickConfirm] = useState(false);
  const { setLoader } = useContext(UserContext);
  const [EditMode, setEditMode] = useState(false);
  const [item, setItem] = useState();
  //------------------- API------------
  const [{ data: customerData, loading: customerLoading, error: customerError }, onGetCustomer] = getCustomer();
  const [{ data: categoryData, loading, error }, onGetCategories] = getCategories();
  const [{ data: subCategoryData, loading: subCategoryLoading, error: subCategoryError }, onGetSubCategories] = getSubCategories();
  const [{ data: managePriceData, loading: addPriceLoading, error: addPriceError }, onAddPricing] = addProvisionalPrice();

  useEffect(() => {
    if (customerError || addPriceError || error || subCategoryError)
      setLoader(false)
  }, [customerError, addPriceError, error, subCategoryError])

  useEffect(() => {
    onGetCustomer()
    onGetCategories();
    return () => {
      setLoader(false)
    }
  }, []);

  useEffect(() => {
    setLoader(customerLoading)
  }, [customerData, customerLoading]);

  useEffect(() => {
    setLoader(subCategoryLoading)
  }, [subCategoryData, subCategoryLoading]);

  useEffect(() => {
    if (subCategoryData) {
      const itemData = subCategoryData.map((item) => ({ label: item.sub_category_name, value: item.id }));
      setSubCategoryData(itemData);
    }
  }, [subCategoryData]);

  useEffect(() => {
    if (categoryData) {
      let values = categoryData.filter(item => item.category_name != 'E-Waste')
      const itemData = values.map((item) => ({ label: item.category_name, value: item.id }));
      setCategoryData(itemData);
    }
  }, [categoryData]);

  useEffect(() => {
    if (customerData) {
      const item = customerData.map((item) => ({ label: item.business_name, value: item.user_id }));
      setCustomerList(item);
    }
  }, [customerData])

  const handelNavigate = () => {
    route.params.getActionType()
    navigation.goBack()
  }

  const SubCategorySchema = Yup.object().shape({
    customer: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    subcategory: Yup.string().required('Required'),
    price: Yup.string().min(1, 'Invalid price').required('Required'),
  });

  const requestForm = useFormik({
    initialValues:
    {
      customer: '',
      category: '',
      subcategory: '',
      price: '',
    },
    validationSchema: SubCategorySchema,
    onSubmit: () => handelSave()
  });

  const handelSave = async () => {
    let param = {
      "subId" : EditMode ? item.id : "0",
      "customer": requestForm.values.customer,
      "category": requestForm.values.category,
      "subcategory": requestForm.values.subcategory,
      "price": requestForm.values.price,
    }
    console.log(param)
    const { data } = await onAddPricing({
      data: param
    });

    console.log(data.data)
    if (data.status) {
      handelNavigate()
    } else {
      alert(data.message)
    }
  }

  const handelSubmit = async () => {
    setClickConfirm(true);
    await requestForm.submitForm();
  }
  const _handelCategory = (categoryId) => {
    requestForm.setFieldValue('category', categoryId)
    onGetSubCategories({ data: { id: categoryId } });
  }

  useLayoutEffect(() => {
    const title = 'Manage Pricing';
    navigation.setOptions({ title });
    let { item, editMode } = route.params;
    let value = item.special_price_per_kg
    editMode && requestForm.setFieldValue('price', value);
    setItem(item);   
    setEditMode(editMode);
  }, []);

  useEffect(() => {
    if (EditMode) {
      size(customerList) > 0 && requestForm.setFieldValue('customer', item.user_id)
      size(categoryPickerData) > 0 && requestForm.setFieldValue('category',item.category_id)
      size(subCategoryData) > 0 && requestForm.setFieldValue('subcategory', item.sub_category_id)
    }
  }, [customerList, categoryPickerData, subCategoryData])

  return (
    <KeyboardAwareScrollView
      contentInsetAdjustmentBehavior='always'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      automaticallyAdjustContentInsets={false}>

      <View style={AppStyles.topView}>
        <View style={AppStyles.flex1}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.title]}>ASSIGN SPECIAL PRICE TO CUSTOMER</Text>

          <View style={[AppStyles.mt30, AppStyles.ml24, AppStyles.mr24]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6,]}>Please choose a customer</Text>
            <DropDown
              items={customerList}
              itemStyle={{ color: '#000' }}
              onValueChange={(id) => requestForm.setFieldValue('customer', id)}
              selectedValue={requestForm.values.customer}
              containerStyle={AppStyles.inputTxtStyle}
            />

            {requestForm.errors.customer && clickConfirm && <CustomText
              fontSize={15}
              color={Colors.red}
              styling={{ marginTop: RfH(10) }}>
              {requestForm.errors.customer}
            </CustomText>}
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6,]}>Please choose a category</Text>
            <DropDown
              items={categoryPickerData}
              itemStyle={{ color: '#000' }}
              onValueChange={(id) => _handelCategory(id)}
              selectedValue={requestForm.values.category}
              containerStyle={AppStyles.inputTxtStyle}
            />

            {requestForm.errors.category && clickConfirm && <CustomText
              fontSize={15}
              color={Colors.red}
              styling={{ marginTop: RfH(10) }}>
              {requestForm.errors.category}
            </CustomText>}
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6,]}>Please choose a sub category</Text>
            <DropDown
              items={subCategoryPickerData}
              itemStyle={{ color: '#000' }}
              onValueChange={(id) => requestForm.setFieldValue('subcategory', id)}
              selectedValue={requestForm.values.subcategory}
              containerStyle={AppStyles.inputTxtStyle}
            />

            {requestForm.errors.subcategory && clickConfirm && <CustomText
              fontSize={15}
              color={Colors.red}
              styling={{ marginTop: RfH(10) }}>
              {requestForm.errors.subcategory}
            </CustomText>}
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View style={AppStyles.flex1}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Price</Text>
            </View>
            <TextInput
              placeholder={"Price Per Kg*"}
              maxLength={12}
              keyboardType='number-pad'
              returnKeyType='done'
              value={requestForm.values.price}
              onChangeText={(txt) => requestForm.setFieldValue('price', txt)}
              style={AppStyles.inputTxtStyle} />

            {requestForm.errors.price && clickConfirm && <CustomText
              fontSize={15}
              color={Colors.red}
              styling={{ marginTop: RfH(10) }}>
              {requestForm.errors.price}
            </CustomText>}
          </View>
        </View>


        <View style={[AppStyles.btnContainer, AppStyles.flexDir]}>
          <View style={AppStyles.flex1}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.pop()}
              style={[AppStyles.cancelButton, AppStyles.btnHeight44, AppStyles.inCenter]}>
              <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17]}>CANCEL</Text>
            </TouchableOpacity>
          </View>
          <View style={AppStyles.flex1}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handelSubmit()}
              style={[AppStyles.confirmButton, AppStyles.mb20, AppStyles.btnHeight44, AppStyles.inCenter]}>
              <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17]}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </KeyboardAwareScrollView>
  );
}
export default AddProvisionalPricing;
