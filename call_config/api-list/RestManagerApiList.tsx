/* eslint-disable no-template-curly-in-string */
import { moduleProje } from '../api-manager/ApiModule';
import { IPathModel, MethodTypes } from '../models/IApiModel';

const RestManagerApiList: IPathModel = {
  GET_MONTH_LIST: {
    url: '/month/list',
    method: MethodTypes.GET,
    module: moduleProje.REST_MAN,
    description: 'get month list',
  },
  GET_MONTH_DETAIL: {
    url: '/month/detail/{id}',
    method: MethodTypes.GET,
    module: moduleProje.REST_MAN,
    description: 'get month detail by id',
  },
  GET_PRODUCT_LIST: {
    url: '/product/list/{id}',
    method: MethodTypes.GET,
    module: moduleProje.REST_MAN,
    description: 'get product list by month id',
  },
  GET_PRODUCT_DETAIL: {
    url: '/product/detail/{id}',
    method: MethodTypes.GET,
    module: moduleProje.REST_MAN,
    description: 'get product detail by id',
  },
  GET_RATING: {
    url: '/rating/detail/{userId}/{productId}',
    method: MethodTypes.GET,
    module: moduleProje.REST_MAN,
    description: 'get product rating',
  },
  SAVE_RATING: {
    url: '/rating/save',
    method: MethodTypes.POST,
    module: moduleProje.REST_MAN,
    description: 'save product rating',
  },
  EDIT_RATING: {
    url: '/rating/update/{id}',
    method: MethodTypes.PUT,
    module: moduleProje.REST_MAN,
    description: 'update product rating',
  },
  TOP_TEN_LIST: {
    url: '/rating/topTen',
    method: MethodTypes.GET,
    module: moduleProje.REST_MAN,
    description: 'get product top ten list',
  },
  PRODUCT_AVG_RATE: {
    url: '/rating/productRate/{id}',
    method: MethodTypes.GET,
    module: moduleProje.REST_MAN,
    description: 'get product get avg rate',
  },
  SEND_REQUEST: {
    url: '/request/save',
    method: MethodTypes.POST,
    module: moduleProje.REST_MAN,
    description: 'save request',
  },
  SAVE_COMMENT: {
    url: '/comment/save',
    method: MethodTypes.POST,
    module: moduleProje.REST_MAN,
    description: 'save comment',
  },
  GET_COMMENT_LIST: {
    url: '/comment/list/{id}',
    method: MethodTypes.GET,
    module: moduleProje.REST_MAN,
    description: 'get comment list by product id',
  },
  ADD_PROFILE_PRODUCT: {
    url: '/user-product/add-profile',
    method: MethodTypes.POST,
    module: moduleProje.REST_MAN,
    description: 'add profile product',
  },
  GET_PROFILE_PRODUCT: {
    url: '/user-product/get-user-product-list/{userId}',
    method: MethodTypes.GET,
    module: moduleProje.REST_MAN,
    description: 'get profile product list',
  },
  GET_DAILY_PLANTING: {
    url: '/product/get-daily-planting ',
    method: MethodTypes.GET,
    module: moduleProje.REST_MAN,
    description: 'get daily planting',
  },
  REFRESH_TOKEN: {
    url: '/user/refresh',
    method: MethodTypes.POST,
    module: moduleProje.REST_MAN,
    description: 'refresh token',
  },
  LOGIN: {
    url: '/user/login',
    method: MethodTypes.POST,
    module: moduleProje.REST_MAN,
    description: 'login',
  },
  USER_INFO: {
    url: '/user/info',
    method: MethodTypes.GET,
    module: moduleProje.REST_MAN,
    description: 'user info',
  },
  DELETE_PLANTING_CALENDER: {
    url: '/user-product/delete/{id}',
    method: MethodTypes.DELETE,
    module: moduleProje.REST_MAN,
    description: 'delete product for planting calender',
  },
};

export { RestManagerApiList };
