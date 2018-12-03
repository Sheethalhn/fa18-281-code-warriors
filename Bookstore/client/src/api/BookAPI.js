import axios from 'axios';

const api = 'http://13.52.93.114:8000/bookapi'

const req_header = {
    headers: { "apikey": "7d833d215308491aa2a60d18a83d61f1" }
};

export const getBooks = () =>
    axios.get(api+`/books`,req_header)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });

export const getBookByIds = (payload) =>
    axios.get(api+`/book/?bookIds=`+payload,req_header)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });