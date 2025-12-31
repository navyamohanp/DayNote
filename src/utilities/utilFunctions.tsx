import { NativeModules, Platform } from 'react-native';

export const checkNotifications = async () => {
  if (Platform.OS === 'android') {
    const { NotificationStatusModule } = NativeModules;

    try {
      // Calling the method from Kotlin native module
      const isEnabled =
        await NotificationStatusModule.areNotificationsEnabled();
      return isEnabled;
    } catch (error) {}
  }
};
