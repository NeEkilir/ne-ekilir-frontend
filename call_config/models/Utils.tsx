/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const urlPathConvert = (url: string, pathVariable: any) => {
  let tempUrl: any = url || '';
  if (tempUrl.includes('{')) {
    let regExp = /\{.*?\}/g;
    let matches = tempUrl.match(regExp);
    for (let i = 0; i < matches.length; i++) {
      const tempObj = String(matches[i])?.replace('{', '').replace('}', '');
      tempUrl = tempUrl.replaceAll(
        String(matches[i]),
        pathVariable![tempObj] || '',
      );
    }
  }
  return tempUrl;
};

const urlParamsConvert = (url: string, params: any) => {
  if (params) {
    let tempParams = new URLSearchParams(params);
    return (url = url + '?' + tempParams);
  } else {
    return url;
  }
};

export const applicationProperties = {
  api: {
    timeout: 200000,
    token: '',
  },
  platform: 'web',
};

export { urlParamsConvert, urlPathConvert };
