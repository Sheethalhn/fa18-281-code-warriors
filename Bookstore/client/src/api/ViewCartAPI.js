import axios from 'axios';

const api = 'http://13.52.93.114:8000/scapi'

const req_header = {
    headers: { "apikey": "7d833d215308491aa2a60d18a83d61f1" }
};

// View cart
export const viewCart = (userid) =>
    axios.get(api+`/viewcart/${userid}`,req_header)
        .then(function (response){
            return response;
        }).catch(error => {
        return error;
    });

// Add new cart when a user sign up
export const addNewCart = (userid) => {
    //console.log(typeof(userid))
    //var user = Number(userid)
    var data = {}
    axios.post(api+`/addcart/${userid}`,data, req_header)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });
}

// Add book to cart when a user clicks on 'Add to Cart'
export const addBookToCart = (userid, data) =>
    axios.post(api+`/addbooktocart/${userid}`, data,req_header)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });

// Update cart when user changes the quantity
export const updateCart = (userid, data) =>
    axios.post(api+`/updatecart/${userid}`, data,req_header)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });

// Clear cart after Payment is made
export const clearCart = (userid) =>
    axios.post(api+`/clearcart/${userid}`,req_header)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });

