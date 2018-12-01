import axios from 'axios';

const api = 'http://localhost:3000'

// View cart
export const viewCart = (userid) =>
    axios.get(api+`/viewcart/${userid}`)
        .then(function (response){
            return response;
        }).catch(error => {
        return error;
    });

// Add new cart when a user sign up
export const addNewCart = (userid) =>
    axios.post(api+`/addcart/${userid}`)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });

// Add book to cart when a user clicks on 'Add to Cart'
export const addBookToCart = (userid, data) =>
    axios.post(api+`/addbooktocart/${userid}`, data)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });

// Update cart when user changes the quantity
export const updateCart = (userid, data) =>
    axios.post(api+`/updatecart/${userid}`, data)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });

// Clear cart after Payment is made
export const clearCart = (userid) =>
    axios.post(api+`/clearcart/${userid}`)
        .then(response => {
            return response;
        }).catch(error => {
        return error;
    });

