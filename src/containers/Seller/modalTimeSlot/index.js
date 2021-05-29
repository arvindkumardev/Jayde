import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Styles from './styles';
import { Colors, AppStyles } from '../../../theme';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import ToggleSwitch from 'toggle-switch-react-native'
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons'
function PickupDate (props) {
  const { isVisible, handleClose, Data } = props;

  const [customDate, setCustomDate] = useState(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'));
  const [fromTime, setFromTime] = useState(moment(new Date()).format('hh:mm A'))
  const [toTime, setToTime] = useState(moment(new Date()).add(1, 'hours').format('hh:mm A'))
  const [pickerIndex, setPickerIndex] = useState()

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const [timeSlotIndex, setTimeSlotIndex] = useState(0)

  useEffect(() => {
    isEnabled ? setTimeSlotIndex(-1) : setTimeSlotIndex(0)
  }, [isEnabled])

  const handleConfirm = () => {
    if (isEnabled) {
      let param = {
        date: customDate,
        time: `${fromTime} ${toTime}`
      }
      // route.params.getTimeSlot(param)
      // navigation.goBack()
      Data(param)
    } else {
      let param = {
        date: timeSlotIndex > 1 ? getAfterDay_Formatted() : getDayAfter_Formatted(),
        time: timeSlotIndex == 0 ? '11:00 AM 1:00 PM'
          : timeSlotIndex == 1 ? '3:00 PM 5:00 PM'
            : timeSlotIndex == 2 ? '11:00 AM 1:00 PM'
              : '3:00 PM 5:00 PM'
      }
      Data(param)
      // route.params.getTimeSlot(param)
      // navigation.goBack()
    }
  };

  const getDayAfter = () => {
    let dayAfter = moment(new Date()).add(1, 'days').format('DD-MM-YYYY')
    return dayAfter
  }

  const getAfterDay = () => {
    let afterDay = moment(new Date()).add(2, 'days').format('DD-MM-YYYY')
    return afterDay
  }

  const getDayAfter_Formatted = () => {
    let dayAfter = moment(new Date()).add(1, 'days').format('YYYY-MM-DD')
    return dayAfter
  }

  const getAfterDay_Formatted = () => {
    let afterDay = moment(new Date()).add(2, 'days').format('YYYY-MM-DD')
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
    if (selectedDate) {
      if (pickerIndex == 0) {
        setCustomDate(moment(selectedDate).format('YYYY-MM-DD'));
      } else if (pickerIndex == 1) {
        setFromTime(moment(selectedDate).format('hh:mm A'));
      } else if (pickerIndex == 2) {
        setToTime(moment(selectedDate).format('hh:mm A'));
      }
      //setShow(Platform.OS == 'ios');   
    } else {
    }
  };

  return (
    <Modal animationType="slide" transparent={true}
    visible={isVisible} onRequestClose={handleClose}>
    <View style={[Styles.mainContainer]}>
      <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {handleClose()}}
            style={[AppStyles.flexRowAlignCenter, AppStyles.pv15,]}>
            <Ionicons name="close" size={28} />
            <Text style = {[AppStyles.txtBlackBold, AppStyles.f18, AppStyles.ml15]}>Pickup Date</Text>
      </TouchableOpacity>

      <KeyboardAwareScrollView showsVerticalScrollIndicator = {false}>
        <View style={[AppStyles.mv20]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f16]}>Preferred time slot</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setTimeSlotIndex(0)}
            style={[AppStyles.pv15, AppStyles.ph20, AppStyles.flexRowSpaceBetween, timeSlotIndex == 0 && Styles.active]}>
            <Text style={AppStyles.txtBlackRegular}>{getDayAfter()}</Text>
            <Text style={AppStyles.txtBlackRegular}>11:00 AM - 1:00 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setTimeSlotIndex(1)}
            style={[AppStyles.pv15, AppStyles.ph20, AppStyles.flexRowSpaceBetween, timeSlotIndex == 1 && Styles.active]}>
            <Text style={AppStyles.txtBlackRegular}>{getDayAfter()}</Text>
            <Text style={AppStyles.txtBlackRegular}>3:00 PM - 5:00 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setTimeSlotIndex(2)}
            style={[AppStyles.pv15, AppStyles.ph20, AppStyles.flexRowSpaceBetween, timeSlotIndex == 2 && Styles.active]}>
            <Text style={AppStyles.txtBlackRegular}>{getAfterDay()}</Text>
            <Text style={AppStyles.txtBlackRegular}>11:00 AM - 1:00 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setTimeSlotIndex(3)}
            style={[AppStyles.pv15, AppStyles.ph20, AppStyles.flexRowSpaceBetween, timeSlotIndex == 3 && Styles.active]}>
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
              <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5, AppStyles.mt10]]}>Pick Date</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => showDatepicker()}
                style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary, AppStyles.br10, AppStyles.mb10, { padding: 10 }]}>
                <FAIcon size={22} name='calendar-o' color={Colors.mangoTwo} />
                <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{moment(customDate).format('DD-MMM-YYYY')}</Text>
              </TouchableOpacity>
              {show && (<DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                minimumDate={new Date(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'))}
                mode={mode}
                is24Hour={false}
                display="default"
                onChange={onChange}
              />)}
            </View>
            <View style={[AppStyles.mt10]}>
              <View>
                <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5]}>Pick Time Slot</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={[AppStyles.flex1, AppStyles.pr10]}>
                  <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5]}>From</Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => showTimepicker(1)}
                    style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary, AppStyles.br10, AppStyles.mb10, { padding: 10 }]}>
                    <FAIcon size={22} name='clock-o' color={Colors.mangoTwo} />
                    <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{fromTime}</Text>

                  </TouchableOpacity>
                </View>
                <View style={[AppStyles.flex1, AppStyles.pl10]}>
                  <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5]}>To</Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => showTimepicker(2)}
                    style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary, AppStyles.br10, AppStyles.mb10, { padding: 10 }]}>
                    <FAIcon size={22} name='clock-o' color={Colors.mangoTwo} />
                    <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{toTime}</Text>

                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          : null}

        {/* End Toggle View */}
        <View style={[AppStyles.flex1, AppStyles.mt20, AppStyles.mb20, { alignSelf: 'flex-end' }]}>
        </View>

      </KeyboardAwareScrollView>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv10, AppStyles.alignCenter, AppStyles.ph40, AppStyles.mb20,]}
        onPress={handleConfirm}>
        <Text style={[AppStyles.txtWhiteRegular, AppStyles.f18]}>CONFIRM</Text>
      </TouchableOpacity>
    </View>
    </Modal>            
  );
};

PickupDate.propTypes = {
  isVisible: PropTypes.bool,
  handleClose: PropTypes.func,
};

PickupDate.defaultProps = {
  isVisible: false,
  handleClose: null,
};


export default PickupDate;
