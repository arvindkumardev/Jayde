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
import AppStyles from "../../theme/Styles/texts";
import AppStyle from "../../theme/Styles/spaces";
import style from "../../theme/Styles/Container";
import styles from '../../components/CustomImage/style';
import { users } from "../../services/middleware/user";

function Users() {
  //  const [page, setPage] = useState(1);
   const navigation = useNavigation();
   const route = useRoute();

  //  const loadMore = () => {
  //   setPage(page + 1);
  // };

   const [
    { data: emLoginData, loading: emLoginLoading, error: emLoginError },
    emLogin,
  ] = users();

  const triggerLogin = async () => {
    try{
            const { data } = await emLogin({ data: {} });
            console.log("Response from login ", data.data[0].users)
            setarraydata(data.data[0].users)
          }
          catch(e){
            console.log("Response error", e);
          }
         };

   useEffect(()=>{
    triggerLogin();
  }, navigation);

  // useEffect(() => {
  //   const loadProducts = async () => {
  //     setIsLoading(true);
  //     let response = await fetch(
  //       `${api}&page=${page}&perPage=4`
  //     );
  //     let results = await response.json();
  //     setProducts([...products, ...results.data]);
  //     setIsLoading(false);
  //   };
  //   loadProducts();
  // }, [page]);

   const [arraydata,setarraydata]=useState([])
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }

  const _RenderItem = (index, item) => {
    return (
       <View style={Styles.boxView}>
        
        
        <View style={[style.flexDir, AppStyle.ml24,]}>
      <View style={Styles.flx2}>
      <Text style={[AppStyles.f13, AppStyles.txtSecandaryRegular, AppStyle.mt20]}>{item.email}</Text>
      </View>
      <View style={[style.flexpointthree, AppStyle.mt10, AppStyle.mr24,]}>
      <TouchableOpacity style={Styles.confirmBtn}>
      <Text style={[AppStyles.txtWhiteRegular, AppStyles.f15, AppStyles.textalig]}>Inactive</Text>
      </TouchableOpacity>
      </View>
      </View> 

      <Text style={[AppStyles.f15, AppStyle.ml24,]}>{item.businessname}</Text>
      <Text style={[AppStyles.f15, AppStyle.ml24,]}>{item.name}</Text>
      {/* <Text style={[AppStyles.f15, AppStyle.ml24,]}>{item.password}</Text> */}
      

      <View style={[style.flexDir, AppStyle.mt14]}>
      <View style={[style.flexpointone]}>
      <Image style={Styles.lftimga} source={require('../../assets/Images/Users/noun_Recycle_3673532.png')}  /> 
      </View>
      <View style={[style.flexpointnine]}>
      <Text style={[AppStyle.ml24, AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.business_type}</Text>
      </View>
      </View>


       </View>
        )
      }

  
  return (
    <View style={Styles.mainView}>
       <ScrollView>
       <View style={[style.flexDir, AppStyle.mt30,]}>
        <View style={Styles.flx1}>
        <TouchableOpacity onPress={() => {screenNavigate()}}>  
                    <View>  
                    <Image style={Styles.lftimg} source={require('../../assets/Images/AdminNewOrder/Group10055.png')}  />   
                    </View>  
                </TouchableOpacity>  
        </View>
        <View style={Styles.flx2}>
        <TouchableOpacity>  
                    <View>  
                        <Text style={[AppStyles.f20, AppStyles.txtBlackBold]}>Jayde Users</Text>  
                    </View>  
                </TouchableOpacity>  
        </View>
          </View> 


       <FlatList
        data={arraydata}
        renderItem={({ index, item }) =>
          _RenderItem(index, item)
        }
      />

{/* <FlatList
      data={arraydata}
      keyExtractor={item => item.id}
      // renderItem={index, item}
      renderItem={({ index, item }) =>
          _RenderItem(index, item)
        }
      onEndReached={loadMore}
      onEndThreshold={0.3}
    /> */}

          </ScrollView> 
        
      
    </View>
    
  );
}
export default Users;
