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
      .then(async (response: any) => {
        if (response?.code === 200) {
          const accessToken = response?.accessToken;
          const refreshToken = response?.refreshToken;
          if (accessToken) {
            await saveAuthToken(accessToken);
          }
          if (refreshToken) {
            await saveRefreshToken(refreshToken);
          }
        }
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
      .then(async (response: any) => {
        if (response?.code === 200) {
          const accessToken = response?.data?.accessToken;
          const refreshToken = response?.data?.refreshToken;
          if (accessToken) {
            await saveAuthToken(accessToken);
          }
          if (refreshToken) {
            await saveRefreshToken(refreshToken);
          }
        }
        resolve(response);
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

export type forgotPasswordApiType = {
  email: string;
};

export const forgotPasswordApi = async ({ email }: forgotPasswordApiType) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint: apiEndpoints.forgot,
      paramsType: 'raw',
      params: {
        email: email,
      },
    };
    apiManager(apiData)
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export type verifyOtpApiType = {
  email: string;
  otp: string;
};

export const verifyOtpApi = async ({ email, otp }: verifyOtpApiType) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint: apiEndpoints.verify,
      paramsType: 'raw',
      params: {
        email: email,
        otp: otp,
      },
    };
    apiManager(apiData)
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export type resetPasswordApiType = {
  email: string;
  password: string;
};

export const resetPasswordApi = async ({
  email,
  password,
}: resetPasswordApiType) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint: apiEndpoints.resetPassword,
      paramsType: 'raw',
      params: {
        email: email,
        newPassword: password,
      },
    };
    apiManager(apiData)
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};
