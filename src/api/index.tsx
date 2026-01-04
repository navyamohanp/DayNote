// @flow
import { Alert, Platform } from 'react-native';
import { apiEndpoints, type APIDataType } from './config';
import {
  getAuthToken,
  getDeviceTimeZone,
  getDeviceToken,
  getRefreshToken,
  removeAllKeys,
  saveAuthToken,
  saveDeviceToken,
  saveRefreshToken,
} from '../utilities/asyncStore';
import NetInfo from '@react-native-community/netinfo';
import { reduxStore } from '../redux/store';
import { logout } from '../redux/reducers/authenticationReducer';
import messaging from '@react-native-firebase/messaging';

// Flag to track refresh token requests
let isRefreshingToken = false;
let refreshTokenPromise: Promise<string | void> | null = null;

// Flag to track if session expiration alert is already shown
//let sessionExpiredAlertShown = false;

export const apiManager = async ({
  params,
  method = 'post',
  endPoint = '',
  paramsType = 'default',
  headerType = 'default',
}: APIDataType): Promise<any> => {
  const apiURL = endPoint;
  console.log(apiURL, '');

  let accessToken = await getAuthToken();
  let deviceToken = await getDeviceToken();
  const deviceTimeZone = (await getDeviceTimeZone()) || 'Asia/Kolkata';
  const device_type = Platform.OS;
  // if (deviceToken === undefined || deviceToken === '') {
  //   deviceToken = await messaging().getToken();
  //   await saveDeviceToken(deviceToken);
  // }

  const device_token =
    deviceToken !== undefined && deviceToken !== '' ? deviceToken : '';

  const header =
    paramsType === 'formData'
      ? {
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
          timezone: deviceTimeZone,
        }
      : headerType === 'withToken'
      ? {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
          devicetype: device_type,
          devicetoken: device_token,
          timezone: deviceTimeZone,
        }
      : headerType === 'withTokenAuth'
      ? {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
          devicetype: device_type,
          devicetoken: device_token,
          timezone: deviceTimeZone,
        }
      : {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
          timezone: deviceTimeZone,
          devicetype: device_type,
          devicetoken: device_token,
        };

  let fetchParams = {};

  if (method === 'post' || method === 'put' || method === 'patch') {
    if (paramsType === 'formData') {
      fetchParams = {
        method: method,
        body: params,
        headers: header,
      };
    } else {
      fetchParams = {
        method: method,
        body: JSON.stringify(params),
        headers: header,
      };
    }
  } else {
    fetchParams = {
      method: method,
      headers: header,
    };
  }

  console.log('Access Token:', accessToken);
  console.log('API Request:', apiURL, fetchParams);

  const isConnected = await NetInfo.fetch().then(state => state.isConnected);

  return new Promise((resolve, reject) => {
    const isAuthApi =
      apiURL === apiEndpoints.login || apiURL === apiEndpoints.refreshToken;
    // Helper function to process the response
    const processResponse = (response: any) => {
      if (response.status === 401 && !isAuthApi) {
        // Token refresh logic
        getUpdatedToken()
          .then(newToken => {
            console.log('New access token received:', newToken);
            (fetchParams as any).headers.Authorization = `Bearer ${newToken}`;
            // Retry the original request with the new access token
            fetch(apiURL, fetchParams).then(retryResponse => {
              if (retryResponse.status !== 401) {
                handleResponse(
                  retryResponse,
                  resolve,
                  reject,
                  fetchParams,
                  apiURL,
                );
              } else {
                logoutUser();

                reject(new Error('Session expired'));
              }
            });
          })
          .catch(error => {
            console.error('Token refresh failed', error);
            logoutUser();

            reject(error);
          });
      } else {
        handleResponse(response, resolve, reject, fetchParams, apiURL);
      }
    };

    if (!isConnected) {
      // If not connected, wait for network connection
      const unsubscribe = NetInfo.addEventListener(async state => {
        if (state.isConnected) {
          unsubscribe(); // remove the listener once connected
          fetch(apiURL, fetchParams)
            .then(async response => {
              processResponse(response);
            })
            .catch(error => {
              console.error('API Request Failed:', error);
              reject(error);
            });
        }
      });
    } else {
      fetch(apiURL, fetchParams)
        .then(async response => {
          processResponse(response);
        })
        .catch(error => {
          console.error('API Request Failed:', error);
          reject(error);
        });
    }
  });
};

const handleResponse = (
  response: any,
  resolve: (value: any) => void,
  reject: (reason?: any) => void,
  fetchParams: any,
  apiURL: string,
) => {
  response
    .json()
    .then(async (responseData: any) => {
      resolve(responseData);
    })
    .catch(error => {
      reject(error);
    });
};

const refreshToken = async () => {
  const refreshTokenValue = await getRefreshToken();

  const refreshParams = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken: refreshTokenValue,
    }),
  };

  try {
    const refreshResponse = await fetch(
      apiEndpoints.refreshToken,
      refreshParams,
    );

    const refreshData = await refreshResponse.json();

    const newAccessToken = refreshData?.data?.accessToken;
    const newRefreshToken = refreshData?.data?.refreshToken;
    if (newAccessToken && newRefreshToken) {
      await saveAuthToken(newAccessToken);
      await saveRefreshToken(newRefreshToken);
    }
    return newAccessToken;
  } catch (error) {
    console.error('Token refresh failed', error);
    throw error;
  }
};

const getUpdatedToken = async () => {
  if (isRefreshingToken) {
    // If a refresh token request is already in progress, wait for it to complete
    return refreshTokenPromise;
  }

  isRefreshingToken = true;
  refreshTokenPromise = refreshToken().finally(() => {
    isRefreshingToken = false;
    refreshTokenPromise = null;
  });

  return refreshTokenPromise;
};

// Call this function to perform logout logic (e.g., clearing tokens, navigating to login)
const logoutUser = async () => {
  // Clear stored tokens and other user data
  await removeAllKeys();
  reduxStore.dispatch(logout());
};
