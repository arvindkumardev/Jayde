import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import arraydata1 from '../../utils/arraydata';


function Order() {


  const [title4,setTitle4]=useState('New Orders');

  const [arraydata,setarraydata]=useState(arraydata1);
  // const [arraydata,setarraydata]=useState([
  //   {
  //   name: '3 Ton Paper',
  //   date: '21/01/21',
  //   orderid: 'JYD/N/21/019',
  //   image: require('../../assets/Images/AdminSelectOrder/Group10061.png'),
  //   images: require('../../assets/Images/Dashboard/Fill_164.png'),
  //   status: 'Pending',
  // },  {
  //   name: '4 Ton Paper',
  //   date: '21/01/21',
  //   orderid: 'JYD/N/21/021',
  //   image: require('../../assets/Images/AdminSelectOrder/Group10061.png'),
  //   images: require('../../assets/Images/Dashboard/Fill_164.png'),
  //   status: 'Pending',
  // },  {
  //   name: '3 Ton Plastic',
  //   date: '21/01/21',
  //   orderid: 'JYD/N/21/011',
  //   image: require('../../assets/Images/AdminSelectOrder/Group10063.png'),
  //   images: require('../../assets/Images/Dashboard/Fill_164.png'),
  //   status: 'Pending',
  // },  {
  //   name: '4 Ton Paper',
  //   date: '21/01/21',
  //   orderid: 'JYD/N/21/021',
  //   image: require('../../assets/Images/AdminSelectOrder/Group10061.png'),
  //   images: require('../../assets/Images/Dashboard/Fill_164.png'),
  //   status: 'Pending',
  // },  {
  //   name: '3 Ton Plastic',
  //   date: '21/01/21',
  //   orderid: 'JYD/N/21/011',
  //   image: require('../../assets/Images/AdminSelectOrder/Group10063.png'),
  //   images: require('../../assets/Images/Dashboard/Fill_164.png'),
  //   status: 'Pending',
  // },  {
  //   name: '4 Ton Paper',
  //   date: '21/01/21',
  //   orderid: 'JYD/N/21/021',
  //   image: require('../../assets/Images/AdminSelectOrder/Group10061.png'),
  //   images: require('../../assets/Images/Dashboard/Fill_164.png'),
  //   status: 'Pending',
  // },  {
  //   name: '3 Ton Plastic',
  //   date: '21/01/21',
  //   orderid: 'JYD/N/21/011',
  //   image: require('../../assets/Images/AdminSelectOrder/Group10063.png'),
  //   images: require('../../assets/Images/Dashboard/Fill_164.png'),
  //   status: 'Pending',
  // },  {
  //   name: '4 Ton Paper',
  //   date: '21/01/21',
  //   orderid: 'JYD/N/21/021',
  //   image: require('../../assets/Images/AdminSelectOrder/Group10061.png'),
  //   images: require('../../assets/Images/Dashboard/Fill_164.png'),
  //   status: 'Pending',
  // },])


  const _RenderItem = (index, item) => {
    return (
      <View style={{flexDirection: 'row', marginLeft: 24,}}>
      <View style={{flex: .2, }}>
      <Image style={{width: 66, height: 66, marginTop: 10,}} source={item.image}  />
      </View>
      <View style={{flex: .6, }}>
      <Text style={{fontSize: 17, marginLeft: 15, marginTop: 12,}}>{item.orderid}</Text>
      <Text style={{fontSize: 15, marginLeft: 15,}}>{item.name}</Text>
      <Text style={{fontSize: 11, marginLeft: 15,}}>{item.date}</Text>
      </View>
      <View style={{flex: .2,}}>
      <Image style={{width: 15, height: 18, marginTop: 30, marginLeft: 15,}} source={item.images}  />
      <Text style={{fontSize: 11, color: '#000',}}>{item.status}</Text>
      </View>
      </View>     
    )
  }

  
  return (
    <View style={{flex: 1,backgroundColor: 'white',}}>
       <ScrollView>
            
            <View style={{flexDirection: 'row', marginTop: 30, marginBottom: 10,}}>
        <View style={{flex: .4,}}>
        <TouchableOpacity>  
                    <View>  
                    <Image style={{width: 24, height: 34, marginLeft: 34,}} source={require('../../assets/Images/AdminSelectOrder/Group10058.png')}  />   
                        
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


            <FlatList
        data={arraydata}
        // horizontal={true}
        renderItem={({ index, item }) =>
          _RenderItem(index, item)
        }
      />

          </ScrollView> 
      
      
    </View>
  );
}
export default Order;
