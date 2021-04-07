import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, Button} from "react-native";
import { logout, RfH, RfW } from "../../utils/helpers";
import { useNavigation, useRoute } from "@react-navigation/native";
import Styles from './styles';
import { Colors, Fonts, AppStyles } from "../../theme";
import DropDownPicker from 'react-native-dropdown-picker';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Camera from '../../components/Camera';
import { launchImageLibrary } from "react-native-image-picker";
import NavigationRouteNames from '../../routes/ScreenNames';
import Appstyles from "../../theme/Styles/texts";
import AppStyle from "../../theme/Styles/spaces";
import style from "../../theme/Styles/container";
import CustomText from '../../components/CustomText';
import {CheckBoxWrapper, CustomTextInput, GradientButton,} from '../../components';
import Checkbox from "@react-native-community/checkbox";





const PaymentVerification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selected,setSelected]=useState(false);
  const [selected1,setSelected1]=useState(false);
  const [selected2,setSelected2]=useState(false);
  const [rememberMe,setRememberMe]=useState(false);
  const [rememberMe1,setRememberMe1]=useState(false);
  const [rememberMe2,setRememberMe2]=useState(false);
  const [shouldShow, setShouldShow] = useState(true);
  const [shouldShow1, setShouldShow1] = useState(true);
  const [shouldShow2, setShouldShow2] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [wasteImage, setWasteImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  const onShowCamera = () => {
    console.log(showCamera);
    setShowCamera(!showCamera);
  };

  const onClose = () => {
    setShowCamera(false);
  };

  const onLibraryOpen = () => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setWasteImage(response);
      }
    });
  };

  const onTakePic = (imageObject) => {
    console.log(imageObject.base64);
    setWasteImage(imageObject);
    setBase64Image(imageObject.base64);
    setShowCamera(false);
  };

  const onRemoveImage = () => {
    setWasteImage(null);
    setBase64Image("");
  };

  const handleConfirm = () => {
    navigation.navigate(NavigationRouteNames.HOME_SCREEN);
  };

  const selectedCheckbox = (rememberMe) => {
    if (selected) {
      setRememberMe(rememberMe);
      setSelected(false);
    }  else {
      alert("Please Fill The Details First");
    }
  }

  const selectedCheckbox1 = (rememberMe1) => {
    if (selected1) {
      setRememberMe1(rememberMe1);
      setSelected1(false);
    }  else {
      alert("Please Fill The Details First");
    }
  }

  // const selectedCheckbox2 = (setRememberMe2) => {
  //   if (selected2) {
  //     setRememberMe2(rememberMe2)
  //   }  else {
  //     alert("Please Fill The Details First");
  //   }
  // }
  return (
    <KeyboardAwareScrollView style={{ flex: 1, paddingHorizontal: RfW(20), backgroundColor: '#ffffff', }}>
      <View style={[style.flexDir, AppStyle.mt20,]}>
        <View style={style.flexpointthree}>
        <Image style={Styles.lftimg} source={require('../../assets/Images/AdminNewOrder/Group10055.png')}  />
          </View>
        <View style={style.flexpointseven}>
          <Text style={[Appstyles.txtBlackBold, Appstyles.f20,]}>Payment</Text>
          </View>
        </View>

       <View style={Appstyles.aligncen}>
       <Text style={[Appstyles.txtBlackBold, Appstyles.f17, AppStyle.mt30,]}>Ref No- JYD/SC/2020/0067</Text>
       </View>
       <View style={Styles.boxView}>

         <View style={[style.flexDir, AppStyle.mt20,]}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Waste type</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>Plastic</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Waste sub category</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>Type 1</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Volume</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>3 Tons</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Purchase Date</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>26/07/2020</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Purchase amount</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>₹ 25,864</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Pickup Address</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f11, AppStyle.mt10, AppStyle.mr20]}>1812, building No 2, Banjara Hills. Hyderabad (TN)</Text>
           </View>
           </View>
       </View>

      <View style={[style.flexDir, AppStyle.mt35,]}>
      <TouchableOpacity style={[style.flexpointfour]} onPress={() => setShouldShow(!shouldShow)}>
        <Text style={[Appstyles.txtBlackRegular, Appstyles.f15,]}>Is the material Weighted</Text>
      </TouchableOpacity>
     

      <View style={[style.flexpointsix, AppStyle.mt10, Appstyles.alignfend, AppStyle.mr10]}>
                  <CheckBoxWrapper
                    isChecked={rememberMe}
                    checkBoxHandler={() =>
                      selectedCheckbox((rememberMe) => !rememberMe)
                    }
                  />
                  </View>
             
                  </View>
                  {shouldShow ? (
        //  <View style={[AppStyle.mt20,]}>
        //  <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mb6,]}>Test</Text>
        //  <View style={{flex: 1, flexDirection: 'row'}}>
        //  <TextInput placeholder={"25,864"} style={Styles.inputTextf} />
        //  <FAIcon style={Styles.rupee} size={15} name="rupee" />
        //  </View>
        //  </View>

        // start view
        <View>
            <View style={Styles.headerContainer}>
            <Text style={Styles.headerText}>Enter the following details</Text>
            </View>

            <View style={Styles.viewVolume}>
            <Text style={Styles.inputLabelText}>Enter The Weight</Text>
            <View style={Styles.viewVolumeInputContainer}>
              <TextInput
                placeholder={"Enter Volume"}
                style={[Styles.inputText, Styles.locationTxt]}
              />
              <DropDownPicker
                items={[
                  { label: "USA", value: "usa", hidden: true },
                  { label: "Units", value: "0" },
                  { label: "France", value: "france" },
                ]}
                defaultValue={'0'}
                globalTextStyle={Styles.dropDownText}
                containerStyle={{ height: 45, flex: 2 }}
                style={{ backgroundColor: "#e4e4e4" }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(item) => console.log(item)}
              />
            </View>
            </View>

            <View style={[Styles.imagePickerContainer, AppStyle.mt20,]}>
        <Text style={Styles.inputLabelText}>Add Weigh Bridge Slip</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={[Styles.iconButton, AppStyle.mr10]}
            onPress={() => onShowCamera()}
          >
            <FAIcon
              name={"camera"}
              size={25}
              style={{ marginRight: 10 }}
              color={Colors.grayThree}
            />
            <Text
              style={{ color: Colors.grayThree, fontFamily: Fonts.regular }}
            >
              Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.iconButton}
            onPress={() => onLibraryOpen()}
          >
            <FAIcon
              name={"image"}
              size={25}
              style={{ marginRight: 10 }}
              color={Colors.grayThree}
            />
            <Text
              style={{ color: Colors.grayThree, fontFamily: Fonts.regular }}
            >
              Library
            </Text>
          </TouchableOpacity>
          <Camera
            visible={showCamera}
            onClose={onClose}
            onTakePic={onTakePic}
          />
        </View>
      </View>

      <View style={{ marginTop: 35 }}>
        <Text style={Styles.inputLabelText}>Enter Vehicle Number</Text>
        <TextInput placeholder={"Enter Vehicle Number"} style={Styles.inputText} />
      </View>

      <View style={Styles.imagePickerContainer}>
        <Text style={Styles.inputLabelText}>Add Vehicle Pictures</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={[Styles.iconButton, AppStyle.mr10]}
            onPress={() => onShowCamera()}
          >
            <FAIcon
              name={"camera"}
              size={25}
              style={{ marginRight: 10 }}
              color={Colors.grayThree}
            />
            <Text
              style={{ color: Colors.grayThree, fontFamily: Fonts.regular }}
            >
              Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.iconButton}
            onPress={() => onLibraryOpen()}
          >
            <FAIcon
              name={"image"}
              size={25}
              style={{ marginRight: 10 }}
              color={Colors.grayThree}
            />
            <Text
              style={{ color: Colors.grayThree, fontFamily: Fonts.regular }}
            >
              Library
            </Text>
          </TouchableOpacity>
          <Camera
            visible={showCamera}
            onClose={onClose}
            onTakePic={onTakePic}
          />
        </View>
      </View>

      <View style={{ marginTop: 35 }}>
        <Text style={Styles.inputLabelText}>Enter The Way Bill Number</Text>
        <TextInput placeholder={"Enter Vehicle Number"} style={Styles.inputText} />
      </View>

      <View style={Styles.imagePickerContainer}>
        <Text style={Styles.inputLabelText}>Add Vehicle Pictures</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={[Styles.iconButton, AppStyle.mr10]}
            onPress={() => onShowCamera()}
          >
            <FAIcon
              name={"camera"}
              size={25}
              style={{ marginRight: 10 }}
              color={Colors.grayThree}
            />
            <Text
              style={{ color: Colors.grayThree, fontFamily: Fonts.regular }}
            >
              Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.iconButton}
            onPress={() => onLibraryOpen()}
          >
            <FAIcon
              name={"image"}
              size={25}
              style={{ marginRight: 10 }}
              color={Colors.grayThree}
            />
            <Text
              style={{ color: Colors.grayThree, fontFamily: Fonts.regular }}
            >
              Library
            </Text>
          </TouchableOpacity>
          <Camera
            visible={showCamera}
            onClose={onClose}
            onTakePic={onTakePic}
          />
        </View>
      </View>

      <View style={{ marginTop: 35 }}>
        <Text style={Styles.inputLabelText}>Enter Invoice Number</Text>
        <TextInput placeholder={"Enter Vehicle Number"} style={Styles.inputText} />
      </View>

      <View style={Styles.imagePickerContainer}>
        <Text style={Styles.inputLabelText}>Add Invoice Pictures</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={[Styles.iconButton, AppStyle.mr10]}
            onPress={() => onShowCamera()}
          >
            <FAIcon
              name={"camera"}
              size={25}
              style={{ marginRight: 10 }}
              color={Colors.grayThree}
            />
            <Text
              style={{ color: Colors.grayThree, fontFamily: Fonts.regular }}
            >
              Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.iconButton}
            onPress={() => onLibraryOpen()}
          >
            <FAIcon
              name={"image"}
              size={25}
              style={{ marginRight: 10 }}
              color={Colors.grayThree}
            />
            <Text
              style={{ color: Colors.grayThree, fontFamily: Fonts.regula, }}
            >
              Library
            </Text>
          </TouchableOpacity>
          <Camera
            visible={showCamera}
            onClose={onClose}
            onTakePic={onTakePic}
          />
        </View>
      </View>

      <View style={{ marginTop: RfH(10), marginTop: 25, marginBottom: 25 }}>
        <TouchableOpacity style={Styles.confirmButtonaa} onPress={() => setSelected(true)}>
          <Text style={Styles.confirmBtnTextaa}>CONFIRM</Text>
        </TouchableOpacity>
      </View>

      </View>
   
        // End View
        ) : null}

               {/* hide and show start */}
               {/* <Button
                  style={{height: 10,}}
          title="Hide/Show Component"
          onPress={() => setShouldShow(!shouldShow)}
        />
                  {shouldShow ? (
         <View style={[AppStyle.mt20,]}>
         <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mb6,]}>Payment Required</Text>
         <View style={{flex: 1, flexDirection: 'row'}}>
         <TextInput placeholder={"25,864"} style={Styles.inputTextf} />
         <FAIcon style={Styles.rupee} size={15} name="rupee" />
         </View>
         </View>
        ) : null} */}


                  

        {/* hide and show finish */}
         {/* Start Material pickup confirmation */}
        <View style={[style.flexDir, AppStyle.mt20,]}>
      <TouchableOpacity style={[style.flexpointfour]} onPress={() => setShouldShow1(!shouldShow1)}>
        <Text style={[Appstyles.txtBlackRegular, Appstyles.f15,]}>Material Pick-up confirmation</Text>
      </TouchableOpacity>
     

      <View style={[style.flexpointsix, AppStyle.mt10, Appstyles.alignfend, AppStyle.mr10]}>
                  <CheckBoxWrapper
                    isChecked={rememberMe1}
                    checkBoxHandler={() =>
                      selectedCheckbox1((setRememberMe1) => !rememberMe1)
                    }
                  />
                  </View>
             
                  </View>
                  {shouldShow1 ? (
                <View>
                <View style={[AppStyle.mt20,]}>
    <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mb6,]}>Payment Required</Text>
    <View style={{flex: 1, flexDirection: 'row'}}>
    <TextInput placeholder={"25,864"} style={Styles.inputTextf} />
    <FAIcon style={Styles.rupee} size={15} name="rupee" />
    </View>
    </View>

  <View style={[AppStyle.mt20,]}>
    <View style={style.flexDir}>
    <View style={style.flexpointseven}>
    <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mb6]}>Payment Made</Text>
    </View>
    <View style={style.flexpointthree}>
    <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f11,  AppStyle.ml30, AppStyle.mt5]}>enter value</Text>
    </View>
    </View>
    <TextInput placeholder={"25,864"} style={Styles.inputText} />
  </View>

  <View style={[AppStyle.mt20,]}>
    <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mb6,]}>Payment Mode</Text>
    <TextInput placeholder={"Cash"} style={Styles.inputText} />
  </View>

  <View style={[AppStyle.mt20,]}>
    <View style={style.flexDir}>
    <View style={style.flexpointsix}>
    <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mb6,]}>Payment Details</Text>
    </View>
    <View style={style.flexpointfour}>
    <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f11, AppStyle.mt5, AppStyle.ml20,]}>Transaction number</Text>
    </View>
    </View>
    <TextInput placeholder={"1235567778"} style={Styles.inputText} />
  </View>

  <View>
            <View style={[style.flexDir, style.alignCenter, AppStyle.mt20]}>
            <Checkbox
                        disabled={false}
                        value={true}
                        tintColors={{ true: Colors.mango, false: '#777' }}
                        onValueChange={(newValue) => console.log(newValue)}
                    />
               <View style={{marginLeft: RfW(10)}}>
                <CustomText
                  color={Colors.warmGrey}
                  fontSize={15}
                  styling={{paddingVertical: RfH(4)}}>
                  I agree to the terms and conditions
                </CustomText>
              </View> 
            </View>
          </View>

          <View style={style.flexDir}>
  <View style={style.flex1}>
  <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
    <TouchableOpacity style={Styles.confirmButtonn} onPress={() => setSelected1(true)}>
      <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
    </TouchableOpacity>
  </View>
  </View>
  <View style={style.flex1}>
  <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
    <TouchableOpacity style={Styles.confirmButton} onPress={() => setSelected1(true)}>
      <Text style={Styles.confirmBtnText}>CONFIRM</Text>
    </TouchableOpacity>
  </View>
  </View>
  </View>
              </View>
                   ) : null} 
                  {/* End Material pickup confirmation */}

                  <View style={[style.flexDir, AppStyle.mt20,]}>
      <TouchableOpacity style={[style.flexpointsix]}>
        <Text style={[Appstyles.txtBlackRegular, Appstyles.f15,]}>Has the material reached your warehouse</Text>
      </TouchableOpacity>
     

      <View style={[style.flexpointfour, AppStyle.mt10, Appstyles.alignfend, AppStyle.mr10]}>
                  <CheckBoxWrapper
                   style={{width: 50, height: 50}}
                    isChecked={rememberMe2}
                    checkBoxHandler={() =>
                      setRememberMe2((setRememberMe2) => !rememberMe2)
                    }
                  />
                  </View>
             
                  </View>
     

      
     
      <View style={style.flexDir}>
      <View style={style.flex1}>
      <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
        <TouchableOpacity style={Styles.confirmButtonn} onPress={handleConfirm}>
          <Text style={Styles.confirmBtnTextt}>CANCEL</Text>
        </TouchableOpacity>
      </View>
      </View>
      <View style={style.flex1}>
      <View style={{ marginTop: RfH(10), marginTop: 5, marginBottom: 25 }}>
        <TouchableOpacity style={Styles.confirmButton} onPress={handleConfirm}>
          <Text style={Styles.confirmBtnText}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
      </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PaymentVerification;
