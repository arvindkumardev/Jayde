import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import { Alert } from "react-native";
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image,
   TextInput, FlatList, ScrollView, PermissionsAndroid} from 'react-native';
import Styles from "./styles";
import CustomText from '../../../components/CustomText';
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles } from '../../../theme';
import FAIcon from "react-native-vector-icons/FontAwesome";
import CheckBoxWrapper from '../../../components/CheckBoxWrapper';
import arraydata from '../../../utils/arraydata3.json';
import RNFetchBlob from 'rn-fetch-blob';
import UserContext from '../../../appContainer/context/user.context';

function DownloadReport() {

   const navigation = useNavigation();
   const route = useRoute();
   const [rememberMe,setRememberMe]=useState(false);
   const { setLoader } = useContext(UserContext);
  
   const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.HOMESCREEN);
  }

     useLayoutEffect(() => {
      const title='Reports';
     navigation.setOptions({
      title,
    });
    }, []);

    const getExtension = filename => {
      //To get the file extension
      return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
    };

    const downloadReport = () => {  
       setLoader(true)
      let date = new Date(); //To add the time suffix in filename
      //let ext = this.getExtention(image_URL);
      //ext = '.' + ext[0];
      
      const { config, fs } = RNFetchBlob;
      let DownloadDir = fs.dirs.DownloadDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          //Related to the Android only
          useDownloadManager: true,
          notification: true,
          path:
          DownloadDir +
            '/Report' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.csv',
          description: 'Downloading...',
        },
      };
      config(options)
        .fetch('GET', 'http://52.91.165.234/api/mobile/admin/downloadReport', {
          Authorization : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjM2NjYwOTYsImV4cCI6MTYyNDI3MDg5NiwiZGF0YSI6eyJ1c2VyX2lkIjoiODUiLCJuYW1lIjoiVGVzdEFkbWluIiwiZW1haWwiOiJyYXZpNEByaGF0ZWNobm9sb2d5LmNvbSIsInBob25lIjoiOTg3MzEwNjg0MSIsImJ1c2luZXNzX3R5cGUiOiJhZG1pbiIsInN0YXR1cyI6IjEiLCJ0eXBlIjoiYWRtaW4iLCJhZG1pbl9pZCI6bnVsbH19.t8F10al79xWB66olFkeL2aiTnig66vwFXRgI4crZf9g',
          // more headers  ..
        })
        .then(res => {
          //Showing alert after successful downloading
          //console.log('res -> ', JSON.stringify(res));                      
          setLoader(false)
          alert('Report Downloaded Successfully.')
        }).catch(res => {
          setLoader(false)
          alert('Report Download Failed.')
        });
    };  

   const  handelDownload = async (item) => {     
      if (Platform.OS === 'ios') {
         downloadReport()
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message: 'This app needs access to your storage to download Photos',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //Once user grant the permission start downloading
              console.log('Storage Permission Granted.');
              downloadReport()
            } else {
              //If permission denied then show alert 'Storage Permission Not Granted'
              alert('Storage Permission Not Granted');
            }
          } catch (err) {
            //To handle permission related issue
            console.warn(err);
          }
        }
  }  

  const _RenderItem = (index, item) => {
      return (
        <TouchableOpacity>
        <View style={[AppStyles.flexDir, AppStyles.mt20]}>
          <View style={[AppStyles.ml24, AppStyles.flexpointeight]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.productnumber}</Text>
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.name}</Text>
          </View>
          <View style={[AppStyles.flexpointtwo,]}>
          <View style={[AppStyles.mr10]}>
                  <CheckBoxWrapper
                  //  style={{width: 40, height: 40}}
                    isChecked={item.checkboxvalue}
                    // checkBoxHandler={() =>
                    //   setRememberMe((rememberMe) => !rememberMe)
                    // }
                  />
          <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f9, AppStyles.mr10]}>{item.status}</Text>
                  </View>
          </View>
          </View>

         <View style={[AppStyles.flexDir, AppStyles.mt20]}>
         <View style={[AppStyles.flexpointtwo, AppStyles.ml20]}>
         <Image source={require('../../../assets/Images/NewOrderList/Group_10089.png')}  />
         </View>
         <View style={[AppStyles.flexpointsix, AppStyles.ml10]}>
           <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.productname}</Text>
           <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13]}>{item.color}</Text>
           <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11]}>{item.weight}</Text>
         </View>
         <View style={AppStyles.flexpointtwo}>
         <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.price}</Text>
         </View>
         </View>

         <View style={[Styles.btnContainer, AppStyles.flexDir]}>
        <View style={AppStyles.flex1}>
        <TouchableOpacity
          style={[Styles.aggregatebtn]}>
          <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>VIEW</Text>
        </TouchableOpacity>
       </View>
       <View style={AppStyles.flex1}>
      <TouchableOpacity
          style={[Styles.confirmbtn, AppStyles.mb20]}>
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>DOWNLOAD</Text>
        </TouchableOpacity>
        </View>
      </View>

        <View style={[AppStyles.w100, Styles.bdrclr]}></View>
        </TouchableOpacity>     
      )
  }

  return (
    
    <View style={[AppStyles.topView, AppStyles.inCenter]}>
      
       <TouchableOpacity
          onPress = {() => handelDownload()}
          style={[Styles.confirmbtn, AppStyles.mb20]}>
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig, AppStyles.mt10]}>DOWNLOAD</Text>
        </TouchableOpacity>
        {/* <FlatList
                data={arraydata}
                renderItem={({ index, item }) =>
                  _RenderItem(index, item)
                }
              /> */}

         
        
      
    </View>
  );
}
export default DownloadReport;
