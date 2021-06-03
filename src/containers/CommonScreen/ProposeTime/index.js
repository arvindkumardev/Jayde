import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles, Colors } from '../../../theme';
import moment from 'moment';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { confirmReschedule } from '../Middelware';
import UserContext from '../../../appContainer/context/user.context';

function ProposeTime() {

  const navigation = useNavigation();
  const route = useRoute();

  const [item, setItem] = useState({});
  const { setLoader, userRole } = useContext(UserContext);

  const [customDate, setCustomDate] = useState(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'));
  const [fromTime, setFromTime] = useState(moment(new Date()).format('hh:mm A'))
  const [toTime, setToTime] = useState(moment(new Date()).add(1, 'hours').format('hh:mm A'))
  const [pickerIndex, setPickerIndex] = useState()

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [{ data, loading, error }, onConfirmSchedule] = confirmReschedule(userRole);

  const handleConfirm = async () => {
    setLoader(true)
    try {
      let param = {
        assignedId: item.assigned_id,
        scheduleDate: customDate,
        timeslot: `${fromTime} ${toTime}`
      }
      console.log(param)
      const { data } = await onConfirmSchedule({
        data: param
      });

      console.log(data)
      if (data.status) {
        screenNavigate()
      } else {
        alert(data.message)
      }
      setLoader(false)
    } catch (e) {
      console.log("Response error", e);
    }
  };

  useEffect(() => {
    if (error)
      setLoader(false)
  }, [error])

  useEffect(() => {
    return () => {
      setLoader(false)
    }
  })

  useLayoutEffect(() => {
    const { Item } = route.params;
    setItem(Item)
    console.log(userRole)
    const title = 'Re-Schedule Order';
    navigation.setOptions({ title });
  }, []);

  const screenNavigate = () => {
    navigation.popToTop()
    userRole === 'recycler' ? navigation.navigate(NavigationRouteNames.RECYCLER_NEW_ORDER_LIST)
      :
      navigation.navigate(NavigationRouteNames.AGGREGATOR_NEW_ORDERS);
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
      if (pickerIndex === 0) {
        setCustomDate(moment(selectedDate).format('YYYY-MM-DD'));
      } else if (pickerIndex === 1) {
        setFromTime(moment(selectedDate).format('hh:mm A'));
      } else if (pickerIndex === 2) {
        setToTime(moment(selectedDate).format('hh:mm A'));
      }
    } else {
    }
  };

  return (
    <View style={AppStyles.topView}>
      <ScrollView>
        <View style={AppStyles.aligncen}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt30,]}>Ref No- {item.order_no}</Text>
        </View>
        <View style={[AppStyles.boxxView, AppStyles.mt35]}>
          <View style={[AppStyles.flexDir, AppStyles.mt20,]}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.ml20]}>Waste type</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mr20]}>{item.category_name}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Waste sub category</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.sub_category_name}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Volume</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.qty} {item.unit_name}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Purchase Date</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{moment(item.pickup_date).format('DD-MMM-YY')}</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flex1}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Pickup Time</Text>
            </View>
            <View style={[AppStyles.flex1, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>{item.time_slot}</Text>
            </View>
          </View>

          <View style={[AppStyles.flexDir, AppStyles.mb20]}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Provisional Pricing</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}><FAIcon size={14} name="rupee" /> {item.price}</Text>
            </View>
          </View>

        </View>

        <View style={[AppStyles.mt30, AppStyles.ml30, AppStyles.mr30]}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.textalig]}>Please Choose Preferred Time Slot for Pick Up</Text>
        </View>
        <View style={[AppStyles.ml20, AppStyles.mr20]}>
          <View>
            <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5, AppStyles.mt10]]}>Pick Date</Text>
            <TouchableOpacity activeOpacity={0.8}
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

          <View style={[AppStyles.mt20]}>
            <View>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5]}>Pick Time Slot</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5]}>From</Text>
                <TouchableOpacity activeOpacity={0.8}
                  onPress={() => showTimepicker(1)}
                  style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary, AppStyles.br10, AppStyles.mb10, { padding: 10 }]}>
                  <FAIcon size={22} name='clock-o' color={Colors.mangoTwo} />
                  <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{fromTime}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5]}>To</Text>
                <TouchableOpacity activeOpacity={0.8}
                  onPress={() => showTimepicker(2)}
                  style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary, AppStyles.br10, AppStyles.mb10, { padding: 10 }]}>
                  <FAIcon size={22} name='clock-o' color={Colors.mangoTwo} />
                  <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20]]}>{toTime}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={Styles.btnContainer}>
          <TouchableOpacity activeOpacity={0.8}
            style={[Styles.confirmbtn, AppStyles.btnHeight44, AppStyles.inCenter]} onPress={() => {
              handleConfirm()
            }}>
            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.textalig]}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
export default ProposeTime;
