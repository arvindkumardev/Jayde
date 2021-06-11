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
import NavigationRouteNames from '../../../routes/ScreenNames';
import { size } from 'lodash';

import UserContext from '../../../appContainer/context/user.context';
import DropDown from '../../../components/Picker/index';
import { getCategories } from './../../../services/CommonController';
import { addSubCategory } from "../Middleware";

function AddSubCategory() {
  const refSubCategory = useRef(null);
  const refPrice = useRef(null);
  const [clickLogin, setClickLogin] = useState(false);
  const [item, setItem] = useState({});
  const [subid, setSubid] = useState(0);
  const [categoryPickerData, setCategoryData] = useState([]);
  const [EditMode, setEditMode] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader } = useContext(UserContext);
  const [{ data: categoryData, loading, error }, onGetCategories] = getCategories();
  const [{ data: addSubCategoryData, loading: addSubCategoryLoading, error: addSubCategoryError, }, onAddSubCategory] = addSubCategory();

  useEffect(() => {
    if (error || addSubCategoryError)
      setLoader(false)
  }, [error, addSubCategoryError])


  useEffect(() => {
    onGetCategories();
    return () => {
      setLoader(false)
    }
  }, []);


  const handelNavigate = () => {
    route.params.getActionType()
    navigation.goBack()
  }

  useLayoutEffect(() => {
    const { btnStatus } = route.params;
    if (btnStatus == '1') { } else {
      const { Item } = route.params;
      setItem(Item)
      setSubid(Item.sub_category_id)
      console.log("abc", Item);
      subCategoryForm.setFieldValue('category', Item.category_name);
      console.log("ab", Item.category_name);
      subCategoryForm.setFieldValue('subcategory', Item.sub_category_name);
      console.log("abcd", Item.sub_category_name);
      subCategoryForm.setFieldValue('price', Item.price_per_kg);
      console.log("abcde", Item.price_per_kg);

    }

    const title = 'Add Sub Category';
    navigation.setOptions({ title });
    setEditMode();
  }, []);

  const SubCategorySchema = Yup.object().shape({
    category: Yup.string().min(1, 'Invalid category').required('Required'),
    subcategory: Yup.string().min(3, 'The Sub Category field must be at least 3 characters in length.').required('Required'),
    price: Yup.string().min(1, 'Invalid price').required('Required'),
  });

  const subCategoryForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      category: '',
      subcategory: '',
      price: '',
    },
    validationSchema: SubCategorySchema,
    onSubmit: () =>
      handelSave(
        subCategoryForm.values.category,
        subCategoryForm.values.subcategory,
        subCategoryForm.values.price,
      ),
  });

  const handleSubCategoryUpdate = async () => {
    setClickLogin(true);
    await subCategoryForm.submitForm();
  };

  const handelSave = async (category, subcategory, price) => {
    const { data } = await onAddSubCategory({
      data: {
        "subId": subid,
        "category": category,
        "subcategoryName": subcategory,
        "price": price,
      },
    });
    console.log(data.data)
    if (data.status) {
      handelNavigate()
    } else {
      alert(data.message)
    }
  }

  useEffect(() => {
    if (categoryData) {
      const pickderData = categoryData.map((item) => ({ label: item.category_name, value: item.id }));
      setCategoryData(pickderData);
    }
  }, [categoryData]);

  useEffect(() => {
    size(categoryPickerData) > 0 && subCategoryForm.setFieldValue('category', item.category_id)
  }, [categoryPickerData])


  return (
    <KeyboardAwareScrollView
      contentInsetAdjustmentBehavior='always'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      automaticallyAdjustContentInsets={false}>

      <View style={AppStyles.topView}>
        <View style={AppStyles.flex1}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.title]}>Please register here system Sub Category</Text>

          <View style={[AppStyles.mt30, AppStyles.ml24, AppStyles.mr24]}>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6,]}>Category</Text>
            <DropDown
              items={categoryPickerData}
              placeholderText="Select Category"
              itemStyle={{ color: '#000' }}
              onValueChange={(id) => subCategoryForm.setFieldValue('category', id)}
              selectedValue={subCategoryForm.values.category}
              containerStyle={AppStyles.inputTxtStyle}
              onSubmitEditing={() => refSubCategory.current?.focus()}
            />
            {clickLogin && subCategoryForm.errors.category ? (
              <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
                {subCategoryForm.errors.category}
              </CustomText>
            ) : null}
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Sub Category</Text>
            </View>
            <TextInput
              ref={refSubCategory}
              placeholder={"Enter Sub Category"}
              autoCapitalize='none'
              keyboardType='default'
              maxLength={50}
              returnKeyType='next'
              value={subCategoryForm.values.subcategory}
              onChangeText={(txt) => subCategoryForm.setFieldValue('subcategory', txt)}
              onSubmitEditing={() => refPrice.current?.focus()}
              style={AppStyles.inputTxtStyle} />

            {clickLogin && subCategoryForm.errors.subcategory ? (
              <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
                {subCategoryForm.errors.subcategory}
              </CustomText>
            ) : null}
          </View>

          <View style={[AppStyles.mt20, AppStyles.ml24, AppStyles.mr24]}>
            <View style={AppStyles.flex1}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mb6]}>Price</Text>
            </View>
            <TextInput
              ref={refPrice}
              placeholder={"Price Per Kg*"}
              maxLength={12}
              keyboardType='number-pad'
              returnKeyType='next'
              value={subCategoryForm.values.price}
              onChangeText={(txt) => subCategoryForm.setFieldValue('price', txt)}
              style={AppStyles.inputTxtStyle} />

            {clickLogin && subCategoryForm.errors.price ? (
              <CustomText fontSize={15} color={Colors.red} styling={{ marginTop: RfH(10) }}>
                {subCategoryForm.errors.price}
              </CustomText>
            ) : null}
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
              onPress={() => handleSubCategoryUpdate()}
              style={[AppStyles.confirmButton, AppStyles.mb20, AppStyles.btnHeight44, AppStyles.inCenter]}>
              <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17]}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </KeyboardAwareScrollView>
  );
}
export default AddSubCategory;
