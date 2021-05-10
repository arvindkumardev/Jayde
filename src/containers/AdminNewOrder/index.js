import React, {useContext, useEffect,useCallback, useLayoutEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import NavigationRouteNames from '../../routes/ScreenNames';

import UserContext from '../../appContainer/context/user.context';
import moment from 'moment';

function AdminNewOrder() {

  const navigation = useNavigation();
   const route = useRoute();
   const { setLoader } = useContext(UserContext);
   const [item, setItem] = useState({});


   const [title1,setTitle1]=useState('Waste type');
   const [title2,setTitle2]=useState('Waste Sub Category');
   const [title3,setTitle3]=useState('Volume');
   const [title4,setTitle4]=useState('Pick Up Date');
   const [title7,setTitle7]=useState('Pick Up Time');

   const [title5,setTitle5]=useState('Purchase Amount');
   const [title6,setTitle6]=useState('Pickup Address');
  
   useLayoutEffect(() => {
    const title='New Orders';
    navigation.setOptions({title});
    const { Item } = route.params;  
    setItem(Item)    
  }, [])


  const backToOrderList = () => {
    navigation.goBack()
  };

  const handelReject = () => {
    navigation.navigate(NavigationRouteNames.ORDER_FAILED, {Value: item, backToList: backToOrderList})
  }

  const handelAccept = () => {
    navigation.navigate(NavigationRouteNames.ORDER_ASSIGN, {Value: item, backToList : backToOrderList})
  }

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff',}}>
       <ScrollView>
       
        <View style={{alignItems: 'center',  marginTop: 35,}}>
          <Text style={{marginLeft: 24, fontSize: 17, color: '#121212', fontWeight: "bold",}}>Ref No- {item.order_no}</Text>
        </View>
        
        <View style={{width: 310, height: 285, backgroundColor: '#f5f5f5', borderRadius: 20, marginLeft: 24, marginTop: 35, marginRight: 24,}}>
        
          <View style={{flexDirection: 'row', marginLeft: 24,}}>
            <View style={{flex: 1, }}>
            <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular',}}>{title1}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end',}}>
              <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular', marginRight: 30,}}>{item.category_name}</Text>
            </View>
          </View> 

          <View style={{flexDirection: 'row', marginLeft: 24,}}>
            <View style={{flex: 1, }}>
            <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular',}}>{title2}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end',}}>
            <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular', marginRight: 30,}}>{item.sub_category_name}</Text>
            </View>
          </View> 

          <View style={{flexDirection: 'row', marginLeft: 24,}}>
            <View style={{flex: 1, }}>
            <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular',}}>{title3}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end',}}>
            <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular', marginRight: 30,}}>{item.qty} {item.unit_name}</Text>
            </View>
          </View> 

          <View style={{flexDirection: 'row', marginLeft: 24,}}>
            <View style={{flex: 1, }}>
            <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular',}}>{title4}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end',}}>
            <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular', marginRight: 30}}>{moment(item.pickup_date).format('DD/MM/YYYY')}</Text>
            </View>
          </View> 

          <View style={{flexDirection: 'row', marginLeft: 24,}}>
            <View style={{flex: 1, }}>
            <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular',}}>{title7}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end',}}>
            <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular', marginRight: 30}}>{item.time_slot}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', marginLeft: 24,}}>
            <View style={{flex: 1, }}>
            <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular',}}>{title5}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end',}}>
            <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular', marginRight: 30,}}>₹ {item.price}</Text>
            </View>
          </View> 

          <View style={{flexDirection: 'row', marginLeft: 24,}}>
            <View style={{flex: 1, }}>
            <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular',}}>{title6}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end',}}>
            <Text style={{fontSize: 15, color: '#121212', marginTop: 20, fontFamily: 'ProximaNova-Regular', marginRight: 30,}}>{title6}</Text>
            </View>
      </View> 

       </View>
        

       {item.is_confirmed  == 2 && <View style={{flexDirection: 'row', marginTop: 70,}}>
          <View style={{flex: 1, marginTop: 10, marginLeft: 24,}}>
                <TouchableOpacity style={{marginTop:20,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                  paddingVertical: 10,
                  alignItems:'center',borderColor: 'orange', borderWidth: 1,}}
                  onPress={() => {handelReject()}}>
                    <Text style={{fontSize: 18, color: 'orange'}}>REJECT</Text>
                </TouchableOpacity>
          </View>
        
          <View style={{flex: 1, marginTop: 10, marginRight: 24, marginLeft: 7,}}>
             <TouchableOpacity style={{marginTop:20,
                 borderRadius: 13,
                 backgroundColor: 'orange',
                 paddingVertical: 11,
                 alignItems:'center'}} 
                 onPress={() => {handelAccept()}}>
                 <Text style={{fontSize: 18, color: '#ffffff'}}>ACCEPT</Text>
             </TouchableOpacity>
          </View>
        </View>
       }       

    </ScrollView> 
        
      
    </View>
  );
}
export default AdminNewOrder;
