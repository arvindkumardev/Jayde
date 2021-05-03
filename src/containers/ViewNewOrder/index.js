import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';

function ViewNewOrder() {
  const navigation = useNavigation();
  const route = useRoute();

   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.ASSIGN_ORDER);
  }
 
  
  return (
    <View style={Styles.mainVu}>
       <ScrollView>
       <View style={Styles.topflex}>
        <View style={Styles.flx1}>
        <TouchableOpacity>  
                    <View>  
                    <Image style={Styles.topleftarr} source={require('../../assets/Images/AdminNewOrder/Group10055.png')}  />   
                        
                    </View>  
                </TouchableOpacity>  
        </View>
        <View style={Styles.flx2}>
        <TouchableOpacity>  
                    <View>  
                        <Text style={Styles.topcon}>New Order</Text>  
                    </View>  
                </TouchableOpacity>  
        </View>
          </View> 
          
        <View style={Styles.refView}>
          <Text style={Styles.refTxt}>Ref No- JYD/SC/2020/0067</Text>
        </View>
        
        <View style={Styles.bxVu}>
        
        <View style={Styles.wstView}>
      <View style={Styles.flexx}>
      <Text style={Styles.wstitle1}>Waste type</Text>
      </View>
      <View style={Styles.boxcont}>
      <Text style={Styles.wstitle2}>Plastic</Text>
      </View>
      </View> 

      <View style={Styles.bxcon1}>
      <View style={Styles.flexx}>
      <Text style={Styles.wstitle1}>Waste Sub Category</Text>
      </View>
      <View style={Styles.boxcont}>
      <Text style={Styles.wstitle2}>Type 1</Text>
      </View>
      </View> 

      <View style={Styles.bxcon1}>
      <View style={Styles.flexx}>
      <Text style={Styles.wstitle1}>Volume</Text>
      </View>
      <View style={Styles.boxcont}>
      <Text style={Styles.wstitle2}>3 Tons</Text>
      </View>
      </View> 

      <View style={Styles.bxcon1}>
      <View style={Styles.flexx}>
      <Text style={Styles.wstitle1}>Purchase Date</Text>
      </View>
      <View style={Styles.boxcont}>
      <Text style={Styles.wstitle2}>26/07/2020</Text>
      </View>
      </View> 

      <View style={Styles.bxcon1}>
      <View style={Styles.flexx}>
      <Text style={Styles.wstitle1}>Purchase Amount</Text>
      </View>
      <View style={Styles.boxcont}>
      <Text style={Styles.wstitle2}>₹ 25,864</Text>
      </View>
      </View> 

      <View style={Styles.bxcon1}>
      <View style={Styles.flexx}>
      <Text style={Styles.wstitle1}>Pickup Address</Text>
      </View>
      <View style={Styles.boxcont}>
      <Text style={Styles.wstitle2}>1812, buildind No 2, Banjara Hills. Hyderabad (TN)</Text>
      </View>
      </View> 

       </View>
        

       <View style={Styles.btnView}>
        <View style={Styles.btnRjtView}>
              <TouchableOpacity style={Styles.rjttouch} onPress={() => {screenNavigate()}}>
                  <Text style={Styles.rjttext}>REJECT</Text>
              </TouchableOpacity>
             </View>
        
             <View style={Styles.acceptView}>
              <TouchableOpacity style={Styles.acptouch} onPress={() => {screenNavigate()}}>
                  <Text style={Styles.acceptext}>ACCEPT</Text>
              </TouchableOpacity>
             </View>
        </View>

        

          </ScrollView> 
        
      
    </View>
  );
}
export default ViewNewOrder;
