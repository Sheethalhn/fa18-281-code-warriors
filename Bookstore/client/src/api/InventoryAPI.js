import axios from 'axios';

const api = 'http://localhost:3000'

export const viewInventory = (payload) =>
    axios.post(api+`/viewinventory`,payload)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });

export const updateInventory = (payload) =>
    axios.post(api+`/updateinventory`,payload)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });