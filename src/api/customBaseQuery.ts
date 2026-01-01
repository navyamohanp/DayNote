import {BaseQueryFn, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiEndpoints, baseURL} from './config';
import {
  getAuthToken,
  getRefreshToken,
  removeAllKeys,
  saveAuthToken,
  saveRefreshToken,
} from '../utilities/asyncStore';
import {reduxStore} from '../redux/store';
import {logout} from '../redux/reducers/authenticationReducer';

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: async headers => {
    const token = await getAuthToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const logoutUser = async () => {
  await removeAllKeys(); // Clear stored tokens
  reduxStore.dispatch(logout()); // Dispatch logout action
};

const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If token is expired, attempt refresh
  if (result.error && result.error.status === 401) {
    try {
      const refreshToken = await getRefreshToken();

      if (!refreshToken) {
        console.warn('No refresh token available, logging out...');
        await logoutUser();
        return {error: {status: 401, data: 'Unauthorized'}};
      }

      const refreshResponse = await fetch(apiEndpoints.refreshToken, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({refreshToken}),
      });

      if (!refreshResponse.ok) {
        console.warn('Refresh token request failed, logging out...');
        await logoutUser();
        return {error: {status: 401, data: 'Unauthorized'}};
      }

      const refreshData = await refreshResponse.json();
      const newAccessToken = refreshData?.data?.accessToken;
      const newRefreshToken = refreshData?.data?.refreshToken;

      if (newAccessToken && newRefreshToken) {
        await saveAuthToken(newAccessToken);
        await saveRefreshToken(newRefreshToken);

        // Retry the original request with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.warn('Invalid refresh token response, logging out...');
        await logoutUser();
        return {error: {status: 401, data: 'Unauthorized'}};
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      await logoutUser();
      return {error: {status: 401, data: 'Unauthorized'}};
    }
  }

  return result;
};

export default customBaseQuery;
