/**
 * Created by Rajesh on 11/20/18.
 */

import axios from "axios";


export function getDbNodeList(limit=10, offset=0) {
    return getResponseFromAPI(`/api/dbnode/all?limit=${limit}&offset=${offset}`);
}

export function createNewDB(params) {
    return postRequestToAPI('/api/dbnode/new', params);
}

export function deleteDBbyID(params) {
    return postRequestToAPI('api/dbnode/delete', params);
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