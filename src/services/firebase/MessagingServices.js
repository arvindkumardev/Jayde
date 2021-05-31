import React from 'react';
import messaging from '@react-native-firebase/messaging';
// import NavigationRouteNames from '../../routes/ScreenNames';

const registerAppWithFCM = async () => {
  await messaging().registerDeviceForRemoteMessages();
};

// push permission
const requestPermission = async (successHandler) => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcmToken = await messaging().getToken();
      if (successHandler) {
        await successHandler(fcmToken);
      }
    } else {
      console.log('User declined messaging permissions :(');
    }
  } catch (er) {}
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
const onMessage = () => {
  messaging().onMessage(async (remoteMessage) => {
    console.log('ON MESSAGE TRIGGERRED', remoteMessage);
  });
};

const onNotificationOpenedApp = (onNotification) => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    if (onNotification) {
      onNotification(remoteMessage);
    }
  });
};

const getInitialNotification = (onNotification) => {
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        if (onNotification) {
          onNotification(remoteMessage);
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

const initializeNotification = (onNotification) => {
  registerAppWithFCM();
  onMessage();
  onNotificationOpenedApp(onNotification);
  getInitialNotification(onNotification);
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
