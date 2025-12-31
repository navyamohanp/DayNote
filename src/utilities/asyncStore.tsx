import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserDetails = async (result: any) => {
  let userID = '',
    name = '',
    image = '',
    email = '',
    bio = '';

  if (result.id != null && result.id !== '' && result.id !== undefined) {
    userID = result.id;
  }
  if (result.name != null) {
    name = result.name;
  }
  if (result.email != null) {
    email = result.email;
  }
  if (result.image != null) {
    image = result.image;
  }
  if (result.bio != null) {
    bio = result.bio;
  }

  try {
    await AsyncStorage.multiSet([
      ['USER_ID', userID],
      ['USER_NAME', name],
      ['USER_EMAIL', email],
      ['USER_BIO', bio],
      ['USER_IMAGE', image],
    ]);
  } catch (error) {}
};

export const saveUserId = async (ID: string) => {
  let myId = '';

  if (ID != null && ID !== undefined) {
    myId = ID;
  }
  try {
    await AsyncStorage.setItem('USER_ID', myId);
  } catch (error) {}
};

export const saveUserEmail = async (Email: string) => {
  let myEmail = '';

  if (Email != null && Email !== undefined) {
    myEmail = Email;
  }
  try {
    await AsyncStorage.setItem('USER_EMAIL', myEmail);
  } catch (error) {}
};

export const getUserId = async () => {
  try {
    const value = await AsyncStorage.getItem('USER_ID');
    if (value) {
      return value;
    }
    return '';
  } catch (error) {
    return '';
  }
};

export const getUserEmail = async () => {
  try {
    const value = await AsyncStorage.getItem('USER_EMAIL');
    if (value) {
      return value;
    }
    return '';
  } catch (error) {
    return '';
  }
};

export const getUserDetails = async () => {
  try {
    const keys = [
      'USER_ID',
      'USER_NAME',
      'USER_EMAIL',
      'USER_BIO',
      'USER_IMAGE',
    ];

    const result = await AsyncStorage.multiGet(keys);

    // result is an array of key-value pairs, so you can iterate over it to get the values
    const userDetails = {};

    for (const [key, value] of result) {
      userDetails[key] = value;
    }

    return userDetails;
  } catch (error) {
    console.error('Error retrieving user details:', error);
    return null;
  }
};

export const saveAuthToken = async (token: string) => {
  let myToken = '';

  if (token != null && token !== undefined) {
    myToken = token;
  }

  try {
    await AsyncStorage.setItem('AUTH_TOKEN', myToken);
  } catch (error) {}
};
export const getAuthToken = async () => {
  try {
    const value = await AsyncStorage.getItem('AUTH_TOKEN');
    if (value) {
      return value;
    }
    return '';
  } catch (error) {
    return '';
  }
};

export const saveRefreshToken = async (token: string) => {
  let myToken = '';

  if (token != null && token !== undefined) {
    myToken = token;
  }

  try {
    await AsyncStorage.setItem('REFRESH_TOKEN', myToken);
  } catch (error) {}
};
export const getRefreshToken = async () => {
  try {
    const value = await AsyncStorage.getItem('REFRESH_TOKEN');
    if (value) {
      return value;
    }
    return '';
  } catch (error) {
    return '';
  }
};

export const setGoogleClicked = async (value: string) => {
  let data = '';

  if (value != null && value !== undefined) {
    data = value;
  }

  try {
    await AsyncStorage.setItem('IS_GOOGLE_CLICKED', data);
  } catch (error) {}
};
export const isGoogleClicked = async () => {
  try {
    const value = await AsyncStorage.getItem('IS_GOOGLE_CLICKED');
    if (value) {
      return value;
    }
    return 'false';
  } catch (error) {
    return 'false';
  }
};

export const changeIsProfileCompleted = async (isCompleted: boolean) => {
  let isMyCompleted = 'false';

  if (isCompleted != null && isCompleted !== undefined) {
    if (isCompleted) {
      isMyCompleted = 'true';
    } else {
      isMyCompleted = 'false';
    }
  }

  try {
    await AsyncStorage.setItem('IS_PROFILE_COMPLETED', isMyCompleted);
  } catch (error) {}
};

