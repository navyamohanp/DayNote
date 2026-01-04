import { apiManager } from '.';
import { APIDataType, apiEndpoints } from './config';

export type EditProfileApiType = {
  name?: string;
  username?: string;
  age?: string;
  gender?: string;
};

export const editProfileApi = async (data: EditProfileApiType) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'patch',
      endPoint: apiEndpoints.editProfile,
      paramsType: 'raw',
      params: data,
    };

    console.log(apiData.params, '=========api');
    apiManager(apiData)
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const deleteUserApi = async () => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'delete',
      endPoint: apiEndpoints.deleteUser,
      paramsType: 'raw',
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

export const getUserApi = async () => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'get',
      endPoint: apiEndpoints.getUser,
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
