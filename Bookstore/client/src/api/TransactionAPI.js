import axios from 'axios';

const api = 'http://localhost:3000'

export const createTransaction = (payload) =>
    axios.post(api+`/createtransaction`,payload)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });