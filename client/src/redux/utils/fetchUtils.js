import * as _ from 'lodash';

export function verifyStatus(response) {
    if (response.ok) {
        return response;
    }
    const error = new Error(response.statusText);
    error['response'] = response; // add response
    throw error;
}

export function dispatchRequest(route, method, body, successCallback, errorCallback) {
    return fetch(route, { ...getBodyByMethod(method, body), ...headerOptions() })
        .then(verifyStatus)
        .then(res => res.json())
        .then(data => successCallback(data))
        .catch(e => {
            if (e['response'] && e['response'].json) {
                e['response'].json().then(json => {
                    e['errors'] = json;
                    if (errorCallback) {
                        errorCallback(e);
                    }
                });
            } else {
                console.error(e);
                if (errorCallback) {
                    errorCallback(e);
                }
            }
        });
}

export function stringifyObject(obj) {
    let str = '';
    const keys = Object.keys(obj);
    keys.forEach(key => str += key + '=' + obj[key] + '&');
    return str;
}

const headers = {
    'Content-Type': 'application/json',
    'charset': 'UTF-8',
    'Accept': 'application/json'
};

function getBodyByMethod(method, body) {
    if (_.lowerCase(method) === 'get') {
        return { method };
    }
    return { method, body: JSON.stringify(body) };
}

function headerOptions() {
    const auth = localStorage.getItem('id_token');
    if (auth) {
        return {
            headers: {
                Authorization: auth,
                ...headers
            }
        };
    }
    return { headers };
}

export default {
    verifyStatus,
    dispatchRequest
};