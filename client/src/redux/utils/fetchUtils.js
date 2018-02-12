export function verifyStatus(response) {
    if (response.ok) {
        return response;
    }
    const error = new Error(response.statusText);
    error['response'] = response; // add response
    throw error;
}

export function dispatchRequest(route, method, body, successCallback, errorCallback) {
    return fetch(route, { method, body: JSON.stringify(body), ...headerOptions() })
        .then(verifyStatus)
        .then(res => res.json())
        .then(data => successCallback(data))
        .catch(e => {
            if (e['response'].json) {
                e['response'].json().then(json => {
                    e['errors'] = json;
                    errorCallback(e);
                })
            } else {
                console.error(e);
                errorCallback(e);
            }
        });
}

const headers = {
    'Content-Type': 'application/json',
    'charset': 'UTF-8',
    'Accept': 'application/json'
};

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