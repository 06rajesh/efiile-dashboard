/**
 * Created by talha on 11/21/18.
 */

import axios from "axios";


export function getUsersList(limit=10, offset=0) {
    return getResponseFromAPI(`/api/users/all?limit=${limit}&offset=${offset}`);
}

export function getCurrentUser() {
    return getResponseFromAPI('api/users/current');
}

export function deleteUserById(params) {
    return postDataToAPI('/api/users/delete', params);
}

export function createNewUser(params) {
   return postDataToAPI('/api/users/new', params);
}

export function updateUserAction(params) {
    return postDataToAPI('/api/users/update', params);
}

function postDataToAPI(url, params) {
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