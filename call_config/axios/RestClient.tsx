import axios, { AxiosResponse } from 'axios';
import { apiBaseModel } from '../models/IApiModel';

class RestClient {
  lastCallTime: Date;

  constructor() {
    this.lastCallTime = new Date();
  }

  private updateLastCalltime = () => {
    this.lastCallTime = new Date();
  };

  public call<Response>({
    method,
    url,
    body,
    headers,
    noLoader,
  }: apiBaseModel): Promise<BaseResponse<Response>> {

    return new Promise((resolve, reject) => {
      this.updateLastCalltime();

      axios
        .request({ url, method, data: body, headers })
        .then((response: AxiosResponse<BaseResponse<Response>>) => {
          resolve(response?.data);
          if (!noLoader) {

          }
        })
        .catch((error) => {
          if (!noLoader) {
          }
          if (error?.request) {
          }
          reject(error);
        });
    });
  }
}

export type BaseResponse<T> = {
  payload: T;
  status: boolean;
  traceId: string;
};

const restClient = new RestClient();

export default restClient;
