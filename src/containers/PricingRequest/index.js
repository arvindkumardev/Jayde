import React, {useContext} from 'react';
import { View, Text } from 'react-native';
import {GradientButton} from '../../components';
import {logout, RfW} from '../../utils/helpers';
import UserContext from '../Login/user.context';
import {useNavigation} from '@react-navigation/native';
import Styles from "./styles";
import Fonts from "../../theme/Fonts";
import Colors from "../../theme/Colors";
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Picker } from "@react-native-community/picker";
import  DropDownPicker from "react-native-dropdown-picker";


const { Item } = Picker;

function PricingRequest() {
  const { user, setLogin } = useContext(UserContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    logout();
    setLogin(false);
  };


  return (
    <View style={{flex:1, paddingHorizontal:RfW(20), justifyContent:'center'}}>
      <View style={{alignItems:'center', marginBottom: 20}}>
          <Text style={{fontFamily: Fonts.bold, fontSize: 20}}>Get Quote</Text>
      </View>
      <View>
            <View style={{marginTop: 15}}>
              <Text style={Styles.inputLabelText}>Please choose a sub category</Text>
              <DropDownPicker
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
          <View style={{marginTop: 15, height: 60, width: '100%'}}>
            <Text style={Styles.inputLabelText}>Volume</Text>
            <View style={{flex: 1, flexDirection:'row', justifyContent:'space-between'}}>
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
          <View style={{marginTop: 15}}>
            <Text style={Styles.inputLabelText}>Add Picture</Text>
            <TextInput placeholder={'Enter location'} style={Styles.inputText}/>
          </View>
      </View>
      <View>
          <TouchableOpacity style={{ borderRadius: 10, backgroundColor:Colors.mango, paddingVertical: 15, alignItems:'center'}} onPress={() => { }}>
              <Text style={{fontFamily: Fonts.bold, color: Colors.white}}>CONFIRM</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

export default PricingRequest;
