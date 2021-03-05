import analytics from '@react-native-firebase/analytics';
import {removeSpecialCharToLowerSnakeCase} from '../../utils/StringUtils';

export const setUserProperty = (data) => {
  if (data) {
    // setUserProperty(name: string, value: string | null): Promise<void>;
    // https://rnfirebase.io/reference/analytics#setUserProperty
    analytics().setUserProperty('Email', data);
  }
};

export const logEvent = (logData) => {
  console.log('logData', logData);
  try {
    // https://rnfirebase.io/reference/analytics#logEvent
    const eventName =
      '' + removeSpecialCharToLowerSnakeCase(logData.event).slice(0, 60);
    console.log('eventName-', eventName);
    if (logData && logData.info) {
      analytics().logEvent(eventName, logData.info);
    } else {
      analytics().logEvent(eventName);
    }
  } catch (error) {
    console.log('Log event error:  ', error);
  }
};

// Log object requiered for home menu/ submenu click tracking
export const generateMenuClickLogData = (menuData) => {
  return {event: menuData.name, info: null};
};

export const trackScreen = (screenName) => {
  const trimmedScreenName =
    '' + removeSpecialCharToLowerSnakeCase(screenName).slice(0, 50);
  try {
    analytics().logScreenView({screen_name: trimmedScreenName});
  } catch (e) {
    console.log('ee', e);
    analytics().setCurrentScreen(trimmedScreenName);
  }
};

export default {
  logEvent,
  setUserProperty,
  generateMenuClickLogData,
  trackScreen,
};
