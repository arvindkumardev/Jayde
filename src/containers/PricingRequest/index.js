import React, {useContext} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput
    } from 'react-native';
import {GradientButton} from '../../components';
import {logout, RfH, RfW} from '../../utils/helpers';
import UserContext from '../Login/user.context';
import {useNavigation} from '@react-navigation/native';
import Styles from "./styles";
import Fonts from "../../theme/Fonts";
import Colors from "../../theme/Colors";
import  DropDownPicker from "react-native-dropdown-picker";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function PricingRequest() {
  const { user, setLogin } = useContext(UserContext);
  const navigation = useNavigation();

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
                <TextInput placeholder={'Enter location'} style={[Styles.inputText, { flex: 3, height: 45, marginRight: 15}]}/>
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
            <View style={{marginTop: 15, height: 60}}>
              <Text style={Styles.inputLabelText}>Add Picture</Text>
              <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity style={Styles.iconButton}>
                  <FAIcon name={"camera"} size={25} style={{marginRight: 10}} color={Colors.grayThree}/>
                  <Text style={{ color:Colors.grayThree, fontFamily: Fonts.regular}}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.iconButton}>
                  <FAIcon name={"image"} size={25} style={{marginRight: 10}} color={Colors.grayThree}/>
                  <Text style={{ color:Colors.grayThree, fontFamily: Fonts.regular}}>Library</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: RfH(10)}}>
              <TouchableOpacity style={Styles.confirmButton} onPress={() => { }}>
                  <Text style={Styles.confirmBtnText}>CONFIRM</Text>
              </TouchableOpacity>
          </View>
    </KeyboardAwareScrollView>
  );
}

export default PricingRequest;
