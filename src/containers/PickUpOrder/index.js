import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
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



const PickUpOrder = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showCamera, setShowCamera] = useState(false);
  const [wasteImage, setWasteImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  const onShowCamera = () => {
    console.log(showCamera);
    setShowCamera(!showCamera);
  };
  // useLayoutEffect(() => {
  //   const { title, categoryId } = route.params;
  //   console.log("Category Id fetch", categoryId);
  //   navigation.setOptions({
  //     title: title ? (
  //       <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>{title}</Text>
  //     ) : (
  //       <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>
  //         Paper Waste
  //       </Text>
  //     ),
  //   });
  // }, []);

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
    navigation.navigate(NavigationRouteNames.NEW_ORDER_REQUEST);
  };
  return (
    <KeyboardAwareScrollView style={{ flex: 1, paddingHorizontal: RfW(20), backgroundColor: '#ffffff', }}>
      <View style={[style.flexDir, AppStyle.mt20,]}>
        <View style={style.flexpointthree}>
          <Image style={Styles.lftimg} source={require('../../assets/Images/AdminNewOrder/Group10055.png')} />
        </View>
        <View style={style.flexpointseven}>
          <Text style={[Appstyles.txtBlackBold, Appstyles.f20,]}>Pickup Order</Text>
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
            <Text style={[Appstyles.txtBlackRegular, Appstyles.f11, AppStyle.mt10, , AppStyle.mr20]}>1812, building No 2, Banjara Hills. Hyderabad (TN)</Text>
          </View>
        </View>
      </View>

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
      {/* 
      <View style={{ marginTop: 35 }}>
        <Text style={Styles.inputLabelText}>Please choose a sub category</Text>
        <DropDownPicker
          showArrow={true}
          items={[
            { label: "USA", value: "usa", hidden: true },
            { label: "Select one", value: "0" },
            { label: "France", value: "france" },
          ]}
          defaultValue={'0'}
          globalTextStyle={Styles.dropDownText}
          containerStyle={{ height: 45 }}
          style={{ backgroundColor: "#e4e4e4" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => console.log(item)}
        />
      </View> */}



      <View style={{ marginTop: RfH(10), marginTop: 25, marginBottom: 25 }}>
        <TouchableOpacity activeOpacity = {0.8} style={Styles.confirmButton} onPress={handleConfirm}>
          <Text style={Styles.confirmBtnText}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
      {wasteImage != null && (
        <View style={Styles.imageContainer}>
          <Image source={{ uri: wasteImage.uri }} style={Styles.uploadImage} />
          <TouchableOpacity
            onPress={() => onRemoveImage()}
            style={Styles.removeBtn}
          >
            <FAIcon name={"trash-o"} size={20} color={"#fff"} />
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default PickUpOrder;
