
export function verifyStatus(response) {
    if (response.status >= 200 && response.status <= 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error['response'] = response; // add response
    return error;
}

export const options = {
    dataType: 'json',
    headers: {
        'Content-Type': 'application/json',
        'charset': 'UTF-8',
        'Accept': 'application/json'
    }
};

export default {
    verifyStatus,
    options
};