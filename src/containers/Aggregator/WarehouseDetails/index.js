import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import * as Alert from 'react-native';
import { TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView } from 'react-native';
import Styles from "./styles";
import style from "../../../theme/Styles/container";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles, Colors } from '../../../theme';
import DropDown from '../../../components/Picker/index';
import { RfH, RfW, formatDisplayDate } from "../../../utils/helpers";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getSubCategories, getUnits } from './../../Seller/PricingRequest/middleware';
import { addReceiptQuantity } from '../Middelware'
import UserContext from '../../../appContainer/context/user.context';

const itemObj = {
  subcategory: '', unit: '', weight: ''
}

function WarehouseDetails() {

  const navigation = useNavigation();
  const route = useRoute();
  const { setLoader } = useContext(UserContext);

  const [item, setItem] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [unitPickerData, setUnitData] = useState([]);

  //----- 1 ---
  const [weightOne, setWeightOne] = useState('');
  const [subCategoryOne, setSubCategoryOne] = useState('');
  const [unitOne, setUnitOne] = useState('');
  //----- 2 ---
  const [weightTwo, setWeightTwo] = useState('');
  const [subCategoryTwo, setSubCategoryTwo] = useState('');
  const [unitTwo, setUnitTwo] = useState('');
  //----- 3 ---
  const [weightThree, setWeightThree] = useState('');
  const [subCategoryThree, setSubCategoryThree] = useState('');
  const [unitThree, setUnitThree] = useState('');

  const [{ data: subData }, onGetSubCategories] = getSubCategories();
  const [{ data: unitsData }, onGetUnits] = getUnits();
  const [{ data: addReceiptData, loading, error }, onAddRecept] = addReceiptQuantity();

  const [addMoreCount, setMoreCount] = useState(1);
  const [receiptData, setReceiptData] = useState([
    {
      subcategory: '', unit: '', weight: ''
    }
  ])

  useEffect(() => {
    if (subData) {
      const pickerData = subData.map((item) => ({ label: item.sub_category_name, value: item.id }));
      setSubCategories(pickerData);
    }
  }, [subData]);

  useEffect(() => {
    if (unitsData) {
      const pickderData = unitsData.map((item) => ({ label: item.unit_name, value: item.id }));
      setUnitData(pickderData);
    }
  }, [unitsData]);

  useLayoutEffect(() => {
    const title = 'Order Warehouse details';
    navigation.setOptions({
      title,
    });
    const { items } = route.params;
    setItem(items)
    onGetSubCategories({ data: { id: items.category_id } });
    onGetUnits();
  }, []);

  useEffect(() => {
    setLoader(loading);
  }, [addReceiptData, loading]);

  const setValueWeight = (value, index) => {
    switch (index) {
      case 0:
        setWeightOne(value)
        break
      case 1:
        setWeightTwo(value)
        break
      case 2:
        setWeightThree(value)
        break
    }
  }

  const getValueWeight = (index) => {
    switch (index) {
      case 0:
        return weightOne
      case 1:
        return weightTwo
      case 2:
        return weightThree
    }
  }

  const setValueCategory = (value, index) => {
    switch (index) {
      case 0:
        setSubCategoryOne(value)
        break
      case 1:
        setSubCategoryTwo(value)
        break
      case 2:
        setSubCategoryThree(value)
        break
    }
  }

  const getValueCategory = (index) => {
    switch (index) {
      case 0:
        return subCategoryOne
      case 1:
        return subCategoryTwo
      case 2:
        return subCategoryThree
    }
  }

  const setValueUnit = (value, index) => {
    switch (index) {
      case 0:
        setUnitOne(value)
        break
      case 1:
        setUnitTwo(value)
        break
      case 2:
        setUnitThree(value)
        break
    }
  }

  const getValueUnit = (index) => {
    switch (index) {
      case 0:
        return unitOne
      case 1:
        return unitTwo
      case 2:
        return unitThree
    }
  }

  const handelAddReceipt = async () => {
    var tempUnit = []
    var tempCategory = []
    var tempQty = []

    if (weightOne.trim() != '' && unitOne != '' && subCategoryOne != '') {
      tempUnit.push(unitOne)
      tempCategory.push(subCategoryOne)
      tempQty.push(weightOne)
    } else {
      alert('Please complete details')
      return
    }

    if (addMoreCount > 1) {
      if (weightTwo.trim() != '' && unitTwo != '' && subCategoryTwo != '') {
        tempUnit.push(unitTwo)
        tempCategory.push(subCategoryTwo)
        tempQty.push(weightTwo)
      } else {
        alert('Please complete details')
        return
      }
    }

    if (addMoreCount > 2) {
      if (weightThree.trim() != '' && unitThree != '' && subCategoryThree != '') {
        tempUnit.push(unitThree)
        tempCategory.push(subCategoryThree)
        tempQty.push(weightThree)
      } else {
        alert('Please complete details')
        return
      }
    }

    try {
      let param = {
        'assignedId': item.assigned_id,
        "unitValues": tempUnit,
        "subcategoryValues": tempCategory,
        "qtyValues": tempQty
      }
      console.log(param)      
      const { data } = await onAddRecept({
        data: param
      });
      console.log(data)
      if (data.status) {
        navigation.pop()
        navigation.navigate(NavigationRouteNames.WORKORDER_EMAIL)
      } else {
        alert(data.message)
      }
    } catch (e) {
      console.log("Response error", e);
    }
  }

  const handelAddMore = () => {
    setMoreCount(addMoreCount + 1)
    let listData = receiptData;
    let newData = listData.concat(itemObj);
    setReceiptData(newData)
  }

  const handelRemoveLine = (index) => {
    if (index != -1) {
      setMoreCount(addMoreCount - 1)
      let tempData = [...receiptData]
      console.log(tempData)
      tempData.splice(index, 1)

      // clear State
      if (index == 1) {
        setUnitTwo('')
        setSubCategoryTwo('')
        setWeightTwo('')
      } else if (index == 2) {
        setUnitThree('')
        setSubCategoryThree('')
        setWeightThree('')
      }
      setReceiptData(tempData)
    }
  }

  return (
    <View style={Styles.topView}>
      <KeyboardAwareScrollView>
        <View style={AppStyles.aligncen}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt30,]}>Ref No- {item.order_no}</Text>
        </View>
        <View style={Styles.boxView}>

          <View style={[style.flexDir, AppStyles.mt20,]}>
            <View style={style.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.ml20]}>Waste type</Text>
            </View>
            <View style={[style.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mr20]}>{item.category_name}</Text>
            </View>
          </View>

          <View style={style.flexDir}>
            <View style={style.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Waste sub category</Text>
            </View>
            <View style={[style.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.sub_category_name}</Text>
            </View>
          </View>

          <View style={style.flexDir}>
            <View style={style.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Volume</Text>
            </View>
            <View style={[style.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.qty} {item.unit_name}</Text>
            </View>
          </View>

          <View style={style.flexDir}>
            <View style={style.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Purchase Date</Text>
            </View>
            <View style={[style.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{formatDisplayDate(item.pickup_date)}</Text>
            </View>
          </View>

          <View style={style.flexDir}>
            <View style={style.flex1}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Pickup Time</Text>
            </View>
            <View style={[style.flex1, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.time_slot}</Text>
            </View>
          </View>

          <View style={style.flexDir}>
            <View style={style.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Provisional Pricing</Text>
            </View>
            <View style={[style.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}><FAIcon size={14} name="rupee" /> {item.price}</Text>
            </View>
          </View>

          <View style={style.flexDir}>
            <View style={style.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Pickup Address</Text>
            </View>
            <View style={[style.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f11, AppStyles.mt10, AppStyles.mr20]}>{item.landmark} {item.location}</Text>
            </View>
          </View>
        </View>

        {addMoreCount < 3 ? <View style={[{ justifyContent: 'flex-end', alignItems: 'flex-end' }, AppStyles.pv10, AppStyles.ph20]}>
          <TouchableOpacity
            onPress={() => handelAddMore()}
            style={[AppStyles.pv10, AppStyles.ph10, { backgroundColor: Colors.mangoTwo, borderRadius: 5 }, AppStyles.flexDir, AppStyles.alignCenter]}
            activeOpacity={0.6}>
            <Text style={[AppStyles.txtWhiteRegular,]}>Add more  </Text>
            <FAIcon name='plus-circle' color={Colors.white} size={18}></FAIcon>
          </TouchableOpacity>
        </View> : <View style={AppStyles.pv10}></View>}

        <View style={[AppStyles.ml20, AppStyles.mr20]}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.textalig]}>Confirm the receipt and quantity</Text>
          {receiptData.map((item, index) => (<View>
            <View key={index}
              style={[AppStyles.mt20]}>
              <View style={[AppStyles.flexRowSpaceBetween, AppStyles.mb10]}>
                <Text style={[AppStyles.txtBlackRegular, AppStyles.f16]}>Category</Text>
                {index > 0 && <TouchableOpacity
                  key={`${index}1`}
                  onPress={() => handelRemoveLine(index)}
                  style={[AppStyles.pv5, AppStyles.ph5, { backgroundColor: Colors.mangoTwo, borderRadius: 5 }, AppStyles.flexDir, AppStyles.alignCenter]}
                  activeOpacity={0.6}>
                  <Text style={[AppStyles.txtWhiteRegular,]}>Remove  </Text>
                  <FAIcon name='times-circle-o' color={Colors.white} size={18}></FAIcon>
                </TouchableOpacity>}
              </View>
              <DropDown
                items={subCategories}
                placeholderText="Select category"
                itemStyle={{ color: '#000' }}
                onValueChange={(val) => setValueCategory(val, index)}
                selectedValue={getValueCategory(index)}
                containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
              />
            </View>
            <View style={[AppStyles.mt20]}>
              <View>
                <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb10]}>Enter the Weight</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 2, paddingRight: 10 }}>
                  <TextInput
                    placeholder="Enter volume"
                    value={getValueWeight(index)}
                    onChangeText={(txt) => setValueWeight(txt, index)}
                    keyboardType='number-pad'
                    maxLength={50}
                    returnKeyType='done'
                    style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
                  />
                </View>
                <View style={AppStyles.flex1}>
                  <DropDown
                    items={unitPickerData}
                    placeholderText="Units"
                    itemStyle={{ color: '#000' }}
                    onValueChange={(val) => setValueUnit(val, index)}
                    selectedValue={getValueUnit(index)}
                    containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
                  />
                </View>
              </View>
            </View>
          </View>))}
        </View>

        <View style={Styles.btnContainer}>
          <TouchableOpacity
            onPress={() => handelAddReceipt()}
            style={Styles.confirmbtn}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>CONFIRM</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAwareScrollView>
    </View>
  );
}
export default WarehouseDetails;
