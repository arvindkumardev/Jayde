import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Styles from './styles';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { Colors, AppStyles } from '../../../theme';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import DropDown from '../../../components/Picker/index';
import ToggleSwitch from 'toggle-switch-react-native'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';


const PickupDate = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [volume, setVolume] = useState('');
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('');
  const [unitPickerData, setUnitData] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true);
  const [timeSlotIndex, setTimeSlotIndex] = useState(0)
  const [currentDate, setCurrentDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const handleSchedulePickup = () => {
    navigation.navigate(NavigationRouteNames.PICKUP_DETAILS);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>Pickup Date</Text>,
    });
  }, [navigation]);

  
  const handleConfirm = () => {
    navigation.navigate(NavigationRouteNames.PICKUP_DETAILS);
  };

  const getDayAfter = () => {
    let dayAfter = moment(new Date()).add(1, 'days').format('DD-MM-YYYY')
    return dayAfter
  }

  const getAfterDay = () => {
    let afterDay = moment(new Date()).add(2, 'days').format('DD-MM-YYYY')
    return afterDay
  }

  return (
    <KeyboardAwareScrollView style={Styles.mainContainer}>
      <View style={[AppStyles.mv20]}>
        <Calendar
          theme={{todayTextColor: '#F7A435', arrowColor: '#F7A435', textMonthFontFamily: 'Poppins-SemiBold'}}
          // Collection of dates that have to be marked. Default = {}
          markedDates={{
             '2021-05-11' : {selected: true, marked: true, selectedColor: 'blue'},
            '2012-05-17': {marked: true},
            '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
            '2012-05-19': {disabled: true, disableTouchEvent: true},
          }}
        />
     
      <View style={[AppStyles.mv20]}>
        <Text style={[AppStyles.txtBlackRegular, AppStyles.f16]}>Preferred time slot</Text>
        <TouchableOpacity
          onPress = {() => setTimeSlotIndex(0)} 
          style={[AppStyles.pv15, AppStyles.ph20, AppStyles.flexRowSpaceBetween, timeSlotIndex == 0 &&  Styles.active]}>
            <Text style={AppStyles.txtBlackRegular}>{getDayAfter()}</Text>
            <Text style={AppStyles.txtBlackRegular}>11:00 am - 1:00 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress = {() => setTimeSlotIndex(1)}
          style={[AppStyles.pv15, AppStyles.ph20, AppStyles.flexRowSpaceBetween, timeSlotIndex == 1 &&  Styles.active]}>
            <Text style={AppStyles.txtBlackRegular}>{getDayAfter()}</Text>
            <Text style={AppStyles.txtBlackRegular}>3:00 pm - 5:00 pm</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress = {() => setTimeSlotIndex(2)}
          style={[AppStyles.pv15, AppStyles.ph20, AppStyles.flexRowSpaceBetween, timeSlotIndex == 2 &&  Styles.active]}>
            <Text style={AppStyles.txtBlackRegular}>{getAfterDay()}</Text>
            <Text style={AppStyles.txtBlackRegular}>11:00 am - 1:00 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress = {() => setTimeSlotIndex(3)}
          style={[AppStyles.pv15, AppStyles.ph20, AppStyles.flexRowSpaceBetween, timeSlotIndex == 3 &&  Styles.active]}>
            <Text style={AppStyles.txtBlackRegular}>{getAfterDay()}</Text>
            <Text style={AppStyles.txtBlackRegular}>3:00 pm - 5:00 pm</Text>
        </TouchableOpacity>
      </View>
      
      </View>
            <ToggleSwitch
              isOn={isEnabled}
              onColor="#ABC270"
              offColor="#707070"
              label="Customize Time Slot"
              labelStyle={{ color: "black", fontFamily: "Poppins-SemiBold", fontSize: 15, marginRight: 95, marginLeft: 0, }}
              size="large"
              onToggle={isOn => setIsEnabled(!isEnabled) 
              // console.log("changed to : ", isOn)
              }
            />
     

      {/* Start Toggle View */}
      {isEnabled == true ? 
       <View>
        <View>
           <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5, AppStyles.mt10]]}>Date</Text>
           <TextInput
             placeholder="dd/mm/yyyy"
             style={[
               AppStyles.txtSecandaryRegular,
               AppStyles.btnSecandary,
               AppStyles.br10,
               AppStyles.mb10,
               AppStyles.pl20,
             ]}
           />
         </View>
         
        <View style={[AppStyles.mt20]}>
           <View>
             <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5]}>Time</Text>
           </View>
           <View style={{ flexDirection: 'row' }}>
             <View style={{ flex: 2, paddingRight: 10 }}>
               <TextInput
                 placeholder="00:00 - 00:00"
                 value={volume}
                 onChangeText={(txt) => setVolume(txt)}
                 style={{ backgroundColor: Colors.grayTwo, borderRadius: 10, paddingLeft: 10 }}
               />
             </View>
             <View style={{ flex: 1 }}>
               <DropDown
                 items={unitPickerData}
                 placeholderText="am"
                 itemStyle={{ color: '#707070' }}
                 onValueChange={(val) => setUnit(val)}
                 selectedValue={unit}
                 containerStyle={{ borderRadius: 10, backgroundColor: Colors.grayTwo, paddingLeft: 10 }}
               />
             </View>
           </View>
         </View>
       </View>
       : null }

        {/* End Toggle View */}
        <View style={[AppStyles.flexDir, AppStyles.mt20, AppStyles.mb20]}>
        <View style={AppStyles.flex1}>
          <Text style={[AppStyles.f12, AppStyles.txtPrimaryBold]}>ESTIMATED PRICE</Text>
          <Text style={AppStyles.txtBlackBold}>
            <FAIcon size={15} name="rupee" /> 26,864
          </Text>
        </View>
        <View style={AppStyles.flex1}>
          <TouchableOpacity
            style={[AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv10, AppStyles.alignCenter, AppStyles.ph40]}
            onPress={handleConfirm}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18]}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PickupDate;
