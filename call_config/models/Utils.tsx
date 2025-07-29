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
                pathVariable![tempObj] || ''
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
        token:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlblR5cGUiOiJuZXciLCJzZXNzaW9uSW5zdGFuY2UiOiJ7XCJ1c2VySW5mb3JtYXRpb25cIjp7XCJ1c2VySWRcIjpcImpzdXJlYWRtaW5cIixcInVzZXJOYW1lXCI6XCJqc3VyZWFkbWluXCIsXCJkaXNwbGF5TmFtZVwiOlwiSnN1cmUgQWRtaW5cIixcInNlbGVjdGVkQ29tcGFueUNvZGVcIjpcIkpGXCIsXCJzdXBwb3J0ZWRDb21wYW5pZXNcIjpbe1wiZGVmYXVsdENvbXBhbnlcIjp0cnVlLFwiY29kZVwiOlwiSkZcIixcIm5hbWVcIjpcIkpGb3JjZSBCaWxpxZ9pbSBUZWtub2xvamlsZXJpIEEuxZ4uXCJ9XSxcImxhbmd1YWdlVmFsXCI6XCJUUlwiLFwiZHluYW1pY0xvZ2luUGFyYW1ldGVyc1wiOntcIkFHRU5DWV9JRFwiOlwiMTNCQTYzNzBDOEFBMDQxREUwNjMzQzZEMUZBQzM0NDVcIixcIkxPR0lOX1RZUEVcIjpcIkFHRU5DWV9JRFwiLFwiQUdFTkNZX1JFR0lPTl9JRFwiOlwiUjAxXCIsXCJBR0VOQ1lfVFlQRVwiOlwiQUdFTkNZXCIsXCJJU19DSEFOR0VfUEFTU1wiOnRydWUsXCJBR0VOQ1lfTkFNRVwiOlwiSkZPUkNFIEFDRU5URVwiLFwiVVNFUl9BQ0NFU1NfVFlQRVwiOlwiSU5URVJOQUxcIixcIlVTRVJfTE9HSU5fR0VORVJJQ19JRFwiOlwiMTNCQTYzNzBDOEFBMDQxREUwNjMzQzZEMUZBQzM0NDVcIixcIkFHRU5DWV9DT0RFXCI6XCIxMTczM1wifSxcInNlc3Npb25JZFwiOlwicTZ1dzRDN1gtMjI0XCIsXCJpcEFkZHJlc3NcIjpcIjg1LjEwNS4xOTUuODRcIixcInRmYVJlcXVpcmVkXCI6ZmFsc2V9LFwicm9sZXNcIjpbXX0iLCJzdWIiOiJqc3VyZWFkbWluIiwiaWF0IjoxNzMxMzk0NDI2LCJleHAiOjE3MzEzOTgwMjZ9.LF6AcjFwHZMvlm7QKakytNCRs7HXsiAET4YyeKh7VGc8oww__8u4B4xts4YWN_qx4Oc9Xb-drD85kUyHwRfw2Q',
    },
    platform: 'web',
};


export { urlParamsConvert, urlPathConvert };
