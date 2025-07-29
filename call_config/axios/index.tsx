import axios, { AxiosResponse } from 'axios';
import { applicationProperties } from "../models/Utils"

const HTTP_AUTHORIZATION_ERROR_CODE = 401;

export const setupAxiosInterceptors = (
  setLoading: (loading: boolean) => void
) => {
  const onRequestSuccess = (config: any) => {
    if (
      config.url &&
      !config.url.startsWith('http') &&
      applicationProperties.api
    ) {
      config.url = `${config.url}`;
    }

    config.headers['Accept'] = 'application/json';


    return config;
  };

  const onResponseSuccess = (response: AxiosResponse | any) => {


    return response;
  };

  const onResponseError = async (error: any) => {

    return Promise.reject(
      error?.response ? error?.response?.data : error?.response || error
    );
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};
