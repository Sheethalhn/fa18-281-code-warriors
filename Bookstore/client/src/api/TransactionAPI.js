import axios from 'axios';

const api = 'http://73.223.42.106:3000'

export const createTransaction = (payload) =>
    axios.post(api+`/createTransaction`,payload)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });