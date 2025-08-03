import { IModuleModel } from '../models/IApiModel';

const baseUrl = 'http://10.0.3.2:8080';

export const moduleProje: IModuleModel = {
  REST_MAN: {
    name: 'Rest Services',
    acronym: 'RESM',
    contextPath: '',
    baseUrl: baseUrl,
    description: 'Rest Manager',
  },

};