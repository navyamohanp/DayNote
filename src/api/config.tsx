// @flow

import { Platform } from 'react-native';
// import Config from 'react-native-config';
export const domains = {
  test: Platform.select({
    android: 'http://10.0.2.2:3000/api/',
    ios: 'http://localhost:3000/api/',
  }),
};

export const baseURL = domains.test;
const routes = {
  auth: 'auth/',
  journal: 'journal/',
};
export const apiEndpoints = {
  signup: baseURL + routes.auth + 'signup',
  login: baseURL + routes.auth + 'login',
  dataCollection: baseURL + routes.auth + 'data/',
  refreshToken: baseURL + routes.auth + 'refresh',
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
