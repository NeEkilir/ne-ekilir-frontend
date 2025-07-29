/* eslint-disable no-template-curly-in-string */
import { moduleProje } from '../api-manager/ApiModule';
import { IPathModel, MethodTypes } from '../models/IApiModel';

const RestManagerApiList: IPathModel = {
  GET_MONTH_LIST: {
    url: 'month/list',
    method: MethodTypes.GET,
    module: moduleProje.REST_MAN,
    description: 'get month list',
  },
  GET_MONTH_DETAIL: {
    url: 'month/detail/{id}',
    method: MethodTypes.GET,
    module: moduleProje.REST_MAN,
    description: 'get month detail by id',
  },
  GET_PRODUCT_LIST: {
    url: 'product/list/{id}',
    method: MethodTypes.GET,
    module: moduleProje.REST_MAN,
    description: 'get product list by month id',
  },
  GET_PRODUCT_DETAIL: {
    url: 'product/detail/{id}',
    method: MethodTypes.GET,
    module: moduleProje.REST_MAN,
    description: 'get product detail by id',
  },
};

export { RestManagerApiList };
