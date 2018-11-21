/**
 * Created by talha on 11/21/18.
 */

import axios from "axios";


export function getUsersList(limit=10, offset=0) {
    return getResponseFromAPI(`/api/users/all?limit=${limit}&offset=${offset}`);
}

export function createNewUser(params) {
    return axios.post('/api/users/new', params)
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