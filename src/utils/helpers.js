import { Alert, Dimensions, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { LOCAL_STORAGE_DATA_KEY, STANDARD_SCREEN_DIMENSIONS } from './constants';
import DeviceInfo from 'react-native-device-info';
import { Colors, Images } from '../theme';
import aes from 'aes-js';
import NavigationRouteNames from '../routes/ScreenNames';
import moment from 'moment';
import { isEmpty, isNil, isNull, isNumber, isUndefined } from 'lodash';

export const storeData = async (key, value) => {
  try {
    let v = value;
    if (typeof value !== 'string') {
      v = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, v);
  } catch (e) {
    throw e;
  }
};

export const getSaveData = async (key) => {
  return await AsyncStorage.getItem(key);
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // clear error
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) { }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE);
    await AsyncStorage.removeItem(LOCAL_STORAGE_DATA_KEY.USER_INFO);
    await AsyncStorage.removeItem(LOCAL_STORAGE_DATA_KEY.REMEMBER_ME);
  } catch (e) { }
};

export const alertBox = (
  alertTitle = '',
  alertMsg = '',
  config = {
    positiveText: 'OK',
    cancelable: true,
  },
) => {
  let configuration = [
    {
      text: config.positiveText, // Key to show string like "Ok" etc. i.e. positive response text
      onPress: config.onPositiveClick, // Key that contains function that executes on click of above text button
    },
  ];
  if (config.middleText && !isEmpty(config.middleText)) {
    configuration = [
      ...configuration,
      {
        text: config.middleText, // Key to show string like "Cancel" etc. i.e. negative response text
        onPress: config.onMiddleClick, // Key that contains function that executes on click of above text button
      },
    ];
  }
  if (config.negativeText && !isEmpty(config.negativeText)) {
    configuration = [
      ...configuration,
      {
        text: config.negativeText, // Key to show string like "Cancel" etc. i.e. negative response text
        onPress: config.onNegativeClick, // Key that contains function that executes on click of above text button
        style: 'destructive',
      },
    ];
  }
  Alert.alert(alertTitle, alertMsg, configuration, {
    cancelable: config.cancelable,
  });
};

export const comingSoonAlert = () => alertBox('Coming Soon');

export const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

export const isLandscape = () => {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
};

export const deviceWidth = () => {
  const dim = Dimensions.get('window');
  return dim.width;
};

export const deviceHeight = () => {
  const dim = Dimensions.get('window');
  return dim.height;
};

export const RfW = (value) => {
  const dim = Dimensions.get('window');
  return dim.width * (value / STANDARD_SCREEN_DIMENSIONS.width);
};

export const RfH = (value) => {
  const dim = Dimensions.get('window');
  return dim.height * (value / STANDARD_SCREEN_DIMENSIONS.height);
};

export const isIntegerString = (str) => /^\+?([0-9]\d*)$/.test(str);

export const isValidEmail = (str) =>
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(str);

export const isValidUserName = (str) => {
  if (isEmpty(str)) {
    return false;
  } else if (isIntegerString(str.trim())) {
    return true;
  } else {
    return isValidEmail(str.trim());
  }
};

export const isValidVolume = (val) => {
  if (isEmpty(val)) {
    return false;
  } else if (val < 1) {
    return false;
  } else {
    return true
  }
};

export const getImageSource = (imagePath) =>
  isNumber(imagePath) ? imagePath : { uri: imagePath };

export const getFirstName = (name) => {
  return name ? name.split(' ')[0] : '';
};

export const getLastName = (name) => {
  return name
    ? name.split(' ').length > 1
      ? name.replace(getFirstName(name), '').trim()
      : ''
    : '';
};

export const getBgColor = (status) => {
  const actualStatus = status ? status.toLowerCase() : '';
  switch (actualStatus) {
    case 'pending':
      return Colors.amber;
    case 'approved':
      return Colors.green;
    case 'rejected':
      return Colors.redOne;
    default:
      return Colors.grayOne;
  }
};

export const getGreeting = () => {
  let greeting = '';
  if (new Date().getHours() < 12) {
    greeting = 'Good Morning ';
  } else if (new Date().getHours() < 17) {
    greeting = 'Good Afternoon ';
  } else {
    greeting = 'Good Evening ';
  }
  return greeting;
};

export const getCategoryImage = (category) => {
  const catName = category.toLowerCase();
  switch (catName) {
    case 'dine':
      return Images.dine;
    case 'stay':
      return Images.hotel;
    case 'play':
      return Images.entertainment;
    case 'relax':
      return Images.healthWellness;
    case 'shopping':
      return Images.shopping;
    default:
      return Images.shopping;
  }
};

export const formatDisplayDate = (myDate) => {
  if (!isUndefined(myDate) && !isNull(myDate) && !isNil(myDate) && !isEmpty(myDate)) {
    return moment(myDate).format('DD-MMM-YYYY');
  } else {
    return '';
  }

}
export const displayShortDate = (myDate) => {
  if (!isUndefined(myDate) && !isNull(myDate) && !isNil(myDate) && !isEmpty(myDate)) {
    return moment(myDate).format('DD-MMM-YY');
  } else {
    return '';
  }
}

export const isDisplayWithNotch = () => {
  return DeviceInfo.hasNotch();
};
