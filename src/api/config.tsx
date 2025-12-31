// @flow

import { Platform } from 'react-native';
// import Config from 'react-native-config';
export const domains = {
  test: Platform.select({
    android: 'http://10.0.2.2:3000/api/',
    ios: 'http://localhost:3000/api/',
  }),
  // ngrok: 'https://1hqwr3h7-4075.inc1.devtunnels.ms/v1/api',
  // live: 'https://api.theliftweighter.com/v1/api',
};

export const baseURL = domains.test;

export const apiEndpoints = {
  signup: baseURL + 'signup',
};

export type APIDataType = {
  params?: any;
  method?: string;
  endPoint?: string;
  paramsType?: ParamsType;
  headerType?: string;
  access_token?: any;
};

export type ParamsType = 'formData' | 'default' | 'raw';
