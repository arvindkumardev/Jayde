import React, {useContext, useEffect, useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image
    } from 'react-native';
import UserContext from '../Login/user.context';
import {useNavigation, useRoute} from '@react-navigation/native';
import Styles from "./styles";
import Colors from "../../theme/Colors";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const CallRequest = () => {
  const { user, setLogin } = useContext(UserContext);
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={Styles.headerText}>Call Back Request</Text>
    })
  }, [navigation]);

  const handleConfirm = () => {

  }
  return (
      <KeyboardAwareScrollView style={Styles.mainContainer}>
          <View style={Styles.headingContainer}>
              <Text style={Styles.txtHeader}>Please confirm your details</Text>
          </View>
          <View style={{marginTop: 30}}>
              <View>
                <Text style={Styles.inputLabel}>Contact person</Text>
                <TextInput placeholder={"Aggregator"} style={Styles.inputText}/>
              </View>
              <View>
                <Text style={Styles.inputLabel}>Contact number</Text>
                <TextInput placeholder={"Earthbox venture pvt. ltd."} style={Styles.inputText} />
              </View>
              <View>
                <Text style={Styles.inputLabel}>Upload File</Text>
                <TouchableOpacity style={[Styles.inputText, Styles.inputIcon]}>
                    <Text style={Styles.txtFileUpload}>Select file</Text>
                    <MIcon name={'attachment'} size={25} color={Colors.grayThree} />
                </TouchableOpacity>
              </View>
          </View>
          <View style={{marginVertical: 20}}>
              <Text style={Styles.timeslotHeader}>Preferred time slot</Text>
              <TouchableOpacity style={Styles.itemTimeslot}>
                  <Text style={Styles.timeslotItem}>09-03-2021</Text>
                  <Text style={Styles.timeslotItem}>11:00 am - 1:00 PM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.itemTimeslot}>
                  <Text style={Styles.timeslotItem}>09-03-2021</Text>
                  <Text style={Styles.timeslotItem}>11:00 am - 1:00 PM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[Styles.itemTimeslot, Styles.active]}>
                    <Text style={Styles.timeslotItem}>09-03-2021</Text>
                    <Text style={Styles.timeslotItem}>11:00 am - 1:00 PM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.itemTimeslot}>
                  <Text style={Styles.timeslotItem}>09-03-2021</Text>
                  <Text style={Styles.timeslotItem}>11:00 am - 1:00 PM</Text>
              </TouchableOpacity>
          </View>
          <TouchableOpacity style={Styles.confirmButton}>
              <Text style={Styles.confirmBtnText}>
                  CONFIRM
              </Text>
          </TouchableOpacity>
      </KeyboardAwareScrollView>
  );
}

export default CallRequest;
