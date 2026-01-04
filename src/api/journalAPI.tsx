import { apiManager } from '.';
import { APIDataType, apiEndpoints } from './config';

export type CreateJournalApiType = {
  title: string;
  content: string;
  mood?: string;
  journalDate?: string;
};

export const createJournalApi = async (data: CreateJournalApiType) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint: apiEndpoints.createJournal,
      paramsType: 'raw',
      params: data,
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

export const getJournalsApi = async (page: number = 1, limit: number = 5) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'get',
      endPoint: `${apiEndpoints.getJournals}?page=${page}&limit=${limit}`,
    };

    apiManager(apiData)
      .then((response: any) => resolve(response))
      .catch((error: any) => reject(error));
  });
};

export type UpdateJournalApiType = {
  title?: string;
  content?: string;
  mood?: string;
  journalDate?: string;
};

export const updateJournalApi = async (
  id: string,
  data: UpdateJournalApiType,
) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'put',
      endPoint: apiEndpoints.updateJournal + '/' + id,
      paramsType: 'raw',
      params: {
        title: data.title,
        content: data.content,
        mood: data.mood,
        journalDate: data.journalDate,
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

export const deleteJournalApi = async (id: string) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'delete',
      endPoint: apiEndpoints.deleteJournal + '/' + id,
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
