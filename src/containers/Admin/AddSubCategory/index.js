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

import UserContext from '../../../appContainer/context/user.context';
import DropDown from '../../../components/Picker/index';
import { getCategories } from './../../../services/CommonController';
import { addSubCategory } from "../Middleware";

function AddSubCategory() {
  const refSubCategory = useRef(null);
  const refPrice = useRef(null);
  const [item, setItem] = useState({});
  const [categoryPickerData, setCategoryData] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();

  const { setLoader } = useContext(UserContext);
  const [{ data: categoryData, loading, error }, onGetCategories] = getCategories();
  const [{ data1, loading1, error1 }, onAddSubCategory] = addSubCategory();
  

  useEffect(() => {
    if (error)
      setLoader(false)
  }, [error])
  
  useEffect(() => {
    onGetCategories();
    return () => {
      setLoader(false)     
    }
  }, []);
  
  useEffect(() => {
    if (categoryData) {
      const pickderData = categoryData.map((item) => ({ label: item.category_name, value: item.id }));
      setCategoryData(pickderData);
    }
  }, [categoryData]);

  useLayoutEffect(() => {
    const { btnStatus } = route.params;
    if ( btnStatus == '1' ) {  }  else { 
      const { Item } = route.params;
    setItem(Item)
    console.log("abc", Item);
    handleChange('price', Item.price_per_kg);
    console.log("abcd", Item.price_per_kg);
     }
    
    const title = 'Add Sub Category';
    navigation.setOptions({ title });
  }, []);

  const handelNavigate = () => {
    // route.params.getActionType()
    navigation.goBack()
  }

  const SubCategorySchema = Yup.object().shape({
    category: Yup.string().min(1, 'Invalid category').required('Required'),
    subcategory: Yup.string().min(3, 'The Sub Category field must be at least 3 characters in length.').required('Required'),
    price: Yup.string().min(1, 'Invalid price').required('Required'),
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, isValid } = useFormik({
    initialValues:
    {
      category: '',
      subcategory: '',
      price: '',
    },
    validationSchema: SubCategorySchema,
    onSubmit: values =>
      handelSave(values.category, values.subcategory, values.price)
  });

  const handelSave = async (category, subcategory, price) => {
    const { data } = await onAddSubCategory({
      data: {
        "category": category,
        "subcategory": subcategory,
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
              onValueChange={handleChange('category')}
              selectedValue={values.category}
              containerStyle={AppStyles.inputTxtStyle}
              onSubmitEditing={() => refSubCategory.current?.focus()}
            />

            {errors.category && <CustomText
              fontSize={15}
              color={Colors.red}
              styling={{ marginTop: RfH(10) }}>
              {errors.category}
            </CustomText>}
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
              value={values.subcategory}
              onBlur={handleBlur('subcategory')}
              onChangeText={handleChange('subcategory')}
              onSubmitEditing={() => refPrice.current?.focus()}
              style={AppStyles.inputTxtStyle} />

            {errors.subcategory && <CustomText
              fontSize={15}
              color={Colors.red}
              styling={{ marginTop: RfH(10) }}>
              {errors.subcategory}
            </CustomText>}
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
              value={values.price}
              onBlur={handleBlur('price')}
              onChangeText={handleChange('price')}
              style={AppStyles.inputTxtStyle} />

            {errors.price && <CustomText
              fontSize={15}
              color={Colors.red}
              styling={{ marginTop: RfH(10) }}>
              {errors.price}
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
              disabled={!isValid}
              onPress={handleSubmit}
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
