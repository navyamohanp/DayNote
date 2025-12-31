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

export type DataApiType = {
  id: string;
  username: string;
  gender: string;
  age: string;
};

export const dataCollectionApi = async ({
  id,
  username,
  gender,
  age,
}: DataApiType) => {
  const accessToken = await getAuthToken();
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint: apiEndpoints.dataCollection + id,
      params: {
        username,
        age,
        gender,
      },
    };
    console.log('API Params:', apiData.params);
    apiManager(apiData)
      .then((response: any) => {
        console.log('resp******', response);
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

export type loginApiType = {
  email: string;
  password: string;
};

export const loginApi = async ({ email, password }: loginApiType) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint: apiEndpoints.login,
      paramsType: 'raw',
      params: {
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
