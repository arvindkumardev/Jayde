import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import  DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import useAxios from 'axios-hooks';
import Styles from "./styles";
import NavigationRouteNames from '../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';

function OrderAssign() {
  
  const [arraydata,setarraydata]=useState([
    {
         name: 'Waste type',
         type: 'Plastic',
      }
  ])

   const [title1,setTitle1]=useState('Ref No- JYD/SC/2020/0067');
   const [title4,setTitle4]=useState('Order Assign');

   const [title2,setTitle2]=useState('Waste type');
   const [title3,setTitle3]=useState('Plastic');
   const [title5,setTitle5]=useState('Waste Sub Category');
   const [title6,setTitle6]=useState('Type 1');
   const [title7,setTitle7]=useState('Volume');
   const [title8,setTitle8]=useState('3 Tons');
   const [title9,setTitle9]=useState('Purchase Date');
   const [title10,setTitle10]=useState('26/07/2020');
   const [title11,setTitle11]=useState('Purchase Amount');
   const [title12,setTitle12]=useState('₹ 25,864');

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
    _AggreFunc()
  }, []);

  
  return (
    <View style={Styles.mainView}>
       <ScrollView>
       <View style={Styles.leftArrwView}>
        <View style={Styles.flx1}>
        <TouchableOpacity>  
                    <View>  
                    <Image style={Styles.lftimg} source={require('../../assets/Images/AdminNewOrder/Group10055.png')}  />   
                    </View>  
                </TouchableOpacity>  
        </View>
        <View style={Styles.flx2}>
        <TouchableOpacity>  
                    <View>  
                        <Text style={Styles.topTitle}>{title4}</Text>  
                    </View>  
                </TouchableOpacity>  
        </View>
          </View> 
          
        <View style={Styles.refView}>
          <Text style={Styles.refText}>{title1}</Text>
        </View>
        
        <View style={Styles.boxView}>
        
        <View style={Styles.boxText}>
      <View style={Styles.flx}>
      <Text style={Styles.boxtxtt}>{title2}</Text>
      </View>
      <View style={Styles.boxTxtView}>
      <Text style={Styles.boxTextt1}>{title3}</Text>
      </View>
      </View> 

      <View style={Styles.boxText}>
      <View style={Styles.flx}>
      <Text style={Styles.boxtxtt}>{title5}</Text>
      </View>
      <View style={Styles.boxTxtView}>
      <Text style={Styles.boxTextt1}>{title6}</Text>
      </View>
      </View> 

      <View style={Styles.boxText}>
      <View style={Styles.flx}>
      <Text style={Styles.boxtxtt}>{title7}</Text>
      </View>
      <View style={Styles.boxTxtView}>
      <Text style={Styles.boxTextt1}>{title8}</Text>
      </View>
      </View> 

      <View style={Styles.boxText}>
      <View style={Styles.flx}>
      <Text style={Styles.boxtxtt}>{title9}</Text>
      </View>
      <View style={Styles.boxTxtView}>
      <Text style={Styles.boxTextt1}>{title10}</Text>
      </View>
      </View> 

      <View style={Styles.boxText}>
      <View style={Styles.flx}>
      <Text style={Styles.boxtxtt}>{title11}</Text>
      </View>
      <View style={Styles.boxTxtView}>
      <Text style={Styles.boxTextt1}>{title12}</Text>
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
