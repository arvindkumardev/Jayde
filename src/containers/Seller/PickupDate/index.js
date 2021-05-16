import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Styles from './styles';
import NavigationRouteNames from '../../../routes/ScreenNames';
import { Colors, AppStyles } from '../../../theme';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import ToggleSwitch from 'toggle-switch-react-native'
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const typeData = [
  {label: '10:00 AM - 11:00 AM', value: '1'}]

const PickupDate = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [customDate, setCustomDate] = useState(moment(new Date()).add(1, 'days').format('DD-MM-YYYY'));
  const [fromTime, setFromTime] = useState(moment(new Date()).format('hh:mm A'))
  const [toTime, setToTime] = useState(moment(new Date()).add(1, 'hours').format('hh:mm A'))
  const [pickerIndex, setPickerIndex] = useState() 

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const [timeSlotIndex, setTimeSlotIndex] = useState('')

  useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>Pickup Date</Text>,
    });
  }, [navigation]);

  useEffect(() => {
    setTimeSlotIndex('')
  }, [isEnabled])

  const handleConfirm = () => {
    if(timeSlotIndex === ''){
      if(isEnabled){
        let param = {
          date: customDate,
          time: `${fromTime} - ${toTime}`
        }
        route.params.getTimeSlot(param)
        navigation.goBack()
      } else {
        alert('Please select Preferred time slot')
      }
    } else {
        let param = {
          date: timeSlotIndex > 1 ? getAfterDay () : getDayAfter(),
          time: timeSlotIndex == 0 ? '11:00 AM - 1:00 PM' 
          : timeSlotIndex == 1 ? '3:00 PM - 5:00 PM'
          : timeSlotIndex == 2 ? '11:00 AM - 1:00 PM'
          : '3:00 PM - 5:00 PM'
        }
        route.params.getTimeSlot(param)
        navigation.goBack()
    }
    //navigation.navigate(NavigationRouteNames.PICKUP_DETAILS);
  };

  const getDayAfter = () => {
    let dayAfter = moment(new Date()).add(1, 'days').format('DD-MM-YYYY')
    return dayAfter
  }

  const getAfterDay = () => {
    let afterDay = moment(new Date()).add(2, 'days').format('DD-MM-YYYY')
    return afterDay
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {  
    setPickerIndex(0) 
    showMode('date');
  };

  const showTimepicker = (index) => {
    setPickerIndex(index) 
    showMode('time');
  };


  const onChange = (event, selectedDate) => {  
    setShow(false);     
    if(selectedDate){
      if(pickerIndex === 0){
        setCustomDate(moment(selectedDate).format('DD-MM-YYYY'));
      } else if(pickerIndex === 1) {
        setFromTime(moment(selectedDate).format('hh:mm A'));
      } else if(pickerIndex === 2) {
        setToTime(moment(selectedDate).format('hh:mm A'));
      }
      //setShow(Platform.OS === 'ios');   
    } else {
    }  
  };

  return (
    <View style={[Styles.mainContainer]}>
    
       <KeyboardAwareScrollView>
        <View style={[AppStyles.mv20]}>
        <Text style={[AppStyles.txtBlackRegular, AppStyles.f16]}>Preferred time slot</Text>
        <TouchableOpacity
          onPress = {() => setTimeSlotIndex(0)} 
          style={[AppStyles.pv15, AppStyles.ph20, AppStyles.flexRowSpaceBetween, timeSlotIndex === 0 &&  Styles.active]}>
            <Text style={AppStyles.txtBlackRegular}>{getDayAfter()}</Text>
            <Text style={AppStyles.txtBlackRegular}>11:00 AM - 1:00 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress = {() => setTimeSlotIndex(1)}
          style={[AppStyles.pv15, AppStyles.ph20, AppStyles.flexRowSpaceBetween, timeSlotIndex === 1 &&  Styles.active]}>
            <Text style={AppStyles.txtBlackRegular}>{getDayAfter()}</Text>
            <Text style={AppStyles.txtBlackRegular}>3:00 PM - 5:00 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress = {() => setTimeSlotIndex(2)}
          style={[AppStyles.pv15, AppStyles.ph20, AppStyles.flexRowSpaceBetween, timeSlotIndex === 2 &&  Styles.active]}>
            <Text style={AppStyles.txtBlackRegular}>{getAfterDay()}</Text>
            <Text style={AppStyles.txtBlackRegular}>11:00 AM - 1:00 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress = {() => setTimeSlotIndex(3)}
          style={[AppStyles.pv15, AppStyles.ph20, AppStyles.flexRowSpaceBetween, timeSlotIndex === 3 &&  Styles.active]}>
            <Text style={AppStyles.txtBlackRegular}>{getAfterDay()}</Text>
            <Text style={AppStyles.txtBlackRegular}>3:00 PM - 5:00 PM</Text>
        </TouchableOpacity>
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
           <TouchableOpacity
            onPress = {() => showDatepicker()}
            style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary,AppStyles.br10,AppStyles.mb10, {padding:10}]}>
           <FAIcon size={22} name='calendar-o' color = {Colors.mangoTwo} />
           <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{customDate}</Text>
           </TouchableOpacity>
            {show && ( <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              minimumDate = {new Date(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'))}
              mode={mode}
              is24Hour={false}
              display="default"
              onChange={onChange}
            />)}
         </View>
        <View style={[AppStyles.mt10]}>
           <View>
             <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5]}>Time</Text>
           </View>
           <View style={{ flexDirection: 'row' }}>
             <View style={[AppStyles.flex1, AppStyles.pr10 ]}>
             <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5]}>From</Text>
             <TouchableOpacity
              onPress = {() => showTimepicker(1)}
              style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary,AppStyles.br10,AppStyles.mb10, {padding:10}]}>
               <FAIcon size={22} name='clock-o' color = {Colors.mangoTwo} />
           <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20 ]]}>{fromTime}</Text>

           </TouchableOpacity>
             </View>
             <View style={[AppStyles.flex1, AppStyles.pl10 ]}>
             <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5]}>To</Text>
             <TouchableOpacity
              onPress = {() => showTimepicker(2)}
              style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary,AppStyles.br10,AppStyles.mb10, {padding:10}]}>
               <FAIcon size={22} name='clock-o' color = {Colors.mangoTwo} />
           <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20 ]]}>{toTime}</Text>

           </TouchableOpacity>
             </View>
           </View>
         </View>
       </View>
       : null }

        {/* End Toggle View */}
        <View style={[AppStyles.flex1, AppStyles.mt20, AppStyles.mb20, {alignSelf:'flex-end'}]}>
       
        
         
        </View>
     
    </KeyboardAwareScrollView>
        <TouchableOpacity
            style={[AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv10, AppStyles.alignCenter, AppStyles.ph40, AppStyles.mb20,]}
            onPress={handleConfirm}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18]}>CONFIRM</Text>
        </TouchableOpacity>
    </View>
  );
};

export default PickupDate;
