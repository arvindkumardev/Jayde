/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */

import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, PermissionsAndroid,
  Platform, Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as Yup from "yup";
import { useFormik } from "formik";

import { Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "./mapStyle";
import { Colors, Fonts, AppStyles } from '../../../theme';
import style from "../../../theme/Styles/container";

import CustomText from '../../../components/CustomText';

import { RfH, RfW, storeData } from '../../../utils/helpers';
import { LOCAL_STORAGE_DATA_KEY } from "../../../utils/constants";
import UserContext from '../../../appContainer/context/user.context';

import Search from 'react-native-search-box';
const { width, height } = Dimensions.get('window');
import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoding';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const isIOS = Platform.OS == 'ios' ? true : false

const PickupDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const ASPECT_RATIO = width / height;
  const LATITUDE = 0.00;
  const LONGITUDE = 0.00;
  const LATITUDE_DELTA = 0.0122;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  })

  const [clickConfirm, setClickConfirm] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const { setLoader } = useContext(UserContext);

  const [Lat, setLat] = useState(0)
  const [Lang, setLang] = useState(0)
  const [landMark, setLandMak] = useState('')
  const [locationStatus, setLocationStatus] = useState('');
  const [initialState, setInitialState] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>Add Address</Text>,
    });
  }, [navigation]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {

        getOneTimeLocation();
        // subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            checkGPS()
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestLocationPermission();
    Geocoder.init("AIzaSyBGluo2-LxarAw4DqSC-hYiGsVZ55NkkVw", { language: "en" }); // set the language
    return () => {
      setLoader(false)
    }
  }, []);

  const getOneTimeLocation = () => {
    setLoader(true);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
    })
      .then(location => {
        const currentLongitude = location.longitude
        const currentLatitude = location.latitude
        setLang(currentLongitude);
        setLat(currentLatitude);
        setRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA         
        })
        console.log(location )
        getAddress(currentLatitude, currentLongitude)
        setLoader(false);
      }).catch(error => {
        const { code, message } = error;
        if (code === 'TIMEOUT') {
          Alert.alert('Location request timed out');
        }
        if (code === 'UNAUTHORIZED') {
          Alert.alert('Authorization denied');
        }
       // console.warn(code, message);
        setLoader(false);
      })
  };

  const checkGPS = () => {
    if (Platform.OS === 'android') {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
        .then(data => {
          getOneTimeLocation();

        }).catch(err => {
          navigation.pop();
        });
    }
  }

  const getAddress = (lat, lang) => {
    Geocoder.from(lat, lang)
      .then(json => {
        //var addressComponent = json.results[0].formatted_address
        var landMark = json.results[0].address_components[0].long_name
        var city = json.results[0].address_components[2].long_name

        // Address
        let Address = json.results[1].formatted_address
        requestForm.setFieldValue('address', Address)

        //LandMark
        setLandMak(landMark)

        //City
        requestForm.setFieldValue('city', city)

        //PinCode
        let index = json.results[0].address_components.length - 1
        var pincode = json.results[0].address_components[index].long_name
        requestForm.setFieldValue('pincode', pincode)
      })
      .catch(error => console.warn(error));
  }

  const onRegionChange = region => {
    console.log(region)
    if (initialState) {
      setRegion(region)
      getAddress(region.latitude, region.longitude)
    } else {
      setInitialState(true)
    }
  }

  const _handelSearch = () => {
    console.log(searchValue)

    if (searchValue.length > 0) {

      Geocoder.from(searchValue.trim())
        .then(json => {
          var location = json.results[0].geometry.location;
          const { lat, lng } = json.results[0].geometry.location;

          let params = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }

          setRegion(params)
          getAddress(lat, lng)
          console.log("Near Loc", lat, lng);
          console.log(location);
        }).catch(error => console.warn(error));
    }
  }

  const validationSchema = Yup.object().shape({
    address: Yup.string().required("Please provide address"),
    city: Yup.string().required("Please provide city"),
    pincode: Yup.string().required("Please provide pin code"),
  });

  const requestForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      address: '',
      city: '',
      pincode: '',
    },
    validationSchema,
    onSubmit: () => handleConfirm(
      requestForm.values.address,
      requestForm.values.city,
      requestForm.values.pincode
    )
  });

  const handleConfirm = async (address, city, pincode) => {
    let addressData = {
      'Address': address,
      'City': city,
      'PinCode': pincode,
      'Landmark': landMark
    }
    await storeData(LOCAL_STORAGE_DATA_KEY.USER_ADDRESS, addressData);
    route.params.getReturnAddress(addressData)
    navigation.goBack()
  }

  const addressConfirm = async () => {
    setClickConfirm(true)
    await requestForm.submitForm();
  }

  return (
    <KeyboardAwareScrollView
      style={[Styles.mainContainer,
      style.whitebackgrnd]}>

      <Search
        placeholder="Enter Near By Location"
        backgroundColor={Colors.mangoTwo}
        inputHeight={40}
        blurOnSubmit={true}
        keyboardDismissOnSubmit={true}
        onChangeText={value => setSearchValue(value)}
        onSearch={_handelSearch}

      />

      <View>
        <View
          style={[Styles.labelPosition, {
            backgroundColor: 'rgba(0,0,0,0.7)',
            height: 30, borderRadius: 3, borderColor: Colors.mangoTwo, borderWidth: 1, zIndex: 999
          }]}>
          <Text style={[AppStyles.txtBlackRegular, { color: '#FFFFFF', padding: 6, fontWeight: "400", textAlign: 'center' }]}>Move the map to the exact location</Text>
        </View>
        <MaterialCommunityIcons name='map-marker-radius' size={45}
          color={'#F00000'}
          style={[Styles.markerFixed,
          { zIndex: 999 }]}></MaterialCommunityIcons>


        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          style={Styles.mapView}
          maxZoomLevel={19}
          minZoomLevel={12}
          showsCompass={true}
          showsBuildings={true}
          showsUserLocation={true}
          showsTraffic={true}
          zoomEnabled={false}
          loadingEnabled={true}
          dragging={true}
          cacheEnabled = {false}
          scrollWheelZoom={false}          
          onRegionChangeComplete={onRegionChange}
          region={region}
          //initialRegion={region}
        />
      </View>
      <View style={Styles.userInputContainer}>

        <View style={[AppStyles.mt10]}>
          <View>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5]}>Address<Text style={[Styles.starText]}>*</Text></Text>
          </View>

          <View style={{ flex: 1 }}>
            <TextInput
              placeholder="Enter address"
              value={requestForm.values.address}
              keyboardType={'default'}
              onChangeText={(txt) => requestForm.setFieldValue('address', txt)}
              style={Styles.inputBox}
            />
            {clickConfirm ?
              <CustomText
                fontSize={15}
                color={Colors.red}
                styling={{ marginTop: RfH(5) }}>{requestForm.errors.address}</CustomText>
              : null}
          </View>

        </View>

        <View style={[AppStyles.mt10]}>
          <View>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5]}>Landmark</Text>
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              placeholder="Landmark"
              value={landMark}
              keyboardType={'default'}
              onChangeText={(txt) => setLandMak(txt)}
              style={Styles.inputBox}
            />

          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>

          <View style={[AppStyles.mt10, { flex: 1, paddingRight: 10 }]}>
            <View>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5]}>City<Text style={[Styles.starText]}>*</Text></Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholder="City"
                  value={requestForm.values.city}
                  keyboardType={'default'}
                  onChangeText={(txt) => requestForm.setFieldValue('city', txt)}
                  style={Styles.inputBox}
                />
                {clickConfirm ?
                  <CustomText
                    fontSize={15}
                    color={Colors.red}
                    styling={{ marginTop: RfH(5) }}>{requestForm.errors.city}</CustomText>
                  : null}
              </View>
            </View>
          </View>

          <View style={[AppStyles.mt10, { flex: 1, paddingLeft: 10 }]}>
            <View>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5]}>Pin Code<Text style={[Styles.starText]}>*</Text></Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Pin Code"
                  value={requestForm.values.pincode}
                  keyboardType={'default'}
                  onChangeText={(txt) => requestForm.setFieldValue('pincode', txt)}
                  style={Styles.inputBox}
                />
                {clickConfirm ?
                  <CustomText
                    fontSize={15}
                    color={Colors.red}
                    styling={{ marginTop: RfH(5) }}>{requestForm.errors.pincode}</CustomText>
                  : null}
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[AppStyles.mt20, AppStyles.br10, AppStyles.btnPrimary,
          AppStyles.btnHeightwidth, AppStyles.inCenter]}
          onPress={() => addressConfirm()}>
          <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18]}>CONFIRM LOCATION</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }}></View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PickupDetails;
