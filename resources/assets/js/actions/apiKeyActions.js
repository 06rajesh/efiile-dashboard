/**
 * Created by Rajesh on 11/22/18.
 */


import axios from "axios";


export function getApiKeyList(limit=10, offset=0) {
    return getResponseFromAPI(`/api/apikey/all?limit=${limit}&offset=${offset}`);
}

export function createNewApiKey(params) {
    return postRequestToAPI('/api/apikey/new', params);
}

export function deleteById(params) {
    return postRequestToAPI('/api/apikey/delete', params);
}

export function updateKeyStatus(params) {
    return postRequestToAPI('/api/apikey/update', params);
}

function postRequestToAPI(url, params) {
    return axios.post(url, params)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        })
}

function getResponseFromAPI(url) {
    return axios.get(url, {
        headers: {'api-key': 'W2AFAE3H'},
    })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
}
