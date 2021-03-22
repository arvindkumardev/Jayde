import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import  DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import useAxios from 'axios-hooks';

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

   const _AggreFunc = async () => {
    // if (rememberMe == true) {
      const URL = "http://ec2-52-91-165-234.compute-1.amazonaws.com/api/admin/aggregators"
    axios.get(URL, ).then(function (response) { 
            console.log(response)
            setarraydata(response.data);
            console.log("arraydata",arraydata)
            alert(JSON.stringify(response))
            // navigation.navigate("PropertyListingPage", { value: ["1"] })
            // setLoading(false)
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
    // } else { alert('please accept policy') }
}

  useEffect(() => {
    _AggreFunc()
  }, []);

  
  return (
    <View style={{flex: 1,backgroundColor: '#ffffff',}}>
       <ScrollView>
       <View style={{flexDirection: 'row', marginTop: 30,}}>
        <View style={{flex: .3,}}>
        <TouchableOpacity>  
                    <View>  
                    <Image style={{width: 24, height: 34, marginLeft: 34,}} source={require('../../assets/Images/AdminNewOrder/Group10055.png')}  />   
                        
                    </View>  
                </TouchableOpacity>  
        </View>
        <View style={{flex: .7,}}>
        <TouchableOpacity>  
                    <View>  
                        <Text style={{fontSize: 20, color: '#000000', fontWeight: "bold",}}>{title4}</Text>  
                    </View>  
                </TouchableOpacity>  
        </View>
          </View> 
          
        <View style={{alignItems: 'center',  marginTop: 25,}}>
          <Text style={{marginLeft: 24, fontSize: 17, color: '#121212', fontWeight: "bold",}}>{title1}</Text>
        </View>
        
        <View style={{width: 310, height: 215, backgroundColor: '#f5f5f5', borderRadius: 20, marginLeft: 24, marginTop: 25, marginRight: 24,}}>
        
        <View style={{flexDirection: 'row', marginLeft: 24,}}>
      <View style={{flex: 1, }}>
      <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular',}}>{title2}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end',}}>
      <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular', marginRight: 30,}}>{title3}</Text>
      </View>
      </View> 

      <View style={{flexDirection: 'row', marginLeft: 24,}}>
      <View style={{flex: 1, }}>
      <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular',}}>{title5}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end',}}>
      <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular', marginRight: 30,}}>{title6}</Text>
      </View>
      </View> 

      <View style={{flexDirection: 'row', marginLeft: 24,}}>
      <View style={{flex: 1, }}>
      <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular',}}>{title7}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end',}}>
      <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular', marginRight: 30,}}>{title8}</Text>
      </View>
      </View> 

      <View style={{flexDirection: 'row', marginLeft: 24,}}>
      <View style={{flex: 1, }}>
      <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular',}}>{title9}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end',}}>
      <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular', marginRight: 30,}}>{title10}</Text>
      </View>
      </View> 

      <View style={{flexDirection: 'row', marginLeft: 24,}}>
      <View style={{flex: 1, }}>
      <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular',}}>{title11}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end',}}>
      <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular', marginRight: 30,}}>{title12}</Text>
      </View>
      </View> 


       </View>
      

             <View style={{marginTop: 15, marginRight: 24, marginLeft: 24,}}>
              <Text>Select business type</Text>
              <DropDownPicker
                showArrow={true}
                items={[
                    // {label: 'USA', value: 'usa', hidden: true},
                    {label: 'Select one', value: '0'},
                    {label: 'Aggregator', value: 'aggregator'},
                    {label: 'Recycler', value: 'recycler'},
                ]}
                defaultValue={"0"}
                // globalTextStyle={commonStyles.dropDownText}
                containerStyle={{height: 45}}
                style={{backgroundColor: '#e4e4e4', marginTop: 5,}}
                itemStyle={{
                    justifyContent: 'flex-start',
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => console.log(item)}
              />
            </View>

            <View style={{marginTop: 15, marginRight: 24, marginLeft: 24,}}>
              <Text>Select Aggregator</Text>
              <DropDownPicker
                showArrow={true}
                items={[
                    // {label: 'USA', value: 'usa', hidden: true},
                    {label: 'Select one', value: '0'},
                    {label: 'Aggregator', value: 'aggregator'},
                    {label: 'Earthbox ventures pvt. ltd.', value: 'earthbox ventures pvt. ltd.'},
                ]}
                defaultValue={"0"}
                // globalTextStyle={commonStyles.dropDownText}
                containerStyle={{height: 45}}
                style={{backgroundColor: '#e4e4e4', marginTop: 5,}}
                itemStyle={{
                    justifyContent: 'flex-start',
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => console.log(item)}
                // onPress={() => {_AggreFunc()}}
              />
            </View>
      
        <View style={{flex: 1, marginTop: 20, marginRight: 24, marginLeft: 24,}}>
              <TouchableOpacity style={{marginTop:20,
    borderRadius: 13,
    backgroundColor: 'orange',
    paddingVertical: 11,
    alignItems:'center'}} onPress={() => {_SignupFunc()}}>
                  <Text style={{fontSize: 18, color: '#ffffff'}}>CONFIRM</Text>
              </TouchableOpacity>
             </View>

        

          </ScrollView> 
        
      
    </View>
  );
}
export default OrderAssign;
