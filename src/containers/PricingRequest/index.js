import React, {useContext, useEffect, useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image
    } from 'react-native';
import {GradientButton} from '../../components';
import {logout, RfH, RfW} from '../../utils/helpers';
import UserContext from '../Login/user.context';
import {useNavigation, useRoute} from '@react-navigation/native';
import Styles from "./styles";
import Fonts from "../../theme/Fonts";
import Colors from "../../theme/Colors";
import  DropDownPicker from "react-native-dropdown-picker";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Camera from "../../components/Camera";
import { launchImageLibrary } from 'react-native-image-picker';
import { getSubCategory } from "../../services/middleware/quote";


const PricingRequest= () => {
  const { user, setLogin } = useContext(UserContext);
  const navigation = useNavigation();
  const route = useRoute();
  const [ showCamera, setShowCamera ] = useState(false);
  const [ wasteImage, setWasteImage ] = useState(null);
  const [ base64Image, setBase64Image ] = useState('');
  const [ subCategories, setSubCategories ] = useState([]);
  
  const onShowCamera = () => {
    console.log(showCamera);
    setShowCamera(!showCamera)
  }
  useLayoutEffect(() => {
    const { title } = route.params;
    navigation.setOptions({
      title: title ? <Text style={{fontFamily: Fonts.bold, fontSize: 18}}>{title}</Text> : <Text style={{fontFamily: Fonts.bold, fontSize: 18}}>Paper Waste</Text>
    })
  }, [navigation]);

  useEffect( async () => {
    const { data } = await getSubCategory(1);
    console.log("Getting response from subcategory ", data);
  }, [])

  const onClose = () => {
    setShowCamera(false);
  }

  const onLibraryOpen = () => {
    const options = { title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setWasteImage(response);
      }
    })
    
  }

  const onTakePic = (imageObject) => {
    console.log(imageObject.base64);
    setWasteImage(imageObject)
    setBase64Image(imageObject.base64);
    setShowCamera(false);
  }

  const onRemoveImage = () => {
    setWasteImage(null);
    setBase64Image('');
  }
  
  return (
      <KeyboardAwareScrollView style={{flex:1, paddingHorizontal:RfW(20)}}>
            <View style={Styles.headerContainer}>
                <Text style={Styles.headerText}>Get Quote</Text>
            </View>
            <View style={{marginTop: 15}}>
              <Text style={Styles.inputLabelText}>Please choose a sub category</Text>
              <DropDownPicker
                showArrow={true}
                items={[
                    {label: 'USA', value: 'usa', hidden: true},
                    {label: 'Select one', value: '0'},
                    {label: 'France', value: 'france'},
                ]}
                defaultValue={"0"}
                globalTextStyle={Styles.dropDownText}
                containerStyle={{height: 45}}
                style={{backgroundColor: '#e4e4e4'}}
                itemStyle={{
                    justifyContent: 'flex-start',
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => console.log(item)}
              />
            </View>
            <View style={Styles.viewVolume}>
              <Text style={Styles.inputLabelText}>Volume</Text>
              <View style={Styles.viewVolumeInputContainer}>
                <TextInput placeholder={'Enter location'} style={[Styles.inputText, Styles.locationTxt]}/>
                <DropDownPicker
                  items={[
                      {label: 'USA', value: 'usa', hidden: true},
                      {label: 'Units', value: '0'},
                      {label: 'France', value: 'france'},
                  ]}
                  defaultValue={"0"}
                  globalTextStyle={Styles.dropDownText}
                  containerStyle={{height: 45, flex: 2}}
                  style={{backgroundColor: '#e4e4e4'}}
                  itemStyle={{
                      justifyContent: 'flex-start',
                  }}
                  dropDownStyle={{backgroundColor: '#fafafa'}}
                  onChangeItem={item => console.log(item)}
                />
              </View>
            </View>
            <View style={{marginTop: 15}}>
              <Text style={Styles.inputLabelText}>Add Location</Text>
              <TextInput placeholder={'Enter location'} style={Styles.inputText}/>
            </View>
            <View style={Styles.imagePickerContainer}>
              <Text style={Styles.inputLabelText}>Add Picture</Text>
              <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity style={Styles.iconButton} onPress={() => onShowCamera()}>
                  <FAIcon name={"camera"} size={25} style={{marginRight: 10}} color={Colors.grayThree}/>
                  <Text style={{ color:Colors.grayThree, fontFamily: Fonts.regular}}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.iconButton} onPress={() => onLibraryOpen() }>
                  <FAIcon name={"image"} size={25} style={{marginRight: 10}} color={Colors.grayThree}/>
                  <Text style={{ color:Colors.grayThree, fontFamily: Fonts.regular}}>Library</Text>
                </TouchableOpacity>
                <Camera visible={showCamera} onClose={onClose} onTakePic={onTakePic} />
              </View>
            </View>
            <View style={{marginTop: RfH(10)}}>
              <TouchableOpacity style={Styles.confirmButton} onPress={() => { } }>
                  <Text style={Styles.confirmBtnText}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
            {
              wasteImage != null &&
              <View style={Styles.imageContainer}>
                <Image source={{uri: wasteImage.uri }} style={Styles.uploadImage} />
                <TouchableOpacity onPress={() => onRemoveImage() } style={Styles.removeBtn}>
                  <FAIcon name={'trash-o'} size={20} color={'#fff'} />
                </TouchableOpacity>
              </View>
            }
    </KeyboardAwareScrollView>
  );
}

export default PricingRequest;
