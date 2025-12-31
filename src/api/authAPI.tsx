import { apiManager } from '.';
import { APIDataType, apiEndpoints } from './config';
import {
  getAuthToken,
  getDeviceTimeZone,
  getDeviceToken,
  getRefreshToken,
  saveAuthToken,
  saveDeviceToken,
  saveRefreshToken,
} from '../utilities/asyncStore';

export type createAccountApiType = {
  name: string;
  email: string;
  password: string;
};

export const createAccountApi = async ({
  name,
  email,
  password,
}: createAccountApiType) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint: apiEndpoints.signup,
      paramsType: 'raw',
      params: {
        name: name,
        email: email,
        password: password,
      },
    };
    apiManager(apiData)
      .then((response: any) => {
        resolve(response);
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};
