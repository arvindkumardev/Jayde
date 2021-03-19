import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';


function AdminNewOrder() {
  

   const [title1,setTitle1]=useState('Ref No- JYD/SC/2020/0067');
   const [title4,setTitle4]=useState('New Order');
 

  const [arraydata,setarraydata]=useState([
    {
    name: 'Waste type',
    type: 'Plastic',
  },  {
    name: 'Waste Sub Category',
    type: 'Type 1',
  },  {
    name: 'Volume',
    type: '3 Tons',
  },  {
    name: 'Purchase Date',
    type: '26/07/2020',
  },  {
    name: 'Purchase Amount',
    type: '₹ 25,864',
  },  {
    name: 'Pickup Address',
    type: '1812, buildind No 2, Banjara Hills. Hyderabad (TN)',
  }])

  const _RenderItem = (index, item) => {
    return (
      <View style={{flexDirection: 'row', marginLeft: 24,}}>
      <View style={{flex: 1, }}>
      <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular',}}>{item.name}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end',}}>
      <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular', marginRight: 30,}}>{item.type}</Text>
      </View>
      </View>     
    )
  }
  
  return (
    <View style={{flex: 1,backgroundColor: '#ffffff',}}>
       <ScrollView>
       <View style={{flexDirection: 'row', marginTop: 30,}}>
        <View style={{flex: .4,}}>
        <TouchableOpacity>  
                    <View>  
                    <Image style={{width: 24, height: 34, marginLeft: 34,}} source={require('../../assets/Images/AdminNewOrder/Group10055.png')}  />   
                        
                    </View>  
                </TouchableOpacity>  
        </View>
        <View style={{flex: .6,}}>
        <TouchableOpacity>  
                    <View>  
                        <Text style={{fontSize: 20, color: '#000000', fontWeight: "bold",}}>{title4}</Text>  
                    </View>  
                </TouchableOpacity>  
        </View>
          </View> 
          
        <View style={{alignItems: 'center',  marginTop: 35,}}>
          <Text style={{marginLeft: 24, fontSize: 17, color: '#121212', fontWeight: "bold",}}>{title1}</Text>
        </View>
        
        <View style={{width: 310, height: 285, backgroundColor: '#f5f5f5', borderRadius: 20, marginLeft: 24, marginTop: 35, marginRight: 24,}}>
        
        <FlatList
        data={arraydata}
        
        renderItem={({ index, item }) =>
          _RenderItem(index, item)
        }  
        />

       </View>
        

       <View style={{flexDirection: 'row', marginTop: 70,}}>
        <View style={{flex: 1, marginTop: 10, marginLeft: 24,}}>
              <TouchableOpacity style={{marginTop:20,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems:'center',borderColor: 'orange', borderWidth: 1,}} onPress={() => {_SignupFunc()}}>
                  <Text style={{fontSize: 18, color: 'orange'}}>REJECT</Text>
              </TouchableOpacity>
             </View>
        
             <View style={{flex: 1, marginTop: 10, marginRight: 24, marginLeft: 7,}}>
              <TouchableOpacity style={{marginTop:20,
    borderRadius: 13,
    backgroundColor: 'orange',
    paddingVertical: 11,
    alignItems:'center'}} onPress={() => {_SignupFunc()}}>
                  <Text style={{fontSize: 18, color: '#ffffff'}}>ACCEPT</Text>
              </TouchableOpacity>
             </View>
        </View>

        

          </ScrollView> 
        
      
    </View>
  );
}
export default AdminNewOrder;
