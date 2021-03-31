import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import Styles from "./styles";
import AppStyles from "../../theme/Styles/texts";
import AppStyle from "../../theme/Styles/spaces";
import style from "../../theme/Styles/Container";
import styles from '../../components/CustomImage/style';
import NavigationRouteNames from '../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';


function Confirmation() {
  
  
   const [title,setTitle]=useState('SUCCESS');

   const [title2,setTitle2]=useState('Category');
   const [title3,setTitle3]=useState('Paper');
   const [title5,setTitle5]=useState('Sub Category');
   const [title6,setTitle6]=useState('Type 2');
   const [title7,setTitle7]=useState('Volume');
   const [title8,setTitle8]=useState('2 Tons');
   const [title9,setTitle9]=useState('Location');
   const [title10,setTitle10]=useState('Hyderabad');
   const [title11,setTitle11]=useState('Prov. Price');
   const [title12,setTitle12]=useState('₹ 25,864');

   const navigation = useNavigation();
   const route = useRoute();
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }
  
  return (
    <View style={Styles.topView}>
       <ScrollView>
       
        
        <View style={Styles.boxContent}>
          <Image style={Styles.boxImage} source={require('../../assets/Images/AccountCreate/Group.png')}  /> 
          <Text style={[AppStyles.txtBlackBold, AppStyles.f20, AppStyles.spacing1]}>{title}</Text>

          <View style={[style.w85, style.borderwidth1, AppStyle.mt20, Styles.bdrclr]}></View>
           
          <View style={styles.alignCenter}>
          <Text style={[AppStyles.f11, AppStyles.txtSecandaryRegular, AppStyle.ml24, AppStyle.mr20, AppStyle.mt20, AppStyles.textalig]}>The Order with Ref No- JYD/SC/2020/0067 with the following details has been sent to EARTHBOX</Text>
          </View>
        <View style={Styles.bxVu}>
        
        <View style={[style.flexDir, AppStyle.ml24]}>
      <View style={style.flex1}>
      <Text style={[AppStyles.f15, AppStyle.mt20, AppStyles.txtSecandaryRegular]}>{title2}</Text>
      </View>
      <View style={[style.flex1, AppStyles.alignfend]}>
      <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyle.mt20, AppStyle.mr30]}>{title3}</Text>
      </View>
      </View> 

      <View style={[style.flexDir, AppStyle.ml24]}>
      <View style={style.flex1}>
      <Text style={[AppStyles.f15, AppStyle.mt20, AppStyles.txtSecandaryRegular]}>{title5}</Text>
      </View>
      <View style={[style.flex1, AppStyles.alignfend]}>
      <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyle.mt20, AppStyle.mr30]}>{title6}</Text>
      </View>
      </View> 

      <View style={[style.flexDir, AppStyle.ml24]}>
      <View style={style.flex1}>
      <Text style={[AppStyles.f15, AppStyle.mt20, AppStyles.txtSecandaryRegular]}>{title7}</Text>
      </View>
      <View style={[style.flex1, AppStyles.alignfend]}>
      <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyle.mt20, AppStyle.mr30]}>{title8}</Text>
      </View>
      </View> 

      <View style={[style.flexDir, AppStyle.ml24]}>
      <View style={style.flex1}>
      <Text style={[AppStyles.f15, AppStyle.mt20, AppStyles.txtSecandaryRegular]}>{title9}</Text>
      </View>
      <View style={[style.flex1, AppStyles.alignfend]}>
      <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyle.mt20, AppStyle.mr30]}>{title10}</Text>
      </View>
      </View> 

      <View style={[style.flexDir, AppStyle.ml24]}>
      <View style={style.flex1}>
      <Text style={[AppStyles.f15, AppStyle.mt20, AppStyles.txtSecandaryRegular]}>{title11}</Text>
      </View>
      <View style={[style.flex1, AppStyles.alignfend]}>
      <Text style={[AppStyles.f15, AppStyles.txtBlackRegular, AppStyle.mt20, AppStyle.mr30]}>{title12}</Text>
      </View>
      </View> 

<View style={[style.flex1, Styles.tbut]}>
              <TouchableOpacity style={[AppStyle.mt40, AppStyle.pv11, AppStyles.aligncen, style.br13,  style.btnPrimary]} onPress={() => {screenNavigate()}}>
                  <Text style={[AppStyles.f18, style.whitecolor]}>GO TO HOME</Text>
              </TouchableOpacity>
             </View>
             
       </View>

        </View>

          </ScrollView> 
        
      
    </View>
  );
}
export default Confirmation;
