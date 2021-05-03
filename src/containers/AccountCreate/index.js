import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import Styles from "./styles";

function AccountCreate() {
  
  return (
    <View style={Styles.topView}>
       <ScrollView>
       <View style={Styles.topArrow}>
        <View style={Styles.viewFlex}>
        <TouchableOpacity>  
                    <View>  
                    <Image style={Styles.leftArrow} source={require('../../assets/Images/AccountCreate/Left_Arrow_Icon.png')}  />   
                    </View>  
                </TouchableOpacity>  
        </View>
        <View style={Styles.viewFlex}>
        <TouchableOpacity>  
                    <View style={Styles.topTitleView}>  
                        <Text style={Styles.topTitle}>Signup</Text>  
                    </View>  
                </TouchableOpacity>  
        </View>
          </View>   

       <View style={Styles.logoView}>
                 <Image style={Styles.logoImage} source={require('../../assets/Images/AccountCreate/JaydeLogo01.png')}  />    
              </View> 
        
        <View style={Styles.boxContent}>
          <Image style={Styles.boxImage} source={require('../../assets/Images/AccountCreate/Group.png')}  /> 
          <Text style={Styles.boxText}>Your account has been created</Text>
        </View>

          </ScrollView> 
        
      
    </View>
  );
}
export default AccountCreate;
