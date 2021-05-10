import React, {useContext, useLayoutEffect, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text,
   Image, TextInput, FlatList,Alert, ScrollView} from 'react-native';
import  DropDownPicker from "react-native-dropdown-picker";
import DropDown from '../../../components/Picker/index';

import Styles from "./styles";
import { AppStyles, Colors } from '../../../theme';

import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import UserContext from '../../../appContainer/context/user.context';
import { getAggregators, getRecyclers } from "../../../services/middleware/user";

function OrderAssign() {
  const [item, setItem] = useState({});
  const { setLoader } = useContext(UserContext);

  const [aggregators, setAggregator] = useState([])
  const [recyclers, setRecyclers] = useState([])
  
  const [{ data: aggregatorsData }, onGetAggregators] = getAggregators();
  const [{ data: recyclersData }, onGetRecyclers] = getRecyclers();

  const [arrayData, setArrayData] = useState([])

  const [selectedID, setSelectedID] = useState([0])

   const navigation = useNavigation();
   const route = useRoute();
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.CONFIRMATION);
  }

  useEffect(() => {
    if (aggregatorsData) {
      console.log('AGG', aggregatorsData)
      const pickerData = aggregatorsData.map((item) => ({ label: item.name, value: item.id }));
      setAggregator(pickerData);
    }
  }, [aggregatorsData]);

  useEffect(() => {
    if (recyclersData) {
      console.log('recyclersData', recyclersData)
      const pickerData = recyclersData.map((item) => ({ label: item.name, value: item.id }));
      setRecyclers(pickerData);
    }
  }, [recyclersData]);

  useLayoutEffect(() => {
    const { Value } = route.params;  
    setItem(Value) 

    onGetAggregators();
    onGetRecyclers();
  }, []);

const handelGetAggregators = async () => {
 setLoader(true)
 const {data} = await onGetAggregators({data:{}})
 setLoader(false)

}

const handelGetRecyclers = async () => {
 setLoader(true)
  const {data} = await onGetRecyclers({data:{}})
  setLoader(false)
}

  const handelDropDown = (index) => {
    if(index == 0){
      return
    }

    if(index == 1){
      aggregators.length == 0 ?  handelGetAggregators() : setArrayData(aggregators)
    }

    if(index == 2){
      recyclers.length == 0 ? handelGetRecyclers() : setArrayData(recyclers)
    }
    
  }

  const onChangeAggregator = (id) => {
    console.log(id)
    setSelectedID(id)
  }
  
  return (
    <View style={Styles.mainView}>
       <ScrollView  style={Styles.mainView}
       removeClippedSubviews = {Platform.OS == 'android' && true}>
       <View style={Styles.mainView}>
          
          <View style={Styles.refView}>
            <Text style={Styles.refText}>Ref No- {item.order_no}</Text>
          </View>
        
          <View style={Styles.boxView}>
        
          <View style={Styles.boxText}>
        <View style={Styles.flx}>
        <Text style={Styles.boxtxtt}>Waste type</Text>
        </View>
        <View style={Styles.boxTxtView}>
        <Text style={Styles.boxTextt1}>{item.category_name}</Text>
        </View>
        </View> 

          <View style={Styles.boxText}>
        <View style={Styles.flx}>
        <Text style={Styles.boxtxtt}>Waste Sub Category</Text>
        </View>
        <View style={Styles.boxTxtView}>
        <Text style={Styles.boxTextt1}>{item.sub_category_name}</Text>
        </View>
        </View> 

          <View style={Styles.boxText}>
        <View style={Styles.flx}>
        <Text style={Styles.boxtxtt}>Volume</Text>
        </View>
        <View style={Styles.boxTxtView}>
        <Text style={Styles.boxTextt1}>{item.qty} {item.unit_name}</Text>
        </View>
        </View> 

          <View style={Styles.boxText}>
        <View style={Styles.flx}>
        <Text style={Styles.boxtxtt}>Purchase Date</Text>
        </View>
        <View style={Styles.boxTxtView}>
        <Text style={Styles.boxTextt1}>{moment(item.pickup_date).format('DD/MM/YYYY')}</Text>
        </View>
        </View> 

          <View style={Styles.boxText}>
            <View style={Styles.flx}>
            <Text style={Styles.boxtxtt}>Purchase Amount</Text>
            </View>
            <View style={Styles.boxTxtView}>
            <Text style={Styles.boxTextt1}>₹ {item.price}</Text>
            </View>
          </View> 
       </View>
      

             <View style={Styles.businessType}>
              <Text>Select business type</Text>
              <DropDownPicker
                showArrow={true}
                items={[
                    {label: 'Select one', value: '0'},
                    {label: 'Aggregator', value: 'aggregator'},
                    {label: 'Recycler', value: 'recycler'},
                ]}
                defaultValue={"0"}
                containerStyle={{height: 45}}
                style={{backgroundColor: '#e4e4e4', marginTop: 5,}}
                itemStyle={{
                    justifyContent: 'flex-start',
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={(item, index) => handelDropDown(index)}
              />
            </View>

            <View style={Styles.slctAggre}>
              <Text>Select Aggregator</Text>
              <DropDown
                placeholderText="Select one"
                items={arrayData}
                itemStyle={{ color: '#000' }}
                onValueChange = {onChangeAggregator}                      
                selectedValue={selectedID}
                containerStyle={{ borderRadius: 5,backgroundColor: '#e4e4e4', marginTop: 5, paddingLeft: 10, height: 45 }}
          />
            </View>
      
        <View style={Styles.confirmView}>
              <TouchableOpacity style={Styles.confirmBtn} onPress={() => {screenNavigate()}}>
                  <Text style={Styles.confirm}>CONFIRM</Text>
              </TouchableOpacity>
             </View>

        
    </View>
          </ScrollView> 
        
      
    </View>
  );
}
export default OrderAssign;
