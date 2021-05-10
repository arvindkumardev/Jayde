import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import  DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import useAxios from 'axios-hooks';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';

function OrderAssign() {
  const [item, setItem] = useState({});
  
  const [arraydata,setarraydata]=useState([
    {
         name: 'Waste type',
         type: 'Plastic',
      }
  ])

   const navigation = useNavigation();
   const route = useRoute();
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.CONFIRMATION);
  }

   const _AggreFunc = async () => {
      const URL = "http://ec2-52-91-165-234.compute-1.amazonaws.com/api/admin/aggregators"
    axios.get(URL, ).then(function (response) { 
            console.log(response)
            setarraydata(response.data);
            console.log("arraydata",arraydata)
            alert(JSON.stringify(response))
        }).catch(function (error) {
            console.log(JSON.stringify(error), "hello");
            setLoading(false)
            if (error.response.data.errors) {
                Alert.alert("Error", Object.values(error.response.data.errors)[0][0])

            }
            else {
                Alert.alert("Error", error.response.data.message)
            }
            
        });
}

  useEffect(() => {
    const { Value } = route.params;  
    setItem(Value) 
    _AggreFunc()
  }, []);

  
  return (
    <View style={Styles.mainView}>
       <ScrollView>
       <View style={Styles.leftArrwView}>
        <View style={Styles.flx1}>
        <TouchableOpacity>  
                    <View>  
                    <Image style={Styles.lftimg} source={require('../../../assets/Images/AdminNewOrder/Group10055.png')}  />   
                    </View>  
                </TouchableOpacity>  
        </View>
        <View style={Styles.flx2}>
        <TouchableOpacity>  
                    <View>  
                        <Text style={Styles.topTitle}>Order Assign</Text>  
                    </View>  
                </TouchableOpacity>  
        </View>
          </View> 
          
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
                onChangeItem={item => console.log(item)}
              />
            </View>

            <View style={Styles.slctAggre}>
              <Text>Select Aggregator</Text>
              <DropDownPicker
                showArrow={true}
                items={[
                    {label: 'Select one', value: '0'},
                    {label: 'Aggregator', value: 'aggregator'},
                    {label: 'Earthbox ventures pvt. ltd.', value: 'earthbox ventures pvt. ltd.'},
                ]}
                defaultValue={"0"}
                containerStyle={{height: 45}}
                style={{backgroundColor: '#e4e4e4', marginTop: 5,}}
                itemStyle={{
                    justifyContent: 'flex-start',
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => console.log(item)}
              />
            </View>
      
        <View style={Styles.confirmView}>
              <TouchableOpacity style={Styles.confirmBtn} onPress={() => {screenNavigate()}}>
                  <Text style={Styles.confirm}>CONFIRM</Text>
              </TouchableOpacity>
             </View>

        

          </ScrollView> 
        
      
    </View>
  );
}
export default OrderAssign;
