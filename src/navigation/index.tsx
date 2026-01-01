import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

import OnboardingStack from './onboardingStack';
import { navigationRef } from './rootNavigation';
import MainStack from './mainStack';
import OfflineView from '../components/offlineView';
import { colors, Images } from '../themes';
import strings from '../utilities/strings';
import { AppState, PermissionsAndroid, Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAuthToken,
  isProfileCompleted,
  notificationEnabled,
} from '../utilities/asyncStore';
import { login } from '../redux/reducers/authenticationReducer';

import { setPermissionGranted } from '../redux/reducers/notificationSlice';
import * as RootNavigation from '../../src/navigation/rootNavigation';

const RootStack = createStackNavigator();
const AppContainer = () => {
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <RootStackScreen />
        <OfflineView
          image={Images.empty.noNetwork}
          title={strings.empty.noNetwork}
          subTitle={strings.empty.noNetworkDesc}
        />
      </NavigationContainer>
    </>
  );
};

const RootStackScreen = () => {
  // const [isLoading, setLoading] = useState(true);
  const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
  // //const isLoggedIn = true;
  // const dispatch = useDispatch();
  // const permissionGranted = useAppSelector(
  //   state => state.notification.permissionGranted,
  // );

  // useEffect(() => {
  //   fetchUserStatus();
  // }, []);

  // async function fetchUserStatus() {
  //   const token = await getAuthToken();
  //   const isProfile = await isProfileCompleted();
  //   if (token && isProfile === true) {
  //     dispatch(login());
  //   }
  //   const isNotificationsEnabled = await notificationEnabled();
  //   const isPermission = await checkNotificationPermission();
  //   if (isPermission && isNotificationsEnabled) {
  //     dispatch(setPermissionGranted(true));
  //   } else {
  //     console.warn('Notification permission not granted.');
  //   }
  //   setLoading(false);
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 1000);
  // }

  // useEffect(() => {
  //   if (permissionGranted) {
  //     setupNotificationHandlers();
  //   }
  // }, [permissionGranted]);

  // // Notification setup
  // const setupNotificationHandlers = () => {
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     handleNavigation(remoteMessage);
  //     notifee.setBadgeCount(0);
  //   });

  //   messaging()
  //     .getInitialNotification()
  //     .then(async remoteMessage => {
  //       if (remoteMessage) {
  //         handleNavigation(remoteMessage);
  //         await notifee.setBadgeCount(0);
  //       }
  //     });

  //   messaging().setBackgroundMessageHandler(async message => {
  //     //await displayForegroundNotification(message);
  //   });
  //   messaging().onMessage(onMessageReceived);

  //   return notifee.onForegroundEvent(async ({ type, detail }) => {
  //     switch (type) {
  //       case EventType.DISMISSED:
  //         break;
  //       case EventType.PRESS:
  //         handleNavigation(detail.notification);
  //         break;
  //     }
  //   });
  // };

  // const checkNotificationPermission = async (): Promise<boolean> => {
  //   if (Platform.OS === 'android') {
  //     if (Platform.Version >= 33) {
  //       return await PermissionsAndroid.check(
  //         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  //       );
  //     } else {
  //       // For Android 12 and below, assume permission is granted
  //       return true;
  //     }
  //   } else {
  //     const settings = await messaging().hasPermission();
  //     return (
  //       settings === messaging.AuthorizationStatus.AUTHORIZED ||
  //       settings === messaging.AuthorizationStatus.PROVISIONAL
  //     );
  //   }
  // };

  // // Handles navigation based on notification data
  // const handleNavigation = async notificationData => {
  //   const token = await getAuthToken();
  //   const isProfileComplete = await isProfileCompleted();
  //   if (token && isProfileComplete) {
  //     RootNavigation.navigate('BYO', {
  //       selectedTabIndex: 1,
  //       type: 'notification',
  //     });
  //   }
  // };

  // // Background and foreground message handling
  // const onMessageReceived = async message => {
  //   const appState = AppState.currentState;
  //   if (appState === 'active') {
  //     await displayForegroundNotification(message);
  //   } else {
  //     // Increment the badge count dynamically instead of setting it to 1
  //     const currentBadgeCount = await notifee.getBadgeCount();
  //     await notifee.setBadgeCount(currentBadgeCount + 1);
  //   }
  // };

  // // Display notification in foreground
  // const displayForegroundNotification = async message => {
  //   const channelId = await notifee.createChannel({
  //     id: 'important',
  //     name: 'Important Notifications',
  //     importance: AndroidImportance.HIGH,
  //   });

  //   await notifee.displayNotification({
  //     title: message.notification?.title || message.data.title,
  //     body: message.notification?.body || message.data.body,
  //     android: {
  //       channelId,
  //       smallIcon: 'icon_white',
  //     },
  //   });
  // };

  // if (isLoading) {
  //   return (
  //     <View
  //       // eslint-disable-next-line react-native/no-inline-styles
  //       style={{
  //         flex: 1,
  //         height: '100%',
  //         width: '100%',
  //         backgroundColor: colors.background,
  //         justifyContent: 'center',
  //         alignSelf: 'center',
  //       }}
  //     >
  //       {/* <ActivityIndicator size="large" color={colors.red} /> */}
  //     </View>
  //   );
  // }

  return (
    <RootStack.Navigator>
      {/* {isLoggedIn ? ( */}
      <RootStack.Screen
        name="MainStack"
        component={MainStack}
        options={{ animation: 'slide_from_right', headerShown: false }}
      />
      {/* ) : (
        <RootStack.Screen
          name="OnboardingStack"
          component={OnboardingStack}
          options={{ animation: 'slide_from_right', headerShown: false }}
        />
      )} */}
    </RootStack.Navigator>
  );
};

export default AppContainer;
