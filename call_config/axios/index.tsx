import axios, { AxiosResponse } from 'axios';
import { applicationProperties } from '../models/Utils';
import { getTokens, saveTokens, clearTokens } from '../../utils/SecureStorage';
import { tAxios } from '../services/TAxios';
import { RestManagerApiList } from '../api-list/RestManagerApiList';

const HTTP_AUTHORIZATION_ERROR_CODE = 401;

const refreshAccessToken = async (refreshToken: string, setIsLogin: any) => {
  tAxios
    .call({
      api: RestManagerApiList.REFRESH_TOKEN,
      body: {
        refreshToken,
      },
    })
    .then((res: any) => {
      const newAccessToken = res?.accessToken?.token;
      const newRefreshToken = res?.accessToken?.refreshToken;

      if (newAccessToken && newRefreshToken) {
        saveTokens(newAccessToken, newRefreshToken);
      }

      return newAccessToken;
    })
    .catch((error: any) => {
      console.error('Refresh token yenileme hatası:', error);
      clearTokens();
      setIsLogin(false);
      return null;
    });
};

export const setupAxiosInterceptors = (setIsLogin: any) => {
  const onRequestSuccess = async (config: any) => {
    const tokens = await getTokens();

    if (
      config.url &&
      !config.url.startsWith('http') &&
      applicationProperties.api
    ) {
      config.url = `${config.url}`;
    }

    config.headers['Accept'] = 'application/json';

    if (tokens?.accessToken) {
      config.headers['Authorization'] = `Bearer ${tokens?.accessToken?.token}`;
    }

    return config;
  };

  const onResponseSuccess = (response: AxiosResponse | any) => {
    return response;
  };

  const onResponseError = async (error: any) => {
    const originalRequest = error.config;
    console.log(
      error?.response?.status === HTTP_AUTHORIZATION_ERROR_CODE &&
        !originalRequest._retry,
      'error',
    );
    if (
      error?.response?.status === HTTP_AUTHORIZATION_ERROR_CODE &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const tokens = await getTokens();
      if (tokens?.accessToken?.refreshToken) {
        const newAccessToken = refreshAccessToken(
          tokens?.accessToken?.refreshToken,
          setIsLogin,
        );

        if (newAccessToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        }
      }
      clearTokens();
    }
    return Promise.reject(
      error?.response ? error?.response?.data : error?.response || error,
    );
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};
