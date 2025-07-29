import {
  apiBaseModel,
  IApiControlModel,
  MethodTypes,
} from '../models/IApiModel';
import { URLBuilder } from './URLBuilder';

export const ApiManager = ({
  api,
  pathVariable,
  params,
  body,
  noLoader,
}: IApiControlModel): apiBaseModel => {
  const headers = {
    ...api.headers,
  };

  if (body instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data'; // FormData için özel Content-Type
  }
  return {
    method: api.method || MethodTypes.undefined,
    url: URLBuilder(api, pathVariable, params),
    body,
    // headers,
    params: { timeout: api.timeout },
    noLoader,
  };
};
