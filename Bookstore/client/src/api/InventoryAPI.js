import axios from 'axios';

const api = 'http://13.52.93.114:8000/invapi'


const req_header = {
    headers: { "apikey": "7d833d215308491aa2a60d18a83d61f1" }
};

export const viewInventory = (payload) =>
    axios.post(api+`/viewinventory`,payload,req_header)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });

export const updateInventory = (payload) =>
    axios.post(api+`/updateinventory`,payload,req_header)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });