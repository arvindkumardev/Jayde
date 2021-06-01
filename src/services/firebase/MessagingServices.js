import React from 'react';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
// import NavigationRouteNames from '../../routes/ScreenNames';

const registerAppWithFCM = async () => {
  if (Platform.OS === 'ios') {
    await messaging().registerDeviceForRemoteMessages();
    await messaging().setAutoInitEnabled(true)
  }
};

// push permission
const requestPermission = async (successHandler) => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcmToken = await messaging().getToken();
      console.log('FCM_TOKEN', fcmToken)

      if (successHandler) {
        await successHandler(fcmToken);
      }
    } else {
      console.log('User declined messaging permissions :(');
    }
  } catch (er) { }
};

// To retrieve the FB tocken
const getFcmToken = async (successHandler) => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    if (successHandler) {
      await successHandler(fcmToken);
    }
    return fcmToken;
  } else {
    if (successHandler) {
      await successHandler(null);
    }
    return null;
  }
};

// Listeners
const onMessage = (onNotification) => {
  messaging().onMessage(async (remoteMessage) => {
    if (remoteMessage) {
      console.log('[FCMService] A new FCM message arrived!', JSON.stringify(remoteMessage));
      let notification = null
      // if (Platform.OS === 'ios') {
      //   notification = remoteMessage.data.notification
      // } else {
      //   notification = remoteMessage.notification
      // }
      onNotification(remoteMessage)
    }
  });
};

const onNotificationOpenedApp = (onOpenNotification) => {  
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log('[FCMService] onNotificationOpenedApp Notification caused app to open from background state:', JSON.stringify(remoteMessage))
    if (onOpenNotification) {
      onOpenNotification(remoteMessage);
    }
  });
};

const getInitialNotification = (onOpenNotification) => {
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      console.log('[FCMService] getInitialNotification Notification caused app to open from quit state:', JSON.stringify(remoteMessage))
      if (remoteMessage) {
        if (onOpenNotification) {
          onOpenNotification(remoteMessage);
        }
      }
    });
};

const setBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
  });
};

// To unsubscribe events. This should be called where the initializeNotification added (inside useEffects) //
const unsubscribe = () => {
  onMessage();
};

const initializeNotification = (onNotification, onOpenNotification) => {
  registerAppWithFCM();
  onMessage(onNotification);
  onNotificationOpenedApp(onOpenNotification);
  getInitialNotification(onOpenNotification);
};

const getNotificationScreen = (notificationData, navigation) => {
  let navData = {};
  if (notificationData) {
    const payload = notificationData.data;
  }
};

export default {
  initializeNotification,
  registerAppWithFCM,
  requestPermission,
  getFcmToken,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
  setBackgroundMessageHandler,
  unsubscribe,
  getNotificationScreen,
};
