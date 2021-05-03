import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView, ActivityIndicator} from 'react-native';
import  DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import useAxios from 'axios-hooks';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import AppStyles from "../../../theme/Styles/texts";
import AppStyle from "../../../theme/Styles/spaces";
import style from "../../../theme/Styles/container";
import styles from '../../../components/CustomImage/style';
import { users } from "../../../services/middleware/user";

function Users() {
   const navigation = useNavigation();
   const route = useRoute();

  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);

   const [
    { data: emLoginData, loading: emLoginLoading, error: emLoginError },
    emLogin,
  ] = users(offset);

  const triggerLogin = async () => {
    try{
            const { data } = await emLogin({ data: {} });
            console.log("Response from login ", data.data[0].users)
            setOffset(offset + 1);
            let listData = arraydata;
            let data1 = listData.concat(data.data[0].users);
            setarraydata(data1);
            setLoading(false);
            setarraydata(data.data[0].users)
          }
          catch(e){
            console.log("Response error", e);
          }
         };

   useEffect(()=>{
    triggerLogin();
  }, navigation);

  useLayoutEffect(() => {
    const title='Jayde Users';
   navigation.setOptions({
    title,
  });
  }, []);

   
   const [arraydata,setarraydata]=useState([])
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.ENABLEDISABLE_USER);
  }

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={triggerLogin}
          //On Click of button load more data
          style={Styles.confirmBtnn}>
          <Text style={Styles.confirm}>Load More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const _RenderItem = (index, item) => {
    return (
      <TouchableOpacity onPress={() => {screenNavigate()}}>  
       <View style={Styles.boxView}>
        
        
        <View style={[style.flexDir, AppStyle.ml24,]}>
      <View style={Styles.flx2}>
      <Text style={[AppStyles.f13, AppStyles.txtSecandaryRegular, AppStyle.mt20]}>{item.email}</Text>
      </View>
      <View style={[style.flexpointthree, AppStyle.mt20, AppStyles.ml24]}>
      <TouchableOpacity style={Styles.confirmBtn}>
      <Text style={[AppStyles.txtWhiteRegular, AppStyles.f11, AppStyles.textalig, Styles.activebutton]}>Active</Text>
      </TouchableOpacity>
      </View>
      </View> 

      <Text style={[AppStyles.f15, AppStyle.ml24,]}>{item.business_name}</Text>
      <Text style={[AppStyles.f15, AppStyle.ml24,]}>{item.name}</Text>
      

      <View style={[style.flexDir, AppStyle.mt14]}>
      <View style={[style.flexpointone]}>
      <Image style={Styles.lftimga} source={require('../../../assets/Images/Users/noun_Recycle_3673532.png')}  /> 
      </View>
      <View style={[style.flexpointthree]}>
      <Text style={[AppStyle.ml24, AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.business_type}</Text>
      </View>
      <View style={{height: '100%', width: 1, borderLeftColor: '000', borderBottomWidth: 20, }}>
        </View>
        <View>
          <Text style={[AppStyle.ml20, AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.type}</Text>
          </View>
      </View>

       </View>
       </TouchableOpacity>  
        )
      }

  
  return (
    <View style={Styles.mainView}>
       <ScrollView>

       <FlatList
        data={arraydata}
        renderItem={({ index, item }) =>
          _RenderItem(index, item) 
        }
        ListFooterComponent={renderFooter}
      />




          </ScrollView> 
        
      
    </View>
    
  );
}
export default Users;
