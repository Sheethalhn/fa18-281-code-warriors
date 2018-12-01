import axios from 'axios';

const api = 'http://localhost:3000'

export const getBooks = () =>
    axios.get(api+`/books`)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });

export const getBookByIds = (payload) =>
    axios.get(api+`/book/?bookIds=`+payload)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });