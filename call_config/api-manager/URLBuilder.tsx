import { urlPathConvert, urlParamsConvert } from '../models/Utils';
import { JsonObject, Json } from '../models/IApiModel';

export const URLBuilder = (
  urlConf: any,
  pathVariable?: JsonObject,
  params?: Json
) => {
  let tempUrl =
    urlConf.module.baseUrl + urlConf.module.contextPath + urlConf?.url;

  tempUrl = urlPathConvert(tempUrl, pathVariable);
  tempUrl = urlParamsConvert(tempUrl, params);
  return tempUrl;
};