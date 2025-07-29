export type JsonPrimative = string | number | boolean | null;
export type JsonArray = Json[];
export type JsonObject = { [key: string]: Json };
export type JsonComposite = JsonArray | JsonObject;
export type Json = JsonPrimative | JsonComposite;

export interface IApiControlModel {
  api: IPathURLPath;
  pathVariable?: JsonObject;
  params?: Json;
  body?: Json;
  headers?: Json;
  customHeaders?: Record<string, string>;
  noLoader?: any;
}

export interface apiBaseModel {
  method: any;
  url: string;
  body?: Json;
  headers?: any;
  params?: any;
  noLoader?: any;
}

export interface IModulParamModel {
  acronym: string;
  contextPath: string;
  baseUrl: string;
  description: string;
  name: string;
}

export interface IPathURLPath {
  url: string;
  method: MethodTypes;
  description?: string;
  module: IModulParamModel;
  headers?: any;
  timeout?: any;
}

export interface IPathModel {
  [key: string]: IPathURLPath;
}

export interface IModuleModel {
  [key: string]: IModulParamModel;
}

export enum MethodTypes {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  undefined = 'undefined',
}