export const isProfileCompleted = async () => {
  try {
    const value = await AsyncStorage.getItem('IS_PROFILE_COMPLETED');
    if (value) {
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const setProfileCompleted = async (isCompleted: boolean) => {
  try {
    await AsyncStorage.setItem('IS_PROFILE_COMPLETED', isCompleted.toString());
  } catch (error) {
    console.error('Error setting profile completion status:', error);
  }
};

export const saveDeviceToken = async (token: string) => {
  let myToken = '';

  if (token != null && token !== undefined) {
    myToken = token;
  }

  try {
    await AsyncStorage.setItem('DEVICE_TOKEN', myToken);
  } catch (error) {}
};

export const getDeviceToken = async () => {
  try {
    const value = await AsyncStorage.getItem('DEVICE_TOKEN');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    return '';
  }
};

export const saveDeviceTimeZone = async (value: string) => {
  let data = '';

  if (value != null && value !== undefined) {
    data = value;
  }

  try {
    await AsyncStorage.setItem('DEVICE_TIMEZONE', data);
  } catch (error) {}
};

export const getDeviceTimeZone = async () => {
  try {
    const value = await AsyncStorage.getItem('DEVICE_TIMEZONE');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    return '';
  }
};

export const setEmailCount = async (value: string) => {
  let data = '';

  if (value != null && value !== undefined) {
    data = value;
  }

  try {
    await AsyncStorage.setItem('EMAIL_COUNT', data);
  } catch (error) {}
};

export const getEmailCount = async () => {
  try {
    const value = await AsyncStorage.getItem('EMAIL_COUNT');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    return '15';
  }
};

export const getLastRefreshedFlag = async () => {
  try {
    const value = await AsyncStorage.getItem('LAST_REFRESHED');
    if (value !== null) {
      // We have data!!
      return value;
    } else {
      return false;
    }
  } catch (error) {
    return '';
  }
};

export const onCleraNotificationId = async () => {
  AsyncStorage.removeItem('NOTIFY_IDS');
};

export const setUserClicked = async (status: string) => {
  let myStatus = '';

  if (status != null && status != undefined) {
    myStatus = status;
  }

  try {
    await AsyncStorage.setItem('USER_CLICKED_VALUE', myStatus);
  } catch (error) {}
};
export const getUserClicked = async () => {
  try {
    const notification = await AsyncStorage.getItem('USER_CLICKED_VALUE');
    if (notification !== null) {
      return notification;
    }
  } catch (error) {
    return 'false';
  }
};

/* For chat */

export const getAllMessagesAsync = async (): Promise<any> => {
  try {
    const ItemList = await AsyncStorage.getItem('MESSAGES_LIST');
    if (ItemList !== null) {
      return ItemList;
    }
  } catch (error) {
    return '';
  }
};

export const saveAllMessagesAsync = async (data: any) => {
  if (data != null && data !== '[]') {
    try {
      await AsyncStorage.multiSet([['MESSAGES_LIST', data]]);
    } catch (error) {}
  } else {
    try {
      // Create new data
      const newData = {
        myNewProperty: 'myNewValue',
      };
      await AsyncStorage.multiSet([['MESSAGES_LIST', JSON.stringify(newData)]]);
    } catch (error) {}
  }
};

export const saveIsAGroupMemberAsync = async (value: any) => {
  let myFlag = 'true';
  if (value !== null) {
    myFlag = value.toString();
  }
  try {
    await AsyncStorage.setItem('ISAGROUPMEMBER', myFlag);
  } catch (error) {}
};

export const getIsAGroupMemberAsync = async () => {
  try {
    const value = await AsyncStorage.getItem('ISAGROUPMEMBER');
    if (value !== null) {
      // We have data!!
      return value;
    } else {
      return false;
    }
  } catch (error) {
    return '';
  }
};

export const getUserConversationsAsync = async (): Promise<any> => {
  try {
    const ItemList = await AsyncStorage.getItem('USER_CONVERSATION');
    if (ItemList !== null) {
      return ItemList;
    }
  } catch (error) {
    return '';
  }
};

export function loadEmail() {
  return AsyncStorage.getItem('USER_EMAIL');
}

export function loadImage() {
  return AsyncStorage.getItem('USER_IMAGE');
}

export function loadImageRef() {
  return AsyncStorage.getItem('USER_IMAGE_REF');
}

export function loadPhoneNumber() {
  return AsyncStorage.getItem('PHONE_NUMBER');
}

export const saveKey = async (key: string) => {
  try {
    await AsyncStorage.setItem('USER_KEY', key);
  } catch (error) {}
};

export const saveUserDisplayName = async (key: string) => {
  try {
    return AsyncStorage.setItem('USER_NAME', key);
  } catch (error) {}
};

export const saveEmail = async (key: string) => {
  try {
    return AsyncStorage.setItem('USER_EMAIL', key);
  } catch (error) {}
};

export const saveImage = async (key: any) => {
  try {
    return AsyncStorage.setItem('USER_IMAGE', key);
  } catch (error) {}
};

export const savePhoneNumber = async (key: any) => {
  try {
    return AsyncStorage.setItem('PHONE_NUMBER', key);
  } catch (error) {}
};

export const saveImageRef = async (key: any) => {
  try {
    return AsyncStorage.setItem('USER_IMAGE_REF', key);
  } catch (error) {}
};

export async function loadKey() {
  return AsyncStorage.getItem('USER_KEY');
}

export function loadUserDisplayName() {
  return AsyncStorage.getItem('USER_NAME');
}

export const onSignOut = async () => {
  AsyncStorage.removeItem('AUTH_TOKEN');
  AsyncStorage.removeItem('USER_KEY');
  AsyncStorage.removeItem('USER_IMAGE');
};

export const saveBlockedUsersAsync = async (data: any) => {
  if (data != null) {
    try {
      await AsyncStorage.multiSet([['BLOCKED_USERS', data]]);
    } catch (error) {}
  } else {
    try {
      // Create new data
      const newData = {
        myNewProperty: 'myNewValue',
      };
      await AsyncStorage.multiSet([['BLOCKED_USERS', JSON.stringify(newData)]]);
    } catch (error) {}
  }
};

export const saveContactsAsync = async (data: any) => {
  if (data != null) {
    try {
      await AsyncStorage.multiSet([['CONTACTS', data]]);
    } catch (error) {}
  }
};

export const setAppBadgeFlag = async (flag: any) => {
  let myFlag = '0';
  if (flag !== null) {
    myFlag = flag;
  }
  try {
    await AsyncStorage.setItem('BADGE_FLAG', myFlag);
  } catch (error) {}
};

export function loadDeviceToken() {
  return AsyncStorage.getItem('DEVICE_TOKEN');
}

export const saveUserConversationsAsync = async (data: any) => {
  if (data != null && data !== '[]') {
    try {
      await AsyncStorage.multiSet([['USER_CONVERSATION', data]]);
    } catch (error) {}
  } else {
    try {
      // Create new data
      const newData = {
        myNewProperty: 'myNewValue',
      };
      await AsyncStorage.multiSet([
        ['USER_CONVERSATION', JSON.stringify(newData)],
      ]);
    } catch (error) {}
  }
};

export const setInitialLogin = async (status: boolean) => {
  let value = 'false';

  if (status != null && status !== undefined) {
    if (status) {
      value = 'true';
    } else {
      value = 'false';
    }
  }

  try {
    await AsyncStorage.setItem('IS_INITIAL_LOGIN', value);
  } catch (error) {}
};

export const isInitialLogin = async () => {
  try {
    const value = await AsyncStorage.getItem('IS_INITIAL_LOGIN');
    if (value) {
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      }
    }
    return true;
  } catch (error) {
    return true;
  }
};

export const savePermissionRequested = async (key: string) => {
  try {
    return AsyncStorage.setItem('PERMISSION_REQUESTED', key);
  } catch (error) {}
};

export async function loadPermissionRequested() {
  try {
    const value = await AsyncStorage.getItem('PERMISSION_REQUESTED');
    if (value) {
      return value;
    }
    return '';
  } catch (error) {
    return '';
  }
}

export const setSubscription = async (isSubscribed: boolean) => {
  let status = 'false';

  if (isSubscribed != null && isSubscribed !== undefined) {
    if (isSubscribed) {
      status = 'true';
    } else {
      status = 'false';
    }
  }

  try {
    await AsyncStorage.setItem('IS_SUBSCRIBED', status);
  } catch (error) {}
};

export const isSubscribed = async () => {
  try {
    const value = await AsyncStorage.getItem('IS_SUBSCRIBED');
    if (value) {
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

/* Remove keys */

export const removeAllKeys = async () => {
  try {
    const value = await AsyncStorage.getItem('IS_INITIAL_INSTALL');
    await AsyncStorage.clear();
    await AsyncStorage.setItem('IS_INITIAL_INSTALL', value);
    return true;
  } catch (e) {
    return false;
  }
};

export const isInitialInstall = async () => {
  try {
    const value = await AsyncStorage.getItem('IS_INITIAL_INSTALL');
    if (value) {
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      }
    }
    return true;
  } catch (error) {
    return true;
  }
};

export const setInitialInstall = async (status: boolean) => {
  let value = 'false';
  if (status != null && status !== undefined) {
    if (status) {
      value = 'true';
    } else {
      value = 'false';
    }
  }
  try {
    await AsyncStorage.setItem('IS_INITIAL_INSTALL', value);
  } catch (error) {}
};

export const notificationEnabled = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem('SHOW_NOT');
    return value !== 'false'; // Defaults to true if value is null or 'true'
  } catch (error) {
    return true; // Default to true in case of an error
  }
};

export const setNotificationEnabled = async (status: boolean) => {
  try {
    await AsyncStorage.setItem('SHOW_NOT', status ? 'true' : 'false');
  } catch (error) {
    console.error('Failed to set notification status', error);
  }
};
