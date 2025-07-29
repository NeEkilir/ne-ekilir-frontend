import axios from '../axios/RestClient';
import { ApiManager } from '../api-manager/ApiManager';
import { IApiControlModel } from '../models/IApiModel';

class TAxios {
    call = (props: IApiControlModel) => {
        return new Promise<any>((resolve, reject) => {
            axios
                .call(
                    ApiManager({
                        api: props.api,
                        pathVariable: props?.pathVariable,
                        params: props?.params,
                        body: props?.body,
                        noLoader: props?.noLoader,
                    })
                )
                .then((response) => resolve(response))
                .catch((err) => {
                    return reject(err);
                });
        });
    };
}

export const tAxios = new TAxios();
