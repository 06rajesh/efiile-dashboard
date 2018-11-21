/**
 * Created by Rajesh on 11/20/18.
 */

import axios from "axios";


export function getDbNodeList(limit=10, offset=0) {
    return getResponseFromAPI(`/api/dbnode/all?limit=${limit}&offset=${offset}`);
}

export function createNewDB(params) {
    return axios.post('/api/dbnode/new', params)
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