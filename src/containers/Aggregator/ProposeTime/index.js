import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';
import Styles from "./styles";
import Appstyles from "../../../theme/Styles/texts";
import AppStyle from "../../../theme/Styles/spaces";
import style from "../../../theme/Styles/container";
import CustomText from '../../../components/CustomText';
import NavigationRouteNames from '../../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';
import { AppStyles, Colors } from '../../../theme';
import moment from 'moment';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import DropDown from '../../../components/Picker/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import { confirmSchedule } from './middleware';
import UserContext from '../../../appContainer/context/user.context';

const typeData = [
  {label: '10:00 AM - 11:00 AM', value: '1'}]

function ProposeTime() {

   const navigation = useNavigation();
   const route = useRoute();
   const [time, setTime] = useState('');
   const [unit, setUnit] = useState('');
   const [unitPickerData, setUnitData] = useState([]);
   const [item, setItem] = useState({});

  const [customDate, setCustomDate] = useState(moment(new Date()).add(1, 'days').format('DD-MM-YYYY'));
  const [fromTime, setFromTime] = useState(moment(new Date()).format('hh:mm A'))
  const [toTime, setToTime] = useState(moment(new Date()).add(1, 'hours').format('hh:mm A'))
  const [pickerIndex, setPickerIndex] = useState() 

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const [timeSlotIndex, setTimeSlotIndex] = useState('')
  const [{ data: quoteData, loading, error }, onSubmitQuote] = confirmSchedule();

  const handleConfirm = async (item) => {   

    const {data} = await onSubmitQuote({
      data: {
        assignedId: item.assigned_id,
        scheduleDate: customDate,
        timeslot: fromTime + toTime,
      },
    });
    
    console.log(data)
    if(data.status){
      alert(data.message)
     screenNavigate()
    } else {
      alert(data.message)
    }  
  };

  useLayoutEffect(() => {   
    const { Item } = route.params;  
    setItem(Item) 
    const title='Re-Schedule Order';
   navigation.setOptions({
    title,
  });
  }, []);

  const screenNavigate = () => {
    navigation.navigate(NavigationRouteNames.ORDERS);
  }

  useEffect(() => {
    setTimeSlotIndex('')
  }, [isEnabled])

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
    <View style={Styles.topView}>
       <ScrollView>
       
        
       <View style={Appstyles.aligncen}>
       <Text style={[Appstyles.txtBlackBold, Appstyles.f17, AppStyle.mt30,]}>Ref No- {item.order_no}</Text>
       </View>
       <View style={Styles.boxView}>

         <View style={[style.flexDir, AppStyle.mt20,]}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.ml20]}>Waste type</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mr20]}>{item.category_name}</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Waste sub category</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>{item.sub_category_name}</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Volume</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>{item.qty} {item.unit_name}</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Purchase Date</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>{moment(item.pickup_date).format('DD-MMM-YY')}</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flex1}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Pickup Time</Text>
           </View>
           <View style={[style.flex1, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}>{item.time_slot}</Text>
           </View>
           </View>

           <View style={style.flexDir}>
         <View style={style.flexpointsix}>
           <Text style={[Appstyles.txtSecandaryRegular, Appstyles.f15, AppStyle.mt10, AppStyle.ml20]}>Provisional Pricing</Text>
           </View>
           <View style={[style.flexpointfour, Appstyles.alignfend]}>
           <Text style={[Appstyles.txtBlackRegular, Appstyles.f15, AppStyle.mt10, AppStyle.mr20]}><FAIcon size={14} name="rupee" /> {item.price}</Text>
           </View>
           </View>

       </View>
       
       <View style={[AppStyles.mt30, AppStyles.ml30, AppStyles.mr30]}>
       <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.textalig]}>Please Choose Preferred Time Slot for Pick Up</Text>
       </View>
       <View style={[AppStyles.ml20, AppStyles.mr20]}>
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
         
        <View style={[AppStyles.mt20]}>
           <View>
             <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5]}>Time</Text>
           </View>
           <View style={{ flexDirection: 'row' }}>
             <View style={{ flex: 1, paddingRight: 10 }}>
               <Text style={[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.mb5]}>From</Text>
               <TouchableOpacity
              onPress = {() => showTimepicker(1)}
              style={[AppStyles.flexRowAlignCenter, AppStyles.btnSecandary,AppStyles.br10,AppStyles.mb10, {padding:10}]}>
               <FAIcon size={22} name='clock-o' color = {Colors.mangoTwo} />
           <Text style={[[AppStyles.txtBlackRegular, AppStyles.f16, AppStyles.pl20 ]]}>{fromTime}</Text>
           </TouchableOpacity>
             </View>
             <View style={{ flex: 1 }}>
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

       <View style={Styles.btnContainer}>
       <TouchableOpacity
           style={Styles.confirmbtn} onPress = {() => handleConfirm(item)}>
           <Text style={[Appstyles.txtWhiteRegular, Appstyles.f17, Appstyles.textalig, AppStyle.mt10]}>CONFIRM</Text>
         </TouchableOpacity>
       </View>

          </ScrollView> 
        
      
    </View>
  );
}
export default ProposeTime;
